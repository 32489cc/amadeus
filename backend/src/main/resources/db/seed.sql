-- =====================================================================
-- AMADEUS Store — MySQL 初期データ (seed)
-- SeedDataStore.java / mock.js / store-data.js / pages-data.js と同一値
-- 実行前に schema.sql を適用しておくこと。
-- パスワードは BCrypt("password123") 例 — 実運用では再生成すること。
-- =====================================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE ranking_entry;
TRUNCATE TABLE schedule_item;
TRUNCATE TABLE sale_strip_item;
TRUNCATE TABLE sale_strip;
TRUNCATE TABLE membership_cta;
TRUNCATE TABLE feature_banner;
TRUNCATE TABLE news_ticker;
TRUNCATE TABLE promo;
TRUNCATE TABLE hero_slide_tag;
TRUNCATE TABLE hero_slide;
TRUNCATE TABLE recently_viewed;
TRUNCATE TABLE point_expiring;
TRUNCATE TABLE point_history;
TRUNCATE TABLE reservation;
TRUNCATE TABLE order_item;
TRUNCATE TABLE orders;
TRUNCATE TABLE cart_item;
TRUNCATE TABLE favorite;
TRUNCATE TABLE address;
TRUNCATE TABLE app_user;
TRUNCATE TABLE product_tag;
TRUNCATE TABLE product_image;
TRUNCATE TABLE product;
TRUNCATE TABLE category;
TRUNCATE TABLE series;



SET FOREIGN_KEY_CHECKS = 1;

-- ---------------------------------------------------------------------
-- series
-- ---------------------------------------------------------------------
INSERT INTO series (id, name, item_count, hero_image, tone) VALUES
('s01','蒼天のレガリア',128,NULL,'a'),
('s02','星詠みの少女',86,NULL,'b'),
('s03','黎明の騎士団',204,NULL,'c'),
('s04','深淵のメロディア',73,NULL,'d'),
('s05','紅蓮の継承者',152,NULL,'e'),
('s06','白銀のフロンティア',61,NULL,'f'),
('s07','蒼穹のアステリア',94,NULL,'c'),
('s08','月詠のカノン',47,NULL,'a'),
('s09','焔のヴァルキリー',118,NULL,'b'),
('s10','霧野のレゾン',52,NULL,'e'),
('s11','天空のエクリプス',76,NULL,'d'),
('s12','深紅のサーガ',133,NULL,'f');

