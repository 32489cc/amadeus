/**
 * AMADEUS Mock Data
 * Ported from design_handoff_amadeus_store/store-data.js and pages-data.js
 * Backend seed candidates — use real values from these.
 */

// ---- Utility ----
export function yen(n) {
  return n.toLocaleString('ja-JP')
}

// ---- Products: New Arrivals ----
export const mockNewArrivals = [
  { id: 'p001', series: '蒼天のレガリア',   category: 'cat01', name: 'アルマ・ヴェント 1/7 スケールフィギュア',      price: 23100, tags: ['lim', 'new'], tone: 'a', freeShipping: true, pointRate: 10 },
  { id: 'p002', series: '星詠みの少女',     category: 'cat01', name: 'ノクス・ステラ デフォルメフィギュア',          price: 4400,  tags: ['pre'],        tone: 'b', freeShipping: true, pointRate: 10 },
  { id: 'p003', series: '黎明の騎士団',     category: 'cat02', name: '騎士団長レガート キャラクタープラモデル 1/100', price: 8800,  tags: ['new'],        tone: 'e', freeShipping: true, pointRate: 10 },
  { id: 'p004', series: '深淵のメロディア', category: 'cat01', name: 'セレネ・ルーチェ 1/8 スケールフィギュア',      price: 19800, tags: ['re'],         tone: 'c', freeShipping: true, pointRate: 10 },
  { id: 'p005', series: '紅蓮の継承者',     category: 'cat06', name: 'イグニス・コル キャラクターTシャツ L',        price: 4290,  tags: ['new'],        tone: 'd', freeShipping: true, pointRate: 10 },
  { id: 'p006', series: '白銀のフロンティア', category: 'cat01', name: 'フロスト・ベル 1/7 スケールフィギュア',       price: 21450, tags: ['lim'],        tone: 'f', freeShipping: true, pointRate: 10 },
  { id: 'p007', series: '月詠のカノン',     category: 'cat08', name: 'ルナ・メロウ B2タペストリー',                 price: 4180,  tags: ['new'],        tone: 'a', freeShipping: true, pointRate: 10 },
  { id: 'p008', series: '焔のヴァルキリー', category: 'cat01', name: 'ブリュンヒルデ 1/6 大型フィギュア',            price: 38500, tags: ['lim', 'pre'], tone: 'e', freeShipping: true, pointRate: 10 },
  { id: 'p009', series: '霧野のレゾン',     category: 'cat03', name: 'ミスト・エコー 缶バッジコレクション 全12種',    price: 3960,  tags: ['new'],        tone: 'b', freeShipping: true, pointRate: 10 },
  { id: 'p010', series: '天空のエクリプス', category: 'cat02', name: 'ソル・アンブラ HGプラモデル 1/144',           price: 3300,  tags: ['re'],         tone: 'c', freeShipping: true, pointRate: 10 },
]

