<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { usePageSeo } from '@/composables/usePageSeo'

type PolicyCard = {
  title: string
  items: string[]
}

type PolicyCommitment = {
  title: string
  body: string
}

const { locale, t, tm } = useI18n()
usePageSeo()

const policyCards = computed(() => tm('privacy.cards') as PolicyCard[])
const commitments = computed(() => tm('privacy.commitments.items') as PolicyCommitment[])
const titleLineClass = computed(() => (locale.value === 'fr' ? 'xl:whitespace-nowrap' : 'sm:whitespace-nowrap'))
</script>

<template>
  <section class="px-4 pb-10 pt-[88px] sm:px-6 md:px-10 md:pt-[92px]">
    <div class="mx-auto max-w-6xl">
      <div class="max-w-[680px]">
        <span class="mb-4 block text-[11px] font-semibold uppercase tracking-[0.13em] text-[oklch(44%_0.095_158)]">
          {{ t('privacy.hero.eyebrow') }}
        </span>
        <h1 class="text-[clamp(32px,6vw,56px)] leading-[1] font-semibold tracking-[-0.05em] text-[oklch(13%_0.01_240)]">
          <span :class="['block', titleLineClass]">{{ t('privacy.hero.titleStart') }}</span>
          <span :class="['mt-2 block font-light text-[oklch(44%_0.095_158)]', titleLineClass]">{{ t('privacy.hero.titleAccent') }}</span>
          <span :class="['mt-2 block text-[oklch(28%_0.01_240)]', titleLineClass]">{{ t('privacy.hero.titleEnd') }}</span>
        </h1>
        <p class="mt-4 max-w-[600px] text-[14px] leading-[1.65] font-light text-[oklch(48%_0.008_240)] sm:text-[15px]">
          {{ t('privacy.hero.description') }}
        </p>
      </div>

      <div class="mt-6 inline-flex items-center gap-3 rounded-[10px] border border-[oklch(84%_0.02_150)] bg-white px-4 py-2.5 text-[13px] text-[oklch(38%_0.01_240)] shadow-[0_14px_34px_rgba(0,0,0,0.04)]">
        <span class="font-medium text-[oklch(13%_0.01_240)]">{{ t('privacy.effectiveDateLabel') }}</span>
        <span>{{ t('privacy.effectiveDate') }}</span>
      </div>
    </div>
  </section>

  <section class="px-4 pb-12 sm:px-6 md:px-10 md:pb-14">
    <div class="mx-auto max-w-6xl">
      <div class="grid gap-4 lg:grid-cols-2 2xl:grid-cols-4">
        <article
          v-for="card in policyCards"
          :key="card.title"
          class="flex h-full flex-col rounded-[12px] border border-black/8 bg-white p-5 shadow-[0_18px_44px_rgba(0,0,0,0.05)]"
        >
          <h2 class="text-[18px] leading-[1.15] font-semibold tracking-[-0.03em] text-[oklch(13%_0.01_240)]">
            {{ card.title }}
          </h2>
          <ul class="mt-3 space-y-2 text-[13px] leading-[1.6] font-light text-[oklch(45%_0.01_240)] sm:text-[14px]">
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

  <section class="bg-[oklch(96.5%_0.006_110)] px-4 py-12 sm:px-6 md:px-10 md:py-14">
    <div class="mx-auto max-w-6xl">
      <div class="mb-8 max-w-[680px]">
        <span class="mb-4 block text-[11px] font-semibold uppercase tracking-[0.13em] text-[oklch(44%_0.095_158)]">
          {{ t('privacy.commitments.eyebrow') }}
        </span>
        <h2 class="max-w-[14ch] text-[clamp(28px,3.2vw,40px)] leading-[1.06] font-semibold tracking-[-0.04em] text-[oklch(13%_0.01_240)]">
          {{ t('privacy.commitments.title') }}
        </h2>
        <p class="mt-4 max-w-[660px] text-[14px] leading-[1.65] font-light text-[oklch(48%_0.008_240)] sm:text-[15px]">
          {{ t('privacy.commitments.description') }}
        </p>
      </div>

      <div class="grid gap-4 lg:grid-cols-3">
        <article
          v-for="item in commitments"
          :key="item.title"
          class="rounded-[12px] border border-[oklch(84%_0.02_150)] bg-white p-5 shadow-[0_14px_34px_rgba(0,0,0,0.04)]"
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
