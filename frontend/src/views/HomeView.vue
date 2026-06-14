<template>
  <DefaultLayout>

    <!-- ============================
         4 HERO: carousel + side promos
         ============================ -->
    <div class="hero">
      <!-- Carousel -->
      <div class="caro">
        <div
          v-for="(slide, idx) in homeData.heroSlides"
          :key="slide.id"
          class="cslide"
          :class="{ on: idx === carouselIndex }"
        >
          <div class="ph" :class="slide.tone" data-label=""></div>
          <div class="cap">
            <div class="tags">
              <Tag v-for="t in slide.tags" :key="t" :type="t" />
            </div>
            <h2 v-html="formatTitle(slide.title)"></h2>
            <div class="sub">{{ slide.sub }}</div>
            <div class="price">¥ <b>{{ slide.price.toLocaleString('ja-JP') }}</b> <span style="font-size:12px">税込</span></div>
          </div>
        </div>
        <button class="arr p" @click="caroPrev" aria-label="前のスライド">
          <svg viewBox="0 0 24 24"><polyline points="15 5 8 12 15 19"/></svg>
        </button>
        <button class="arr n" @click="caroNext" aria-label="次のスライド">
          <svg viewBox="0 0 24 24"><polyline points="9 5 16 12 9 19"/></svg>
        </button>
        <div class="dots">
          <span
            v-for="(_, idx) in homeData.heroSlides"
            :key="idx"
            class="dot"
            :class="{ on: idx === carouselIndex }"
            @click="carouselGo(idx)"
          ></span>
        </div>
      </div>

      <!-- Side promo banners -->
      <div class="side">
        <RouterLink
          v-for="promo in homeData.promos"
          :key="promo.id"
          :to="promo.url"
          class="promo"
        >
          <div class="ph" :class="promo.tone" data-label=""></div>
          <div class="pc">
            <span class="k">{{ promo.category }}</span>
            <span class="t" v-html="promo.title.replace(/\n/g, '<br>')"></span>
          </div>
        </RouterLink>
      </div>
    </div>

    <!-- ============================
         5 NEWS TICKER
         ============================ -->
    <div class="ticker">
      <div class="lbl"><span class="dotr"></span>お知らせ</div>
      <div class="items">
        <a
          v-for="item in homeData.newsTicker"
          :key="item.date + item.text"
          href="#"
        >
          <span class="dt">{{ item.date }}</span>{{ item.text }}
        </a>
      </div>
      <a href="#" class="more">一覧 ＞</a>
    </div>

    <!-- ============================
         6 QUICK CATEGORIES (10-col circles)
         ============================ -->
    <div class="qcats">
      <RouterLink
        v-for="cat in homeData.quickCategories"
        :key="cat.id"
        :to="`/list?category=${encodeURIComponent(cat.name)}`"
        class="qcat"
      >
        <div class="ic ph" :class="cat.tone" data-label=""></div>
        <div class="nm">{{ cat.name }}</div>
      </RouterLink>
    </div>

    <!-- ============================
         7 FEATURE BANNERS (3-col, 200px)
         ============================ -->
    <div class="wrap sec">
      <div class="feat3">
        <a
          v-for="fb in homeData.featureBanners"
          :key="fb.id"
          :href="fb.url"
          class="fb"
        >
          <div class="ph" :class="fb.tone" data-label=""></div>
          <div class="fc">
            <span class="k">{{ fb.label }}</span>
            <span class="t" v-html="fb.title.replace(/\n/g, '<br>')"></span>
            <span class="lk">{{ fb.link }}</span>
          </div>
        </a>
      </div>
    </div>

    <!-- ============================
         8 NEW ARRIVALS (5-col, 10 cards)
         ============================ -->
    <div class="wrap sec">
      <div class="sh">
        <div class="lt">
          <span class="bar"></span>
          <h2>新着商品</h2>
          <span class="en">New Arrivals</span>
        </div>
        <RouterLink to="/list?sort=new" class="more">すべて見る ＞</RouterLink>
      </div>
      <div class="pg">
        <ProductCard
          v-for="p in newArrivals"
          :key="p.id"
          :product="p"
          :is-favorite="favoritesStore.isFavorite(p.id)"
          @toggle-favorite="favoritesStore.toggle(p.id)"
          @add-to-cart="cartStore.addItem(p.id, 1)"
        />
      </div>
    </div>

    <!-- ============================
         9 RANKING (tabbed, 5-col, 5 cards)
         ============================ -->
    <div class="wrap sec">
      <div class="sh">
        <div class="lt">
          <span class="bar"></span>
          <h2>ランキング</h2>
          <span class="en">Ranking</span>
        </div>
        <div class="tabs">
          <button
            v-for="tab in rankingTabs"
            :key="tab.key"
            :class="{ on: rankingTab === tab.key }"
            @click="switchRankingTab(tab.key)"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>
      <div class="rk">
        <article
          v-for="(p, idx) in rankingItems"
          :key="p.id + '-' + idx"
          class="rk-card"
          :class="`rank-${idx + 1}`"
        >
          <div class="th ph" :class="p.tone" data-label="">
            <div class="rn">{{ idx + 1 }}</div>
          </div>
          <div class="ser">{{ p.series }}</div>
          <div class="nm">{{ p.name }}</div>
          <div class="pr">
            <span class="yen">¥</span>
            <span class="now">{{ p.price.toLocaleString('ja-JP') }}</span>
          </div>
        </article>
      </div>
    </div>

    <!-- ============================
         10 SCHEDULE (予約・抽選)
         ============================ -->
    <div class="wrap sec">
      <div class="sh">
        <div class="lt">
          <span class="bar"></span>
          <h2>予約・抽選スケジュール</h2>
          <span class="en">Pre-order &amp; Lottery</span>
        </div>
        <a href="#" class="more">スケジュール一覧 ＞</a>
      </div>
      <div class="sched">
        <div
          v-for="item in homeData.schedule"
          :key="item.id"
          class="row"
        >
          <div class="dt">
            {{ item.dateLabel }}<small>{{ item.dateTime }}</small>
          </div>
          <Tag :type="item.tagType" />
          <div class="th ph" :class="item.tone" data-label=""></div>
          <div class="nm">
            {{ item.productName }}<span class="s"> ／ {{ item.seriesName }}</span>
          </div>
          <div class="pr">¥{{ item.price.toLocaleString('ja-JP') }}</div>
          <a href="#" class="btn" :class="{ lot: item.actionType === 'lot' }">{{ item.action }}</a>
        </div>
      </div>
    </div>

    <!-- ============================
         11 SERIES GRID (6-col, 12 tiles)
         ============================ -->
    <div class="wrap sec">
      <div class="sh">
        <div class="lt">
          <span class="bar"></span>
          <h2>作品から探す</h2>
          <span class="en">By Series</span>
        </div>
        <a href="#" class="more">作品一覧 ＞</a>
      </div>
      <div class="ser-g">
        <RouterLink
          v-for="s in seriesList"
          :key="s.id"
          :to="`/list?series=${encodeURIComponent(s.name)}`"
          class="ser-t"
        >
          <div class="ph" :class="s.tone" data-label=""></div>
          <div class="ov">
            <span class="n">{{ s.name }}</span>
            <span class="c">{{ s.itemCount }} アイテム</span>
          </div>
        </RouterLink>
      </div>
    </div>

    <!-- ============================
         12 SALE STRIP (navy bg)
         ============================ -->
    <div class="wrap">
      <div class="sale">
        <div class="lead">
          <div class="k">{{ homeData.saleStrip?.label }}</div>
          <div class="t">{{ homeData.saleStrip?.title }}</div>
          <div class="d">{{ homeData.saleStrip?.description }}</div>
        </div>
        <div class="srow">
          <a
            v-for="si in homeData.saleStrip?.items"
            :key="si.id"
            href="#"
            class="si"
          >
            <div class="th ph" :class="si.tone" data-label=""></div>
            <div class="nm">{{ si.name }}</div>
            <div class="pr">
              <span class="now">¥{{ si.price.toLocaleString('ja-JP') }}</span>
              <span class="old">¥{{ si.originalPrice.toLocaleString('ja-JP') }}</span>
            </div>
          </a>
        </div>
        <div class="sbtn">
          <RouterLink to="/list?status=sale">SALEを見る →</RouterLink>
        </div>
      </div>
    </div>

    <!-- ============================
         13 MEMBERSHIP CTA (3-col)
         ============================ -->
    <div class="wrap">
      <div class="member">
        <div
          v-for="cta in homeData.membershipCtas"
          :key="cta.title"
          class="mcard"
        >
          <div class="mi">
            <!-- user icon -->
            <svg v-if="cta.icon === 'user'" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4"/>
              <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/>
            </svg>
            <!-- star icon -->
            <svg v-else-if="cta.icon === 'star'" viewBox="0 0 24 24">
              <polygon points="12 2 15 9 22 9 16 14 18 21 12 17 6 21 8 14 2 9 9 9"/>
            </svg>
            <!-- wallet/card icon -->
            <svg v-else viewBox="0 0 24 24">
              <rect x="3" y="6" width="18" height="13" rx="2"/>
              <path d="M3 10h18"/>
            </svg>
          </div>
          <div>
            <h4>{{ cta.title }}</h4>
            <p>{{ cta.body }}</p>
            <RouterLink :to="cta.href" class="ml">{{ cta.link }}</RouterLink>
          </div>
        </div>
      </div>
    </div>

    <!-- ============================
         14 RECENTLY VIEWED (8-col)
         ============================ -->
    <div class="wrap sec">
      <div class="sh">
        <div class="lt">
          <span class="bar"></span>
          <h2>最近チェックした商品</h2>
          <span class="en">Recently Viewed</span>
        </div>
        <a href="#" class="more">履歴をすべて見る ＞</a>
      </div>
      <div class="recent">
        <a
          v-for="p in recentlyViewed"
          :key="p.id"
          href="#"
          class="ri"
        >
          <div class="th ph" :class="p.tone" data-label=""></div>
          <div class="nm">{{ p.name }}</div>
          <div class="pr">¥{{ p.price.toLocaleString('ja-JP') }}</div>
        </a>
      </div>
    </div>

  </DefaultLayout>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'

