<template>
  <DefaultLayout>
    <!-- Breadcrumb -->
    <div class="crumb">
      <RouterLink to="/">ホーム</RouterLink>
      <span class="sep">›</span>
      <RouterLink to="/list">カテゴリー</RouterLink>
      <span class="sep">›</span>
      <span class="cur">{{ currentCategoryLabel }}</span>
    </div>

    <!-- Category header -->
    <div class="cat-hd">
      <div class="ttl">
        <span class="bar"></span>
        <h1>{{ currentCategoryLabel }}</h1>
        <span class="en">{{ currentCategoryEn }}</span>
      </div>
      <div class="cnt"><b>{{ total.toLocaleString('ja-JP') }}</b> 件の商品</div>
    </div>

    <!-- Shop layout: sidebar + main -->
    <div class="shop">
      <!-- Sidebar -->
      <aside class="side">
        <!-- Category filter -->
        <div class="fbox">
          <h3>カテゴリー <span class="en">CATEGORY</span></h3>
          <div class="body">
            <template v-for="cat in categories" :key="cat.id">
              <label
                class="fopt"
                :class="{ on: uiStore.listFilters.categories.includes(cat.name) }"
              >
                <input
                  type="checkbox"
                  :checked="uiStore.listFilters.categories.includes(cat.name)"
                  @change="toggleFilter('categories', cat.name)"
                />
                <button
                  v-if="cat.children && cat.children.length"
                  type="button"
                  class="cat-toggle"
                  :class="{ open: isExpanded(cat.id) }"
                  :aria-expanded="isExpanded(cat.id)"
                  :aria-label="isExpanded(cat.id) ? '子カテゴリーを閉じる' : '子カテゴリーを開く'"
                  @click.stop.prevent="toggleExpand(cat.id)"
                >▸</button>
                {{ cat.name }}
                <span class="c">{{ catCount(cat).toLocaleString('ja-JP') }}</span>
              </label>

              <template v-if="isExpanded(cat.id)">
                <label
                  v-for="sub in cat.children"
                  :key="sub.id"
                  class="fopt fopt-sub"
                  :class="{ on: uiStore.listFilters.categories.includes(sub.name) }"
                >
                  <input
                    type="checkbox"
                    :checked="uiStore.listFilters.categories.includes(sub.name)"
                    @change="toggleFilter('categories', sub.name)"
                  />
                  {{ sub.name }}
                  <span class="c">{{ catCount(sub).toLocaleString('ja-JP') }}</span>
                </label>
              </template>
            </template>
          </div>
        </div>

        <!-- Series filter -->
        <div class="fbox">
          <h3>作品・シリーズ <span class="en">SERIES</span></h3>
          <div class="body">
            <label
              v-for="s in visibleSeries"
              :key="s.id"
              class="fopt"
              :class="{ on: uiStore.listFilters.series.includes(s.name) }"
            >
              <input
                type="checkbox"
                :checked="uiStore.listFilters.series.includes(s.name)"
                @change="toggleFilter('series', s.name)"
              />
              {{ s.name }}
              <span class="c">{{ s.itemCount.toLocaleString('ja-JP') }}</span>
            </label>
            <label
              v-if="series.length > SERIES_LIMIT"
              class="fopt"
              style="color: var(--ink2)"
              @click.prevent="showAllSeries = !showAllSeries"
            >
              <input type="checkbox" disabled />
              {{ showAllSeries ? '− 閉じる' : '＋ もっと見る' }}
            </label>
          </div>
        </div>

        <!-- Price range filter -->
        <div class="fbox">
          <h3>価格帯 <span class="en">PRICE</span></h3>
          <div class="body">
            <div class="price-in">
              <input
                type="text"
                placeholder="¥ 0"
                :value="priceMinDisplay"
                @input="onPriceMinInput"
                @blur="applyPriceFilter"
                @keydown.enter="applyPriceFilter"
              />
              <span>〜</span>
              <input
                type="text"
                placeholder="¥ 50,000"
                :value="priceMaxDisplay"
                @input="onPriceMaxInput"
                @blur="applyPriceFilter"
                @keydown.enter="applyPriceFilter"
              />
            </div>
            <div class="frange">
              <input
                type="range"
                min="0"
                max="50000"
                step="100"
                :value="rangeValue"
                @input="onRangeInput"
              />
            </div>
          </div>
        </div>

        <!-- Status filter -->
        <div class="fbox">
          <h3>ステータス <span class="en">STATUS</span></h3>
          <div class="body">
            <label
              v-for="st in STATUSES"
              :key="st.value"
              class="fopt"
              :class="{ on: uiStore.listFilters.statuses.includes(st.value) }"
            >
              <input
                type="checkbox"
                :checked="uiStore.listFilters.statuses.includes(st.value)"
                @change="toggleFilter('statuses', st.value)"
              />
              {{ st.label }}
              <span class="c">{{ st.count.toLocaleString('ja-JP') }}</span>
            </label>
          </div>
        </div>

        <button class="fclear" @click="clearFilters">絞り込みをクリア</button>
      </aside>

      <!-- Main content -->
      <div class="main">
        <!-- Toolbar -->
        <div class="tbar">
          <!-- Active filter chips -->
          <div class="chips">
            <span class="lab" v-if="activeChips.length">絞り込み:</span>
            <span
              v-for="chip in activeChips"
              :key="chip.key + '-' + chip.value"
              class="achip"
            >
              <b>{{ chip.label }}</b>
              <span class="x" @click="removeChip(chip)">×</span>
            </span>
          </div>

          <!-- Sort + view toggle -->
          <div class="right">
            <div class="sort">
              並び替え
              <select :value="uiStore.listSort" @change="onSortChange">
                <option value="recommended">おすすめ順</option>
                <option value="new">新着順</option>
                <option value="price_asc">価格が安い順</option>
                <option value="price_desc">価格が高い順</option>
                <option value="popular">人気順</option>
              </select>
            </div>
            <div class="views">
              <button
                :class="{ on: uiStore.listViewMode === 'grid' }"
                @click="uiStore.setListViewMode('grid')"
                title="グリッド表示"
                type="button"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke-width="1.6">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
              </button>
              <button
                :class="{ on: uiStore.listViewMode === 'rows' }"
                @click="uiStore.setListViewMode('rows')"
                title="リスト表示"
                type="button"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke-width="1.6">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Loading state -->
        <div v-if="loading" class="list-loading">
          <span>読み込み中...</span>
        </div>

        <!-- Product list -->
        <div v-else :class="['plist', { rows: uiStore.listViewMode === 'rows' }]">
          <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
            :variant="uiStore.listViewMode === 'rows' ? 'row' : 'grid'"
            :is-favorite="favoritesStore.isFavorite(product.id)"
            @toggle-favorite="favoritesStore.toggle($event)"
            @add-to-cart="cartStore.addItem($event)"
          />
        </div>

        <!-- Empty state -->
        <div v-if="!loading && products.length === 0" class="list-empty">
          <p>条件に一致する商品が見つかりませんでした。</p>
          <button class="fclear" @click="clearFilters">絞り込みをクリア</button>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="pager">
          <!-- Prev arrow -->
          <a
            :class="['ar', { dis: uiStore.listPage === 1 }]"
            @click.prevent="uiStore.listPage > 1 && uiStore.setListPage(uiStore.listPage - 1)"
            href="#"
          >
            <svg viewBox="0 0 24 24"><polyline points="15 5 8 12 15 19" /></svg>
          </a>

          <!-- Page numbers -->
          <template v-for="(p, idx) in pageItems" :key="idx">
            <a
              v-if="p !== '...'"
              :class="{ on: p === uiStore.listPage }"
              @click.prevent="uiStore.setListPage(p)"
              href="#"
            >{{ p }}</a>
            <a v-else style="pointer-events:none;border:none">…</a>
          </template>

          <!-- Next arrow -->
          <a
            :class="['ar', { dis: uiStore.listPage === totalPages }]"
            @click.prevent="uiStore.listPage < totalPages && uiStore.setListPage(uiStore.listPage + 1)"
            href="#"
          >
            <svg viewBox="0 0 24 24"><polyline points="9 5 16 12 9 19" /></svg>
          </a>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'

