-- =====================================================================
-- AMADEUS Store — MySQL 8 スキーマ (DDL)
-- DTO (com.amadeus.store.dto.*) と SeedDataStore に基づいて設計
-- 文字コード: utf8mb4 (日本語), エンジン: InnoDB
--
-- 設計方針:
--  * 業務ID(p001 / s01 / u001 / AMD-... 等)はDTO/フロントと共有される
--    安定した自然キーのため VARCHAR 主キーとして採用。
--    (代理キー BIGINT を使う場合は code 列を UNIQUE にして置換可能)
--  * List<String> 型(images, tags)は子テーブルへ正規化。
--  * ランキング/SALEストリップ/注文明細/予約 等は表示時点のスナップショット
--    値を持つDTOのため、snapshot列を保持(商品変更や削除に影響されない)。
--  * cart / recently_viewed は実行時 Redis で処理されるが、永続化/分析用に
--    テーブルも定義(任意)。
--  * session/token は Redis 管理のため RDB テーブルなし。
--  * 外部キー制約(FK)は不使用(論理関連)。関連は user_id / product_id 等の
--    論理参照列で表し、参照整合性はアプリ層で担保。JOIN/絞り込み用に対象列へは
--    明示的に KEY(索引)を付与し、物理FKの索引効果のみ手動で代替する。
-- =====================================================================

SET NAMES utf8mb4;

DROP TABLE IF EXISTS ranking_entry;
DROP TABLE IF EXISTS schedule_item;
DROP TABLE IF EXISTS sale_strip_item;
DROP TABLE IF EXISTS sale_strip;
DROP TABLE IF EXISTS membership_cta;
DROP TABLE IF EXISTS feature_banner;
DROP TABLE IF EXISTS news_ticker;
DROP TABLE IF EXISTS promo;
DROP TABLE IF EXISTS hero_slide_tag;
DROP TABLE IF EXISTS hero_slide;
DROP TABLE IF EXISTS recently_viewed;
DROP TABLE IF EXISTS point_expiring;
DROP TABLE IF EXISTS point_history;
DROP TABLE IF EXISTS reservation;
DROP TABLE IF EXISTS order_item;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS cart_item;
DROP TABLE IF EXISTS favorite;
DROP TABLE IF EXISTS address;
DROP TABLE IF EXISTS app_user;
DROP TABLE IF EXISTS product_tag;
DROP TABLE IF EXISTS product_image;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS series;

