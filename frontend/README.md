# AMADEUS フロントエンド

Vue 3 + Vite + Pinia + Vue Router 4 で構築したフィギュア・グッズ専門 EC ストアのフロントエンドです。

---

## セットアップ

```bash
# 依存パッケージのインストール
npm install

# 開発サーバー起動 (http://localhost:5173)
npm run dev

# プロダクションビルド (dist/ に出力)
npm run build

# ビルド成果物のプレビュー
npm run preview
```

---

## プロジェクト構成

```
frontend/
├── index.html                  # エントリー HTML (Noto Sans JP / Archivo フォント読み込み)
├── vite.config.js              # Vite 設定 (@エイリアス / API プロキシ)
├── src/
│   ├── main.js                 # アプリ初期化 (Vue + Pinia + Router)
│   ├── App.vue                 # ルートコンポーネント (<RouterView />)
│   ├── router/
│   │   └── index.js            # Vue Router 4 設定 + ナビゲーションガード
│   ├── stores/
│   │   ├── auth.js             # 認証状態 (user / isLoggedIn / init / login / register / logout)
│   │   ├── cart.js             # カート状態
│   │   ├── favorites.js        # お気に入り状態
│   │   └── ui.js               # UI 状態 (検索 / リストフィルター / ランキングタブ)
│   ├── api/
│   │   ├── http.js             # axios ベースクライアント (baseURL=/api)
│   │   ├── mock.js             # 全モックデータ定義
│   │   ├── auth.js             # 認証 API (login / register / logout / fetchMe)
│   │   ├── cart.js             # カート API
│   │   ├── categories.js       # カテゴリー API
│   │   ├── home.js             # ホーム集約 API
│   │   ├── products.js         # 商品 API (一覧 / ランキング / 新着 / 最近閲覧)
│   │   ├── series.js           # シリーズ API
│   │   └── user.js             # ユーザー API (注文 / 予約 / お気に入り / ポイント)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── DefaultLayout.vue   # 共通シェル (UtilBar + SiteHeader + MegaNav + SiteFooter)
│   │   │   ├── UtilBar.vue         # 上部ユーティリティバー (ポイント / ログイン状態)
│   │   │   ├── SiteHeader.vue      # ロゴ + 検索 + アイコンリンク
│   │   │   ├── MegaNav.vue         # スティッキーナビゲーション
│   │   │   └── SiteFooter.vue      # フッター
│   │   └── ui/
│   │       ├── ProductCard.vue     # 商品カード (grid / row バリアント)
│   │       ├── PriceBlock.vue      # 価格表示 (通常 / セール)
│   │       └── Tag.vue             # ステータスタグ (lim / pre / lot / new / re / sale / ship / point)
│   ├── views/
│   │   ├── HomeView.vue        # / トップページ (ヒーローカルーセル / ランキング / 新着 / etc.)
│   │   ├── ListView.vue        # /list 商品一覧 (サイドバーフィルター / グリッド↔リスト)
│   │   ├── LoginView.vue       # /login ログイン・会員登録
│   │   └── MyPageView.vue      # /mypage マイページ (要ログイン)
│   └── assets/
│       ├── tokens.css          # CSS カスタムプロパティ (色 / タイポ / スペーシング)
│       ├── base.css            # リセット + 共通コンポーネントスタイル
│       └── pages.css           # ページ固有スタイル (List / Auth / MyPage)
```

---

## API ベース URL と通信設定

- **ベース URL**: `/api`
- **プロキシ先 (開発時)**: `http://localhost:8000` (vite.config.js の `server.proxy`)
- **認証方式**: Cookie セッション + Bearer トークン (localStorage の `amadeus_token` を自動付与)

```
GET  /api/me              現在ユーザー情報
POST /api/auth/login      ログイン
POST /api/auth/register   会員登録
POST /api/auth/logout     ログアウト
GET  /api/home            ホームページ集約データ
GET  /api/products        商品一覧 (クエリパラメータでフィルター / ソート / ページング)
GET  /api/products/ranking        ランキング
GET  /api/products/new-arrivals   新着商品
GET  /api/products/recently-viewed 最近閲覧した商品
GET  /api/categories      カテゴリー一覧
GET  /api/series          シリーズ一覧
GET  /api/cart            カート取得
POST /api/cart/items      カートに追加
GET  /api/me/orders       注文履歴
GET  /api/me/reservations 予約・抽選一覧
GET  /api/me/favorites    お気に入り一覧
GET  /api/me/points       ポイント情報
```

---

## モックデータの仕組み

バックエンドが未稼働の場合、各 API 関数は自動的に `src/api/mock.js` のモックデータにフォールバックします。

| API 関数 | フォールバック | 備考 |
|---|---|---|
| `fetchMe` | `mockUser` (DEV のみ) | 本番では `null` を返しログアウト扱い |
| `login` / `register` | `mockUser` (DEV のみ) | 任意のメール・パスワードでログイン可 |
| `fetchHome` | `mockHomeData` | - |
| `fetchProducts` | `mockProductList` (ページング対応) | フィルター・ソートはモック時無視 |
| `fetchRanking` | `mockRanking[tab]` | - |
| `fetchCategories` | `mockCategories` | - |
| `fetchSeries` | `mockSeries` | - |
| `fetchCart` | `mockCart` | - |
| `addCartItem` / `updateCartItem` | `mockCart` (インメモリ更新) | ページリロードでリセット |
| `fetchOrders` | `mockOrders` | - |
| `fetchReservations` | `mockReservations` | - |
| `fetchUserFavorites` | `mockFavorites` | - |
| `fetchPoints` | ハードコード値 + `mockPointsHistory` | - |

> **注意**: `import.meta.env.DEV` が `true` の場合のみ (`npm run dev` 実行時) に認証系のモックフォールバックが有効です。`npm run build` でビルドした本番バンドルでは、バックエンド未稼働時にログイン・登録がエラーになります。

---

## ルーティングとガード

| パス | ページ | ガード |
|---|---|---|
| `/` | HomeView | なし |
| `/list` | ListView | なし |
| `/login` | LoginView | `guestOnly`: ログイン済みなら `/mypage` へリダイレクト |
| `/mypage` | MyPageView | `requiresAuth`: 未ログインなら `/login?redirect=/mypage` へリダイレクト |

DEV 環境では `fetchMe` がモックユーザーを返すため、常にログイン状態として扱われます。ログイン画面を確認したい場合は `src/api/mock.js` の `mockUser` を `null` にするか、`src/api/auth.js` の `fetchMe` 内のフォールバック行を一時的にコメントアウトしてください。
