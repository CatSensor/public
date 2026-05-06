import { createApp } from 'vue'
import App from '@/App.vue'
import 'aos/dist/aos.css'
import '@/styles/app.css'
import { i18n } from '@/i18n'
import { router } from '@/router/route'

createApp(App).use(i18n).use(router).mount('#app')
