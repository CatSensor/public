<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

type ConsentChoice = 'essential' | 'all'

const STORAGE_KEY = 'catsensor-cookie-consent'

const { t } = useI18n()
const consent = ref<ConsentChoice | null>(null)
const isReady = ref(false)

const isVisible = computed(() => isReady.value && consent.value === null)

function saveConsent(choice: ConsentChoice) {
  consent.value = choice
  window.localStorage.setItem(STORAGE_KEY, choice)
}

onMounted(() => {
  const storedConsent = window.localStorage.getItem(STORAGE_KEY)

  if (storedConsent === 'essential' || storedConsent === 'all') {
    consent.value = storedConsent
  }

  isReady.value = true
})
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="translate-y-4 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-4 opacity-0"
  >
    <aside
      v-if="isVisible"
      class="fixed inset-x-4 bottom-4 z-[120] sm:inset-x-auto sm:right-6 sm:bottom-6 sm:max-w-[420px]"
      aria-live="polite"
      :aria-label="t('cookie.title')"
    >
      <div class="rounded-[6px] border border-black/8 bg-[oklch(98.5%_0.003_90_/_0.96)] p-5 shadow-[0_18px_44px_rgba(0,0,0,0.12)] backdrop-blur-[18px] sm:p-6">
        <div class="mb-2 text-[16px] font-semibold tracking-[-0.02em] text-[oklch(13%_0.01_240)]">
          {{ t('cookie.title') }}
        </div>
        <p class="text-[13px] leading-[1.65] font-light text-[oklch(45%_0.01_240)] sm:text-[14px]">
          {{ t('cookie.body') }}
          <RouterLink :to="{ name: 'privacy' }" class="text-[oklch(44%_0.095_158)] no-underline">
            {{ t('cookie.link') }}
          </RouterLink>
        </p>

        <div class="mt-4 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-[6px] border border-black/12 bg-white px-4 py-2.5 text-sm font-medium text-[oklch(13%_0.01_240)] transition hover:border-[oklch(44%_0.095_158)] hover:text-[oklch(44%_0.095_158)]"
            @click="saveConsent('essential')"
          >
            {{ t('cookie.essential') }}
          </button>
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-[6px] bg-[oklch(44%_0.095_158)] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[oklch(52%_0.095_158)]"
            @click="saveConsent('all')"
          >
            {{ t('cookie.accept') }}
          </button>
        </div>
      </div>
    </aside>
  </Transition>
</template>