import DefaultLayout from '@/components/layout/DefaultLayout.vue'
import ProductCard   from '@/components/ui/ProductCard.vue'
import Tag           from '@/components/ui/Tag.vue'

import { fetchHome }           from '@/api/home.js'
import { fetchNewArrivals, fetchRanking, fetchRecentlyViewed } from '@/api/products.js'
import { fetchSeries }         from '@/api/series.js'

import { useFavoritesStore }   from '@/stores/favorites.js'
import { useCartStore }        from '@/stores/cart.js'
import { useUiStore }          from '@/stores/ui.js'

// ---- stores ----
const favoritesStore = useFavoritesStore()
const cartStore      = useCartStore()
const uiStore        = useUiStore()

// ---- page data ----
const homeData = reactive({
  heroSlides:      [],
  promos:          [],
  newsTicker:      [],
  quickCategories: [],
  featureBanners:  [],
  schedule:        [],
  saleStrip:       null,
  membershipCtas:  [],
})

const newArrivals    = ref([])
const recentlyViewed = ref([])
const seriesList     = ref([])

// ---- ranking ----
const rankingTabs = [
  { key: 'all',   label: '総合' },
  { key: 'fig',   label: 'フィギュア' },
  { key: 'kit',   label: 'プラモデル' },
  { key: 'goods', label: 'グッズ' },
]
const rankingTab   = ref('all')
const rankingItems = ref([])

