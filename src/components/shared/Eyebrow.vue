<script setup lang="ts">
withDefaults(
  defineProps<{
    bars?: 'left' | 'both'
  }>(),
  {
    bars: 'left',
  },
)
</script>

<template>
  <span class="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.14em]">
    <span aria-hidden="true" class="h-px w-6 shrink-0 bg-current"></span>
    <span><slot /></span>
    <span
      v-if="bars === 'both'"
      aria-hidden="true"
      class="h-px w-6 shrink-0 bg-current"
    ></span>
  </span>
</template>
