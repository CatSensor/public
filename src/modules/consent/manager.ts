import { computed, ref } from 'vue'

import type { ConsentManager, ConsentModuleConfig, ConsentRecord } from '@/modules/consent/types'

const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000

function getDefaultChoices(config: ConsentModuleConfig) {
  return Object.fromEntries(config.categories.map((category) => [category.id, category.required]))
}

function normalizeChoices(config: ConsentModuleConfig, choices: Record<string, boolean>) {
  return Object.fromEntries(
    config.categories.map((category) => [category.id, category.required || choices[category.id] === true]),
  )
}

function readStoredRecord(config: ConsentModuleConfig): ConsentRecord | null {
  try {
    const value = window.localStorage.getItem(config.storageKey)

    if (!value) {
      return null
    }

    const record = JSON.parse(value) as Partial<ConsentRecord>
    const isCurrent = record.policyVersion === config.policyVersion
    const isUnexpired = typeof record.expiresAt === 'string' && new Date(record.expiresAt).getTime() > Date.now()

    if (!isCurrent || !isUnexpired || !record.choices || typeof record.choices !== 'object') {
      window.localStorage.removeItem(config.storageKey)
      return null
    }

    return record as ConsentRecord
  } catch {
    try {
      window.localStorage.removeItem(config.storageKey)
    } catch {
      // Consent still works for the current page when browser storage is unavailable.
    }
    return null
  }
}

export function createConsentManager(config: ConsentModuleConfig): ConsentManager & { initialize: () => void } {
  const services = config.services ?? []
  const choices = ref<Record<string, boolean>>(getDefaultChoices(config))
  const isReady = ref(false)
  const hasDecision = ref(false)
  const serviceStates = new Map<string, boolean>()

  const isAllowed = (categoryId: string) => {
    const category = config.categories.find((item) => item.id === categoryId)
    return category?.required === true || (hasDecision.value && choices.value[categoryId] === true)
  }

  const applyServices = () => {
    for (const service of services) {
      const shouldBeActive = isAllowed(service.categoryId)

      if (serviceStates.get(service.id) === shouldBeActive) {
        continue
      }

      serviceStates.set(service.id, shouldBeActive)
      void (shouldBeActive ? service.activate() : service.deactivate())
    }
  }

  const save = (nextChoices: Record<string, boolean>) => {
    choices.value = normalizeChoices(config, nextChoices)
    hasDecision.value = true

    const updatedAt = new Date()
    const record: ConsentRecord = {
      policyVersion: config.policyVersion,
      choices: choices.value,
      updatedAt: updatedAt.toISOString(),
      expiresAt: new Date(updatedAt.getTime() + config.lifetimeDays * DAY_IN_MILLISECONDS).toISOString(),
    }

    try {
      window.localStorage.setItem(config.storageKey, JSON.stringify(record))
    } catch {
      // Keep the in-memory choice active even when browser storage is unavailable.
    }
    applyServices()
  }

  return {
    categories: config.categories,
    choices,
    isReady,
    hasDecision,
    optionalCategories: computed(() => config.categories.filter((category) => !category.required)),
    acceptAll: () => save(Object.fromEntries(config.categories.map((category) => [category.id, true]))),
    refuseOptional: () => save(getDefaultChoices(config)),
    save,
    isAllowed,
    initialize: () => {
      if (typeof window === 'undefined') {
        return
      }

      const record = readStoredRecord(config)

      if (record) {
        choices.value = normalizeChoices(config, record.choices)
        hasDecision.value = true
      }

      applyServices()
      isReady.value = true
    },
  }
}