import DefaultLayout from '@/components/layout/DefaultLayout.vue'
import ProductCard   from '@/components/ui/ProductCard.vue'

import { storeToRefs } from 'pinia'
import { useUiStore }        from '@/stores/ui.js'
import { useFavoritesStore } from '@/stores/favorites.js'
import { useCartStore }      from '@/stores/cart.js'
import { useCategoryStore }  from '@/stores/category.js'

import { fetchProducts }   from '@/api/products.js'
import { fetchSeries }     from '@/api/series.js'

// ---- stores ----
const uiStore        = useUiStore()
const favoritesStore = useFavoritesStore()
const cartStore      = useCartStore()
const categoryStore  = useCategoryStore()
const { categories } = storeToRefs(categoryStore)

// ---- router ----
const route  = useRoute()
const router = useRouter()

// ---- constants ----
const STATUSES = [
  { value: 'preorder',  label: '予約受付中', count: 96  },
  { value: 'in_stock',  label: '在庫あり',   count: 842 },
  { value: 'limited',   label: '限定品',     count: 158 },
  { value: 'sale',      label: 'SALE',       count: 74  },
]
const SERIES_LIMIT = 5

// ---- local state ----
const loading        = ref(false)
const products       = ref([])
const total          = ref(0)
const totalPages     = ref(1)
const series         = ref([])
const showAllSeries  = ref(false)

