<!--
  ProductCard.vue — standard product card per README spec
  Props:
    product: {
      id, series, name, price,
      salePrice?,           -- if present, show strike-through + off %
      tags[],               -- ['lim','pre','lot','new','re','sale']
      tone,                 -- 'a'–'f' (placeholder color block)
      freeShipping?,        -- show 送料無料 tag
      pointRate?,           -- show P10倍 tag when value >= 10
      imageUrl?             -- if provided, use <img> instead of .ph
    }
    rankBadge: number       -- 1–5 for ranking cards (shows colored square)
    variant: 'grid'|'row'   -- grid = default card; row = list-row layout
    isFavorite: boolean
-->
<template>
  <article class="pc-card" :class="{ 'pc-card--row': variant === 'row' }">
    <!-- Image / placeholder -->
    <div class="th" :class="!product.imageUrl ? `ph ${product.tone || 'a'}` : ''" :data-label="!product.imageUrl ? '' : undefined">
      <img v-if="product.imageUrl" :src="product.imageUrl" :alt="product.name" loading="lazy" />

      <!-- Rank badge (ranking section) -->
      <div v-if="rankBadge" class="rn">{{ rankBadge }}</div>

      <!-- Tag stack (top-left) -->
      <div class="tgs">
        <Tag v-for="t in product.tags" :key="t" :type="t" />
      </div>

      <!-- Favorite button (top-right) — hidden on ranking cards -->
      <button
        v-if="!rankBadge"
        class="fav"
        :class="{ active: isFavorite }"
        @click.prevent="$emit('toggle-favorite', product.id)"
        aria-label="お気に入り"
        type="button"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 20l-7-7a4 4 0 0 1 6-5l1 1 1-1a4 4 0 0 1 6 5z" />
        </svg>
      </button>
    </div>

    <!-- Grid / row shared info -->
    <div class="rowinfo" v-if="variant === 'row'">
      <div class="ser">{{ product.series }}</div>
      <div class="nm">{{ product.name }}</div>
      <div class="meta">
        <Tag v-if="product.freeShipping" type="ship" />
        <Tag v-if="product.pointRate >= 10" type="point" />
      </div>
    </div>

    <template v-if="variant !== 'row'">
      <div class="ser">{{ product.series }}</div>
      <div class="nm">{{ product.name }}</div>
    </template>

    <!-- Price -->
    <div v-if="variant === 'row'" class="rowbuy">
      <PriceBlock :price="product.price" :sale-price="product.salePrice ?? null" />
      <button class="addbtn" @click="$emit('add-to-cart', product.id)" type="button">カートに入れる</button>
    </div>

    <template v-else>
      <PriceBlock :price="product.price" :sale-price="product.salePrice ?? null" />
      <div class="meta">
        <Tag v-if="product.freeShipping" type="ship" />
        <Tag v-if="product.pointRate >= 10" type="point" />
      </div>
    </template>
  </article>
</template>

<script setup>
import Tag        from './Tag.vue'
import PriceBlock from './PriceBlock.vue'

defineProps({
  product: {
    type: Object,
    required: true,
  },
  rankBadge: {
    type: Number,
    default: null,
  },
  variant: {
    type: String,
    default: 'grid',
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['toggle-favorite', 'add-to-cart'])
</script>
