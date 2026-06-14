/**
 * AMADEUS — Products API
 * Falls back to mock data when backend is unreachable.
 */
import http from './http.js'
import {
  mockProductList,
  mockNewArrivals,
  mockRanking,
  mockRecentlyViewed,
  mockSaleItems,
} from './mock.js'

/**
 * GET /api/products
 * @param {Object} params
 * @param {string} [params.category]
 * @param {string} [params.series]
 * @param {string} [params.scale]        e.g. "1/7","1/8","1/6"
 * @param {string} [params.status]       "in_stock"|"preorder"|"sold_out"
 * @param {number} [params.priceMin]
 * @param {number} [params.priceMax]
 * @param {string} [params.sort]         "recommended"|"new"|"price_asc"|"price_desc"|"popular"
 * @param {number} [params.page]         default 1
 * @param {number} [params.size]         default 20
 * @returns {Promise<{items: Array, total: number, page: number, size: number, totalPages: number}>}
 */
export async function fetchProducts(params = {}) {
  try {
    const { data } = await http.get('/products', { params })
    return data
  } catch {
    const page = params.page ?? 1
    const size = params.size ?? 20
    const filtered = mockProductList.slice((page - 1) * size, page * size)
    return {
      items: filtered,
      total: mockProductList.length,
      page,
      size,
      totalPages: Math.ceil(mockProductList.length / size),
    }
  }
}

/**
 * GET /api/products/ranking
 * @param {Object} params
 * @param {'all'|'fig'|'kit'|'goods'} [params.tab='all']
 * @returns {Promise<Array>}
 */
export async function fetchRanking(params = { tab: 'all' }) {
  try {
    const { data } = await http.get('/products/ranking', { params })
    return data
  } catch {
    return mockRanking[params.tab ?? 'all'] ?? mockRanking.all
  }
}

/**
 * GET /api/products/recently-viewed
 * @returns {Promise<Array>}
 */
export async function fetchRecentlyViewed() {
  try {
    const { data } = await http.get('/products/recently-viewed')
    return data
  } catch {
    return mockRecentlyViewed
  }
}

/**
 * GET /api/products/sale
 * @returns {Promise<Array>}
 */
export async function fetchSaleProducts() {
  try {
    const { data } = await http.get('/products/sale')
    return data
  } catch {
    return mockSaleItems
  }
}

/**
 * GET /api/products/new-arrivals
 * @returns {Promise<Array>}
 */
export async function fetchNewArrivals() {
  try {
    const { data } = await http.get('/products/new-arrivals')
    return data
  } catch {
    return mockNewArrivals
  }
}