-- ---------------------------------------------------------------------
-- category
-- ---------------------------------------------------------------------
INSERT INTO category (id, name, slug, parent_id, product_count, tone, sort_order) VALUES
-- 主カテゴリ（parent_id = NULL）
('cat01','フィギュア','figure',NULL,1248,'a',1),
('cat02','プラモデル','plamodel',NULL,892,'b',2),
('cat03','おもちゃ・キャラクター玩具','toy',NULL,634,'c',3),
('cat04','ゲーム','game',NULL,210,'d',4),
('cat05','カード','card',NULL,455,'e',5),
('cat06','ファッション・アクセサリー','fashion',NULL,978,'f',6),
('cat07','日用品・ステーショナリー','daily',NULL,720,'a',7),
('cat08','インテリア・キッチン','interior',NULL,389,'b',8),
('cat09','食品・飲料','food',NULL,256,'c',9),
('cat10','映像・本・書籍','media',NULL,142,'d',10),
-- フィギュア の子カテゴリ
('cat0101','アクションフィギュア・可動フィギュア','action-figure','cat01',420,'a',1),
('cat0102','固定フィギュア・固定ポーズフィギュア','scale-figure','cat01',512,'a',2),
('cat0103','デフォルメフィギュア','deformed-figure','cat01',188,'a',3),
('cat0104','アクリルロゴ・アクリルスタンド','acrylic-stand','cat01',96,'a',4),
('cat0105','その他（フィギュア）','figure-other','cat01',32,'a',5),
-- プラモデル の子カテゴリ
('cat0201','ガンプラ（ガンダムプラモデル）','gunpla','cat02',430,'b',1),
('cat0202','キャラクタープラモデル','character-plamodel','cat02',312,'b',2),
('cat0203','プラキット・食玩プラキット','plakit','cat02',150,'b',3),
-- おもちゃ・キャラクター玩具 の子カテゴリ
('cat0301','玩具総合','toy-general','cat03',180,'c',1),
('cat0302','変身・なりきり','henshin','cat03',120,'c',2),
('cat0303','変形・合体ロボット・ソフビ','robot-sofvi','cat03',164,'c',3),
('cat0304','マスコット・ドール','mascot-doll','cat03',98,'c',4),
('cat0305','バッジ','badge','cat03',72,'c',5),
-- ゲーム の子カテゴリ
('cat0401','ゲームソフト','game-software','cat04',130,'d',1),
('cat0402','パーティーゲーム・パズル','party-game','cat04',80,'d',2),
-- カード の子カテゴリ
('cat0501','トレカ（トレーディングカードゲーム）','tcg','cat05',260,'e',1),
('cat0502','コレクションカード','collection-card','cat05',120,'e',2),
('cat0503','カードゲーム','card-game','cat05',75,'e',3),
-- ファッション・アクセサリー の子カテゴリ
('cat0601','メンズファッション','mens-fashion','cat06',140,'f',1),
('cat0602','レディースファッション','ladies-fashion','cat06',160,'f',2),
('cat0603','キッズ・ベビーファッション','kids-fashion','cat06',90,'f',3),
('cat0604','ファッション小物・雑貨','fashion-goods','cat06',210,'f',4),
('cat0605','コスチューム','costume','cat06',64,'f',5),
('cat0606','アクセサリー','accessory','cat06',180,'f',6),
('cat0607','バッグ・鞄','bag','cat06',88,'f',7),
('cat0608','財布','wallet','cat06',46,'f',8),
('cat0609','タオル・ハンカチ','towel','cat06',10,'f',9),
-- 日用品・ステーショナリー の子カテゴリ
('cat0701','生活用品・生活雑貨','living','cat07',150,'a',1),
('cat0702','ステーショナリー・文具・文房具','stationery','cat07',220,'a',2),
('cat0703','クッション・ぬいぐるみ','plush','cat07',130,'a',3),
('cat0704','シール・ステッカー','sticker','cat07',110,'a',4),
('cat0705','チャーム・キーホルダー','charm','cat07',95,'a',5),
('cat0706','その他（日用品・ステーショナリー）','daily-other','cat07',15,'a',6),
-- インテリア・キッチン の子カテゴリ
('cat0801','インテリア・オブジェ','interior-object','cat08',239,'b',1),
('cat0802','キッチン・食器','kitchen','cat08',150,'b',2),
-- 食品・飲料 の子カテゴリ
('cat0901','食玩・おもちゃ付きお菓子','shokugan','cat09',120,'c',1),
('cat0902','お菓子（ウエハース）','wafer','cat09',60,'c',2),
('cat0903','お菓子（チョコレート・和菓子など）','sweets','cat09',50,'c',3),
('cat0904','ケーキ・キャラクターケーキ','cake','cat09',26,'c',4),
-- 映像・本・書籍 の子カテゴリ
('cat1001','Blu-ray・DVD','bluray-dvd','cat10',90,'d',1),
('cat1002','雑誌・書籍','book','cat10',52,'d',2);

