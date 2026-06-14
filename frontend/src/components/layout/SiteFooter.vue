<template>
  <footer>
    <!-- Payment chips -->
    <div class="f-pay">
      <span v-for="chip in paymentMethods" :key="chip" class="chip">{{ chip }}</span>
    </div>

    <!-- Link grid -->
    <div class="f-grid">
      <!-- Brand column -->
      <div class="b">
        <RouterLink to="/" class="logo"><span class="sq"></span>AMADEUS</RouterLink>
        <p>こだわりの造形と彩色で届ける、フィギュア・プラモデル・グッズの専門ストア。</p>
        <div class="soc">
          <!-- Twitter/X -->
          <a href="#" aria-label="X (Twitter)">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22 5.8c-.7.3-1.5.5-2.3.6.8-.5 1.4-1.3 1.7-2.2-.8.5-1.7.8-2.6 1a4 4 0 0 0-6.8 3.6A11.3 11.3 0 0 1 3.6 4.6a4 4 0 0 0 1.2 5.3c-.6 0-1.2-.2-1.7-.5a4 4 0 0 0 3.2 3.9c-.5.1-1.1.2-1.7.1a4 4 0 0 0 3.7 2.8A8 8 0 0 1 2 18.6 11.3 11.3 0 0 0 8.1 20c7.4 0 11.4-6.1 11.4-11.4v-.5c.8-.6 1.5-1.3 2-2.1z"/>
            </svg>
          </a>
          <!-- Instagram -->
          <a href="#" aria-label="Instagram">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/>
              <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/>
              <circle cx="17" cy="7" r="1.2" fill="currentColor"/>
            </svg>
          </a>
          <!-- YouTube -->
          <a href="#" aria-label="YouTube">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21 7.2a3 3 0 0 0-2.1-2.1C17 4.6 12 4.6 12 4.6s-5 0-6.9.5A3 3 0 0 0 3 7.2 31 31 0 0 0 2.6 12 31 31 0 0 0 3 16.8a3 3 0 0 0 2.1 2.1c1.9.5 6.9.5 6.9.5s5 0 6.9-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 21.4 12 31 31 0 0 0 21 7.2zM10 15V9l5 3z"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- Link columns -->
      <div class="fc">
        <h4>ショッピング</h4>
        <RouterLink to="/list?sort=new">新着商品</RouterLink>
        <RouterLink to="/list?view=ranking">ランキング</RouterLink>
        <RouterLink to="/list?status=preorder">予約・抽選</RouterLink>
        <a href="#">特集一覧</a>
        <RouterLink to="/list?status=sale">SALE</RouterLink>
      </div>
      <div class="fc">
        <h4>カテゴリー</h4>
        <RouterLink to="/list?category=フィギュア">フィギュア</RouterLink>
        <RouterLink to="/list?category=プラモデル">プラモデル</RouterLink>
        <RouterLink to="/list?category=アパレル">アパレル</RouterLink>
        <RouterLink to="/list?category=文具・雑貨">文具・雑貨</RouterLink>
        <RouterLink to="/list?category=アクセサリー">アクセサリー</RouterLink>
      </div>
      <div class="fc">
        <h4>サポート</h4>
        <a href="#">ご利用ガイド</a>
        <a href="#">配送・送料について</a>
        <a href="#">返品・交換</a>
        <a href="#">よくあるご質問</a>
        <a href="#">お問い合わせ</a>
      </div>
      <div class="fc">
        <h4>会員・アカウント</h4>
        <RouterLink to="/login">ログイン</RouterLink>
        <RouterLink to="/login">会員登録</RouterLink>
        <RouterLink to="/mypage">マイページ</RouterLink>
        <RouterLink to="/mypage">注文履歴</RouterLink>
        <a href="#">ポイントについて</a>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="f-bot">
      <span>© 2026 AMADEUS Inc. All Rights Reserved.</span>
      <div class="lks">
        <a href="#">特定商取引法に基づく表記</a>
        <a href="#">プライバシーポリシー</a>
        <a href="#">利用規約</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const paymentMethods = ['VISA', 'Mastercard', 'JCB', 'AMEX', 'PayPay', '楽天ペイ', 'コンビニ後払い', '代金引換']
</script>
