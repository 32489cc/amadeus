<template>
  <DefaultLayout>
    <!-- BREADCRUMB -->
    <div class="crumb">
      <RouterLink to="/">ホーム</RouterLink>
      <span class="sep">›</span>
      <span class="cur">マイページ</span>
    </div>

    <!-- MYPAGE BODY -->
    <div class="mp">
      <!-- ======= SIDEBAR ======= -->
      <aside class="mp-side">
        <!-- User card (navy bg) -->
        <div class="mp-user">
          <div class="row">
            <div class="av">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="8" r="4"/>
                <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/>
              </svg>
            </div>
            <div>
              <div class="nm">{{ authStore.userName }}</div>
              <div class="rk">★ {{ authStore.memberRank }} 会員</div>
            </div>
          </div>
          <div class="pts">
            <div class="p">
              <div class="v">{{ fmtNum(authStore.pointBalance) }}</div>
              <div class="l">ポイント</div>
            </div>
            <div class="p">
              <div class="v">{{ user?.orderCount ?? 0 }}</div>
              <div class="l">注文</div>
            </div>
            <div class="p">
              <div class="v">{{ favItems.length }}</div>
              <div class="l">お気に入り</div>
            </div>
          </div>
        </div>

        <!-- Vertical nav -->
        <nav class="mp-nav">
          <a href="#" :class="{ on: activeSection === 'dashboard' }" @click.prevent="activeSection = 'dashboard'">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
            </svg>
            ダッシュボード
          </a>
          <a href="#" :class="{ on: activeSection === 'orders' }" @click.prevent="activeSection = 'orders'">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 2h9l5 5v15H6z"/>
              <path d="M9 12h7M9 16h7"/>
            </svg>
            注文履歴
            <span class="badge2">{{ user?.orderCount ?? 28 }}</span>
          </a>
          <a href="#" :class="{ on: activeSection === 'reservations' }" @click.prevent="activeSection = 'reservations'">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="6" width="18" height="13" rx="2"/>
              <path d="M3 10h18"/>
            </svg>
            予約・抽選
            <span class="badge2">{{ reservations.length }}</span>
          </a>
          <a href="#" :class="{ on: activeSection === 'favorites' }" @click.prevent="activeSection = 'favorites'">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 20l-7-7a4 4 0 0 1 6-5l1 1 1-1a4 4 0 0 1 6 5z"/>
            </svg>
            お気に入り
            <span class="badge2">{{ favItems.length }}</span>
          </a>
          <a href="#" :class="{ on: activeSection === 'points' }" @click.prevent="activeSection = 'points'">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <polygon points="12 2 15 9 22 9 16 14 18 21 12 17 6 21 8 14 2 9 9 9"/>
            </svg>
            ポイント履歴
          </a>
          <a href="#" :class="{ on: activeSection === 'addresses' }" @click.prevent="activeSection = 'addresses'">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 10l9-7 9 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            </svg>
            お届け先住所
          </a>
          <a href="#" :class="{ on: activeSection === 'settings' }" @click.prevent="activeSection = 'settings'">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.5-2.4 1a7 7 0 0 0-1.7-1l-.3-2.5h-4l-.3 2.5a7 7 0 0 0-1.7 1l-2.4-1-2 3.5L5 11a7 7 0 0 0 0 2l-2 1.5 2 3.5 2.4-1a7 7 0 0 0 1.7 1l.3 2.5h4l.3-2.5a7 7 0 0 0 1.7-1l2.4 1 2-3.5L19 13a7 7 0 0 0 .1-1z"/>
            </svg>
            アカウント設定
          </a>
        </nav>
      </aside>

      <!-- ======= MAIN ======= -->
      <div class="mp-main">
        <!-- Section heading -->
        <div class="mp-hd">
          <span class="bar"></span>
          <h1>ダッシュボード</h1>
          <span class="en">Dashboard</span>
        </div>

        <!-- Loading state -->
        <div v-if="loading" class="mp-loading">
          <div class="mp-loading-inner">データを読み込んでいます...</div>
        </div>

        <template v-else>
          <!-- POINT BANNER -->
          <div class="ptbanner">
            <div class="l">
              <div class="k">AVAILABLE POINTS</div>
              <div class="v">{{ fmtNum(points.balance) }} <small>pt</small></div>
              <div class="d" v-if="points.expiring && points.expiring.length">
                うち {{ fmtNum(points.expiring[0].amount) }}pt が {{ fmtDate(points.expiring[0].expiresAt) }} に失効します
              </div>
            </div>
            <div class="r">
              <div class="pr"><b>{{ authStore.memberRank }}</b>会員ランク</div>
              <div class="pr"><b>{{ points.rate }}%</b>還元率</div>
              <div class="pr"><b>¥8,200</b>次ランクまで</div>
            </div>
          </div>

          <!-- 4 STAT CARDS -->
          <div class="mp-stats">
            <div class="statc">
              <div class="l">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="6" width="18" height="13" rx="2"/>
                  <path d="M3 10h18"/>
                </svg>
                処理中の注文
              </div>
              <div class="v">{{ activeOrders.length }}<small>件</small></div>
              <div class="sub">{{ activeOrdersSub }}</div>
            </div>
            <div class="statc">
              <div class="l">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="6" width="18" height="13" rx="2"/>
                </svg>
                予約中の商品
              </div>
              <div class="v">{{ preorderCount }}<small>件</small></div>
              <div class="sub">{{ preorderSub }}</div>
            </div>
            <div class="statc">
              <div class="l">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2l3 7 7 .5-5.5 4.5 2 7-6.5-4-6.5 4 2-7L2 9.5 9 9z"/>
                </svg>
                応募中の抽選
              </div>
              <div class="v">{{ lotteryCount }}<small>件</small></div>
              <div class="sub">{{ lotterySub }}</div>
            </div>
            <div class="statc">
              <div class="l">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 20l-7-7a4 4 0 0 1 6-5l1 1 1-1a4 4 0 0 1 6 5z"/>
                </svg>
                お気に入り
              </div>
              <div class="v">{{ favItems.length }}<small>件</small></div>
              <div class="sub">{{ favSub }}</div>
            </div>
          </div>

          <!-- RECENT ORDERS -->
          <div class="mp-sec">
            <div class="lbl">
              <h2><span class="dot"></span>最近の注文</h2>
              <a href="#">注文履歴をすべて見る ›</a>
            </div>

            <div v-for="order in recentOrders" :key="order.id" class="order">
              <div class="ohd">
                <div class="l">
                  <span class="no">注文番号 #{{ order.id }}</span>
                  <span class="dt">{{ order.date }}</span>
                </div>
                <span class="st" :class="orderStatusClass(order.status)">{{ order.statusLabel }}</span>
              </div>
              <div class="obody" v-for="(item, idx) in order.items.slice(0, 1)" :key="idx">
                <div class="th" :class="`ph ${item.tone}`" data-label=""></div>
                <div class="oi">
                  <div class="nm">{{ item.name }}</div>
                  <div class="ser">{{ item.series }}</div>
                  <div class="qty">数量: {{ item.qty }} ／ 合計 ¥{{ fmtNum(order.total) }}</div>
                </div>
                <div class="opr">¥{{ fmtNum(order.total) }}</div>
                <a href="#" class="obtn" @click.prevent>
                  {{ order.status === 'shipping' ? '配送状況' : '詳細を見る' }}
                </a>
              </div>
            </div>

            <div v-if="!recentOrders.length" class="mp-empty">注文履歴はありません。</div>
          </div>

          <!-- PRE-ORDER / LOTTERY -->
          <div class="mp-sec">
            <div class="lbl">
              <h2><span class="dot"></span>予約・抽選</h2>
              <a href="#">すべて見る ›</a>
            </div>

            <div v-for="res in reservations" :key="res.id" class="order">
              <div class="ohd">
                <div class="l">
                  <span class="no">
                    {{ res.type === 'preorder' ? '予約' : '抽選' }} #{{ res.id }}
                  </span>
                  <span class="dt">
                    <template v-if="res.type === 'preorder'">発送予定 {{ res.shipEta }}</template>
                    <template v-else>結果発表 {{ res.resultDate }}</template>
                  </span>
                </div>
                <span class="st pre">{{ res.statusLabel }}</span>
              </div>
              <div class="obody">
                <div class="th" :class="`ph ${res.tone}`" data-label=""></div>
                <div class="oi">
                  <div class="nm">{{ res.productName }}</div>
                  <div class="ser">{{ res.seriesName }}</div>
                  <div class="qty">
                    <template v-if="res.type === 'preorder'">
                      お支払い: 発送時 ／ ¥{{ fmtNum(res.price) }}
                    </template>
                    <template v-else>
                      当選時のみ購入 ／ ¥{{ fmtNum(res.price) }}
                    </template>
                  </div>
                </div>
                <div class="opr">¥{{ fmtNum(res.price) }}</div>
                <a href="#" class="obtn" @click.prevent>
                  {{ res.type === 'preorder' ? '予約を管理' : '応募内容' }}
                </a>
              </div>
            </div>

            <div v-if="!reservations.length" class="mp-empty">予約・抽選の応募はありません。</div>
          </div>

          <!-- FAVORITES GRID -->
          <div class="mp-sec">
            <div class="lbl">
              <h2><span class="dot"></span>お気に入り</h2>
              <a href="#">すべて見る ›</a>
            </div>
            <div class="mp-fav">
              <ProductCard
                v-for="fav in favItems"
                :key="fav.id"
                :product="fav"
                :is-favorite="true"
                @toggle-favorite="handleToggleFav"
                @add-to-cart="handleAddToCart"
              />
            </div>
            <div v-if="!favItems.length" class="mp-empty">お気に入りに追加した商品はありません。</div>
          </div>
        </template>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import DefaultLayout from '@/components/layout/DefaultLayout.vue'
