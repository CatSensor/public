<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import type { ProblemItem } from '@/pages/home/content'

const { t, tm } = useI18n()
const problemItems = computed(() => tm('problem.items') as ProblemItem[])
</script>

<template>
  <section id="problem" class="bg-[oklch(96%_0.028_150)] px-4 py-16 sm:px-7 md:px-14 md:py-28">
    <div class="mx-auto max-w-[1320px]">
      <span data-aos="fade-up" class="mb-4 block text-[11px] font-semibold uppercase tracking-[0.13em] text-[oklch(44%_0.095_158)]">
        {{ t('problem.eyebrow') }}
      </span>
      <h2 data-aos="fade-up" data-aos-delay="80" class="mb-[18px] text-[clamp(30px,3.5vw,50px)] leading-[1.1] font-semibold tracking-[-0.035em]">
        {{ t('problem.titleStart') }}<br />{{ t('problem.titleEnd') }}
      </h2>
      <p data-aos="fade-up" data-aos-delay="160" class="max-w-[520px] text-[15px] leading-[1.7] font-light text-[oklch(48%_0.008_240)] sm:text-[17px]">
        {{ t('problem.description') }}
      </p>

      <div class="mt-12 grid gap-px border border-[oklch(88%_0.04_150)] md:mt-16 md:grid-cols-3">
        <article
          v-for="(item, index) in problemItems"
          :key="item.title"
          data-aos="fade-up"
          :data-aos-delay="index === 0 ? 0 : index === 1 ? 160 : 240"
          class="bg-[oklch(96%_0.028_150)] px-5 py-8 hover:bg-[oklch(93%_0.038_150)] sm:px-7 md:px-9 md:py-10"
        >
          <div class="mb-5 text-[11px] font-semibold uppercase leading-none tracking-[0.1em] text-[oklch(44%_0.095_158)] opacity-70">
            {{ item.number }}
          </div>
          <h3 class="mb-3 text-lg font-medium tracking-[-0.015em]">{{ item.title }}</h3>
          <p class="text-sm leading-[1.7] font-light text-[oklch(48%_0.008_240)]">{{ item.body }}</p>
          <span class="mt-5 block text-xs font-semibold tracking-[0.04em] text-[oklch(66%_0.075_155)]">{{ item.stat }}</span>
        </article>
      </div>
    </div>
  </section>
</template>