// ---- Ranking data ----
export const mockRanking = {
  all: [
    { id: 'p001', series: '蒼天のレガリア',  name: 'アルマ・ヴェント 1/7 スケール',       price: 23100, tone: 'a' },
    { id: 'p008', series: '焔のヴァルキリー', name: 'ブリュンヒルデ 1/6 大型フィギュア',    price: 38500, tone: 'e' },
    { id: 'p004', series: '深淵のメロディア', name: 'セレネ・ルーチェ 1/8 スケール',       price: 19800, tone: 'c' },
    { id: 'p003', series: '黎明の騎士団',    name: '騎士団長レガート プラモデル',          price: 8800,  tone: 'b' },
    { id: 'p009', series: '霧野のレゾン',    name: 'ミスト・エコー 缶バッジ 全12種',       price: 3960,  tone: 'd' },
  ],
  fig: [
    { id: 'p001', series: '蒼天のレガリア',     name: 'アルマ・ヴェント 1/7 スケール',    price: 23100, tone: 'a' },
    { id: 'p008', series: '焔のヴァルキリー',   name: 'ブリュンヒルデ 1/6 大型フィギュア', price: 38500, tone: 'e' },
    { id: 'p004', series: '深淵のメロディア',   name: 'セレネ・ルーチェ 1/8 スケール',    price: 19800, tone: 'c' },
    { id: 'p006', series: '白銀のフロンティア', name: 'フロスト・ベル 1/7 スケール',       price: 21450, tone: 'f' },
    { id: 'p002', series: '星詠みの少女',       name: 'ノクス・ステラ デフォルメ',        price: 4400,  tone: 'b' },
  ],
  kit: [
    { id: 'p003', series: '黎明の騎士団',      name: '騎士団長レガート プラモデル 1/100', price: 8800,  tone: 'e' },
    { id: 'p010', series: '天空のエクリプス',  name: 'ソル・アンブラ HG 1/144',           price: 3300,  tone: 'c' },
    { id: 'p102', series: '深紅のサーガ',      name: 'クリムゾン・ランス MG 1/100',       price: 6600,  tone: 'b' },
    { id: 'p103', series: '蒼穹のアステリア',  name: 'アステル・ウィング RG 1/144',        price: 4400,  tone: 'a' },
    { id: 'p105', series: '黎明の騎士団',      name: 'レガート 変身なりきり',             price: 6600,  tone: 'f' },
  ],
  goods: [
    { id: 'p005', series: '紅蓮の継承者', name: 'イグニス・コル Tシャツ',          price: 4290, tone: 'd' },
    { id: 'p007', series: '月詠のカノン', name: 'ルナ・メロウ タペストリー B2',    price: 4180, tone: 'a' },
    { id: 'p009', series: '霧野のレゾン', name: 'ミスト・エコー 缶バッジ 全12種',  price: 3960, tone: 'b' },
    { id: 'p113', series: '月詠のカノン', name: 'ルナ・メロウ トートバッグ',        price: 3300, tone: 'e' },
    { id: 'p116', series: '霧野のレゾン', name: 'ミスト・エコー ぬいぐるみ',        price: 3850, tone: 'c' },
  ],
}

// ---- Recently viewed ----
export const mockRecentlyViewed = [
  { id: 'p001', name: 'アルマ・ヴェント 1/7',  price: 23100, tone: 'a' },
  { id: 'p002', name: 'ノクス・ステラ デフォルメ', price: 4400,  tone: 'b' },
  { id: 'p003', name: '騎士団長レガート プラモ',   price: 8800,  tone: 'e' },
  { id: 'p004', name: 'セレネ・ルーチェ 1/8',    price: 19800, tone: 'c' },
  { id: 'p005', name: 'イグニス Tシャツ',        price: 4290,  tone: 'd' },
  { id: 'p006', name: 'フロスト・ベル 1/7',      price: 21450, tone: 'f' },
  { id: 'p007', name: 'ルナ・メロウ タペ',        price: 4180,  tone: 'a' },
  { id: 'p009', name: 'ミスト缶バッジ',          price: 3960,  tone: 'b' },
]

// ---- Hero slides ----
export const mockHeroSlides = [
  {
    id: 'h01',
    tone: 'a',
    tags: ['lim', 'ship'],
    title: '蒼天のレガリア｜アルマ・ヴェント\n1/7 スケールフィギュア 受注生産',
    sub: '原型師監修・完全限定モデル。受付は今月末まで。',
    price: 23100,
  },
  {
    id: 'h02',
    tone: 'b',
    tags: ['pre', 'point'],
    title: '星詠みの少女｜ノクス・ステラ\nデフォルメフィギュア 予約受付開始',
    sub: '2026年9月発売予定。数量限定にて予約承り中。',
    price: 4400,
  },
  {
    id: 'h03',
    tone: 'e',
    tags: ['lot'],
    title: '黎明の騎士団｜騎士団長レガート\nキャラクタープラモデル 抽選販売',
    sub: '応募多数につき抽選販売。応募締切 6/30 23:59。',
    price: 8800,
  },
]

// ---- News ticker ----
export const mockNewsTicker = [
  { date: '06/02', text: '「深淵のメロディア」新作フィギュアの予約を開始しました', url: '#' },
  { date: '06/01', text: '夏のクリアランスセール 最大50%OFF 開催中',              url: '#' },
  { date: '05/30', text: 'システムメンテナンスのお知らせ（6/5 2:00-4:00）',       url: '#' },
]

