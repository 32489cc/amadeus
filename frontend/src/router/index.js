/**
 * AMADEUS — Vue Router 4
 */
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: 'AMADEUS ストア' },
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('@/views/ListView.vue'),
    meta: { title: '商品一覧 — AMADEUS' },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { title: 'ログイン / 会員登録 — AMADEUS', guestOnly: true },
  },
  {
    path: '/mypage',
    name: 'mypage',
    component: () => import('@/views/MyPageView.vue'),
    meta: { title: 'マイページ — AMADEUS', requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

// Navigation guards
router.beforeEach(async (to) => {
  // Update document title
  if (to.meta.title) document.title = to.meta.title

  const auth = useAuthStore()

  // Ensure auth is initialized before guarding
  if (!auth.initialized) await auth.init()

  // Protected route — redirect to login
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  // Guest-only route (login) — redirect logged-in users to mypage
  if (to.meta.guestOnly && auth.isLoggedIn) {
    return { name: 'mypage' }
  }
})

export default router
