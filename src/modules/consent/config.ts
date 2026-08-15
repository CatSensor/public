import type { ConsentModuleConfig } from '@/modules/consent/types'

export const CONSENT_STORAGE_KEY = 'catsensor-consent-preferences'

export const consentConfig = {
  storageKey: CONSENT_STORAGE_KEY,
  policyVersion: '2026-08-14',
  lifetimeDays: 180,
  categories: [
    {
      id: 'necessary',
      required: true,
      titleKey: 'cookie.categories.necessary.title',
      descriptionKey: 'cookie.categories.necessary.description',
    },
    {
      id: 'analytics',
      required: false,
      titleKey: 'cookie.categories.analytics.title',
      descriptionKey: 'cookie.categories.analytics.description',
    },
  ],
} satisfies ConsentModuleConfig
