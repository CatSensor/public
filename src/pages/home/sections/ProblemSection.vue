<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import type { ProblemItem } from '@/pages/home/content'

const { t, tm } = useI18n()
const problemItems = computed(() => tm('problem.items') as ProblemItem[])
</script>

<template>
  <section
    id="problem"
    class="relative overflow-hidden bg-[#EEF9F0] px-4 py-16 sm:px-7 md:px-14 md:py-28"
  >
    <div class="relative z-10 mx-auto max-w-[1320px]">
      <div class="grid gap-7 md:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.65fr)] md:items-end md:gap-16">
        <div>
          <span
            data-aos="fade-up"
            class="mb-4 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.13em] text-[oklch(44%_0.095_158)] before:h-px before:w-5 before:bg-current"
          >
            {{ t('problem.eyebrow') }}
          </span>
          <h2
            data-aos="fade-up"
            data-aos-delay="80"
            class="max-w-[18ch] text-[clamp(32px,3.6vw,52px)] leading-[1.04] font-semibold tracking-[-0.04em]"
          >
            {{ t('problem.titleStart') }}<br />{{ t('problem.titleEnd') }}
          </h2>
        </div>
        <p
          data-aos="fade-up"
          data-aos-delay="160"
          class="max-w-[520px] border-l border-[oklch(44%_0.095_158_/_0.24)] pl-5 text-[15px] leading-[1.75] font-light text-[oklch(48%_0.008_240)] sm:text-[17px] md:mb-1"
        >
          {{ t('problem.description') }}
        </p>
      </div>

      <div class="relative mt-14 md:mt-[72px]">
        <div class="grid gap-5 md:grid-cols-3 md:gap-6">
          <div
            v-for="(item, index) in problemItems"
            :key="item.title"
            data-aos="fade-up"
            :data-aos-delay="index === 0 ? 0 : index === 1 ? 160 : 240"
            class="problem-card-slot"
          >
            <article class="problem-card">
              <div class="mb-7 flex items-center justify-between gap-4">
                <span
                  class="inline-flex size-10 items-center justify-center rounded-full border border-[oklch(44%_0.095_158_/_0.18)] bg-[oklch(92%_0.04_150)] text-[11px] font-semibold tracking-[0.06em] text-[oklch(38%_0.09_155)]"
                >
                  {{ item.number.replace(' -', '') }}
                </span>
                <span class="h-px flex-1 bg-[oklch(44%_0.095_158_/_0.16)]"></span>
              </div>

              <h3 class="mb-3 text-[clamp(18px,1.6vw,22px)] leading-[1.2] font-semibold tracking-[-0.02em]">
                {{ item.title }}
              </h3>
              <p class="text-sm leading-[1.75] font-light text-[oklch(45%_0.01_240)]">
                {{ item.body }}
              </p>
              <span
                class="mt-auto flex items-start gap-2.5 pt-7 text-xs leading-[1.55] font-semibold tracking-[0.02em] text-[oklch(55%_0.08_155)] before:mt-[6px] before:size-1.5 before:shrink-0 before:rounded-full before:bg-[oklch(66%_0.075_155)]"
              >
                {{ item.stat }}
              </span>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.problem-card {
  display: flex;
  min-height: 286px;
  height: 100%;
  flex-direction: column;
  border: 1px solid oklch(44% 0.095 158 / 0.12);
  border-radius: 14px;
  background: oklch(98.5% 0.012 145 / 0.68);
  padding: clamp(24px, 2.7vw, 34px);
  box-shadow: 0 18px 50px oklch(33% 0.05 155 / 0.045);
  transition:
    transform 350ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 350ms ease,
    border-color 350ms ease,
    background-color 350ms ease;
}

.problem-card-slot:hover .problem-card {
  border-color: oklch(44% 0.095 158 / 0.2);
  background: oklch(99% 0.008 145 / 0.82);
  box-shadow: 0 22px 58px oklch(33% 0.05 155 / 0.065);
  transform: translateY(-4px);
}

@media (prefers-reduced-motion: reduce) {
  .problem-card {
    transition: none;
  }
}
</style>
