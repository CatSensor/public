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
    class="relative overflow-hidden bg-[oklch(96%_0.028_150)] px-4 py-16 sm:px-7 md:px-14 md:py-28"
  >
    <div aria-hidden="true" class="problem-halo problem-halo--left"></div>
    <div aria-hidden="true" class="problem-halo problem-halo--right"></div>

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
            class="max-w-[18ch] text-[clamp(32px,4.2vw,60px)] leading-[1.02] font-semibold tracking-[-0.045em]"
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

      <div class="relative mt-14 pb-4 md:mt-20 md:pb-14">
        <div aria-hidden="true" class="problem-flow"></div>

        <div class="relative z-10 grid gap-6 md:grid-cols-3 md:gap-7">
          <div
            v-for="(item, index) in problemItems"
            :key="item.title"
            data-aos="fade-up"
            :data-aos-delay="index === 0 ? 0 : index === 1 ? 160 : 240"
            :class="['problem-card-slot', `problem-card-slot--${index + 1}`]"
          >
            <article class="problem-card">
              <div aria-hidden="true" class="problem-card__glow"></div>

              <div class="relative z-10 mb-7 flex items-center justify-between gap-4">
                <span
                  class="inline-flex size-12 items-center justify-center rounded-full bg-[oklch(44%_0.095_158)] text-xs font-semibold tracking-[0.06em] text-white shadow-[0_10px_26px_oklch(44%_0.095_158_/_0.2)]"
                >
                  {{ item.number.replace(' -', '') }}
                </span>
                <span class="h-px flex-1 bg-[oklch(44%_0.095_158_/_0.16)]"></span>
              </div>

              <h3 class="relative z-10 mb-3 text-[clamp(19px,1.8vw,24px)] leading-[1.15] font-semibold tracking-[-0.025em]">
                {{ item.title }}
              </h3>
              <p class="relative z-10 text-sm leading-[1.75] font-light text-[oklch(45%_0.01_240)]">
                {{ item.body }}
              </p>
              <span
                class="relative z-10 mt-auto flex items-start gap-2.5 pt-7 text-xs leading-[1.55] font-semibold tracking-[0.02em] text-[oklch(55%_0.08_155)] before:mt-[6px] before:size-1.5 before:shrink-0 before:rounded-full before:bg-[oklch(66%_0.075_155)]"
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
.problem-halo {
  position: absolute;
  border: 1px solid oklch(44% 0.095 158 / 0.08);
  border-radius: 50%;
  pointer-events: none;
}

.problem-halo--left {
  top: 18%;
  left: -180px;
  width: 420px;
  height: 230px;
  transform: rotate(18deg);
}

.problem-halo--right {
  right: -130px;
  bottom: 8%;
  width: 360px;
  height: 360px;
  background: oklch(90% 0.045 150 / 0.28);
}

.problem-card {
  position: relative;
  display: flex;
  min-height: 310px;
  height: 100%;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid oklch(44% 0.095 158 / 0.12);
  border-radius: 14px;
  background: oklch(98.5% 0.012 145 / 0.82);
  padding: clamp(24px, 3vw, 36px);
  box-shadow: 0 26px 70px oklch(33% 0.05 155 / 0.07);
  backdrop-filter: blur(12px);
  transition:
    transform 450ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 450ms ease,
    border-color 450ms ease;
}

.problem-card__glow {
  position: absolute;
  top: -72px;
  right: -52px;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: oklch(78% 0.07 155 / 0.12);
}

.problem-card-slot:hover .problem-card {
  border-color: oklch(44% 0.095 158 / 0.23);
  box-shadow: 0 32px 80px oklch(33% 0.05 155 / 0.11);
}

@media (min-width: 768px) {
  .problem-flow {
    position: absolute;
    z-index: 0;
    top: 66px;
    right: 5%;
    left: 5%;
    height: 150px;
    border-top: 2px dashed oklch(44% 0.095 158 / 0.2);
    border-radius: 50%;
    transform: rotate(-2.5deg);
  }

  .problem-card-slot--1 .problem-card {
    transform: rotate(-0.65deg);
  }

  .problem-card-slot--2 {
    padding-top: 48px;
  }

  .problem-card-slot--2 .problem-card {
    transform: rotate(0.75deg);
  }

  .problem-card-slot--3 {
    padding-top: 12px;
  }

  .problem-card-slot--3 .problem-card {
    transform: rotate(-0.35deg);
  }

  .problem-card-slot:hover .problem-card {
    transform: translateY(-8px) rotate(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .problem-card {
    transition: none;
  }
}
</style>
