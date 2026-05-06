<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

type FormStatus = 'idle' | 'loading' | 'success'

const { t } = useI18n()

const email = ref('')
const error = ref('')
const status = ref<FormStatus>('idle')
const position = ref<number | null>(null)
const privacyHref = '/privacy'

const successFoot = computed(() => `${t('cta.form.successFoot')}`)

let submitTimer: ReturnType<typeof setTimeout> | null = null

function submit() {
  if (!email.value || !email.value.includes('@')) {
    error.value = t('cta.form.error')
    return
  }

  error.value = ''
  status.value = 'loading'

  submitTimer = window.setTimeout(() => {
    position.value = Math.floor(Math.random() * 40) + 510
    status.value = 'success'
  }, 1000)
}

onBeforeUnmount(() => {
  if (submitTimer) {
    window.clearTimeout(submitTimer)
  }
})
</script>

<template>
  <div
    v-if="status === 'success'"
    class="w-full max-w-[420px] bg-white px-6 py-7 shadow-[0_4px_24px_rgba(0,0,0,0.06)] sm:px-10 sm:py-9"
  >
    <div class="mb-4 flex h-9 w-9 items-center justify-center bg-[oklch(95%_0.032_150)] text-[oklch(44%_0.095_158)]">
      <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" class="h-[18px] w-[18px]">
        <polyline points="3,9 7,13 15,5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>

    <div class="mb-2 text-[20px] font-semibold tracking-[-0.02em] text-[oklch(13%_0.01_240)]">
      {{ t('cta.form.successTitle') }}
    </div>
    <div class="text-sm font-light leading-[1.6] text-[oklch(48%_0.008_240)]">
      {{ t('cta.form.successBody') }}
    </div>
    <div class="mt-[14px] text-xs font-semibold uppercase tracking-[0.04em] text-[oklch(44%_0.095_158)]">
      #{{ position }} &middot; {{ successFoot }}
    </div>
  </div>

  <div v-else>
    <form class="mb-4 flex max-w-[420px] flex-col gap-[10px] sm:flex-row" @submit.prevent="submit">
      <label class="sr-only" for="email">Email</label>
      <input
        id="email"
        v-model="email"
        type="email"
        autocomplete="email"
        :placeholder="t('cta.form.placeholder')"
        class="min-w-0 flex-1 rounded-[6px] border border-black/14 bg-white px-[18px] py-[13px] text-sm text-[oklch(13%_0.01_240)] outline-none transition focus:border-[oklch(44%_0.095_158)]"
      />
      <button
        type="submit"
        :disabled="status === 'loading'"
        class="inline-flex w-full items-center justify-center gap-2 rounded-[6px] bg-[oklch(44%_0.095_158)] px-[22px] py-[11px] text-sm font-medium tracking-[-0.01em] text-white transition hover:-translate-y-px hover:bg-[oklch(52%_0.095_158)] active:translate-y-0 disabled:cursor-wait sm:w-auto"
      >
        <span v-if="status === 'loading'" class="inline-flex items-center gap-[7px]">
          <span class="inline-block h-[13px] w-[13px] animate-spin rounded-full border-[1.5px] border-white/35 border-t-white"></span>
          {{ t('cta.form.loading') }}
        </span>
        <span v-else>{{ t('cta.form.button') }}</span>
      </button>
    </form>

    <p v-if="error" class="mb-2 text-xs text-[oklch(50%_0.12_30)]">{{ error }}</p>
    <p class="text-xs text-[oklch(72%_0.006_240)]">
      {{ t('cta.form.privacyLead') }}
      <RouterLink :to="privacyHref" class="text-[oklch(44%_0.095_158)] no-underline">{{ t('cta.form.privacyLink') }}</RouterLink>
    </p>
  </div>
</template>
