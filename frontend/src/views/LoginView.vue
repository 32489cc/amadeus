<template>
  <div class="login-shell">
    <!-- Minimal centered logo header (auth-only, no DefaultLayout) -->
    <header class="head login-head">
      <RouterLink to="/" class="logo">
        <span class="sq"></span>AMADEUS
      </RouterLink>
    </header>

    <!-- Split-screen: left art panel + right form card -->
    <div class="auth-wrap">

      <!-- LEFT: Art panel with navy→red diagonal gradient -->
      <div class="auth-art">
        <div class="ph e" data-label="Members"></div>
        <div class="ov">
          <RouterLink to="/" class="logo">
            <span class="sq"></span>AMADEUS
          </RouterLink>
          <div class="mid">
            <h2>会員になって、<br>もっと楽しく集めよう。</h2>
            <p>
              限定商品の予約・抽選、ポイント還元、注文履歴の管理。AMADEUS の会員特典をすべてご利用いただけます。
            </p>
          </div>
          <div class="perks">
            <div class="pk"><span class="n">1</span>新規登録で500ポイントプレゼント</div>
            <div class="pk"><span class="n">2</span>購入額に応じて最大10%ポイント還元</div>
            <div class="pk"><span class="n">3</span>限定・抽選アイテムへの優先アクセス</div>
          </div>
        </div>
      </div>

      <!-- RIGHT: Tab-switched form card -->
      <div class="auth-form">
        <div class="auth-card">

          <!-- Tab switcher -->
          <div class="tabs2">
            <a
              href="#"
              :class="{ on: activeTab === 'login' }"
              @click.prevent="activeTab = 'login'"
            >ログイン</a>
            <a
              href="#"
              :class="{ on: activeTab === 'signup' }"
              @click.prevent="activeTab = 'signup'"
            >会員登録</a>
          </div>

          <!-- LOGIN PANEL -->
          <div v-if="activeTab === 'login'">
            <h1>ログイン</h1>

            <!-- Login method sub-switch -->
            <div class="login-mode">
              <button
                type="button"
                :class="{ on: loginMode === 'password' }"
                @click="loginMode = 'password'"
              >パスワード</button>
              <button
                type="button"
                :class="{ on: loginMode === 'sms' }"
                @click="loginMode = 'sms'"
              >SMS認証コード</button>
            </div>

            <!-- PASSWORD method -->
            <template v-if="loginMode === 'password'">
            <p class="lead">メールアドレスとパスワードを入力してください。</p>

            <!-- Error message -->
            <div v-if="loginError" class="auth-error">{{ loginError }}</div>

            <form @submit.prevent="handleLogin">
              <div class="field">
                <label for="login-email">
                  メールアドレス<span class="req">必須</span>
                </label>
                <input
                  id="login-email"
                  v-model="loginForm.email"
                  type="email"
                  placeholder="you@example.com"
                  autocomplete="email"
                  required
                />
              </div>
              <div class="field">
                <label for="login-password">
                  パスワード<span class="req">必須</span>
                </label>
                <input
                  id="login-password"
                  v-model="loginForm.password"
                  type="password"
                  placeholder="••••••••"
                  autocomplete="current-password"
                  required
                />
              </div>
              <div class="frow">
                <label>
                  <input v-model="loginForm.rememberMe" type="checkbox" />
                  ログイン状態を保持
                </label>
                <a href="#">パスワードをお忘れですか？</a>
              </div>
              <button class="btn-main" type="submit" :disabled="authStore.loading">
                <span v-if="authStore.loading">処理中…</span>
                <span v-else>ログイン</span>
              </button>
            </form>
            </template>

            <!-- SMS method -->
            <template v-else>
            <p class="lead">電話番号に届いた6桁の認証コードを入力してください。</p>

            <div v-if="smsError" class="auth-error">{{ smsError }}</div>

            <form @submit.prevent="handleSmsLogin">
              <div class="field">
                <label for="sms-phone">電話番号<span class="req">必須</span></label>
                <input
                  id="sms-phone"
                  v-model="smsForm.phone"
                  type="tel"
                  inputmode="numeric"
                  placeholder="09012345678"
                  autocomplete="tel"
                  required
                />
              </div>
              <div class="field">
                <label for="sms-code">認証コード<span class="req">必須</span></label>
                <div class="code-row">
                  <input
                    id="sms-code"
                    v-model="smsForm.code"
                    type="text"
                    inputmode="numeric"
                    maxlength="6"
                    placeholder="6桁の数字"
                    autocomplete="one-time-code"
                    required
                  />
                  <button
                    type="button"
                    class="btn-code"
                    :disabled="countdown > 0 || !smsForm.phone"
                    @click="handleSendCode"
                  >
                    <span v-if="countdown > 0">{{ countdown }}秒後に再送</span>
                    <span v-else>コードを送信</span>
                  </button>
                </div>
                <div v-if="codeSent && countdown > 0" class="hint">認証コードを送信しました。</div>
              </div>
              <div class="frow">
                <label>
                  <input v-model="smsForm.rememberMe" type="checkbox" />
                  ログイン状態を保持
                </label>
              </div>
              <button class="btn-main" type="submit" :disabled="authStore.loading">
                <span v-if="authStore.loading">処理中…</span>
                <span v-else>ログイン</span>
              </button>
            </form>
            </template>

            <div class="auth-or">または</div>
            <div class="sso">
              <a href="#"><span class="ic" style="background:#06C755">L</span>LINE でログイン</a>
              <a href="#"><span class="ic" style="background:#EA4335">G</span>Google でログイン</a>
              <a href="#"><span class="ic" style="background:#1B1A18">X</span>X でログイン</a>
            </div>
            <p class="foot">
              続行することで、<a href="#">利用規約</a>および<a href="#">プライバシーポリシー</a>に同意したものとみなされます。
            </p>
          </div>

          <!-- SIGNUP PANEL -->
          <div v-if="activeTab === 'signup'">
            <h1>会員登録</h1>
            <p class="lead">登録は1分。今すぐ500ポイントを受け取れます。</p>

            <!-- Error message -->
            <div v-if="signupError" class="auth-error">{{ signupError }}</div>

            <form @submit.prevent="handleSignup">
              <div class="field">
                <label for="signup-name">
                  お名前<span class="req">必須</span>
                </label>
                <input
                  id="signup-name"
                  v-model="signupForm.name"
                  type="text"
                  placeholder="天野 奏"
                  autocomplete="name"
                  required
                />
              </div>
              <div class="field">
                <label for="signup-email">
                  メールアドレス<span class="req">必須</span>
                </label>
                <input
                  id="signup-email"
                  v-model="signupForm.email"
                  type="email"
                  placeholder="you@example.com"
                  autocomplete="email"
                  required
                />
              </div>
              <div class="field">
                <label for="signup-password">
                  パスワード<span class="req">必須</span>
                </label>
                <input
                  id="signup-password"
                  v-model="signupForm.password"
                  type="password"
                  placeholder="8文字以上"
                  autocomplete="new-password"
                  minlength="8"
                  required
                />
                <div class="hint">半角英数字8文字以上で設定してください。</div>
              </div>
              <div class="frow">
                <label>
                  <input v-model="signupForm.newsletter" type="checkbox" />
                  メールマガジンを受け取る（新着・予約・抽選）
                </label>
              </div>
              <button class="btn-main" type="submit" :disabled="authStore.loading">
                <span v-if="authStore.loading">処理中…</span>
                <span v-else>登録して500ptを受け取る</span>
              </button>
            </form>

            <div class="auth-or">または</div>
            <div class="sso">
              <a href="#"><span class="ic" style="background:#06C755">L</span>LINE で登録</a>
              <a href="#"><span class="ic" style="background:#EA4335">G</span>Google で登録</a>
            </div>
            <p class="foot">
              登録することで、<a href="#">利用規約</a>および<a href="#">プライバシーポリシー</a>に同意したものとみなされます。
            </p>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import { useRouter, useRoute, RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'
import { sendSmsCode } from '@/api/auth.js'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

// Tab state
const activeTab = ref('login')

// Login method sub-mode: 'password' | 'sms'
const loginMode = ref('password')

// Login form state
const loginForm = ref({
  email: '',
  password: '',
  rememberMe: true,
})
const loginError = ref('')

// SMS login state
const smsForm = ref({
  phone: '',
  code: '',
  rememberMe: true,
})
const smsError = ref('')
const codeSent = ref(false)
const countdown = ref(0)
let countdownTimer = null

function startCountdown(seconds) {
  countdown.value = seconds
  countdownTimer = setInterval(() => {
    countdown.value -= 1
    if (countdown.value <= 0) {
      clearInterval(countdownTimer)
      countdownTimer = null
    }
  }, 1000)
}

// 日本の携帯番号: ハイフン無し・先頭0の10〜11桁
function isValidPhone(phone) {
  return /^0\d{9,10}$/.test(phone)
}

// 验证码发送
async function handleSendCode() {
  smsError.value = ''
  const phone = smsForm.value.phone.trim()
  if (!isValidPhone(phone)) {
    smsError.value = '電話番号の形式が正しくありません。'
    return
  }
  try {
    const res = await sendSmsCode({ phone })
    codeSent.value = true
    startCountdown(res?.resendAfter ?? 60)
  } catch (err) {
    smsError.value =
      err?.response?.data?.message ||
      '認証コードの送信に失敗しました。しばらくしてからお試しください。'
  }
}

// 验证码登录
async function handleSmsLogin() {
  smsError.value = ''
  if (!isValidPhone(smsForm.value.phone.trim())) {
    smsError.value = '電話番号の形式が正しくありません。'
    return
  }
  if (!/^\d{6}$/.test(smsForm.value.code)) {
    smsError.value = '認証コードは6桁の数字です。'
    return
  }
  try {
    await authStore.loginWithSms({
      phone: smsForm.value.phone.trim(),
      code: smsForm.value.code,
      rememberMe: smsForm.value.rememberMe,
    })
    const redirect = route.query.redirect || '/mypage'
    router.push(redirect)
  } catch (err) {
    smsError.value =
      err?.response?.data?.message ||
      '認証コードが正しくないか、有効期限が切れています。'
  }
}

onUnmounted(() => {
  if (countdownTimer) clearInterval(countdownTimer)
})

// Signup form state
const signupForm = ref({
  name: '',
  email: '',
  password: '',
  newsletter: false,
})
const signupError = ref('')

// Handle login submission
async function handleLogin() {
  loginError.value = ''
  try {
    await authStore.login({
      email: loginForm.value.email,
      password: loginForm.value.password,
      rememberMe: loginForm.value.rememberMe,
    })
    // Redirect to the originally requested page, or mypage
    const redirect = route.query.redirect || '/mypage'
    router.push(redirect)
  } catch (err) {
    loginError.value =
      err?.response?.data?.message ||
      'メールアドレスまたはパスワードが正しくありません。'
  }
}

// Handle signup submission
async function handleSignup() {
  signupError.value = ''
  if (signupForm.value.password.length < 8) {
    signupError.value = 'パスワードは8文字以上で設定してください。'
    return
  }
  try {
    await authStore.register({
      name: signupForm.value.name,
      email: signupForm.value.email,
      password: signupForm.value.password,
      newsletter: signupForm.value.newsletter,
    })
    // After registration, go to mypage
    router.push('/mypage')
  } catch (err) {
    signupError.value =
      err?.response?.data?.message ||
      '登録に失敗しました。入力内容をご確認ください。'
  }
}
</script>

<style scoped>
/* ---- Shell ---- */
.login-shell {
  width: 100%;
}

/* Minimal centered logo header */
.login-head {
  justify-content: center;
  border-bottom: 1px solid var(--line);
}

/* ---- Error banner ---- */
.auth-error {
  background: #fdf0f1;
  border: 1px solid var(--red);
  border-radius: 4px;
  color: var(--red);
  font-size: 13px;
  font-weight: 500;
  padding: 11px 14px;
  margin-bottom: 20px;
  line-height: 1.5;
}

/* ---- Disabled button state ---- */
.btn-main:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}
.btn-main:disabled:hover {
  background: var(--red);
}

/* ---- Login method sub-switch ---- */
.login-mode {
  display: flex;
  gap: 8px;
  margin-bottom: 22px;
}
.login-mode button {
  flex: 1;
  padding: 9px;
  font-family: var(--sans);
  font-size: 12.5px;
  font-weight: 700;
  color: var(--ink2);
  background: #fff;
  border: 1px solid var(--line2);
  border-radius: 4px;
  cursor: pointer;
}
.login-mode button.on {
  color: var(--red);
  border-color: var(--red);
  background: #fdf0f1;
}

/* ---- SMS code input + send button row ---- */
.code-row {
  display: flex;
  gap: 8px;
}
.code-row input {
  flex: 1;
  letter-spacing: .3em;
}
.btn-code {
  flex: none;
  white-space: nowrap;
  padding: 0 16px;
  font-family: var(--sans);
  font-size: 12.5px;
  font-weight: 700;
  color: var(--ink);
  background: #fff;
  border: 1px solid var(--ink);
  border-radius: 4px;
  cursor: pointer;
}
.btn-code:hover:not(:disabled) {
  background: var(--ink);
  color: #fff;
}
.btn-code:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
