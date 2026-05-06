<script setup lang="ts">
import SiteFooter from '@/components/shared/Footer.vue'
import SiteHeader from '@/components/shared/Header.vue'
</script>

<template>
  <div class="min-h-screen overflow-x-hidden">
    <SiteHeader />

    <main>
      <RouterView />
    </main>

    <SiteFooter />
  </div>
</template>
