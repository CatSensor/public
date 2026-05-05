<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { productImages } from '@/pages/home/content'

const { t, locale } = useI18n()

const isFrench = computed(() => locale.value === 'fr')
const heroLayoutClass = computed(() =>
  isFrench.value ? '2xl:grid-cols-2 2xl:gap-24' : 'lg:grid-cols-2 lg:gap-20 xl:gap-24',
)
const heroTextAlignClass = computed(() => (isFrench.value ? 'text-center 2xl:text-left' : 'text-center lg:text-left'))
const heroTitleClass = computed(() =>
  isFrench.value
    ? 'mx-auto mb-5 max-w-[13ch] text-[clamp(28px,6.8vw,56px)] leading-[1] font-semibold tracking-[-0.05em] text-[oklch(13%_0.01_240)] xl:max-w-[14ch] 2xl:mx-0 2xl:mb-6 2xl:max-w-none 2xl:leading-[1.02]'
    : 'mx-auto mb-5 max-w-[14ch] text-[clamp(34px,10vw,72px)] leading-[0.98] font-semibold tracking-[-0.05em] text-[oklch(13%_0.01_240)] lg:mx-0 lg:mb-6 lg:max-w-none lg:leading-[1.02]',
)
const heroImageClass = computed(() =>
  isFrench.value
    ? 'hidden items-center justify-center 2xl:flex'
    : 'hidden items-center justify-center lg:flex',
)
const heroNowrapClass = computed(() => (isFrench.value ? '2xl:whitespace-nowrap' : 'lg:whitespace-nowrap'))
</script>

<template>
  <section
    id="hero"
    :class="[
      'mx-auto grid min-h-screen max-w-[1320px] grid-cols-1 items-center gap-10 px-4 pb-14 pt-[110px] sm:px-7 sm:pb-16 md:px-14 md:pb-20 md:pt-[130px]',
      heroLayoutClass,
    ]"
  >
    <div :class="heroTextAlignClass">
      <h1
        data-aos="fade-up"
        data-aos-delay="80"
        :class="heroTitleClass"
      >
        <span :class="['block', heroNowrapClass]">{{ t('hero.titleStart') }}</span>
        <em :class="['mt-1 block not-italic font-light text-[oklch(44%_0.095_158)]', isFrench ? '2xl:mt-2' : 'lg:mt-2', heroNowrapClass]">{{ t('hero.titleAccent') }}</em>
        <span :class="['mt-1 block tracking-[-0.05em] text-[oklch(28%_0.01_240)]', isFrench ? '2xl:mt-2' : 'lg:mt-2', heroNowrapClass]">
          {{ t('hero.titleEnd') }}
        </span>
      </h1>
      <p
        data-aos="fade-up"
        data-aos-delay="160"
        :class="[
          'mx-auto mb-8 max-w-[500px] text-[15px] leading-[1.7] font-light text-[oklch(48%_0.008_240)] sm:text-[clamp(16px,1.6vw,18px)]',
          isFrench ? '2xl:mx-0 2xl:mb-10' : 'lg:mx-0 lg:mb-10',
        ]"
      >
        {{ t('hero.description') }}
      </p>
      <div
        data-aos="fade-up"
        data-aos-delay="240"
        :class="[
          'flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center',
          isFrench ? '2xl:justify-start 2xl:gap-[14px]' : 'lg:justify-start lg:gap-[14px]',
        ]"
      >
        <a
          href="#cta"
          class="inline-flex w-full items-center justify-center gap-2 rounded-[6px] bg-[oklch(44%_0.095_158)] px-[22px] py-[11px] text-sm font-medium tracking-[-0.01em] text-white transition hover:-translate-y-px hover:bg-[oklch(52%_0.095_158)] active:translate-y-0 sm:w-auto"
        >
          {{ t('hero.primaryCta') }}
        </a>
        <a
          href="#how"
          class="inline-flex w-full items-center justify-center gap-2 rounded-[6px] border border-black/18 bg-transparent px-[22px] py-[11px] text-sm font-normal tracking-[-0.01em] text-[oklch(13%_0.01_240)] transition hover:border-[oklch(44%_0.095_158)] hover:text-[oklch(44%_0.095_158)] sm:w-auto"
        >
          {{ t('hero.secondaryCta') }}
        </a>
      </div>
    </div>

    <div
      data-aos="fade-up"
      data-aos-delay="160"
      :class="heroImageClass"
    >
      <img
        data-float
        :src="productImages.line"
        alt="CatSenser device"
        class="w-full max-w-[380px] drop-shadow-[0_24px_48px_rgba(0,0,0,0.10)] 2xl:max-w-[460px] 2xl:drop-shadow-[0_32px_64px_rgba(0,0,0,0.10)]"
      />
    </div>
  </section>
</template>
