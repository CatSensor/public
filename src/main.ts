import { ViteSSG } from 'vite-ssg'
import App from '@/App.vue'
import 'aos/dist/aos.css'
import '@/styles/app.css'
import { getLocaleFromPath, i18n, persistLocale, syncDocumentLanguage, type AppLocale } from '@/i18n'
import { routes, scrollBehavior, type SeoRouteMeta } from '@/router/route'
import { createGoogleAnalytics } from '@/modules/analytics/googleAnalytics'
import { consentConfig } from '@/modules/consent/config'
import { createConsentModule } from '@/modules/consent'

function applyRouteLocale(path: string, meta: Partial<SeoRouteMeta>) {
  const locale = (meta.locale ?? getLocaleFromPath(path)) as AppLocale
  i18n.global.locale.value = locale
  persistLocale(locale)
  syncDocumentLanguage(locale)
}

export const createApp = ViteSSG(App, { routes, scrollBehavior }, ({ app, router }) => {
  app.use(i18n)

  const googleAnalytics = createGoogleAnalytics('G-ZFBCVKM1V1')
  app.use(createConsentModule({
    ...consentConfig,
    services: [googleAnalytics.service],
  }))

  router.beforeEach((to) => {
    applyRouteLocale(to.path, to.meta as Partial<SeoRouteMeta>)
  })

  router.afterEach((to) => {
    if (typeof document !== 'undefined') {
      queueMicrotask(() => googleAnalytics.trackPageView(to.fullPath, document.title))
    }
  })
})