-- ---------------------------------------------------------------------
-- product  (新着 p001-p010 + 一覧 p101-p120)
-- ---------------------------------------------------------------------
INSERT INTO product (id, series_id, category_id, name, scale, price, sale_price, status, free_shipping, point_rate, tone) VALUES
-- 新着 p001-p010（各カテゴリを横断）
('p001','s01','cat01','アルマ・ヴェント 1/7 スケールフィギュア','1/7',23100,NULL,'in_stock',1,10,'a'),
('p002','s02','cat01','ノクス・ステラ デフォルメフィギュア',NULL,4400,NULL,'preorder',1,10,'b'),
('p003','s03','cat02','騎士団長レガート キャラクタープラモデル 1/100','1/100',8800,NULL,'in_stock',1,10,'e'),
('p004','s04','cat01','セレネ・ルーチェ 1/8 スケールフィギュア','1/8',19800,NULL,'in_stock',1,10,'c'),
('p005','s05','cat06','イグニス・コル キャラクターTシャツ L',NULL,4290,NULL,'in_stock',1,10,'d'),
('p006','s06','cat01','フロスト・ベル 1/7 スケールフィギュア','1/7',21450,NULL,'in_stock',1,10,'f'),
('p007','s08','cat08','ルナ・メロウ B2タペストリー',NULL,4180,NULL,'in_stock',1,10,'a'),
('p008','s09','cat01','ブリュンヒルデ 1/6 大型フィギュア','1/6',38500,NULL,'preorder',1,10,'e'),
('p009','s10','cat03','ミスト・エコー 缶バッジコレクション 全12種',NULL,3960,NULL,'in_stock',1,10,'b'),
('p010','s11','cat02','ソル・アンブラ HGプラモデル 1/144','1/144',3300,NULL,'in_stock',1,10,'c'),
-- 一覧 p101-p120（10カテゴリを満遍なく）
('p101','s01','cat01','アルマ・ヴェント 1/7 スケールフィギュア','1/7',23100,NULL,'in_stock',1,10,'a'),
('p102','s12','cat02','クリムゾン・ランス MGプラモデル 1/100','1/100',6600,NULL,'in_stock',1,10,'d'),
('p103','s07','cat02','アステル・ウィング RGプラモデル 1/144','1/144',4400,NULL,'preorder',1,10,'b'),
('p104','s06','cat03','スノウ・ベア ソフビフィギュア',NULL,2980,NULL,'in_stock',1,10,'f'),
('p105','s03','cat03','レガート 変身なりきり ソードレプリカ',NULL,6600,NULL,'in_stock',1,10,'e'),
('p106','s08','cat03','ルナ・メロウ マスコットドール',NULL,3300,NULL,'in_stock',1,10,'a'),
('p107','s01','cat04','蒼天のレガリア 公式ボードゲーム',NULL,5500,NULL,'in_stock',1,10,'a'),
('p108','s07','cat01','アステル・ウィング 1/8 スケールフィギュア','1/8',16500,13200,'in_stock',1,10,'b'),
('p109','s05','cat04','紅蓮の継承者 ジグソーパズル 1000ピース',NULL,3300,NULL,'sold_out',1,10,'d'),
('p110','s02','cat05','星詠みの少女 トレーディングカード BOX',NULL,4400,NULL,'in_stock',1,10,'b'),
('p111','s04','cat05','深淵のメロディア コレクションカード 全30種',NULL,880,NULL,'in_stock',0,10,'c'),
('p112','s09','cat05','焔のヴァルキリー メタルカード 限定版',NULL,1650,NULL,'preorder',0,10,'e'),
('p113','s08','cat06','ルナ・メロウ トートバッグ',NULL,3300,2310,'in_stock',1,10,'a'),
('p114','s05','cat06','イグニス・コル アクセサリーネックレス',NULL,5500,NULL,'in_stock',1,10,'d'),
('p115','s05','cat07','紅蓮の継承者 クリアファイルセット 全4種',NULL,1100,NULL,'in_stock',0,10,'c'),
('p116','s10','cat07','ミスト・エコー ぬいぐるみ',NULL,3850,NULL,'in_stock',1,10,'b'),
('p117','s01','cat07','蒼天のレガリア アクリルキーホルダー 全8種',NULL,770,NULL,'in_stock',0,10,'f'),
('p118','s04','cat08','セレネ・ルーチェ キャラクターマグカップ',NULL,1980,NULL,'in_stock',0,10,'c'),
('p119','s06','cat09','白銀のフロンティア キャラクタークッキー缶',NULL,2160,NULL,'in_stock',1,10,'d'),
('p120','s03','cat10','黎明の騎士団 公式設定資料集',NULL,6380,NULL,'in_stock',1,10,'e');