-- ---------------------------------------------------------------------
-- series  (SeriesDto)
-- ---------------------------------------------------------------------
CREATE TABLE series (
    id          VARCHAR(16)  NOT NULL COMMENT 'シリーズID (例 s01)',
    name        VARCHAR(100) NOT NULL COMMENT '作品/シリーズ名',
    item_count  INT          NOT NULL DEFAULT 0 COMMENT '取扱点数(表示用)',
    hero_image  VARCHAR(255) NULL COMMENT 'シリーズ代表画像URL',
    tone        CHAR(1)      NULL COMMENT 'プレースホルダ色調 a-f',
    created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='作品シリーズ';

-- ---------------------------------------------------------------------
-- category  (CategoryDto, 自己参照ツリー)
-- ---------------------------------------------------------------------
CREATE TABLE category (
    id             VARCHAR(16) NOT NULL COMMENT 'カテゴリID (例 cat01)',
    name           VARCHAR(60) NOT NULL COMMENT '表示名',
    slug           VARCHAR(60) NOT NULL COMMENT 'URLスラッグ (例 figure)',
    parent_id      VARCHAR(16) NULL COMMENT '親カテゴリ論理参照(NULL=ルート)',
    product_count  INT         NOT NULL DEFAULT 0 COMMENT '商品件数(表示用)',
    tone           CHAR(1)     NULL COMMENT '色調 a-f',
    sort_order     INT         NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    UNIQUE KEY uk_category_slug (slug),
    KEY idx_category_parent (parent_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='カテゴリ(ツリー)';

-- ---------------------------------------------------------------------
-- product  (ProductDto)
-- ---------------------------------------------------------------------
CREATE TABLE product (
    id             VARCHAR(16)  NOT NULL COMMENT '商品ID (例 p001)',
    series_id      VARCHAR(16)  NULL COMMENT '論理参照 series',
    category_id    VARCHAR(16)  NULL COMMENT '論理参照 category',
    name           VARCHAR(200) NOT NULL COMMENT '商品名',
    scale          VARCHAR(20)  NULL COMMENT 'スケール (例 1/7, 1/100)',
    price          INT          NOT NULL COMMENT '税込価格(円, 整数)',
    sale_price     INT          NULL COMMENT 'セール価格(円), 無ければNULL',
    status         ENUM('in_stock','preorder','sold_out') NOT NULL DEFAULT 'in_stock',
    free_shipping  TINYINT(1)   NOT NULL DEFAULT 1,
    point_rate     INT          NOT NULL DEFAULT 10 COMMENT 'ポイント倍率(P10倍=10)',
    tone           CHAR(1)      NULL COMMENT '色調 a-f',
    created_at     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_product_series (series_id),
    KEY idx_product_category (category_id),
    KEY idx_product_status (status),
    KEY idx_product_price (price),
    CONSTRAINT chk_product_saleprice CHECK (sale_price IS NULL OR sale_price <= price)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='商品';

-- product.images : List<String> 正規化
CREATE TABLE product_image (
    id          BIGINT       NOT NULL AUTO_INCREMENT,
    product_id  VARCHAR(16)  NOT NULL COMMENT '論理参照 product',
    url         VARCHAR(255) NOT NULL,
    sort_order  INT          NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    UNIQUE KEY uk_product_image (product_id, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='商品画像';

-- product.tags : List<String> 正規化 (限定/予約/抽選/NEW/再販/SALE 等)
CREATE TABLE product_tag (
    product_id  VARCHAR(16) NOT NULL COMMENT '論理参照 product',
    tag         ENUM('lim','pre','lot','new','re','sale','ship','point') NOT NULL,
    PRIMARY KEY (product_id, tag)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='商品タグ';

-- ---------------------------------------------------------------------
-- app_user  (UserDto / RegisterRequest)
--   orderCount / favoriteCount は集計で導出するためテーブルには持たない。
-- ---------------------------------------------------------------------
CREATE TABLE app_user (
    id             VARCHAR(16)  NOT NULL COMMENT 'ユーザID (例 u001)',
    name           VARCHAR(80)  NOT NULL COMMENT '氏名',
    email          VARCHAR(160) NOT NULL COMMENT 'メール',
    password  VARCHAR(100) NOT NULL COMMENT 'パスワード',
    phone          VARCHAR(20)  NULL COMMENT '携帯番号',
    member_rank    VARCHAR(20)  NOT NULL DEFAULT '銅' COMMENT '会員ランク',
    point_balance  INT          NOT NULL DEFAULT 0 COMMENT 'ポイント残高',
    point_rate     INT          NOT NULL DEFAULT 1 COMMENT '還元率(%)',
    newsletter     TINYINT(1)   NOT NULL DEFAULT 0 COMMENT 'メルマガ購読',
    created_at     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uk_user_email (email),
    UNIQUE KEY uk_user_phone (phone)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='会員';
TRUNCATE app_user;
-- ---------------------------------------------------------------------
-- address  (AddressDto)
-- ---------------------------------------------------------------------
CREATE TABLE address (
    id          VARCHAR(16)  NOT NULL COMMENT '住所ID (例 addr01)',
    user_id     VARCHAR(16)  NOT NULL COMMENT '論理参照 app_user',
    name        VARCHAR(80)  NOT NULL COMMENT '宛名',
    zip         VARCHAR(8)   NOT NULL COMMENT '郵便番号',
    prefecture  VARCHAR(20)  NOT NULL COMMENT '都道府県',
    city        VARCHAR(60)  NOT NULL COMMENT '市区町村',
    address1    VARCHAR(120) NOT NULL COMMENT '番地',
    address2    VARCHAR(120) NULL COMMENT '建物名等',
    phone       VARCHAR(20)  NULL,
    is_default  TINYINT(1)   NOT NULL DEFAULT 0 COMMENT 'デフォルト配送先',
    created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_address_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='お届け先住所';

-- ---------------------------------------------------------------------
-- favorite  (FavoriteDto: 表示値は product をJOINして生成)
-- ---------------------------------------------------------------------
CREATE TABLE favorite (
    user_id     VARCHAR(16) NOT NULL COMMENT '論理参照 app_user',
    product_id  VARCHAR(16) NOT NULL COMMENT '論理参照 product',
    created_at  DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, product_id),
    KEY idx_favorite_product (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='お気に入り';

-- ---------------------------------------------------------------------
-- cart_item  (CartDto.CartItemDto)  ※実行時は Redis、永続化用
--   total はアプリ側で SUM(unit_price * qty) を算出。
-- ---------------------------------------------------------------------
CREATE TABLE cart_item (
    id          VARCHAR(24) NOT NULL COMMENT 'カート明細ID (例 ci001)',
    user_id     VARCHAR(16) NOT NULL COMMENT '論理参照 app_user',
    product_id  VARCHAR(16) NOT NULL COMMENT '論理参照 product',
    qty         INT         NOT NULL DEFAULT 1,
    unit_price  INT         NOT NULL COMMENT '投入時単価スナップショット',
    created_at  DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uk_cart_user_product (user_id, product_id),
    KEY idx_cart_user (user_id),
    KEY idx_cart_product (product_id),
    CONSTRAINT chk_cart_qty CHECK (qty >= 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='カート明細';

-- ---------------------------------------------------------------------
-- orders  (OrderDto)   ※order は予約語のため orders
-- ---------------------------------------------------------------------
CREATE TABLE orders (
    id                   VARCHAR(32) NOT NULL COMMENT '注文番号 (例 AMD-20260531-0412)',
    user_id              VARCHAR(16) NOT NULL COMMENT '論理参照 app_user',
    ordered_at           DATETIME    NOT NULL COMMENT '注文日時(JST)',
    status               ENUM('shipping','preparing','delivered','cancelled') NOT NULL,
    total                INT         NOT NULL COMMENT '合計金額(円)',
    shipping_address_id  VARCHAR(16) NULL COMMENT '論理参照 address',
    created_at           DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_order_user (user_id),
    KEY idx_order_status (status),
    KEY idx_order_date (ordered_at),
    KEY idx_order_address (shipping_address_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='注文';

-- order_item  (OrderItemDto: 履歴のため name/series/price はスナップショット)
CREATE TABLE order_item (
    id          BIGINT       NOT NULL AUTO_INCREMENT,
    order_id    VARCHAR(32)  NOT NULL COMMENT '論理参照 orders',
    product_id  VARCHAR(16)  NULL COMMENT '論理参照 product(商品削除時のNULL化はアプリ側で処理)',
    name        VARCHAR(220) NOT NULL COMMENT '商品名スナップショット',
    series      VARCHAR(100) NULL COMMENT 'シリーズ名スナップショット',
    qty         INT          NOT NULL DEFAULT 1,
    price       INT          NOT NULL COMMENT '明細価格スナップショット',
    tone        CHAR(1)      NULL,
    PRIMARY KEY (id),
    KEY idx_oitem_order (order_id),
    KEY idx_oitem_product (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='注文明細';

-- ---------------------------------------------------------------------
-- reservation  (ReservationDto: 予約/抽選)
-- ---------------------------------------------------------------------
CREATE TABLE reservation (
    id            VARCHAR(32)  NOT NULL COMMENT '予約/抽選ID (例 AMD-PRE-0091)',
    user_id       VARCHAR(16)  NOT NULL COMMENT '論理参照 app_user',
    type          ENUM('preorder','lottery') NOT NULL,
    status        VARCHAR(30)  NOT NULL COMMENT '受付前/受付中/締切/抽選中/当選/落選/確定 等',
    ship_eta      VARCHAR(20)  NULL COMMENT '発送目安 (例 2026-09)',
    result_date   VARCHAR(20)  NULL COMMENT '抽選結果日 (例 2026-06-08)',
    product_id    VARCHAR(16)  NULL COMMENT '論理参照 product',
    product_name  VARCHAR(220) NOT NULL COMMENT '商品名スナップショット',
    series_name   VARCHAR(100) NULL COMMENT 'シリーズ名スナップショット',
    price         INT          NOT NULL,
    tone          CHAR(1)      NULL,
    charge_timing VARCHAR(20)  NULL COMMENT '課金タイミング (ship/win 等)',
    created_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_resv_user (user_id),
    KEY idx_resv_type (type),
    KEY idx_resv_product (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='予約・抽選';

-- ---------------------------------------------------------------------
-- point_history  (PointsDto.HistoryItemDto)
-- ---------------------------------------------------------------------
CREATE TABLE point_history (
    id             BIGINT       NOT NULL AUTO_INCREMENT,
    user_id        VARCHAR(16)  NOT NULL COMMENT '論理参照 app_user',
    happened_on    DATE         NOT NULL COMMENT '発生日',
    label          VARCHAR(120) NOT NULL COMMENT '内容',
    change_amount  INT          NOT NULL COMMENT '増減(+/-)',
    balance_after  INT          NOT NULL COMMENT '処理後残高',
    PRIMARY KEY (id),
    KEY idx_point_user (user_id, happened_on)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='ポイント履歴';

-- point_expiring  (PointsDto.ExpiringPointDto / UserDto.ExpiringPointDto)
CREATE TABLE point_expiring (
    id          BIGINT      NOT NULL AUTO_INCREMENT,
    user_id     VARCHAR(16) NOT NULL COMMENT '論理参照 app_user',
    amount      INT         NOT NULL COMMENT '失効予定ポイント',
    expires_at  DATE        NOT NULL COMMENT '失効日',
    PRIMARY KEY (id),
    KEY idx_pexp_user (user_id, expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='失効予定ポイント';

-- ---------------------------------------------------------------------
-- recently_viewed  (RecentlyViewedDto)  ※実行時は Redis、永続化用
-- ---------------------------------------------------------------------
CREATE TABLE recently_viewed (
    user_id     VARCHAR(16) NOT NULL COMMENT '論理参照 app_user',
    product_id  VARCHAR(16) NOT NULL COMMENT '論理参照 product',
    viewed_at   DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, product_id),
    KEY idx_recent_user (user_id, viewed_at),
    KEY idx_recent_product (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='最近チェックした商品';

-- =====================================================================
-- ホームページ用 CMS コンテンツ (HomeDto)
-- =====================================================================

-- hero_slide  (HomeDto.HeroSlideDto)
CREATE TABLE hero_slide (
    id          VARCHAR(16)  NOT NULL COMMENT 'スライドID (例 h01)',
    tone        CHAR(1)      NULL,
    title       VARCHAR(255) NOT NULL COMMENT '見出し(改行\\n含む)',
    sub         VARCHAR(255) NULL COMMENT 'サブ文',
    price       INT          NULL,
    image_url   VARCHAR(255) NULL,
    sort_order  INT          NOT NULL DEFAULT 0,
    active      TINYINT(1)   NOT NULL DEFAULT 1,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='ヒーローカルーセル';

CREATE TABLE hero_slide_tag (
    hero_slide_id  VARCHAR(16) NOT NULL COMMENT '論理参照 hero_slide',
    tag            VARCHAR(10) NOT NULL,
    PRIMARY KEY (hero_slide_id, tag)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='ヒーロースライドのタグ';

-- promo  (HomeDto.PromoDto) サイドプロモバナー
CREATE TABLE promo (
    id          VARCHAR(16)  NOT NULL,
    tone        CHAR(1)      NULL,
    category    VARCHAR(40)  NULL COMMENT 'ラベル (CAMPAIGN 等)',
    title       VARCHAR(120) NOT NULL,
    url         VARCHAR(160) NULL,
    sort_order  INT          NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='プロモバナー';

-- news_ticker  (HomeDto.NewsTickerDto)
CREATE TABLE news_ticker (
    id          BIGINT       NOT NULL AUTO_INCREMENT,
    date_label  VARCHAR(10)  NOT NULL COMMENT '表示日付 (例 06/02)',
    message     VARCHAR(255) NOT NULL COMMENT 'NewsTickerDto.text。textはMySQL予約語のため改名',
    url         VARCHAR(160) NULL,
    sort_order  INT          NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='お知らせティッカー';

-- feature_banner  (HomeDto.FeatureBannerDto)
CREATE TABLE feature_banner (
    id          VARCHAR(16)  NOT NULL,
    tone        CHAR(1)      NULL,
    label       VARCHAR(40)  NULL COMMENT 'PICK UP 特集 等',
    title       VARCHAR(120) NOT NULL,
    link        VARCHAR(60)  NULL COMMENT 'リンク文言',
    url         VARCHAR(160) NULL,
    sort_order  INT          NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='特集バナー';

-- membership_cta  (HomeDto.MembershipCtaDto)
CREATE TABLE membership_cta (
    id          BIGINT       NOT NULL AUTO_INCREMENT,
    icon        VARCHAR(40)  NULL,
    title       VARCHAR(120) NOT NULL,
    body        VARCHAR(255) NULL,
    link        VARCHAR(60)  NULL,
    href        VARCHAR(160) NULL,
    sort_order  INT          NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='会員CTA';

-- sale_strip  (HomeDto.SaleStripDto のヘッダ部, 単一行)
CREATE TABLE sale_strip (
    id           TINYINT      NOT NULL DEFAULT 1,
    label        VARCHAR(40)  NOT NULL COMMENT 'CLEARANCE 等',
    title        VARCHAR(80)  NOT NULL,
    description  VARCHAR(160) NULL,
    PRIMARY KEY (id),
    CONSTRAINT chk_sale_strip_singleton CHECK (id = 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='SALEストリップ設定';

-- sale_strip_item  (SaleItemDto)
CREATE TABLE sale_strip_item (
    id              VARCHAR(16)  NOT NULL COMMENT 'SALE品ID (例 sl01)',
    name            VARCHAR(160) NOT NULL,
    price           INT          NOT NULL COMMENT 'セール価格',
    original_price  INT          NOT NULL COMMENT '元価格',
    tone            CHAR(1)      NULL,
    sort_order      INT          NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='SALEストリップ商品';

-- schedule_item  (HomeDto.ScheduleItemDto) 予約・抽選スケジュール
CREATE TABLE schedule_item (
    id            VARCHAR(24)  NOT NULL COMMENT 'スケジュールID (例 sch01)',
    date_label    VARCHAR(20)  NOT NULL COMMENT '予約開始/抽選受付/抽選結果',
    date_time     VARCHAR(40)  NOT NULL COMMENT '日時表示 (例 06/05 12:00)',
    tag_type      VARCHAR(10)  NULL COMMENT 'pre/lot',
    tone          CHAR(1)      NULL,
    product_id    VARCHAR(16)  NULL COMMENT '論理参照 product',
    product_name  VARCHAR(220) NOT NULL,
    series_name   VARCHAR(100) NULL,
    price         INT          NOT NULL,
    action        VARCHAR(40)  NULL COMMENT '予約する/応募する/結果を見る',
    action_type   VARCHAR(20)  NULL,
    sort_order    INT          NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    KEY idx_sched_product (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='予約・抽選スケジュール';

-- ---------------------------------------------------------------------
-- ranking_entry  (RankingItemDto)  タブ別キュレーションランキング
--   r001.. など product に存在しないキュレーション枠もあるため
--   product_id は論理参照とし、表示値はスナップショット保持。
-- ---------------------------------------------------------------------
CREATE TABLE ranking_entry (
    id          BIGINT       NOT NULL AUTO_INCREMENT,
    tab         ENUM('all','fig','kit','goods') NOT NULL,
    rank_no     INT          NOT NULL COMMENT '順位(1-)',
    product_id  VARCHAR(16)  NULL COMMENT '論理参照 product',
    series      VARCHAR(100) NULL,
    name        VARCHAR(160) NOT NULL,
    price       INT          NOT NULL,
    tone        CHAR(1)      NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uk_ranking_tab_rank (tab, rank_no)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='ランキング';
