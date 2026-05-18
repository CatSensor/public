<script setup lang="ts">
import { nextTick, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import AOS from 'aos'

import { syncDocumentLanguage } from '@/i18n'
import AboutUsSection from '@/pages/about/sections/AboutUsSection.vue'
import TimelineSection from '@/pages/about/sections/TimelineSection.vue'

const { locale, t } = useI18n()

let aosReady = false

watch(
  locale,
  async (value) => {
    document.title = t('about.meta.title')
    syncDocumentLanguage(value as 'en' | 'fr')
    if (aosReady) {
      await nextTick()
      AOS.refresh()
    }
  },
  { immediate: true },
)

onMounted(async () => {
  AOS.init({
    duration: 750,
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    once: true,
    offset: 30,
  })

  aosReady = true
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