-- product_tag
INSERT INTO product_tag (product_id, tag) VALUES
('p001','lim'),('p001','new'),
('p002','pre'),
('p003','new'),
('p004','re'),
('p005','new'),
('p006','lim'),
('p007','new'),
('p008','lim'),('p008','pre'),
('p009','new'),
('p010','re'),
('p101','lim'),
('p103','pre'),
('p105','new'),
('p107','new'),
('p108','sale'),
('p110','new'),
('p112','lim'),('p112','pre'),
('p113','sale'),
('p116','new'),
('p119','new');

-- ---------------------------------------------------------------------
-- app_user  (password = BCrypt("password123"))
-- ---------------------------------------------------------------------
INSERT INTO app_user (id, name, email, password, member_rank, point_balance, point_rate, newsletter, phone) VALUES
('u001','天野 奏','amano@example.com','$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy','GOLD',1240,10,1,'09012345678');

-- ---------------------------------------------------------------------
-- address
-- ---------------------------------------------------------------------
INSERT INTO address (id, user_id, name, zip, prefecture, city, address1, address2, phone, is_default) VALUES
('addr01','u001','天野 奏','150-0001','東京都','渋谷区','神宮前1-2-3','AMビル 301','03-1234-5678',1);

-- ---------------------------------------------------------------------
-- favorite  (FavoriteDto: p006,p008,p007,p108)
-- ---------------------------------------------------------------------
INSERT INTO favorite (user_id, product_id) VALUES
('u001','p006'),
('u001','p008'),
('u001','p007'),
('u001','p108');

-- ---------------------------------------------------------------------
-- cart_item  (DEMO_CART, total=62700 はアプリで算出)
-- ---------------------------------------------------------------------
INSERT INTO cart_item (id, user_id, product_id, qty, unit_price) VALUES
('ci001','u001','p001',1,23100),
('ci002','u001','p004',2,19800);

-- ---------------------------------------------------------------------
-- orders + order_item
-- ---------------------------------------------------------------------
INSERT INTO orders (id, user_id, ordered_at, status, total, shipping_address_id) VALUES
('AMD-20260531-0412','u001','2026-05-31 14:22:00','shipping',23100,'addr01'),
('AMD-20260528-0388','u001','2026-05-28 09:05:00','preparing',22000,'addr01');

INSERT INTO order_item (order_id, product_id, name, series, qty, price, tone) VALUES
('AMD-20260531-0412','p001','アルマ・ヴェント 1/7 スケールフィギュア','蒼天のレガリア',1,23100,'a'),
('AMD-20260528-0388','p004','セレネ・ルーチェ 1/8 スケールフィギュア ほか1点','深淵のメロディア',2,22000,'c');

-- ---------------------------------------------------------------------
-- reservation
-- ---------------------------------------------------------------------
INSERT INTO reservation (id, user_id, type, status, ship_eta, result_date, product_id, product_name, series_name, price, tone, charge_timing) VALUES
('AMD-PRE-0091','u001','preorder','confirmed','2026-09',NULL,'p002','ノクス・ステラ ねんどモデル','星詠みの少女',8800,'b','ship'),
('AMD-LOT-0233','u001','lottery','entered',NULL,'2026-06-08','p003','騎士団長レガート プレミアムプラモデル','黎明の騎士団',14300,'e','win');