// ---- Promo banners ----
export const mockPromos = [
  { id: 'pr01', tone: 'c', category: 'CAMPAIGN',  title: '新規会員\n500ptプレゼント', url: '/login' },
  { id: 'pr02', tone: 'd', category: '予約・抽選', title: '今月の\n受付スケジュール', url: '/list?tab=schedule' },
]

// ---- Feature banners ----
export const mockFeatureBanners = [
  { id: 'fb01', tone: 'e', label: 'PICK UP 特集',  title: '夏の新作\nフィギュアフェア',     link: '特集を見る →', url: '#' },
  { id: 'fb02', tone: 'b', label: '予約・抽選',     title: 'プレミアム\n受注生産品',          link: '受付中の一覧 →', url: '#' },
  { id: 'fb03', tone: 'a', label: '作品コラボ',     title: '紅蓮の継承者\n10周年グッズ',      link: 'コラボページ →', url: '#' },
]

// ---- Schedule ----
export const mockSchedule = [
  {
    id: 'sch01',
    dateLabel: '予約開始',
    dateTime: '06/05 12:00',
    tagType: 'pre',
    tone: 'a',
    productName: 'セレネ・ルーチェ 1/8 スケール',
    seriesName: '深淵のメロディア',
    price: 19800,
    action: '予約する',
    actionType: 'pre',
  },
  {
    id: 'sch02',
    dateLabel: '抽選受付',
    dateTime: '〜06/30 23:59',
    tagType: 'lot',
    tone: 'e',
    productName: '騎士団長レガート プレミアムプラモデル',
    seriesName: '黎明の騎士団',
    price: 14300,
    action: '応募する',
    actionType: 'lot',
  },
  {
    id: 'sch03',
    dateLabel: '予約開始',
    dateTime: '06/10 18:00',
    tagType: 'pre',
    tone: 'b',
    productName: 'ノクス・ステラ ねんどモデル',
    seriesName: '星詠みの少女',
    price: 8800,
    action: '予約する',
    actionType: 'pre',
  },
  {
    id: 'sch04',
    dateLabel: '抽選結果',
    dateTime: '06/08 発表',
    tagType: 'lot',
    tone: 'd',
    productName: 'アルマ・ヴェント 1/7 限定カラー',
    seriesName: '蒼天のレガリア',
    price: 25300,
    action: '結果を見る',
    actionType: 'lot',
  },
]

// ---- Series ----
export const mockSeries = [
  { id: 's01', name: '蒼天のレガリア',  itemCount: 128, tone: 'a' },
  { id: 's02', name: '星詠みの少女',    itemCount: 86,  tone: 'b' },
  { id: 's03', name: '黎明の騎士団',    itemCount: 204, tone: 'c' },
  { id: 's04', name: '深淵のメロディア', itemCount: 73,  tone: 'd' },
  { id: 's05', name: '紅蓮の継承者',    itemCount: 152, tone: 'e' },
  { id: 's06', name: '白銀のフロンティア', itemCount: 61, tone: 'f' },
  { id: 's07', name: '蒼穹のアステリア', itemCount: 94,  tone: 'c' },
  { id: 's08', name: '月詠のカノン',    itemCount: 47,  tone: 'a' },
  { id: 's09', name: '焔のヴァルキリー', itemCount: 118, tone: 'b' },
  { id: 's10', name: '霧野のレゾン',    itemCount: 52,  tone: 'e' },
  { id: 's11', name: '天空のエクリプス', itemCount: 76,  tone: 'd' },
  { id: 's12', name: '深紅のサーガ',    itemCount: 133, tone: 'f' },
]

// ---- Sale strip items ----
export const mockSaleItems = [
  { id: 'sl01', name: 'フロスト・ベル アクリルスタンド',  price: 1540, originalPrice: 2200, tone: 'a' },
  { id: 'sl02', name: '紅蓮の継承者 クリアファイルセット', price: 660,  originalPrice: 1100, tone: 'c' },
  { id: 'sl03', name: '月詠のカノン トートバッグ',         price: 2310, originalPrice: 3300, tone: 'e' },
  { id: 'sl04', name: '霧野のレゾン 缶バッジ 全8種',       price: 1760, originalPrice: 2640, tone: 'b' },
]

