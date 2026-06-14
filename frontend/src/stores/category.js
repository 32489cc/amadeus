/**
 * AMADEUS — Category tree store (shared, fetch-once)
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchCategories } from '@/api/categories.js'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref([])   // 分类树（含 children）
  const loaded     = ref(false)
  let inflight = null          // 进行中的请求，防并发重复

  // 整个应用生命周期只请求一次；force=true 强制刷新
  async function load(force = false) {
    if (loaded.value && !force) return categories.value
    if (inflight) return inflight
    inflight = fetchCategories()
      .then((data) => {
        categories.value = data || []
        loaded.value = true
        return categories.value
      })
      .finally(() => { inflight = null })
    return inflight
  }

  return { categories, loaded, load }
})
