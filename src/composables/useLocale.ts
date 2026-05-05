import { computed } from 'vue'

import { i18n, persistLocale, syncDocumentLanguage, type AppLocale } from '@/i18n'

export function useLocale() {
  const locale = computed<AppLocale>({
    get: () => i18n.global.locale.value as AppLocale,
    set: (value) => {
      i18n.global.locale.value = value
      persistLocale(value)
      syncDocumentLanguage(value)
    },
  })

  function toggleLocale() {
    locale.value = locale.value === 'en' ? 'fr' : 'en'
  }

  return {
    locale,
    toggleLocale,
  }
}
