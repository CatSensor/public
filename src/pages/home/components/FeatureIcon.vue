<script setup lang="ts">
import type { FeatureIcon as FeatureIconName } from '@/pages/home/content'

defineProps<{
  name: FeatureIconName
}>()
</script>

<template>
  <svg
    v-if="name === 'clock'"
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    class="h-8 w-8"
  >
    <circle cx="16" cy="16" r="12"></circle>
    <path d="M16 10v6l4 2"></path>
  </svg>

  <svg
    v-else-if="name === 'trend'"
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    class="h-8 w-8"
  >
    <polyline points="4,24 10,16 16,20 22,10 28,14"></polyline>
    <line x1="4" y1="28" x2="28" y2="28"></line>
  </svg>

  <svg
    v-else-if="name === 'report'"
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    class="h-8 w-8"
  >
    <rect x="6" y="4" width="20" height="24" rx="1"></rect>
    <line x1="11" y1="12" x2="21" y2="12"></line>
    <line x1="11" y1="17" x2="21" y2="17"></line>
    <line x1="11" y1="22" x2="16" y2="22"></line>
  </svg>

  <svg
    v-else
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    class="h-8 w-8"
  >
    <path d="M16 4C9.4 4 4 9.4 4 16s5.4 12 12 12 12-5.4 12-12S22.6 4 16 4z"></path>
    <path d="M16 4v12l8 4"></path>
  </svg>
</template>
