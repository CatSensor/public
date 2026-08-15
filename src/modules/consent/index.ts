import type { App, InjectionKey, Plugin } from 'vue'
import { inject } from 'vue'

import { createConsentManager } from '@/modules/consent/manager'
import type { ConsentManager, ConsentModuleConfig } from '@/modules/consent/types'

const consentKey: InjectionKey<ConsentManager> = Symbol('catsensor-consent')

export function createConsentModule(config: ConsentModuleConfig): Plugin {
  const manager = createConsentManager(config)

  return {
    install(app: App) {
      app.provide(consentKey, manager)
      manager.initialize()
    },
  }
}

export function useConsent() {
  const consent = inject(consentKey)

  if (!consent) {
    throw new Error('The consent module must be installed before useConsent() is called.')
  }

  return consent
}

export type { ConsentCategory, ConsentManager, ConsentModuleConfig, ConsentRecord, ConsentService } from '@/modules/consent/types'
