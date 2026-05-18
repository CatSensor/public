import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { i18n, type AppLocale } from '@/i18n'
import { getAlternateLocale, getLocalizedRouteName, type LocalizedPageId, type SeoRouteMeta } from '@/router/route'

export function useLocale() {
  const route = useRoute()
  const router = useRouter()
  const locale = computed<AppLocale>({
    get: () => i18n.global.locale.value as AppLocale,
    set: (value) => {
      i18n.global.locale.value = value
    },
  })

  async function toggleLocale() {
    const currentRouteMeta = route.meta as SeoRouteMeta
    const routeName = typeof route.name === 'string' ? route.name : ''
    const currentPage: LocalizedPageId = routeName.startsWith('about-')
      ? 'about'
      : (currentRouteMeta.pageId ?? 'home')
    const nextLocale = getAlternateLocale(locale.value)

    await router.push({
      name: getLocalizedRouteName(currentPage, nextLocale),
      hash: route.hash || undefined,
    })
  }

  return {
    locale,
    toggleLocale,
  }
}
