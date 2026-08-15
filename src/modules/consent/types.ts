import type { ComputedRef, Ref } from 'vue'

export type ConsentCategory = {
  id: string
  required: boolean
  titleKey: string
  descriptionKey: string
}

export type ConsentRecord = {
  policyVersion: string
  choices: Record<string, boolean>
  updatedAt: string
  expiresAt: string
}

export type ConsentService = {
  id: string
  categoryId: string
  activate: () => void | Promise<void>
  deactivate: () => void | Promise<void>
}

export type ConsentModuleConfig = {
  storageKey: string
  policyVersion: string
  lifetimeDays: number
  categories: ConsentCategory[]
  services?: ConsentService[]
}

export type ConsentManager = {
  categories: readonly ConsentCategory[]
  choices: Ref<Record<string, boolean>>
  isReady: Ref<boolean>
  hasDecision: Ref<boolean>
  optionalCategories: ComputedRef<ConsentCategory[]>
  acceptAll: () => void
  refuseOptional: () => void
  save: (choices: Record<string, boolean>) => void
  isAllowed: (categoryId: string) => boolean
}