// ---- Categories ----
export const mockCategories = [
  { id: 'cat01', name: 'フィギュア', slug: 'figure', count: 1248, tone: 'a', children: [
    { id: 'cat0101', name: 'アクションフィギュア・可動フィギュア', slug: 'action-figure', count: 420, tone: 'a', children: [] },
    { id: 'cat0102', name: '固定フィギュア・固定ポーズフィギュア', slug: 'scale-figure', count: 512, tone: 'a', children: [] },
    { id: 'cat0103', name: 'デフォルメフィギュア', slug: 'deformed-figure', count: 188, tone: 'a', children: [] },
    { id: 'cat0104', name: 'アクリルロゴ・アクリルスタンド', slug: 'acrylic-stand', count: 96, tone: 'a', children: [] },
    { id: 'cat0105', name: 'その他（フィギュア）', slug: 'figure-other', count: 32, tone: 'a', children: [] },
  ] },
  { id: 'cat02', name: 'プラモデル', slug: 'plamodel', count: 892, tone: 'b', children: [
    { id: 'cat0201', name: 'ガンプラ（ガンダムプラモデル）', slug: 'gunpla', count: 430, tone: 'b', children: [] },
    { id: 'cat0202', name: 'キャラクタープラモデル', slug: 'character-plamodel', count: 312, tone: 'b', children: [] },
    { id: 'cat0203', name: 'プラキット・食玩プラキット', slug: 'plakit', count: 150, tone: 'b', children: [] },
  ] },
  { id: 'cat03', name: 'おもちゃ・キャラクター玩具', slug: 'toy', count: 634, tone: 'c', children: [
    { id: 'cat0301', name: '玩具総合', slug: 'toy-general', count: 180, tone: 'c', children: [] },
    { id: 'cat0302', name: '変身・なりきり', slug: 'henshin', count: 120, tone: 'c', children: [] },
    { id: 'cat0303', name: '変形・合体ロボット・ソフビ', slug: 'robot-sofvi', count: 164, tone: 'c', children: [] },
    { id: 'cat0304', name: 'マスコット・ドール', slug: 'mascot-doll', count: 98, tone: 'c', children: [] },
    { id: 'cat0305', name: 'バッジ', slug: 'badge', count: 72, tone: 'c', children: [] },
  ] },
  { id: 'cat04', name: 'ゲーム', slug: 'game', count: 210, tone: 'd', children: [
    { id: 'cat0401', name: 'ゲームソフト', slug: 'game-software', count: 130, tone: 'd', children: [] },
    { id: 'cat0402', name: 'パーティーゲーム・パズル', slug: 'party-game', count: 80, tone: 'd', children: [] },
  ] },
  { id: 'cat05', name: 'カード', slug: 'card', count: 455, tone: 'e', children: [
    { id: 'cat0501', name: 'トレカ（トレーディングカードゲーム）', slug: 'tcg', count: 260, tone: 'e', children: [] },
    { id: 'cat0502', name: 'コレクションカード', slug: 'collection-card', count: 120, tone: 'e', children: [] },
    { id: 'cat0503', name: 'カードゲーム', slug: 'card-game', count: 75, tone: 'e', children: [] },
  ] },
  { id: 'cat06', name: 'ファッション・アクセサリー', slug: 'fashion', count: 978, tone: 'f', children: [
    { id: 'cat0601', name: 'メンズファッション', slug: 'mens-fashion', count: 140, tone: 'f', children: [] },
    { id: 'cat0602', name: 'レディースファッション', slug: 'ladies-fashion', count: 160, tone: 'f', children: [] },
    { id: 'cat0603', name: 'キッズ・ベビーファッション', slug: 'kids-fashion', count: 90, tone: 'f', children: [] },
    { id: 'cat0604', name: 'ファッション小物・雑貨', slug: 'fashion-goods', count: 210, tone: 'f', children: [] },
    { id: 'cat0605', name: 'コスチューム', slug: 'costume', count: 64, tone: 'f', children: [] },
    { id: 'cat0606', name: 'アクセサリー', slug: 'accessory', count: 180, tone: 'f', children: [] },
    { id: 'cat0607', name: 'バッグ・鞄', slug: 'bag', count: 88, tone: 'f', children: [] },
    { id: 'cat0608', name: '財布', slug: 'wallet', count: 46, tone: 'f', children: [] },
    { id: 'cat0609', name: 'タオル・ハンカチ', slug: 'towel', count: 10, tone: 'f', children: [] },
  ] },
  { id: 'cat07', name: '日用品・ステーショナリー', slug: 'daily', count: 720, tone: 'a', children: [
    { id: 'cat0701', name: '生活用品・生活雑貨', slug: 'living', count: 150, tone: 'a', children: [] },
    { id: 'cat0702', name: 'ステーショナリー・文具・文房具', slug: 'stationery', count: 220, tone: 'a', children: [] },
    { id: 'cat0703', name: 'クッション・ぬいぐるみ', slug: 'plush', count: 130, tone: 'a', children: [] },
    { id: 'cat0704', name: 'シール・ステッカー', slug: 'sticker', count: 110, tone: 'a', children: [] },
    { id: 'cat0705', name: 'チャーム・キーホルダー', slug: 'charm', count: 95, tone: 'a', children: [] },
    { id: 'cat0706', name: 'その他（日用品・ステーショナリー）', slug: 'daily-other', count: 15, tone: 'a', children: [] },
  ] },
  { id: 'cat08', name: 'インテリア・キッチン', slug: 'interior', count: 389, tone: 'b', children: [
    { id: 'cat0801', name: 'インテリア・オブジェ', slug: 'interior-object', count: 239, tone: 'b', children: [] },
    { id: 'cat0802', name: 'キッチン・食器', slug: 'kitchen', count: 150, tone: 'b', children: [] },
  ] },
  { id: 'cat09', name: '食品・飲料', slug: 'food', count: 256, tone: 'c', children: [
    { id: 'cat0901', name: '食玩・おもちゃ付きお菓子', slug: 'shokugan', count: 120, tone: 'c', children: [] },
    { id: 'cat0902', name: 'お菓子（ウエハース）', slug: 'wafer', count: 60, tone: 'c', children: [] },
    { id: 'cat0903', name: 'お菓子（チョコレート・和菓子など）', slug: 'sweets', count: 50, tone: 'c', children: [] },
    { id: 'cat0904', name: 'ケーキ・キャラクターケーキ', slug: 'cake', count: 26, tone: 'c', children: [] },
  ] },
  { id: 'cat10', name: '映像・本・書籍', slug: 'media', count: 142, tone: 'd', children: [
    { id: 'cat1001', name: 'Blu-ray・DVD', slug: 'bluray-dvd', count: 90, tone: 'd', children: [] },
    { id: 'cat1002', name: '雑誌・書籍', slug: 'book', count: 52, tone: 'd', children: [] },
  ] },
]

