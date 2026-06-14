/**
 * AMADEUS — Favorites store
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fetchUserFavorites, addFavorite, removeFavorite } from '@/api/user.js'

export const useFavoritesStore = defineStore('favorites', () => {
  // State
  const items = ref([])        // Favorite product objects
  const loading = ref(false)

  // Getters
  const count = computed(() => items.value.length)
  const ids   = computed(() => new Set(items.value.map((f) => f.id)))

  function isFavorite(productId) {
    return ids.value.has(productId)
  }

  // Actions
  async function load() {
    loading.value = true
    try {
      items.value = await fetchUserFavorites()
    } finally {
      loading.value = false
    }
  }

  async function toggle(productId) {
    if (isFavorite(productId)) {
      // Optimistic remove
      items.value = items.value.filter((f) => f.id !== productId)
      try {
        await removeFavorite(productId)
      } catch {
        await load() // rollback
      }
    } else {
      // Optimistic add stub — real object comes on next load()
      items.value = [...items.value, { id: productId }]
      try {
        await addFavorite(productId)
      } catch {
        await load() // rollback
      }
    }
  }

  return {
    items, loading,
    count, ids,
    isFavorite, load, toggle,
  }
})
