import { ViteSSG } from 'vite-ssg'
import App from '@/App.vue'
import 'aos/dist/aos.css'
import '@/styles/app.css'
import { getLocaleFromPath, i18n, persistLocale, syncDocumentLanguage, type AppLocale } from '@/i18n'
import { routes, scrollBehavior, type SeoRouteMeta } from '@/router/route'

function applyRouteLocale(path: string, meta: Partial<SeoRouteMeta>) {
  const locale = (meta.locale ?? getLocaleFromPath(path)) as AppLocale
  i18n.global.locale.value = locale
  persistLocale(locale)
  syncDocumentLanguage(locale)
}

export const createApp = ViteSSG(App, { routes, scrollBehavior }, ({ app, router }) => {
  app.use(i18n)

  router.beforeEach((to) => {
    applyRouteLocale(to.path, to.meta as Partial<SeoRouteMeta>)
  })
})
