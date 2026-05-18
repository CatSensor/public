<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import AOS from 'aos'

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
  <ProblemSection />
  <HowItWorksSection />
  <FeaturesSection />
  <PartnersSection />
  <DonationSection />
  <CtaSection />
</template>