async function switchRankingTab(key) {
  rankingTab.value = key
  uiStore.setRankingTab(key)
  rankingItems.value = await fetchRanking({ tab: key })
}

// ---- carousel ----
const carouselIndex = ref(0)
let caroTimer = null

function carouselGo(n) {
  const len = homeData.heroSlides.length || 1
  carouselIndex.value = ((n % len) + len) % len
}

function caroNext() {
  carouselGo(carouselIndex.value + 1)
  caroReset()
}

function caroPrev() {
  carouselGo(carouselIndex.value - 1)
  caroReset()
}

function caroStart() {
  caroTimer = setInterval(() => {
    carouselGo(carouselIndex.value + 1)
  }, 5000)
}

function caroReset() {
  clearInterval(caroTimer)
  caroStart()
}

// ---- helpers ----
function formatTitle(title) {
  return title.replace(/\n/g, '<br>')
}

// ---- data fetch on mount ----
onMounted(async () => {
  // Parallel fetches for best performance
  const [home, arrivals, ranking, viewed, series] = await Promise.all([
    fetchHome(),
    fetchNewArrivals(),
    fetchRanking({ tab: 'all' }),
    fetchRecentlyViewed(),
    fetchSeries(),
  ])

  // Populate homeData from aggregate /api/home
  Object.assign(homeData, home)

  newArrivals.value    = arrivals
  rankingItems.value   = ranking
  recentlyViewed.value = viewed
  seriesList.value     = series.slice(0, 12) // show up to 12 tiles

  // Start carousel auto-advance after data loads
  caroStart()

  // Load favorites + cart for badge counts
  favoritesStore.load()
  cartStore.load()
})

onBeforeUnmount(() => {
  clearInterval(caroTimer)
})
</script>
