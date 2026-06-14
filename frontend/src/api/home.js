/**
 * AMADEUS — Home page API
 * Falls back to mock data when backend is unreachable.
 */
import http from './http.js'
import { mockHomeData } from './mock.js'

/**
 * GET /api/home
 * Returns aggregated home-page data in a single call.
 * @returns {Promise<typeof mockHomeData>}
 */
export async function fetchHome() {
  try {
    const { data } = await http.get('/home')
    return data
  } catch {
    return mockHomeData
  }
}

/**
 * GET /api/home/news-ticker
 * @returns {Promise<Array>}
 */
export async function fetchNewsTicker() {
  try {
    const { data } = await http.get('/home/news-ticker')
    return data
  } catch {
    const { mockNewsTicker } = await import('./mock.js')
    return mockNewsTicker
  }
}