// Price input local state (separate from store so we don't trigger re-fetch on every keystroke)
const priceMinRaw = ref('')
const priceMaxRaw = ref('')
const rangeValue  = ref(50000)

// 兼容前端 mock 的 count 与后端可能返回的 product_count
function catCount(cat) {
  return Number(cat.count ?? cat.product_count ?? 0)
}

// 子分类展开/收起状态（默认全部收起）
const expandedCats = ref(new Set())
function isExpanded(id) {
  return expandedCats.value.has(id)
}
function toggleExpand(id) {
  const next = new Set(expandedCats.value)
  next.has(id) ? next.delete(id) : next.add(id)
  expandedCats.value = next
}

// ---- computed ----
const visibleSeries = computed(() =>
  showAllSeries.value ? series.value : series.value.slice(0, SERIES_LIMIT)
)

const currentCategoryLabel = computed(() => {
  if (route.query.category) return String(route.query.category)
  if (uiStore.listFilters.categories.length === 1) return uiStore.listFilters.categories[0]
  return 'すべての商品'
})

const currentCategoryEn = computed(() => {
  const map = {
    'フィギュア': 'FIGURES',
    'プラモデル': 'PLASTIC KITS',
    'アパレル': 'APPAREL',
    '文具・雑貨': 'GOODS',
    'アクリル': 'ACRYLIC',
    'アクセサリー': 'ACCESSORIES',
    'タペストリー': 'TAPESTRY',
    '食玩': 'CANDY TOYS',
    'ぬいぐるみ': 'PLUSH',
    'SALE': 'SALE',
    'すべての商品': 'ALL PRODUCTS',
  }
  return map[currentCategoryLabel.value] ?? 'CATEGORY'
})

// Price display (formatted) for inputs
const priceMinDisplay = computed(() => priceMinRaw.value)
const priceMaxDisplay = computed(() => priceMaxRaw.value)

// Active filter chips for tbar
const activeChips = computed(() => {
  const chips = []
  for (const cat of uiStore.listFilters.categories) {
    chips.push({ key: 'categories', value: cat, label: cat })
  }
  for (const s of uiStore.listFilters.series) {
    chips.push({ key: 'series', value: s, label: s })
  }
  for (const st of uiStore.listFilters.statuses) {
    const found = STATUSES.find(x => x.value === st)
    chips.push({ key: 'statuses', value: st, label: found?.label ?? st })
  }
  if (uiStore.listFilters.priceMin != null) {
    chips.push({ key: 'priceMin', value: uiStore.listFilters.priceMin, label: `¥${uiStore.listFilters.priceMin.toLocaleString('ja-JP')} 以上` })
  }
  if (uiStore.listFilters.priceMax != null) {
    chips.push({ key: 'priceMax', value: uiStore.listFilters.priceMax, label: `¥${uiStore.listFilters.priceMax.toLocaleString('ja-JP')} 以下` })
  }
  return chips
})

// Pagination items with ellipsis
const pageItems = computed(() => {
  const cur   = uiStore.listPage
  const total = totalPages.value
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const pages = []
  pages.push(1)
  if (cur > 3) pages.push('...')
  for (let p = Math.max(2, cur - 1); p <= Math.min(total - 1, cur + 1); p++) {
    pages.push(p)
  }
  if (cur < total - 2) pages.push('...')
  pages.push(total)
  return pages
})

// ---- methods ----
function buildApiParams() {
  const f = uiStore.listFilters
  const params = {
    sort:  uiStore.listSort,
    page:  uiStore.listPage,
    size:  20,
  }
  if (f.categories.length) params.category = f.categories.join(',')
  if (f.series.length)     params.series    = f.series.join(',')
  if (f.statuses.length)   params.status    = f.statuses.join(',')
  if (f.priceMin != null)  params.priceMin  = f.priceMin
  if (f.priceMax != null)  params.priceMax  = f.priceMax
  if (route.query.q)       params.q         = route.query.q
  return params
}

