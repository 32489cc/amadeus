/**
 * AMADEUS — Authentication API
 *
 * 注：本模块不再有 DEV mock 兜底，全部走真后端。
 * 后端报错时 axios 会 reject，错误向上抛给调用方（store / 视图）处理。
 */
import http from './http.js'

/**
 * POST /api/auth/login
 * @param {{email: string, password: string, rememberMe?: boolean}} payload
 * @returns {Promise<{user: Object, token?: string}>}
 */
export async function login(payload) {
  const { data } = await http.post('/auth/login', payload)
  return data
}

/**
 * POST /api/auth/register
 * @param {{name: string, email: string, password: string, newsletter?: boolean}} payload
 * @returns {Promise<{user: Object, token?: string}>}
 */
export async function register(payload) {
  const { data } = await http.post('/auth/register', payload)
  return data
}

/**
 * POST /api/auth/sms/send
 * 手机验证码发送。
 * @param {{phone: string}} payload
 * @returns {Promise<{expiresIn: number, resendAfter: number}>}
 */
export async function sendSmsCode(payload) {
  const { data } = await http.post('/auth/sms/send', payload)
  return data
}

/**
 * POST /api/auth/sms/login
 * 手机号 + 验证码登录。
 * @param {{phone: string, code: string, rememberMe?: boolean}} payload
 * @returns {Promise<{user: Object, token?: string}>}
 */
export async function loginWithSms(payload) {
  const { data } = await http.post('/auth/sms/login', payload)
  return data
}

/**
 * POST /api/auth/logout
 * @returns {Promise<void>}
 */
export async function logout() {
  try {
    await http.post('/auth/logout')
  } catch {
    // 登出失败也无所谓 —— 本地状态照样清掉
  }
}

/**
 * GET /api/me
 * 返回当前登录用户；未认证或请求失败时返回 null（视为未登录）。
 * @returns {Promise<Object|null>}
 */
export async function fetchMe() {
  try {
    const { data } = await http.get('/me')
    return data
  } catch {
    return null
  }
}
