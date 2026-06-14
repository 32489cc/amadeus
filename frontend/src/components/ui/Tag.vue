<!--
  Tag.vue — colored chip component
  Props:
    type: 'lim'|'pre'|'lot'|'new'|'re'|'sale'|'ship'|'point'
    label: override label text (optional, defaults from type)
-->
<template>
  <span class="tag" :class="type">{{ displayLabel }}</span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (v) => ['lim', 'pre', 'lot', 'new', 're', 'sale', 'ship', 'point'].includes(v),
  },
  label: {
    type: String,
    default: null,
  },
})

const defaultLabels = {
  lim:   '限定',
  pre:   '予約',
  lot:   '抽選',
  new:   'NEW',
  re:    '再販',
  sale:  'SALE',
  ship:  '送料無料',
  point: 'P10倍',
}

const displayLabel = computed(() => props.label ?? defaultLabels[props.type] ?? props.type)
</script>