// ---- Product list (for ListView) ----
export const mockProductList = [
  { id: 'p101', series: '蒼天のレガリア',   category: 'cat01', name: 'アルマ・ヴェント 1/7 スケールフィギュア',     price: 23100,                    tags: ['lim'],        tone: 'a', freeShipping: true,  pointRate: 10 },
  { id: 'p102', series: '深紅のサーガ',     category: 'cat02', name: 'クリムゾン・ランス MGプラモデル 1/100',       price: 6600,                     tags: [],             tone: 'd', freeShipping: true,  pointRate: 10 },
  { id: 'p103', series: '蒼穹のアステリア', category: 'cat02', name: 'アステル・ウィング RGプラモデル 1/144',       price: 4400,                     tags: ['pre'],        tone: 'b', freeShipping: true,  pointRate: 10 },
  { id: 'p104', series: '白銀のフロンティア', category: 'cat03', name: 'スノウ・ベア ソフビフィギュア',             price: 2980,                     tags: [],             tone: 'f', freeShipping: true,  pointRate: 10 },
  { id: 'p105', series: '黎明の騎士団',     category: 'cat03', name: 'レガート 変身なりきり ソードレプリカ',        price: 6600,                     tags: ['new'],        tone: 'e', freeShipping: true,  pointRate: 10 },
  { id: 'p106', series: '月詠のカノン',     category: 'cat03', name: 'ルナ・メロウ マスコットドール',              price: 3300,                     tags: [],             tone: 'a', freeShipping: true,  pointRate: 10 },
  { id: 'p107', series: '蒼天のレガリア',   category: 'cat04', name: '蒼天のレガリア 公式ボードゲーム',            price: 5500,                     tags: ['new'],        tone: 'a', freeShipping: true,  pointRate: 10 },
  { id: 'p108', series: '蒼穹のアステリア', category: 'cat01', name: 'アステル・ウィング 1/8 スケールフィギュア',   price: 16500, salePrice: 13200, tags: ['sale'],       tone: 'b', freeShipping: true,  pointRate: 10 },
  { id: 'p109', series: '紅蓮の継承者',     category: 'cat04', name: '紅蓮の継承者 ジグソーパズル 1000ピース',     price: 3300,                     tags: ['soldout'],    tone: 'd', freeShipping: true,  pointRate: 10 },
  { id: 'p110', series: '星詠みの少女',     category: 'cat05', name: '星詠みの少女 トレーディングカード BOX',      price: 4400,                     tags: ['new'],        tone: 'b', freeShipping: true,  pointRate: 10 },
  { id: 'p111', series: '深淵のメロディア', category: 'cat05', name: '深淵のメロディア コレクションカード 全30種',  price: 880,                      tags: [],             tone: 'c', freeShipping: false, pointRate: 10 },
  { id: 'p112', series: '焔のヴァルキリー', category: 'cat05', name: '焔のヴァルキリー メタルカード 限定版',        price: 1650,                     tags: ['lim', 'pre'], tone: 'e', freeShipping: false, pointRate: 10 },
  { id: 'p113', series: '月詠のカノン',     category: 'cat06', name: 'ルナ・メロウ トートバッグ',                price: 3300,  salePrice: 2310,  tags: ['sale'],       tone: 'a', freeShipping: true,  pointRate: 10 },
  { id: 'p114', series: '紅蓮の継承者',     category: 'cat06', name: 'イグニス・コル アクセサリーネックレス',      price: 5500,                     tags: [],             tone: 'd', freeShipping: true,  pointRate: 10 },
  { id: 'p115', series: '紅蓮の継承者',     category: 'cat07', name: '紅蓮の継承者 クリアファイルセット 全4種',    price: 1100,                     tags: [],             tone: 'c', freeShipping: false, pointRate: 10 },
  { id: 'p116', series: '霧野のレゾン',     category: 'cat07', name: 'ミスト・エコー ぬいぐるみ',                price: 3850,                     tags: ['new'],        tone: 'b', freeShipping: true,  pointRate: 10 },
  { id: 'p117', series: '蒼天のレガリア',   category: 'cat07', name: '蒼天のレガリア アクリルキーホルダー 全8種',  price: 770,                      tags: [],             tone: 'f', freeShipping: false, pointRate: 10 },
  { id: 'p118', series: '深淵のメロディア', category: 'cat08', name: 'セレネ・ルーチェ キャラクターマグカップ',    price: 1980,                     tags: [],             tone: 'c', freeShipping: false, pointRate: 10 },
  { id: 'p119', series: '白銀のフロンティア', category: 'cat09', name: '白銀のフロンティア キャラクタークッキー缶', price: 2160,                     tags: ['new'],        tone: 'd', freeShipping: true,  pointRate: 10 },
  { id: 'p120', series: '黎明の騎士団',     category: 'cat10', name: '黎明の騎士団 公式設定資料集',              price: 6380,                     tags: [],             tone: 'e', freeShipping: true,  pointRate: 10 },
]

