<template>
  <div class="util">
    <div class="in">
      <div class="l">
        <a href="#">ストア案内</a>
        <a href="#">配送・送料</a>
        <a href="#">よくあるご質問</a>
        <a href="#">お問い合わせ</a>
      </div>
      <div class="r">
        <template v-if="auth.isLoggedIn">
          <span class="pt">★ {{ auth.pointBalance.toLocaleString('ja-JP') }} pt 利用可能</span>
          <a href="#">日本語 / EN</a>
          <a href="#">{{ auth.userName }}さん</a>
          <a href="#" @click.prevent="handleLogout">ログアウト</a>
        </template>
        <template v-else>
          <a href="#">日本語 / EN</a>
          <RouterLink to="/login">会員登録</RouterLink>
          <RouterLink to="/login">ログイン</RouterLink>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'

const auth   = useAuthStore()
const router = useRouter()

async function handleLogout() {
  await auth.logout()
  router.push('/')
}
</script>
