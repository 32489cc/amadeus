/**
 * AMADEUS — UI / search state store
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  // Search
  const searchCategory = ref('すべて')   // selected category in header search
  const searchQuery    = ref('')

  // List page
  const listViewMode   = ref('grid')     // 'grid' | 'rows'
  const listSort       = ref('recommended')
  const listPage       = ref(1)
  const listFilters    = ref({
    categories: [],
    series: [],
    statuses: [],
    priceMin: null,
    priceMax: null,
  })

  // Home ranking tab
  const rankingTab = ref('all')          // 'all' | 'fig' | 'kit' | 'goods'

  function setSearchCategory(cat) { searchCategory.value = cat }
  function setSearchQuery(q)      { searchQuery.value = q }
  function setListViewMode(mode)  { listViewMode.value = mode }
  function setListSort(sort)      { listSort.value = sort; listPage.value = 1 }
  function setListPage(page)      { listPage.value = page }
  function setRankingTab(tab)     { rankingTab.value = tab }

  function setListFilter(key, value) {
    listFilters.value[key] = value
    listPage.value = 1
  }

  function clearListFilters() {
    listFilters.value = {
      categories: [], series: [], statuses: [],
      priceMin: null, priceMax: null,
    }
    listPage.value = 1
  }

  return {
    searchCategory, searchQuery,
    listViewMode, listSort, listPage, listFilters,
    rankingTab,
    setSearchCategory, setSearchQuery,
    setListViewMode, setListSort, setListPage,
    setRankingTab, setListFilter, clearListFilters,
  }
})
