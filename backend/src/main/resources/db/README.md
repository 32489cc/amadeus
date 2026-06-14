# AMADEUS Store — MySQL データベース設計

後端 DTO (`com.amadeus.store.dto.*`) と `SeedDataStore` に基づく MySQL 8 スキーマ。

## ファイル
| ファイル | 内容 |
|---|---|
| `schema.sql` | DDL（テーブル定義・制約・インデックス）。再実行可能（先頭で DROP）。|
| `seed.sql`   | 初期データ。`SeedDataStore` と同一値。先頭で TRUNCATE。|

## 適用方法
```bash
# DB 作成
mysql -uroot -p -e "CREATE DATABASE amadeus CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
# スキーマ → seed
mysql -uroot -p amadeus < schema.sql
mysql -uroot -p amadeus < seed.sql
```

## テーブル一覧（25）
**コマース基盤（正規化）**
- `series` — 作品シリーズ
- `category` — カテゴリ（`parent_id` 自己参照ツリー）
- `product` / `product_image` / `product_tag` — 商品（画像・タグは子テーブル）
- `app_user` — 会員（`order` 同様 `user` も予約語回避で `app_user`）
- `address` — お届け先住所
- `favorite` — お気に入り（user×product）
- `cart_item` — カート明細 ※実行時 Redis、永続化用
- `orders` / `order_item` — 注文（明細は履歴のためスナップショット列）
- `reservation` — 予約・抽選
- `point_history` / `point_expiring` — ポイント履歴・失効予定
- `recently_viewed` — 最近チェックした商品 ※実行時 Redis、永続化用

**ホーム CMS コンテンツ（HomeDto）**
- `hero_slide` / `hero_slide_tag`、`promo`、`news_ticker`、`feature_banner`、
  `membership_cta`、`sale_strip` / `sale_strip_item`、`schedule_item`、`ranking_entry`

## DTO → テーブル 対応
| DTO | テーブル | 備考 |
|---|---|---|
| `ProductDto` | `product` (+`product_image`,`product_tag`) | `images`/`tags` の List は子テーブルへ正規化 |
| `SeriesDto` | `series` | |
| `CategoryDto` | `category` | `children` は `parent_id` で表現 |
| `UserDto` / `RegisterRequest` | `app_user` (+`point_expiring`) | `orderCount`/`favoriteCount` は集計で導出 |
| `AddressDto` | `address` | |
| `FavoriteDto` | `favorite` ⋈ `product` | 表示値は商品JOINで生成（重複保持しない）|
| `CartDto.CartItemDto` | `cart_item` | `total` は `SUM(unit_price*qty)` |
| `OrderDto` / `OrderItemDto` | `orders` / `order_item` | `statusLabel` はアプリ導出。明細はスナップショット |
| `ReservationDto` | `reservation` | `statusLabel` はアプリ導出 |
| `PointsDto` | `point_history` + `point_expiring` + `app_user` | `rankInfo` は会員ランクから導出 |
| `RankingItemDto` | `ranking_entry` | タブ別キュレーション。`r001..` は商品不在のためスナップショット |
| `SaleItemDto` | `sale_strip_item` | |
| `RecentlyViewedDto` | `recently_viewed` ⋈ `product` | |
| `HomeDto.*` | `hero_slide`/`promo`/`news_ticker`/`feature_banner`/`membership_cta`/`sale_strip`(_item)/`schedule_item` | ホーム集約は各テーブルから組立 |

## 設計上の判断
- **主キーは業務IDの VARCHAR**（`p001`/`s01`/`u001`/`AMD-...`）。DTO・フロント・既存 seed と共有される安定キーのため。代理キー(BIGINT)へ移行する場合は各IDを `code UNIQUE` 列に移し FK を張り替える。
- **スナップショット列**：`order_item`・`reservation`・`ranking_entry`・`sale_strip_item` は表示時点の name/series/price を保持。商品の価格改定・削除に履歴/掲載が影響されない。
- **List 型の正規化**：`product.images`/`product.tags` は子テーブル化。タグは `ENUM('lim','pre','lot','new','re','sale','ship','point')`。
- **Redis との関係**：`cart_item`・`recently_viewed` は実行時 Redis（`cart:{userId}` / `recent:{userId}`）で処理。RDBテーブルは永続化・分析・障害復旧用の任意領域。session/token は Redis 管理のため RDB なし。
- **集計の非正規化回避**：`UserDto.orderCount/favoriteCount`、`SeriesDto.itemCount`、`CategoryDto.count` は本来 COUNT で導出可能。`series.item_count`/`category.product_count` は表示用途で値を保持（バッチ更新前提）。

## Spring Boot への組み込み（任意）
現状の後端はインメモリ seed + Redis 構成。MySQL を有効化する場合：

1. `pom.xml` に依存追加
   ```xml
   <dependency>
     <groupId>org.springframework.boot</groupId>
     <artifactId>spring-boot-starter-data-jpa</artifactId>
   </dependency>
   <dependency>
     <groupId>com.mysql</groupId>
     <artifactId>mysql-connector-j</artifactId>
     <scope>runtime</scope>
   </dependency>
   ```
2. `application.yml` に追記
   ```yaml
   spring:
     datasource:
       url: jdbc:mysql://${DB_HOST:localhost}:3306/amadeus?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Tokyo
       username: ${DB_USER:root}
       password: ${DB_PASSWORD:}
     jpa:
       hibernate:
         ddl-auto: validate   # スキーマは schema.sql 管理。Flyway 併用を推奨
       properties:
         hibernate.dialect: org.hibernate.dialect.MySQLDialect
     sql:
       init:
         mode: never          # 手動 or Flyway 適用。自動投入する場合は always
   ```
3. `SeedDataStore` の各レコードに対応する JPA エンティティ／リポジトリを作成し、
   サービス層のデータ源をインメモリから DB へ差し替える。
   スキーマ進化は **Flyway**（`db/migration/V1__schema.sql`,`V2__seed.sql`）での管理を推奨。