async function loadProducts() {
  loading.value = true
  try {
    const res = await fetchProducts(buildApiParams())
    products.value   = res.items ?? []
    total.value      = res.total ?? 0
    totalPages.value = res.totalPages ?? 1
  } finally {
    loading.value = false
  }
}

async function loadSidebarData() {
  const [, sers] = await Promise.all([categoryStore.load(), fetchSeries()])
  series.value = sers
}

function toggleFilter(key, value) {
  const current = [...uiStore.listFilters[key]]
  const idx     = current.indexOf(value)
  if (idx === -1) {
    current.push(value)
  } else {
    current.splice(idx, 1)
  }
  uiStore.setListFilter(key, current)
}

function removeChip(chip) {
  if (chip.key === 'priceMin') {
    uiStore.setListFilter('priceMin', null)
    priceMinRaw.value = ''
  } else if (chip.key === 'priceMax') {
    uiStore.setListFilter('priceMax', null)
    priceMaxRaw.value = ''
    rangeValue.value  = 50000
  } else {
    toggleFilter(chip.key, chip.value)
  }
}

function clearFilters() {
  uiStore.clearListFilters()
  priceMinRaw.value = ''
  priceMaxRaw.value = ''
  rangeValue.value  = 50000
}

function onSortChange(e) {
  uiStore.setListSort(e.target.value)
}

function onPriceMinInput(e) {
  priceMinRaw.value = e.target.value
}
function onPriceMaxInput(e) {
  priceMaxRaw.value = e.target.value
}

function applyPriceFilter() {
  const min = parseInt(priceMinRaw.value.replace(/[^0-9]/g, '')) || null
  const max = parseInt(priceMaxRaw.value.replace(/[^0-9]/g, '')) || null
  uiStore.setListFilter('priceMin', min)
  uiStore.setListFilter('priceMax', max)
  if (max != null) rangeValue.value = max
}

function onRangeInput(e) {
  const val = Number(e.target.value)
  rangeValue.value  = val
  priceMaxRaw.value = val.toLocaleString('ja-JP')
  uiStore.setListFilter('priceMax', val)
}

// Sync route query → store filters on mount
function syncRouteToStore() {
  if (route.query.category) {
    uiStore.setListFilter('categories', [route.query.category])
  }
  if (route.query.q) {
    uiStore.setSearchQuery(route.query.q)
  }
}

// Push updated query params to URL (keep URL in sync)
function syncStoreToRoute() {
  const q = {}
  if (uiStore.listFilters.categories.length === 1) q.category = uiStore.listFilters.categories[0]
  if (route.query.q) q.q = route.query.q
  router.replace({ name: 'list', query: q })
}

// ---- watchers ----
// Re-fetch whenever filter/sort/page changes
watch(
  () => [
    uiStore.listFilters.categories,
    uiStore.listFilters.series,
    uiStore.listFilters.statuses,
    uiStore.listFilters.priceMin,
    uiStore.listFilters.priceMax,
    uiStore.listSort,
    uiStore.listPage,
  ],
  () => {
    loadProducts()
    syncStoreToRoute()
  },
  { deep: true }
)

// ---- lifecycle ----
onMounted(async () => {
  syncRouteToStore()
  await Promise.all([loadSidebarData(), loadProducts()])
  favoritesStore.load()
})
</script>

<style scoped>
/* 子分类展开/收起按钮 */
.cat-toggle {
  flex: none;
  width: 16px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--muted);
  font-size: 10px;
  line-height: 1;
  cursor: pointer;
  transition: transform 0.15s ease, color 0.15s ease;
}
.cat-toggle:hover {
  color: var(--red);
}
.cat-toggle.open {
  transform: rotate(90deg);
}

/* 子分类：缩进 + 左侧引导线，弱化字号区分层级 */
.fopt-sub {
  padding-left: 18px;
  position: relative;
  font-size: 12px;
  color: var(--muted);
}
.fopt-sub::before {
  content: '';
  position: absolute;
  left: 6px;
  top: 50%;
  width: 6px;
  height: 1px;
  background: var(--line, #ddd);
}
.fopt-sub:hover,
.fopt-sub.on {
  color: var(--red);
}

/* Loading placeholder */
.list-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  color: var(--muted);
  font-size: 14px;
}

/* Empty state */
.list-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 60px 0;
  color: var(--ink2);
  font-size: 14px;
}
.list-empty .fclear {
  width: auto;
  padding: 11px 32px;
}

/* Bottom padding for list area */
.shop {
  padding-bottom: 60px;
}
</style>
