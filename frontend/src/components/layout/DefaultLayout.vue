<template>
  <div class="default-layout">
    <UtilBar />
    <SiteHeader />
    <MegaNav />
    <main>
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

<script setup>
import UtilBar    from './UtilBar.vue'
import SiteHeader from './SiteHeader.vue'
import MegaNav    from './MegaNav.vue'
import SiteFooter from './SiteFooter.vue'
</script>

<style scoped>
.default-layout {
  width: 100%;
}
main {
  min-height: 60vh;
}
</style>
