/**
 * AMADEUS — Cart API
 */
import http from './http.js'
import { mockCart } from './mock.js'

/**
 * GET /api/cart
 * @returns {Promise<{items: Array, total: number}>}
 */
export async function fetchCart() {
  try {
    const { data } = await http.get('/cart')
    return data
  } catch {
    return mockCart
  }
}

/**
 * POST /api/cart/items
 * @param {{productId: string, qty: number}} payload
 * @returns {Promise<Object>}
 */
export async function addCartItem(payload) {
  try {
    const { data } = await http.post('/cart/items', payload)
    return data
  } catch {
    // Dev fallback: return mock cart with the new item appended
    const existing = mockCart.items.find(i => i.productId === payload.productId)
    if (existing) {
      existing.qty += (payload.qty ?? 1)
    } else {
      mockCart.items.push({
        id: `ci_${Date.now()}`,
        productId: payload.productId,
        name: payload.productId,
        series: '',
        price: 0,
        qty: payload.qty ?? 1,
        tone: 'a',
      })
    }
    mockCart.total = mockCart.items.reduce((s, i) => s + i.price * i.qty, 0)
    return mockCart
  }
}

/**
 * PATCH /api/cart/items/:id
 * @param {string} itemId
 * @param {{qty: number}} payload
 * @returns {Promise<Object>}
 */
export async function updateCartItem(itemId, payload) {
  try {
    const { data } = await http.patch(`/cart/items/${itemId}`, payload)
    return data
  } catch {
    const item = mockCart.items.find(i => i.id === itemId)
    if (item) item.qty = payload.qty
    return mockCart
  }
}

/**
 * DELETE /api/cart/items/:id
 * @param {string} itemId
 * @returns {Promise<void>}
 */
export async function removeCartItem(itemId) {
  try {
    await http.delete(`/cart/items/${itemId}`)
  } catch {
    // Dev fallback: remove from mock cart silently
  }
}