// ---- Mock user ----
export const mockUser = {
  id: 'u001',
  name: '天野 奏',
  email: 'amano@example.com',
  rank: 'GOLD',
  pointBalance: 1240,
  pointRate: 10,
  expiringPoints: [{ amount: 240, expiresAt: '2026-06-30' }],
  orderCount: 28,
  favoriteCount: 5,
}

// ---- Mock cart ----
export const mockCart = {
  items: [
    { id: 'ci001', productId: 'p001', name: 'アルマ・ヴェント 1/7 スケールフィギュア', series: '蒼天のレガリア', price: 23100, qty: 1, tone: 'a' },
    { id: 'ci002', productId: 'p004', name: 'セレネ・ルーチェ 1/8 スケールフィギュア', series: '深淵のメロディア', price: 19800, qty: 2, tone: 'c' },
  ],
  total: 62700,
}

// ---- Mock favorites ----
export const mockFavorites = [
  { id: 'fv01', series: '白銀のフロンティア', name: 'フロスト・ベル 1/7 スケールフィギュア', price: 21450, tone: 'f', tags: ['lim'], freeShipping: true },
  { id: 'fv02', series: '焔のヴァルキリー',   name: 'ブリュンヒルデ 1/6 大型フィギュア',    price: 38500, tone: 'e', tags: ['lim', 'pre'], freeShipping: true },
  { id: 'fv03', series: '月詠のカノン',       name: 'ルナ・メロウ タペストリー B2',          price: 4180,  tone: 'a', tags: ['new'], freeShipping: true },
  { id: 'fv04', series: '蒼穹のアステリア',   name: 'アステル・ウィング 1/8 スケール',       price: 16500, salePrice: 13200, tone: 'c', tags: ['sale'], freeShipping: true },
]

