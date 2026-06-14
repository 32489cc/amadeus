/**
 * AMADEUS — Series API
 */
import http from './http.js'
import { mockSeries } from './mock.js'

/**
 * GET /api/series
 * @returns {Promise<Array>}
 */
export async function fetchSeries() {
  try {
    const { data } = await http.get('/series')
    return data
  } catch {
    return mockSeries
  }
}

/**
 * GET /api/series/:id/schedule
 * @param {string} id
 * @returns {Promise<Array>}
 */
export async function fetchSeriesSchedule(id) {
  try {
    const { data } = await http.get(`/series/${id}/schedule`)
    return data
  } catch {
    const { mockSchedule } = await import('./mock.js')
    return mockSchedule
  }
}
