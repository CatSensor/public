<script setup lang="ts">
import SiteFooter from '@/components/shared/Footer.vue'
import SiteHeader from '@/components/shared/Header.vue'
</script>

<template>
  <div class="min-h-screen overflow-x-hidden bg-[oklch(98.5%_0.003_90)]">
    <SiteHeader page="privacy" />

    <main>
      <RouterView />
    </main>

    <SiteFooter page="privacy" />
  </div>
</template>
