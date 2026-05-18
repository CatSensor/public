<script setup lang="ts">
import { watchEffect } from 'vue'
import { useRoute } from 'vue-router'

import CookieConsent from '@/components/shared/CookieConsent.vue'
import { getLocaleFromPath, i18n, persistLocale, syncDocumentLanguage, type AppLocale } from '@/i18n'
import type { SeoRouteMeta } from '@/router/route'

const route = useRoute()

watchEffect(() => {
  const locale = ((route.meta as Partial<SeoRouteMeta>).locale ?? getLocaleFromPath(route.path)) as AppLocale
  i18n.global.locale.value = locale
  persistLocale(locale)
  syncDocumentLanguage(locale)
})
</script>

<template>
  <RouterView />
  <CookieConsent />
</template>
