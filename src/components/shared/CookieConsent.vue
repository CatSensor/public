<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink, useRoute } from 'vue-router'

import { useConsent } from '@/modules/consent'
import { buildPagePath, type SeoRouteMeta } from '@/router/route'

const { t } = useI18n()
const route = useRoute()
const consent = useConsent()
const dialog = ref<HTMLDialogElement | null>(null)
const draftChoices = ref<Record<string, boolean>>({})

const showBanner = computed(() => consent.isReady.value && !consent.hasDecision.value)
const showSettingsButton = computed(() => consent.isReady.value && consent.hasDecision.value)
const privacyRoute = computed(() => buildPagePath('privacy', ((route.meta as SeoRouteMeta).locale ?? 'fr')))

async function openSettings() {
  draftChoices.value = { ...consent.choices.value }
  await nextTick()
  dialog.value?.showModal()
}

function closeSettings() {
  dialog.value?.close()
}

function saveChoices() {
  consent.save(draftChoices.value)
  closeSettings()
}

function acceptAll() {
  consent.acceptAll()
  closeSettings()
}

function refuseOptional() {
  consent.refuseOptional()
  closeSettings()
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out motion-reduce:transition-none"
    enter-from-class="translate-y-4 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-200 ease-in motion-reduce:transition-none"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-4 opacity-0"
  >
    <aside
      v-if="showBanner"
      class="fixed inset-x-4 bottom-4 z-[120] sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-[460px]"
      aria-live="polite"
      :aria-label="t('cookie.title')"
    >
      <div class="rounded-[10px] border border-black/10 bg-[oklch(98.5%_0.003_90_/_0.98)] p-5 shadow-[0_18px_48px_rgba(0,0,0,0.16)] backdrop-blur-[18px] sm:p-6">
        <p class="text-[11px] font-semibold uppercase tracking-[0.13em] text-[oklch(44%_0.095_158)]">
          {{ t('cookie.eyebrow') }}
        </p>
        <h2 class="mt-2 text-[20px] font-semibold tracking-[-0.025em] text-[oklch(13%_0.01_240)]">
          {{ t('cookie.title') }}
        </h2>
        <p class="mt-2 text-[14px] leading-[1.65] font-light text-[oklch(40%_0.01_240)]">
          {{ t('cookie.body') }}
        </p>
        <p class="mt-2 text-[12px] leading-[1.55] text-[oklch(48%_0.01_240)]">
          {{ t('cookie.localStorageNote') }}
          <RouterLink :to="privacyRoute" class="font-medium text-[oklch(38%_0.095_158)] underline decoration-black/20 underline-offset-2">
            {{ t('cookie.link') }}
          </RouterLink>
        </p>

        <div class="mt-5 grid gap-2 sm:grid-cols-3">
          <button type="button" class="cookie-choice-button" @click="refuseOptional">
            {{ t('cookie.refuse') }}
          </button>
          <button type="button" class="cookie-choice-button" @click="openSettings">
            {{ t('cookie.customize') }}
          </button>
          <button type="button" class="cookie-choice-button" @click="acceptAll">
            {{ t('cookie.accept') }}
          </button>
        </div>
      </div>
    </aside>
  </Transition>

  <Transition
    enter-active-class="transition duration-200 ease-out motion-reduce:transition-none"
    enter-from-class="scale-90 opacity-0"
    enter-to-class="scale-100 opacity-100"
  >
    <button
      v-if="showSettingsButton"
      type="button"
      class="fixed bottom-4 left-4 z-[110] grid size-12 place-items-center rounded-full border border-black/10 bg-white text-[oklch(30%_0.055_158)] shadow-[0_10px_28px_rgba(0,0,0,0.14)] transition hover:-translate-y-0.5 hover:border-[oklch(44%_0.095_158)] hover:text-[oklch(44%_0.095_158)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[oklch(44%_0.095_158)] motion-reduce:transition-none sm:bottom-6 sm:left-6"
      :aria-label="t('cookie.openSettings')"
      :title="t('cookie.openSettings')"
      @click="openSettings"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" class="size-6" fill="none" stroke="currentColor" stroke-width="1.8">
        <path d="M20.4 13.2A8.5 8.5 0 1 1 10.8 3.6a4 4 0 0 0 4.8 4.8 4 4 0 0 0 4.8 4.8Z" />
        <circle cx="8.2" cy="13.2" r="1" fill="currentColor" stroke="none" />
        <circle cx="12.6" cy="17" r="1" fill="currentColor" stroke="none" />
        <circle cx="7.4" cy="8.4" r="1" fill="currentColor" stroke="none" />
      </svg>
    </button>
  </Transition>

  <dialog
    ref="dialog"
    class="m-auto h-[calc(100dvh-32px)] max-h-[760px] w-[min(620px,calc(100vw-32px))] overflow-hidden rounded-[12px] border border-black/10 bg-[oklch(98.5%_0.003_90)] p-0 text-[oklch(13%_0.01_240)] shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop:bg-black/45 sm:h-auto sm:max-h-[min(760px,calc(100dvh-32px))]"
    :aria-labelledby="'cookie-settings-title'"
    @cancel="closeSettings"
  >
    <form method="dialog" class="flex h-full min-h-0 max-h-[min(760px,calc(100dvh-32px))] flex-col overflow-hidden" @submit.prevent="saveChoices">
      <div class="flex shrink-0 items-start justify-between gap-6 border-b border-black/8 px-5 py-5 sm:px-7 sm:py-6">
        <div>
          <p class="text-[11px] font-semibold uppercase tracking-[0.13em] text-[oklch(44%_0.095_158)]">
            {{ t('cookie.dialogEyebrow') }}
          </p>
          <h2 id="cookie-settings-title" class="mt-2 text-[24px] font-semibold tracking-[-0.035em]">
            {{ t('cookie.dialogTitle') }}
          </h2>
          <p class="mt-2 max-w-[50ch] text-[14px] leading-[1.6] font-light text-[oklch(42%_0.01_240)]">
            {{ t('cookie.dialogBody') }}
          </p>
        </div>
        <button
          type="button"
          class="grid size-11 shrink-0 place-items-center rounded-full border border-black/10 bg-white text-xl leading-none transition hover:border-black/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[oklch(44%_0.095_158)]"
          :aria-label="t('cookie.close')"
          @click="closeSettings"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>

      <div class="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-7">
        <div class="space-y-3">
          <label
            v-for="category in consent.categories"
            :key="category.id"
            class="flex cursor-pointer items-start gap-4 rounded-[8px] border border-black/9 bg-white p-4 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[oklch(44%_0.095_158)] sm:p-5"
            :class="category.required ? 'cursor-default' : ''"
          >
            <span class="min-w-0 flex-1">
              <span class="flex flex-wrap items-center gap-2">
                <span class="text-[16px] font-semibold tracking-[-0.015em]">{{ t(category.titleKey) }}</span>
                <span class="rounded-full bg-[oklch(93%_0.02_150)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[oklch(35%_0.075_158)]">
                  {{ category.required ? t('cookie.alwaysActive') : t('cookie.optional') }}
                </span>
              </span>
              <span :id="`cookie-category-${category.id}`" class="mt-1.5 block text-[13px] leading-[1.6] font-light text-[oklch(44%_0.01_240)]">
                {{ t(category.descriptionKey) }}
              </span>
            </span>
            <input
              v-model="draftChoices[category.id]"
              type="checkbox"
              class="mt-1 size-5 shrink-0 accent-[oklch(44%_0.095_158)] focus-visible:outline-none"
              :disabled="category.required"
              :aria-describedby="`cookie-category-${category.id}`"
            />
          </label>
        </div>

        <p class="mt-5 text-[12px] leading-[1.6] text-[oklch(48%_0.01_240)]">
          {{ t('cookie.changeNote') }}
          <RouterLink :to="privacyRoute" class="font-medium text-[oklch(38%_0.095_158)] underline decoration-black/20 underline-offset-2" @click="closeSettings">
            {{ t('cookie.link') }}
          </RouterLink>
        </p>
      </div>

      <div class="grid shrink-0 gap-2 border-t border-black/8 bg-white/70 px-5 py-4 sm:grid-cols-3 sm:px-7 sm:py-5">
        <button type="button" class="cookie-choice-button" @click="refuseOptional">
          {{ t('cookie.refuse') }}
        </button>
        <button type="submit" class="cookie-choice-button">
          {{ t('cookie.save') }}
        </button>
        <button type="button" class="cookie-choice-button" @click="acceptAll">
          {{ t('cookie.accept') }}
        </button>
      </div>
    </form>
  </dialog>
</template>

<style scoped>
.cookie-choice-button {
  min-height: 44px;
  border: 1px solid color-mix(in oklch, black 14%, transparent);
  border-radius: 6px;
  background: white;
  padding: 0.65rem 0.8rem;
  color: oklch(20% 0.01 240);
  font-size: 0.8125rem;
  font-weight: 600;
  line-height: 1.2;
  transition: border-color 160ms ease, color 160ms ease, background-color 160ms ease;
}

.cookie-choice-button:hover {
  border-color: oklch(44% 0.095 158);
  color: oklch(35% 0.095 158);
  background: oklch(98% 0.01 150);
}

.cookie-choice-button:focus-visible {
  outline: 2px solid oklch(44% 0.095 158);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .cookie-choice-button {
    transition: none;
  }
}
</style>