// ---- Mock orders ----
export const mockOrders = [
  {
    id: 'AMD-20260531-0412',
    date: '2026/05/31',
    status: 'shipping',      // 配送中
    statusLabel: '配送中',
    items: [{ productId: 'p001', name: 'アルマ・ヴェント 1/7 スケールフィギュア', series: '蒼天のレガリア', qty: 1, price: 23100, tone: 'a' }],
    total: 23100,
  },
  {
    id: 'AMD-20260528-0388',
    date: '2026/05/28',
    status: 'preparing',     // 発送準備中
    statusLabel: '発送準備中',
    items: [{ productId: 'p004', name: 'セレネ・ルーチェ 1/8 スケールフィギュア ほか1点', series: '深淵のメロディア', qty: 2, price: 22000, tone: 'c' }],
    total: 22000,
  },
]

// ---- Mock reservations ----
export const mockReservations = [
  {
    id: 'AMD-PRE-0091',
    type: 'preorder',
    statusLabel: '予約確定',
    status: 'confirmed',
    shipEta: '2026/09',
    productName: 'ノクス・ステラ ねんどモデル',
    seriesName: '星詠みの少女',
    price: 8800,
    tone: 'b',
  },
  {
    id: 'AMD-LOT-0233',
    type: 'lottery',
    statusLabel: '応募受付中',
    status: 'entered',
    resultDate: '2026/06/08',
    productName: '騎士団長レガート プレミアムプラモデル',
    seriesName: '黎明の騎士団',
    price: 14300,
    tone: 'e',
  },
]

// ---- Mock addresses ----
export const mockAddresses = [
  {
    id: 'addr01',
    name: '天野 奏',
    zip: '150-0001',
    prefecture: '東京都',
    city: '渋谷区',
    address1: '神宮前1-2-3',
    address2: 'AMビル 301',
    phone: '03-1234-5678',
    isDefault: true,
  },
]

// ---- Mock points history ----
export const mockPointsHistory = [
  { date: '2026/05/31', label: '注文 #AMD-20260531-0412', change: +2310, balance: 1240 },
  { date: '2026/05/28', label: '注文 #AMD-20260528-0388', change: +2200, balance: -1070 },
  { date: '2026/05/01', label: '新規会員登録ボーナス',    change: +500,  balance: 500 },
]

// ---- Aggregate: home page response ----
export const mockHomeData = {
  heroSlides:      mockHeroSlides,
  promos:          mockPromos,
  newsTicker:      mockNewsTicker,
  quickCategories: mockCategories,
  featureBanners:  mockFeatureBanners,
  newArrivals:     mockNewArrivals,
  schedule:        mockSchedule,
  saleStrip: {
    label: 'CLEARANCE',
    title: '夏のセール',
    description: '最大50%OFF ／ 〜6/15',
    items: mockSaleItems,
  },
  membershipCtas: [
    { icon: 'user',   title: '会員登録で500pt',    body: '新規ご登録でお買い物に使える500ポイントをプレゼント。',     link: '今すぐ登録 →', href: '/login' },
    { icon: 'star',   title: '会員ランク特典',      body: '購入額に応じてポイント還元率アップ。最大10%還元。',          link: '特典を見る →', href: '/mypage' },
    { icon: 'wallet', title: '抽選・予約の管理',    body: '応募状況や当選結果、予約商品をマイページから確認。',         link: 'マイページへ →', href: '/mypage' },
  ],
}
