/**
 * AMADEUS — Cart store
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fetchCart, addCartItem, updateCartItem, removeCartItem } from '@/api/cart.js'

export const useCartStore = defineStore('cart', () => {
  // State
  const items = ref([])   // CartItem[]
  const loading = ref(false)

  // Getters
  const itemCount = computed(() => items.value.reduce((s, i) => s + i.qty, 0))
  const total     = computed(() => items.value.reduce((s, i) => s + i.price * i.qty, 0))

  // Actions
  async function load() {
    loading.value = true
    try {
      const data = await fetchCart()
      items.value = data.items ?? []
    } finally {
      loading.value = false
    }
  }

  async function addItem(productId, qty = 1) {
    const data = await addCartItem({ productId, qty })
    // Refresh full cart from response or reload
    if (data?.items) {
      items.value = data.items
    } else {
      await load()
    }
  }

  async function updateItem(itemId, qty) {
    const data = await updateCartItem(itemId, { qty })
    if (data?.items) {
      items.value = data.items
    } else {
      await load()
    }
  }

  async function removeItem(itemId) {
    await removeCartItem(itemId)
    items.value = items.value.filter((i) => i.id !== itemId)
  }

  // Optimistically set count without full reload (e.g. from header badge)
  function setCount(n) {
    // Used when only count is known (SSR hydration)
    if (items.value.length === 0) {
      items.value = Array.from({ length: n }, (_, i) => ({
        id: `stub_${i}`, productId: '', name: '', price: 0, qty: 1, tone: 'a',
      }))
    }
  }

  return {
    items, loading,
    itemCount, total,
    load, addItem, updateItem, removeItem, setCount,
  }
})
