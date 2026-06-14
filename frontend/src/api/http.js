/**
 * AMADEUS — axios base client
 */
import axios from 'axios'

const http = axios.create({
  baseURL: '/api',
  withCredentials: true,          // Cookie-based session
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// Attach Bearer token when present (alternative auth mode)
http.interceptors.request.use((config) => {
  const token = localStorage.getItem('amadeus_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Unified error handler
// Success interceptor unwraps the envelope: returns res.data (= { code, message, data })
// so callers doing `const { data } = await http.xxx(...)` get the business payload directly.
http.interceptors.response.use(
  (res) => res.data,
  (err) => {
    const status = err.response?.status
    if (status === 401) {
      // Clear stale auth — store will handle redirect
      localStorage.removeItem('amadeus_token')
    }
    return Promise.reject(err)
  }
)

export default http
