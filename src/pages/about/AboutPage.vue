<script setup lang="ts">
import { nextTick, onMounted } from 'vue'
import AOS from 'aos'

import { usePageSeo } from '@/composables/usePageSeo'
import AboutUsSection from '@/pages/about/sections/AboutUsSection.vue'
import TimelineSection from '@/pages/about/sections/TimelineSection.vue'

usePageSeo()

onMounted(async () => {
  AOS.init({
    duration: 750,
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    once: true,
    offset: 30,
  })

  await nextTick()
  AOS.refreshHard()
})
</script>

<template>
  <div class="bg-[oklch(98.5%_0.003_90)]">
    <AboutUsSection />
    <TimelineSection />
  </div>
</template>
