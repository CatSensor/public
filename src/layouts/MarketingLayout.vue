<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import SiteHeader from '@/components/shared/Header.vue'
import SiteFooter from '@/pages/home/sections/SiteFooter.vue'
import type { SeoRouteMeta } from '@/router/route'

const route = useRoute()
const currentPage = computed(() =>
  (route.meta as SeoRouteMeta).pageId === 'about' ? 'about' : 'home',
)
</script>

<template>
  <div class="min-h-screen overflow-x-hidden">
    <SiteHeader :page="currentPage" />

    <main>
      <RouterView />
    </main>

    <SiteFooter :page="currentPage" />
  </div>
</template>
