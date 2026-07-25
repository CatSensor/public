<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import AOS from 'aos'

import OrganicWave from '@/components/shared/OrganicWave.vue'
import { usePageSeo } from '@/composables/usePageSeo'
import CtaSection from '@/pages/home/sections/CtaSection.vue'
import DonationSection from '@/pages/home/sections/DonationSection.vue'
import FeaturesSection from '@/pages/home/sections/FeaturesSection.vue'
import HeroSection from '@/pages/home/sections/HeroSection.vue'
import HowItWorksSection from '@/pages/home/sections/HowItWorksSection.vue'
import PartnersSection from '@/pages/home/sections/PartnersSection.vue'
import ProblemSection from '@/pages/home/sections/ProblemSection.vue'

const { locale } = useI18n()
usePageSeo()

let floatAnimations: Animation[] = []
let aosReady = false

watch(
  locale,
  async () => {
    if (aosReady) {
      await nextTick()
      AOS.refresh()
    }
  },
  { immediate: true },
)

onMounted(() => {
  AOS.init({
    duration: 750,
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    once: true,
    offset: 32,
  })
  aosReady = true

  floatAnimations = Array.from(document.querySelectorAll<HTMLElement>('[data-float]')).map((element) =>
    element.animate(
      [
        { transform: 'translateY(0px)' },
        { transform: 'translateY(-10px)' },
        { transform: 'translateY(0px)' },
      ],
      {
        duration: 7000,
        iterations: Number.POSITIVE_INFINITY,
        easing: 'ease-in-out',
      },
    ),
  )
})

onBeforeUnmount(() => {
  floatAnimations.forEach((animation) => animation.cancel())
})
</script>

<template>
  <HeroSection />
  <OrganicWave
    from="oklch(98.5% 0.003 90)"
    to="#EEF9F0"
    direction="left"
  />
  <ProblemSection />
  <OrganicWave
    from="#EEF9F0"
    to="oklch(98.5% 0.003 90)"
    direction="right"
  />
  <HowItWorksSection />
  <OrganicWave
    from="oklch(98.5% 0.003 90)"
    to="oklch(97.2% 0.018 150)"
    direction="left"
  />
  <FeaturesSection />
  <OrganicWave
    from="oklch(97.2% 0.018 150)"
    to="#15573f"
    direction="right"
    compact
  />
  <PartnersSection />
  <OrganicWave
    from="#15573f"
    to="oklch(98.5% 0.003 90)"
    direction="left"
    compact
  />
  <DonationSection />
  <OrganicWave
    from="oklch(98.5% 0.003 90)"
    to="oklch(38% 0.09 155)"
    direction="left"
  />
  <CtaSection />
</template>