-- ---------------------------------------------------------------------
-- point_history / point_expiring
-- ---------------------------------------------------------------------
INSERT INTO point_history (user_id, happened_on, label, change_amount, balance_after) VALUES
('u001','2026-05-31','注文 #AMD-20260531-0412',2310,1240),
('u001','2026-05-28','注文 #AMD-20260528-0388',2200,-1070),
('u001','2026-05-01','新規会員登録ボーナス',500,500);

INSERT INTO point_expiring (user_id, amount, expires_at) VALUES
('u001',240,'2026-06-30');

-- ---------------------------------------------------------------------
-- recently_viewed  (store-data.js rec[] 相当, 商品テーブルに存在するもの)
-- ---------------------------------------------------------------------
INSERT INTO recently_viewed (user_id, product_id, viewed_at) VALUES
('u001','p001','2026-06-07 10:00:00'),
('u001','p002','2026-06-07 09:50:00'),
('u001','p003','2026-06-07 09:40:00'),
('u001','p004','2026-06-07 09:30:00'),
('u001','p005','2026-06-07 09:20:00'),
('u001','p006','2026-06-07 09:10:00'),
('u001','p007','2026-06-07 09:00:00'),
('u001','p009','2026-06-07 08:50:00');

-- =====================================================================
-- ホーム CMS コンテンツ
-- =====================================================================

-- hero_slide
INSERT INTO hero_slide (id, tone, title, sub, price, image_url, sort_order, active) VALUES
('h01','a','蒼天のレガリア｜アルマ・ヴェント\n1/7 スケールフィギュア 受注生産','原型師監修・完全限定モデル。受付は今月末まで。',23100,NULL,1,1),
('h02','b','星詠みの少女｜ノクス・ステラ\nねんどモデル 予約受付開始','2026年9月発売予定。数量限定にて予約承り中。',8800,NULL,2,1),
('h03','e','黎明の騎士団｜騎士団長レガート\nプレミアムプラモデル 抽選販売','応募多数につき抽選販売。応募締切 6/30 23:59。',14300,NULL,3,1);

INSERT INTO hero_slide_tag (hero_slide_id, tag) VALUES
('h01','lim'),('h01','ship'),
('h02','pre'),('h02','point'),
('h03','lot');

-- promo
INSERT INTO promo (id, tone, category, title, url, sort_order) VALUES
('pr01','c','CAMPAIGN','新規会員\n500ptプレゼント','/login',1),
('pr02','d','予約・抽選','今月の\n受付スケジュール','/list?tab=schedule',2);

-- news_ticker
INSERT INTO news_ticker (date_label, message, url, sort_order) VALUES
('06/02','「深淵のメロディア」新作フィギュアの予約を開始しました','#',1),
('06/01','夏のクリアランスセール 最大50%OFF 開催中','#',2),
('05/30','システムメンテナンスのお知らせ（6/5 2:00-4:00）','#',3);

-- feature_banner
INSERT INTO feature_banner (id, tone, label, title, link, url, sort_order) VALUES
('fb01','e','PICK UP 特集','夏の新作\nフィギュアフェア','特集を見る →','#',1),
('fb02','b','予約・抽選','プレミアム\n受注生産品','受付中の一覧 →','#',2),
('fb03','a','作品コラボ','紅蓮の継承者\n10周年グッズ','コラボページ →','#',3);

-- membership_cta
INSERT INTO membership_cta (icon, title, body, link, href, sort_order) VALUES
('user','会員登録で500pt','新規ご登録でお買い物に使える500ポイントをプレゼント。','今すぐ登録 →','/login',1),
('star','会員ランク特典','購入額に応じてポイント還元率アップ。最大10%還元。','特典を見る →','/mypage',2),
('wallet','抽選・予約の管理','応募状況や当選結果、予約商品をマイページから確認。','マイページへ →','/mypage',3);

