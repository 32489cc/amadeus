import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index.js'

// Global CSS
import './assets/base.css'
import './assets/pages.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