import ProductCard   from '@/components/ui/ProductCard.vue'
import { useAuthStore }      from '@/stores/auth.js'
import { useCartStore }      from '@/stores/cart.js'
import { useFavoritesStore } from '@/stores/favorites.js'
import { fetchOrders }       from '@/api/user.js'
import { fetchReservations } from '@/api/user.js'
import { fetchUserFavorites } from '@/api/user.js'
import { fetchPoints }       from '@/api/user.js'

// ---- Stores ----
const authStore      = useAuthStore()
const cartStore      = useCartStore()
const favoritesStore = useFavoritesStore()

// ---- State ----
const loading      = ref(true)
const activeSection = ref('dashboard')

const user         = computed(() => authStore.user)
const orders       = ref([])
const reservations = ref([])
const favItems     = ref([])
const points       = ref({ balance: 0, rate: 10, expiring: [], history: [] })

// ---- Fetch all data on mount ----
onMounted(async () => {
  loading.value = true
  try {
    const [ordersRes, resRes, favRes, ptsRes] = await Promise.all([
      fetchOrders({ page: 1, size: 5 }),
      fetchReservations(),
      fetchUserFavorites(),
      fetchPoints(),
    ])
    orders.value      = ordersRes.items ?? ordersRes
    reservations.value = Array.isArray(resRes) ? resRes : []
    // Map favorites to ProductCard-compatible shape
    favItems.value = (Array.isArray(favRes) ? favRes : []).map(f => ({
      ...f,
      tags:        f.tags ?? [],
      freeShipping: f.freeShipping ?? false,
      pointRate:   f.pointRate ?? 0,
    }))
    points.value = ptsRes
  } finally {
    loading.value = false
  }
})

