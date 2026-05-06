<script setup lang="ts">
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { syncDocumentLanguage } from '@/i18n'

type PolicyCard = {
  title: string
  items: string[]
}

type PolicyCommitment = {
  title: string
  body: string
}

const { locale, t, tm } = useI18n()

const policyCards = computed(() => tm('privacy.cards') as PolicyCard[])
const commitments = computed(() => tm('privacy.commitments.items') as PolicyCommitment[])

watch(
  locale,
  (value) => {
    document.title = t('privacy.meta.title')
    syncDocumentLanguage(value as 'en' | 'fr')
  },
  { immediate: true },
)
</script>

<template>
  <section class="px-4 pb-14 pt-[132px] sm:px-7 md:px-14 md:pb-20 md:pt-[156px]">
    <div class="mx-auto max-w-[1320px]">
      <div class="max-w-[760px]">
        <span class="mb-4 block text-[11px] font-semibold uppercase tracking-[0.13em] text-[oklch(44%_0.095_158)]">
          {{ t('privacy.hero.eyebrow') }}
        </span>
        <h1 class="max-w-[12ch] text-[clamp(34px,8vw,72px)] leading-[0.98] font-semibold tracking-[-0.05em] text-[oklch(13%_0.01_240)]">
          {{ t('privacy.hero.titleStart') }}
          <span class="mt-2 block font-light text-[oklch(44%_0.095_158)]">{{ t('privacy.hero.titleAccent') }}</span>
          <span class="mt-2 block text-[oklch(28%_0.01_240)]">{{ t('privacy.hero.titleEnd') }}</span>
        </h1>
        <p class="mt-6 max-w-[620px] text-[15px] leading-[1.75] font-light text-[oklch(48%_0.008_240)] sm:text-[17px]">
          {{ t('privacy.hero.description') }}
        </p>
      </div>

      <div class="mt-10 inline-flex items-center gap-3 rounded-[6px] border border-[oklch(84%_0.02_150)] bg-white px-5 py-3 text-sm text-[oklch(38%_0.01_240)] shadow-[0_14px_34px_rgba(0,0,0,0.04)]">
        <span class="font-medium text-[oklch(13%_0.01_240)]">{{ t('privacy.effectiveDateLabel') }}</span>
        <span>{{ t('privacy.effectiveDate') }}</span>
      </div>
    </div>
  </section>

  <section class="px-4 pb-16 sm:px-7 md:px-14 md:pb-20">
    <div class="mx-auto max-w-[1320px]">
      <div class="grid gap-5 lg:grid-cols-2 2xl:grid-cols-4">
        <article
          v-for="card in policyCards"
          :key="card.title"
          class="flex h-full flex-col rounded-[6px] border border-black/8 bg-white p-6 shadow-[0_18px_44px_rgba(0,0,0,0.05)] sm:p-7"
        >
          <h2 class="text-[20px] leading-[1.15] font-semibold tracking-[-0.03em] text-[oklch(13%_0.01_240)]">
            {{ card.title }}
          </h2>
          <ul class="mt-4 space-y-3 text-[14px] leading-[1.7] font-light text-[oklch(45%_0.01_240)] sm:text-[15px]">
            <li
              v-for="item in card.items"
              :key="item"
              class="flex gap-3"
            >
              <span class="mt-[10px] h-[5px] w-[5px] shrink-0 rounded-full bg-[oklch(44%_0.095_158)]"></span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>

  <section class="bg-[oklch(96.5%_0.006_110)] px-4 py-16 sm:px-7 md:px-14 md:py-20">
    <div class="mx-auto max-w-[1320px]">
      <div class="mb-10 max-w-[760px]">
        <span class="mb-4 block text-[11px] font-semibold uppercase tracking-[0.13em] text-[oklch(44%_0.095_158)]">
          {{ t('privacy.commitments.eyebrow') }}
        </span>
        <h2 class="max-w-[14ch] text-[clamp(30px,4vw,50px)] leading-[1.05] font-semibold tracking-[-0.04em] text-[oklch(13%_0.01_240)]">
          {{ t('privacy.commitments.title') }}
        </h2>
        <p class="mt-5 max-w-[700px] text-[15px] leading-[1.75] font-light text-[oklch(48%_0.008_240)] sm:text-[17px]">
          {{ t('privacy.commitments.description') }}
        </p>
      </div>

      <div class="grid gap-5 lg:grid-cols-3">
        <article
          v-for="item in commitments"
          :key="item.title"
          class="rounded-[6px] border border-[oklch(84%_0.02_150)] bg-white p-6 shadow-[0_14px_34px_rgba(0,0,0,0.04)] sm:p-7"
        >
          <h3 class="text-[18px] leading-[1.15] font-semibold tracking-[-0.02em] text-[oklch(13%_0.01_240)]">
            {{ item.title }}
          </h3>
          <p class="mt-3 text-[14px] leading-[1.75] font-light text-[oklch(45%_0.01_240)] sm:text-[15px]">
            {{ item.body }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
