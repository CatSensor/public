<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink, useRoute } from 'vue-router'

import { buildPagePath, type SeoRouteMeta } from '@/router/route'

type FormStatus = 'idle' | 'loading' | 'success'

const REGISTER_ENDPOINT = 'https://mail-service.catsensor.ca/register'

const { t } = useI18n()
const route = useRoute()

const email = ref('')
const error = ref('')
const status = ref<FormStatus>('idle')
const position = ref<number | null>(null)
const privacyRoute = computed(() => buildPagePath('privacy', ((route.meta as SeoRouteMeta).locale ?? 'fr')))

const successFoot = computed(() => `${t('cta.form.successFoot')}`)

async function submit() {
  const submittedEmail = email.value.trim().toLowerCase()

  if (!submittedEmail || !submittedEmail.includes('@')) {
    error.value = t('cta.form.error')
    return
  }

  error.value = ''
  status.value = 'loading'

  try {
    const response = await fetch(REGISTER_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: submittedEmail,
        timestamp: new Date().toISOString(),
        device: navigator.userAgent,
        metadata: {
          locale: (route.meta as SeoRouteMeta).locale ?? 'fr',
          path: route.fullPath,
        },
      }),
    })

    const data = await response.json().catch(() => null)

    if (!response.ok) {
      throw new Error(data?.error || t('cta.form.submitError'))
    }

    position.value = Number(data?.number ?? data?.id ?? 0) || null
    status.value = 'success'
  } catch (submitError) {
    error.value = submitError instanceof Error ? submitError.message : t('cta.form.submitError')
    status.value = 'idle'
  }
}
</script>

<template>
  <div
    v-if="status === 'success'"
    class="mx-auto w-full max-w-[660px] rounded-[18px] border border-white/14 bg-white/[0.07] px-6 py-7 text-left shadow-[0_18px_50px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:px-10 sm:py-9"
  >
    <div class="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-[oklch(78%_0.07_155)] text-[oklch(30%_0.08_155)]">
      <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" class="h-[18px] w-[18px]">
        <polyline points="3,9 7,13 15,5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>

    <div class="mb-2 text-[20px] font-semibold tracking-[-0.02em] text-white">
      {{ t('cta.form.successTitle') }}
    </div>
    <div class="text-sm font-light leading-[1.6] text-white/65">
      {{ t('cta.form.successBody') }}
    </div>
    <div class="mt-[14px] text-xs font-semibold uppercase tracking-[0.04em] text-[oklch(78%_0.07_155)]">
      #{{ position }} &middot; {{ successFoot }}
    </div>
  </div>

  <div v-else class="mx-auto w-full max-w-[660px] border-y border-white/14 py-6 text-left">
    <label class="mb-3 block text-xs font-semibold text-white" for="email">Email</label>
    <form class="flex flex-col gap-[10px] sm:flex-row" @submit.prevent="submit">
      <input
        id="email"
        v-model="email"
        type="email"
        autocomplete="email"
        :placeholder="t('cta.form.placeholder')"
        class="min-w-0 flex-1 rounded-[10px] border border-white/35 bg-white/[0.08] px-[18px] py-[13px] text-sm text-white outline-none transition placeholder:text-white/40 focus:border-[oklch(78%_0.07_155)] focus:bg-white/[0.11]"
      />
      <button
        type="submit"
        :disabled="status === 'loading'"
        class="inline-flex w-full items-center justify-center gap-2 rounded-[10px] bg-[oklch(78%_0.07_155)] px-[22px] py-[11px] text-sm font-semibold tracking-[-0.01em] text-[oklch(25%_0.06_155)] transition hover:-translate-y-px hover:bg-[oklch(84%_0.065_155)] active:translate-y-0 disabled:cursor-wait sm:w-auto"
      >
        <span v-if="status === 'loading'" class="inline-flex items-center gap-[7px]">
          <span class="inline-block h-[13px] w-[13px] animate-spin rounded-full border-[1.5px] border-white/35 border-t-white"></span>
          {{ t('cta.form.loading') }}
        </span>
        <span v-else>{{ t('cta.form.button') }}</span>
      </button>
    </form>

    <p v-if="error" class="mt-3 text-xs text-[oklch(82%_0.1_30)]">{{ error }}</p>
    <p class="mt-3 text-xs text-white/45">
      {{ t('cta.form.privacyLead') }}
      <RouterLink :to="privacyRoute" class="text-[oklch(78%_0.07_155)] no-underline transition hover:text-white">{{ t('cta.form.privacyLink') }}</RouterLink>
    </p>
  </div>
</template>
