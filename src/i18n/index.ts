import { createI18n } from 'vue-i18n'

import en from '@/i18n/en.json'
import fr from '@/i18n/fr.json'

export type AppLocale = 'en' | 'fr'

const STORAGE_KEY = 'catsenser-locale'

const messages = {
  en,
  fr,
}

function getBrowserLocale(): AppLocale {
  if (typeof navigator !== 'undefined' && navigator.language.toLowerCase().startsWith('fr')) {
    return 'fr'
  }

  return 'en'
}

function getInitialLocale(): AppLocale {
  if (typeof window === 'undefined') {
    return 'en'
  }

  const storedLocale = window.localStorage.getItem(STORAGE_KEY)

  if (storedLocale === 'en' || storedLocale === 'fr') {
    return storedLocale
  }

  return getBrowserLocale()
}

export function syncDocumentLanguage(locale: AppLocale) {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = locale
  }
}

export function persistLocale(locale: AppLocale) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, locale)
  }
}

export const i18n = createI18n({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: 'en',
  messages,
})

syncDocumentLanguage(i18n.global.locale.value as AppLocale)