// ---- Helpers ----
function fmtNum(n) {
  if (typeof n !== 'number') return '0'
  return n.toLocaleString('ja-JP')
}

function fmtDate(str) {
  // "2026-06-30" -> "2026/06/30"
  return (str || '').replace(/-/g, '/')
}

function orderStatusClass(status) {
  if (status === 'shipping')  return 'ship'
  if (status === 'preparing') return 'prep'
  return 'pre'
}

// ---- Computed: recent orders (last 2) ----
const recentOrders = computed(() => orders.value.slice(0, 2))

// ---- Computed: stat card helpers ----
const activeOrders = computed(() =>
  orders.value.filter(o => o.status === 'shipping' || o.status === 'preparing')
)

const activeOrdersSub = computed(() => {
  const ship = orders.value.filter(o => o.status === 'shipping').length
  const prep = orders.value.filter(o => o.status === 'preparing').length
  const parts = []
  if (prep) parts.push(`発送準備中 ${prep}`)
  if (ship) parts.push(`配送中 ${ship}`)
  return parts.join(' ・ ') || '–'
})

const preorderCount = computed(() =>
  reservations.value.filter(r => r.type === 'preorder').length
)

const preorderSub = computed(() => {
  const pre = reservations.value.filter(r => r.type === 'preorder')
  if (!pre.length) return '–'
  const earliest = pre.map(r => r.shipEta).filter(Boolean).sort()[0]
  return earliest ? `最短発送 ${earliest}` : '–'
})

const lotteryCount = computed(() =>
  reservations.value.filter(r => r.type === 'lottery').length
)

const lotterySub = computed(() => {
  const lots = reservations.value.filter(r => r.type === 'lottery')
  if (!lots.length) return '–'
  const next = lots.map(r => r.resultDate).filter(Boolean).sort()[0]
  return next ? `結果発表 ${next.replace(/\d{4}\//, '')}` : '–'
})

const favSub = computed(() => {
  const onSale = favItems.value.filter(f => f.salePrice).length
  return onSale ? `うち${onSale}件が値下げ中` : '–'
})

// ---- Actions ----
async function handleToggleFav(productId) {
  await favoritesStore.toggle(productId)
  // Refresh local list
  const res = await fetchUserFavorites()
  favItems.value = (Array.isArray(res) ? res : []).map(f => ({
    ...f,
    tags:        f.tags ?? [],
    freeShipping: f.freeShipping ?? false,
    pointRate:   f.pointRate ?? 0,
  }))
}

async function handleAddToCart(productId) {
  await cartStore.addItem(productId, 1)
}
</script>

<style scoped>
/* Loading placeholder */
.mp-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 320px;
}
.mp-loading-inner {
  font-size: 13px;
  color: var(--muted);
}

/* Empty state */
.mp-empty {
  padding: 24px 0;
  font-size: 13px;
  color: var(--muted);
  text-align: center;
}
</style>
