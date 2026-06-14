# AMADEUS Store — Backend

Spring Boot 3.x バックエンド / アニメグッズ EC サイト

## 前提条件

| ツール | バージョン |
|---|---|
| Java | 21 (JDK 21) |
| Maven | 3.9+ |
| Docker / Docker Compose | 任意 (Redis 起動に使用) |

## 起動手順

### 1. Redis を起動

```bash
docker-compose up -d redis
```

Redis が `localhost:6379` で起動します。

### 2. アプリ起動

```bash
JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-21.jdk/Contents/Home \
mvn spring-boot:run
```

または JAR で直接起動:

```bash
JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-21.jdk/Contents/Home \
mvn -DskipTests package
java -jar target/store-1.0.0-SNAPSHOT.jar
```

### 3. API ベース URL

```
http://localhost:8080/api
```

---

## Redis の使い所

| 目的 | キー形式 | TTL |
|---|---|---|
| セッション管理 | `session:{sid}` | 30日 (rememberMe時 90日) |
| カート | `cart:{userId}` | 無期限 (永続) |
| 最近チェックした商品 | `recent:{userId}` | 無期限 (最大8件) |
| ホーム集約キャッシュ | `home::aggregate` | 5分 (@Cacheable) |
| ランキングキャッシュ | `ranking::{tab}` | 10分 (@Cacheable) |
| シリーズキャッシュ | `series::all` | 30分 (@Cacheable) |
| カテゴリキャッシュ | `categories::all` | 30分 (@Cacheable) |

---

## デモユーザー

| 項目 | 値 |
|---|---|
| メール | `amano@example.com` |
| パスワード | `password123` |
| ランク | GOLD |
| ポイント | 1,240 pt |

---

## サンプル curl

### ホーム集約取得

```bash
curl -s http://localhost:8080/api/home | jq '.newArrivals | length'
```

### ログイン (Cookie セッション + JWT)

```bash
curl -s -c cookies.txt -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"amano@example.com","password":"password123","rememberMe":false}' | jq .
```

### 認証済みユーザー情報

```bash
curl -s -b cookies.txt http://localhost:8080/api/me | jq .
```

### JWT Bearer トークンで認証

```bash
TOKEN=$(curl -s -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"amano@example.com","password":"password123","rememberMe":false}' \
  | jq -r '.token')

curl -s -H "Authorization: Bearer $TOKEN" http://localhost:8080/api/me | jq .
```

### 商品一覧 (フィルタ)

```bash
curl -s "http://localhost:8080/api/products?category=figure&sort=price_asc&page=1&size=5" | jq '{total:.total,items:.items|length}'
```

### ランキング

```bash
curl -s "http://localhost:8080/api/products/ranking?tab=fig" | jq '.[].name'
```

### カート取得

```bash
curl -s -b cookies.txt http://localhost:8080/api/cart | jq .
```

### カートに商品追加

```bash
curl -s -b cookies.txt -X POST http://localhost:8080/api/cart/items \
  -H "Content-Type: application/json" \
  -d '{"productId":"p001","qty":1}' | jq .
```

### お気に入り追加

```bash
curl -s -b cookies.txt -X POST http://localhost:8080/api/me/favorites/p001 | jq .
```

### ログアウト

```bash
curl -s -b cookies.txt -c cookies.txt -X POST http://localhost:8080/api/auth/logout
```

---

## ヘルスチェック

```bash
curl http://localhost:8080/actuator/health
```

---

## プロジェクト構成

```
src/main/java/com/amadeus/store/
├── AmadeusStoreApplication.java
├── config/
│   ├── AppProperties.java      # application.yml バインディング
│   ├── CorsConfig.java         # CORS (localhost:5173 許可)
│   ├── RedisConfig.java        # RedisTemplate / CacheManager
│   └── SecurityConfig.java     # Spring Security
├── controller/
│   ├── AuthController.java     # POST /api/auth/*
│   ├── CartController.java     # /api/cart/**
│   ├── CategoryController.java # GET /api/categories
│   ├── HomeController.java     # GET /api/home
│   ├── MeController.java       # /api/me/**
│   ├── ProductController.java  # /api/products/**
│   └── SeriesController.java   # GET /api/series
├── dto/                        # Java records (API契約に準拠)
├── exception/
│   ├── ApiException.java
│   └── GlobalExceptionHandler.java
├── security/
│   ├── JwtAuthFilter.java      # Bearer token フィルター
│   ├── JwtService.java         # JWT 生成・検証
│   └── SessionAuthFilter.java  # Cookie session フィルター
├── seed/
│   └── SeedDataStore.java      # mock.js/store-data.js の実値
└── service/
    ├── impl/                   # Service 実装
    └── *.java                  # Service インターフェース
```
