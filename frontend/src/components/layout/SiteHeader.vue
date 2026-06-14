<template>
  <header class="head">
    <!-- Logo -->
    <RouterLink to="/" class="logo">
      <span class="sq"></span>AMADEUS
    </RouterLink>

    <!-- Search bar -->
    <div class="search">
      <select class="cat" v-model="ui.searchCategory">
        <option>すべて</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.name">{{ cat.name }}</option>
      </select>
      <input
        type="text"
        placeholder="作品名・キャラクター・商品名で検索"
        v-model="ui.searchQuery"
        @keydown.enter="handleSearch"
      />
      <button @click="handleSearch" aria-label="検索">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <line x1="16" y1="16" x2="21" y2="21" />
        </svg>
      </button>
    </div>

    <!-- Icon links -->
    <div class="hicons">
      <RouterLink to="/mypage" class="hicon">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
        マイページ
      </RouterLink>

      <RouterLink to="/mypage" class="hicon">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 20l-7-7a4 4 0 0 1 6-5l1 1 1-1a4 4 0 0 1 6 5z" />
        </svg>
        お気に入り
        <span v-if="favs.count > 0" class="badge">{{ favs.count }}</span>
      </RouterLink>

      <a href="#" class="hicon" aria-label="カート">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 8h12l-1.2 11.4a1 1 0 0 1-1 .9H8.2a1 1 0 0 1-1-.9L6 8z" />
          <path d="M9 8V6a3 3 0 0 1 6 0v2" />
        </svg>
        カート
        <span v-if="cart.itemCount > 0" class="badge">{{ cart.itemCount }}</span>
      </a>
    </div>
  </header>
</template>

<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterLink, useRouter } from 'vue-router'
import { useUiStore }        from '@/stores/ui.js'
import { useCartStore }      from '@/stores/cart.js'
import { useFavoritesStore } from '@/stores/favorites.js'
import { useCategoryStore }  from '@/stores/category.js'

const ui   = useUiStore()
const cart = useCartStore()
const favs = useFavoritesStore()
const router = useRouter()

const categoryStore = useCategoryStore()
const { categories } = storeToRefs(categoryStore)

onMounted(() => {
  categoryStore.load()
})

function handleSearch() {
  if (ui.searchQuery.trim()) {
    router.push({ path: '/list', query: { q: ui.searchQuery, category: ui.searchCategory !== 'すべて' ? ui.searchCategory : undefined } })
  }
}
</script>
