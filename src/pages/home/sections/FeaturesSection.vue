<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import FeatureIcon from '@/pages/home/components/FeatureIcon.vue'
import type { FeatureItem } from '@/pages/home/content'

const { t, tm } = useI18n()
const featureItems = computed(() => tm('features.items') as FeatureItem[])
</script>

<template>
  <section id="features" class="features-section overflow-hidden px-4 py-20 sm:px-7 md:px-14 md:py-32">
    <div class="mx-auto max-w-[1320px]">
      <div class="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-end lg:gap-20">
        <div>
          <span
            data-aos="fade-up"
            class="mb-7 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[oklch(38%_0.09_158)]"
          >
            <span aria-hidden="true" class="h-px w-6 bg-current"></span>
            {{ t('features.eyebrow') }}
          </span>

          <h2
            data-aos="fade-up"
            data-aos-delay="60"
            class="max-w-[820px] text-[clamp(42px,5.6vw,78px)] leading-[0.98] font-medium tracking-[-0.06em] text-[oklch(17%_0.02_158)]"
          >
            <span class="block">{{ t('features.titleStart') }}</span>
            <span class="mt-2 block font-light italic text-[oklch(38%_0.09_158)]">
              {{ t('features.titleEnd') }}
            </span>
          </h2>
        </div>

        <p
          data-aos="fade-up"
          data-aos-delay="120"
          class="max-w-[600px] pb-2 text-[clamp(19px,2vw,28px)] leading-[1.4] font-light tracking-[-0.025em] text-[oklch(39%_0.025_158)] lg:justify-self-end"
        >
          {{ t('features.description') }}
        </p>
      </div>

      <div class="feature-flow relative mt-16 grid gap-5 md:mt-24 md:grid-cols-2 md:gap-7 lg:gap-x-9 lg:gap-y-7">
        <article
          v-for="(feature, index) in featureItems"
          :key="feature.title"
          data-aos="fade-up"
          :data-aos-delay="index * 90"
          class="feature-item group relative z-10 overflow-hidden rounded-[14px] border border-[oklch(38%_0.09_158_/_0.1)] bg-[oklch(99%_0.006_145_/_0.72)] px-6 py-7 transition-[transform,background-color,border-color] duration-500 hover:-translate-y-1 hover:border-[oklch(38%_0.09_158_/_0.18)] hover:bg-white/90 sm:px-9 sm:py-9 lg:min-h-[270px] lg:px-10 lg:py-10"
        >
          <div aria-hidden="true" class="feature-orb absolute -right-12 -top-12 size-40 rounded-full bg-[oklch(83%_0.065_150_/_0.22)] transition-transform duration-700 group-hover:scale-110"></div>

          <div class="relative flex items-start justify-between gap-5">
            <div class="flex size-14 items-center justify-center rounded-full bg-[oklch(80%_0.075_153)] text-[oklch(30%_0.08_158)]">
              <FeatureIcon :name="feature.icon" />
            </div>
            <span class="pt-1 text-[11px] font-semibold tracking-[0.12em] text-[oklch(48%_0.07_158)]">
              0{{ index + 1 }}
            </span>
          </div>

          <div class="relative mt-9 max-w-[510px]">
            <h3 class="text-[clamp(23px,2.2vw,31px)] leading-[1.12] font-medium tracking-[-0.04em] text-[oklch(17%_0.02_158)]">
              {{ feature.title }}
            </h3>
            <p class="mt-4 text-[15px] leading-[1.75] font-light text-[oklch(42%_0.018_158)] sm:text-base">
              {{ feature.description }}
            </p>
          </div>
        </article>
      </div>

      <p class="mt-16 max-w-[830px] border-l border-[oklch(38%_0.09_158_/_0.35)] pl-4 text-xs leading-[1.75] text-[oklch(48%_0.018_158)] md:mt-20">
        {{ t('features.disclaimer') }}
      </p>
    </div>
  </section>
</template>

<style scoped>
.features-section {
  background: oklch(97.2% 0.018 150);
}

@media (min-width: 768px) {
  .feature-flow {
    padding-bottom: 52px;
  }

  .feature-flow::before {
    position: absolute;
    top: 43%;
    left: -4%;
    width: 108%;
    height: 110px;
    border-top: 2px dashed oklch(56% 0.075 153 / 0.3);
    border-radius: 50%;
    content: '';
    transform: rotate(2deg);
  }

  .feature-item:nth-child(even) {
    transform: translateY(52px);
  }

  .feature-item:nth-child(even):hover {
    transform: translateY(48px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .feature-item,
  .feature-orb {
    transition: none;
  }
}
</style>
