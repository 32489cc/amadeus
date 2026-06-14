<template>
  <nav class="nav" aria-label="メインナビゲーション">
    <div class="in">
      <RouterLink to="/list" class="all">全カテゴリー</RouterLink>
      <RouterLink to="/list?sort=new">新着</RouterLink>
      <RouterLink to="/list?view=series">作品から探す</RouterLink>
      <RouterLink to="/list?category=フィギュア">フィギュア</RouterLink>
      <RouterLink to="/list?category=プラモデル">プラモデル</RouterLink>
      <RouterLink to="/list?category=アパレル">アパレル</RouterLink>
      <RouterLink to="/list?category=文具・雑貨">文具・雑貨</RouterLink>
      <RouterLink to="/list?status=preorder" class="hot">予約</RouterLink>
      <RouterLink to="/list?status=lottery" class="hot">抽選</RouterLink>
      <RouterLink to="/list?status=sale" class="hot">SALE</RouterLink>
      <span class="sp"></span>
      <span class="mini">送料無料 ¥10,000以上</span>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
