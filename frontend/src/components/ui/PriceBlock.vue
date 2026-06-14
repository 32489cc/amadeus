<!--
  PriceBlock.vue — price display with optional sale state
  Props:
    price:      number  — current price (or original if on sale)
    salePrice:  number  — discounted price (optional)
    size:       'md'|'sm'  — 'md' = 18px (card default), 'sm' = 16px (ranking/mini)
-->
<template>
  <div class="pr">
    <template v-if="salePrice">
      <span class="yen">¥</span>
      <span class="now">{{ fmt(salePrice) }}</span>
      <span class="old">¥{{ fmt(price) }}</span>
      <span class="off">{{ offPercent }}%OFF</span>
    </template>
    <template v-else>
      <span class="yen">¥</span>
      <span class="now" :class="sizeClass">{{ fmt(price) }}</span>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  price:     { type: Number, required: true },
  salePrice: { type: Number, default: null },
  size:      { type: String, default: 'md' },
})

const sizeClass = computed(() => props.size === 'sm' ? 'now--sm' : '')

function fmt(n) {
  return n.toLocaleString('ja-JP')
}

const offPercent = computed(() => {
  if (!props.salePrice) return 0
  return Math.round((1 - props.salePrice / props.price) * 100)
})
</script>

<style scoped>
/* Size modifier for ranking / mini contexts */
.now--sm {
  font-size: 16px !important;
}
</style>
