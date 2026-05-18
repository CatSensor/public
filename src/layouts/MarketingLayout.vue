<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import SiteFooter from '@/components/shared/Footer.vue'
import SiteHeader from '@/components/shared/Header.vue'

const route = useRoute()
const currentPage = computed(() => (typeof route.name === 'string' && route.name.startsWith('about-') ? 'about' : 'home'))
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
