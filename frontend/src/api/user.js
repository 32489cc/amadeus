/**
 * AMADEUS — User / MyPage API
 */
import http from './http.js'
import { mockOrders, mockReservations, mockFavorites, mockPointsHistory, mockAddresses } from './mock.js'

/**
 * GET /api/me/orders
 * @param {{page?: number, size?: number}} params
 * @returns {Promise<{items: Array, total: number}>}
 */
export async function fetchOrders(params = {}) {
  try {
    const { data } = await http.get('/me/orders', { params })
    return data
  } catch {
    return { items: mockOrders, total: mockOrders.length }
  }
}

/**
 * GET /api/me/reservations
 * @returns {Promise<Array>}
 */
export async function fetchReservations() {
  try {
    const { data } = await http.get('/me/reservations')
    return data
  } catch {
    return mockReservations
  }
}

/**
 * GET /api/me/favorites
 * @returns {Promise<Array>}
 */
export async function fetchUserFavorites() {
  try {
    const { data } = await http.get('/me/favorites')
    return data
  } catch {
    return mockFavorites
  }
}

/**
 * POST /api/me/favorites/:id
 * @param {string} productId
 * @returns {Promise<void>}
 */
export async function addFavorite(productId) {
  await http.post(`/me/favorites/${productId}`)
}

/**
 * DELETE /api/me/favorites/:id
 * @param {string} productId
 * @returns {Promise<void>}
 */
export async function removeFavorite(productId) {
  await http.delete(`/me/favorites/${productId}`)
}

/**
 * GET /api/me/points
 * @returns {Promise<{balance: number, rate: number, history: Array, expiring: Array}>}
 */
export async function fetchPoints() {
  try {
    const { data } = await http.get('/me/points')
    return data
  } catch {
    return {
      balance: 1240,
      rate: 10,
      history: mockPointsHistory,
      expiring: [{ amount: 240, expiresAt: '2026-06-30' }],
    }
  }
}

/**
 * GET /api/me/addresses
 * @returns {Promise<Array>}
 */
export async function fetchAddresses() {
  try {
    const { data } = await http.get('/me/addresses')
    return data
  } catch {
    return mockAddresses
  }
}
