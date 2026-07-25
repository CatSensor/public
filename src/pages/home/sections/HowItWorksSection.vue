<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import type { HowStep } from '@/pages/home/content'

const { t, tm } = useI18n()
const howSteps = computed(() => tm('how.steps') as HowStep[])
</script>

<template>
  <section id="how" class="how-section px-4 py-20 sm:px-7 md:px-14 md:py-32">
    <div class="mx-auto max-w-[1320px]">
      <div class="grid items-end gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div>
          <span
            data-aos="fade-up"
            class="mb-7 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[oklch(38%_0.09_158)]"
          >
            <span aria-hidden="true" class="h-px w-6 bg-current"></span>
            {{ t('how.eyebrow') }}
          </span>

          <h2
            data-aos="fade-up"
            data-aos-delay="60"
            class="max-w-[760px] text-[clamp(44px,6vw,84px)] leading-[0.94] font-medium tracking-[-0.06em] text-[oklch(17%_0.02_158)]"
          >
            <span class="block">{{ t('how.titleStart') }}</span>
            <span class="mt-2 block font-light italic text-[oklch(38%_0.09_158)]">
              {{ t('how.titleEnd') }}
            </span>
          </h2>
        </div>

        <p
          data-aos="fade-up"
          data-aos-delay="120"
          class="max-w-[640px] pb-2 text-[clamp(20px,2.1vw,30px)] leading-[1.35] font-light tracking-[-0.025em] text-[oklch(39%_0.025_158)] lg:justify-self-end"
        >
          {{ t('how.intro') }}
        </p>
      </div>

      <ol class="steps-flow relative mt-20 grid gap-0 md:mt-28 md:grid-cols-3 md:gap-10 lg:gap-16">
        <li
          v-for="(step, index) in howSteps"
          :key="step.title"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
          class="step-item relative pb-10 pl-20 last:pb-0 md:pb-0 md:pl-0"
        >
          <div
            class="step-marker absolute left-0 top-0 z-10 flex size-14 items-center justify-center rounded-full bg-[oklch(79%_0.075_153)] text-xl font-medium tracking-[-0.04em] text-[oklch(20%_0.025_158)] md:relative md:mb-9 md:size-16"
          >
            {{ index + 1 }}
          </div>

          <h3 class="max-w-[340px] text-[clamp(24px,2.4vw,34px)] leading-[1.08] font-medium tracking-[-0.045em] text-[oklch(17%_0.02_158)]">
            {{ step.title }}
          </h3>
          <p class="mt-5 max-w-[390px] text-[15px] leading-[1.75] font-light text-[oklch(42%_0.018_158)] sm:text-base">
            {{ step.body }}
          </p>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.how-section {
  background: oklch(98.5% 0.003 90);
}

@media (min-width: 768px) {
  .steps-flow::before {
    position: absolute;
    top: 30px;
    left: 4%;
    width: 92%;
    height: 68px;
    border-top: 2px dashed oklch(65% 0.07 153 / 0.48);
    border-radius: 50%;
    content: '';
    transform: rotate(-1.5deg);
    transform-origin: center;
  }

  .step-item:nth-child(2) .step-marker {
    transform: translateY(16px);
  }

  .step-item:nth-child(2) h3 {
    margin-top: 16px;
  }

  .step-item:nth-child(3) .step-marker {
    transform: translateY(-2px);
  }
}

@media (max-width: 767px) {
  .step-item:not(:last-child)::after {
    position: absolute;
    top: 62px;
    bottom: 8px;
    left: 27px;
    border-left: 2px dashed oklch(65% 0.07 153 / 0.4);
    content: '';
  }
}
</style>