-- sale_strip + items
INSERT INTO sale_strip (id, label, title, description) VALUES
(1,'CLEARANCE','夏のセール','最大50%OFF ／ 〜6/15');

INSERT INTO sale_strip_item (id, name, price, original_price, tone, sort_order) VALUES
('sl01','フロスト・ベル アクリルスタンド',1540,2200,'a',1),
('sl02','紅蓮の継承者 クリアファイルセット',660,1100,'c',2),
('sl03','月詠のカノン トートバッグ',2310,3300,'e',3),
('sl04','霧野のレゾン 缶バッジ 全8種',1760,2640,'b',4);

-- schedule_item
INSERT INTO schedule_item (id, date_label, date_time, tag_type, tone, product_id, product_name, series_name, price, action, action_type, sort_order) VALUES
('sch01','予約開始','06/05 12:00','pre','a','p004','セレネ・ルーチェ 1/8 スケール','深淵のメロディア',19800,'予約する','pre',1),
('sch02','抽選受付','〜06/30 23:59','lot','e','p003','騎士団長レガート プレミアムプラモデル','黎明の騎士団',14300,'応募する','lot',2),
('sch03','予約開始','06/10 18:00','pre','b','p002','ノクス・ステラ ねんどモデル','星詠みの少女',8800,'予約する','pre',3),
('sch04','抽選結果','06/08 発表','lot','d',NULL,'アルマ・ヴェント 1/7 限定カラー','蒼天のレガリア',25300,'結果を見る','lot',4);

-- ranking_entry  (r001-r005 はキュレーション枠で product 不在 → product_id NULL)
INSERT INTO ranking_entry (tab, rank_no, product_id, series, name, price, tone) VALUES
('all',1,'p001','蒼天のレガリア','アルマ・ヴェント 1/7 スケール',23100,'a'),
('all',2,'p003','黎明の騎士団','騎士団長レガート プラモデル',14300,'e'),
('all',3,'p004','深淵のメロディア','セレネ・ルーチェ 1/8 スケール',19800,'c'),
('all',4,'p002','星詠みの少女','ノクス・ステラ ねんどモデル',8800,'b'),
('all',5,'p005','紅蓮の継承者','イグニス・コル アクリルスタンド',1320,'d'),
('fig',1,'p001','蒼天のレガリア','アルマ・ヴェント 1/7 スケール',23100,'a'),
('fig',2,'p008','焔のヴァルキリー','ブリュンヒルデ 1/6 大型フィギュア',38500,'e'),
('fig',3,'p004','深淵のメロディア','セレネ・ルーチェ 1/8 スケール',19800,'c'),
('fig',4,'p006','白銀のフロンティア','フロスト・ベル 1/7 スケール',21450,'f'),
('fig',5,'p002','星詠みの少女','ノクス・ステラ ねんどモデル',8800,'b'),
('kit',1,'p003','黎明の騎士団','騎士団長レガート プラモデル 1/100',14300,'e'),
('kit',2,'p010','天空のエクリプス','ソル・アンブラ HG 1/144',3300,'c'),
('kit',3,'r001','深紅のサーガ','クリムゾン・ランス MG 1/100',6600,'b'),
('kit',4,'r002','蒼穹のアステリア','アステル・ウィング RG 1/144',4400,'a'),
('kit',5,'r003','白銀のフロンティア','スノウ・ベア SD',1980,'f'),
('goods',1,'p005','紅蓮の継承者','イグニス・コル アクリルスタンド',1320,'d'),
('goods',2,'p007','月詠のカノン','ルナ・メロウ タペストリー B2',4180,'a'),
('goods',3,'p009','霧野のレゾン','ミスト・エコー 缶バッジ 全12種',3960,'b'),
('goods',4,'r004','月詠のカノン','ルナ・メロウ トートバッグ',3300,'e'),
('goods',5,'r005','紅蓮の継承者','クリアファイルセット 全4種',1100,'c');
