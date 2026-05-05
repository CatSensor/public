<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import FeatureIcon from '@/pages/home/components/FeatureIcon.vue'
import type { FeatureItem } from '@/pages/home/content'

const { t, tm } = useI18n()

const featureItems = computed(() => tm('features.items') as FeatureItem[])
</script>

<template>
  <section id="features" class="bg-white px-4 py-16 sm:px-7 md:px-14 md:py-28">
    <div class="mx-auto max-w-[1320px]">
      <div class="mb-12 grid gap-5 md:mb-14 md:grid-cols-2 md:items-end md:gap-16">
        <div>
          <span data-aos="fade-up" class="mb-4 block text-[11px] font-semibold uppercase tracking-[0.13em] text-[oklch(44%_0.095_158)]">
            {{ t('features.eyebrow') }}
          </span>
          <h2 data-aos="fade-up" data-aos-delay="80" class="mb-[18px] text-[clamp(30px,3.5vw,50px)] leading-[1.1] font-semibold tracking-[-0.035em]">
            {{ t('features.titleStart') }}<br />{{ t('features.titleEnd') }}
          </h2>
        </div>
      </div>

      <div class="grid border border-black/8 bg-black/8 md:grid-cols-2 xl:grid-cols-4">
        <article
          v-for="(feature, index) in featureItems"
          :key="feature.title"
          data-aos="fade-up"
          :data-aos-delay="index === 0 ? 0 : index === 1 ? 160 : index === 2 ? 240 : 320"
          class="bg-[#fbfaf8] px-5 py-7 hover:bg-white sm:px-8 sm:py-9"
        >
          <div class="mb-[22px] h-8 w-8 text-[oklch(44%_0.095_158)]">
            <FeatureIcon :name="feature.icon" />
          </div>
          <h3 class="mb-[10px] text-base font-medium tracking-[-0.015em]">{{ feature.title }}</h3>
          <p class="text-[13px] leading-[1.7] font-light text-[oklch(48%_0.008_240)]">{{ feature.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
