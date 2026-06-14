/**
 * AMADEUS — Categories API
 */
import http from './http.js'

/**
 * GET /api/categories
 * Returns category tree with item counts.
 * @returns {Promise<Array>}
 */
export async function fetchCategories() {
  const { data } = await http.get('/categories')
  return data
}
