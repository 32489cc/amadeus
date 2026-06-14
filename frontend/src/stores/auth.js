/**
 * AMADEUS — Auth store
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fetchMe, login as apiLogin, logout as apiLogout, register as apiRegister, loginWithSms as apiLoginWithSms } from '@/api/auth.js'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)           // User object | null
  const loading = ref(false)
  const initialized = ref(false)   // True after first fetchMe attempt

  // Getters
  const isLoggedIn = computed(() => !!user.value)
  const userName   = computed(() => user.value?.name ?? '')
  const pointBalance = computed(() => user.value?.pointBalance ?? 0)
  const memberRank   = computed(() => user.value?.rank ?? '')

  // Actions
  async function init() {
    if (initialized.value) return
    loading.value = true
    try {
      user.value = await fetchMe()
    } finally {
      loading.value = false
      initialized.value = true
    }
  }

  async function login(payload) {
    loading.value = true
    try {
      const res = await apiLogin(payload)
      user.value = res.user
      if (res.token) localStorage.setItem('amadeus_token', res.token)
      return res
    } finally {
      loading.value = false
    }
  }

  async function loginWithSms(payload) {
    loading.value = true
    try {
      const res = await apiLoginWithSms(payload)
      user.value = res.user
      if (res.token) localStorage.setItem('amadeus_token', res.token)
      return res
    } finally {
      loading.value = false
    }
  }

  async function register(payload) {
    loading.value = true
    try {
      const res = await apiRegister(payload)
      user.value = res.user
      if (res.token) localStorage.setItem('amadeus_token', res.token)
      return res
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    await apiLogout()
    user.value = null
    localStorage.removeItem('amadeus_token')
  }

  return {
    user, loading, initialized,
    isLoggedIn, userName, pointBalance, memberRank,
    init, login, loginWithSms, register, logout,
  }
})
