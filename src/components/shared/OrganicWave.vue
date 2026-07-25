<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'

const props = withDefaults(
  defineProps<{
    from: string
    to: string
    direction?: 'left' | 'right'
    compact?: boolean
  }>(),
  {
    direction: 'left',
    compact: false,
  },
)

const waveStyle = computed(
  () =>
    ({
      '--wave-from': props.from,
      '--wave-to': props.to,
    }) as CSSProperties,
)
</script>

<template>
  <div
    :class="[
      'organic-wave',
      `organic-wave--${direction}`,
      { 'organic-wave--compact': compact },
    ]"
    :style="waveStyle"
    aria-hidden="true"
  >
    <svg
      class="organic-wave__shape"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      focusable="false"
    >
      <path d="M0 36C142 22 330 72 548 83C776 95 958 52 1137 27C1266 9 1366 11 1440 33V120H0Z" />
    </svg>
  </div>
</template>

<style scoped>
.organic-wave {
  --wave-height: clamp(58px, 6.25vw, 112px);
  position: relative;
  z-index: 1;
  height: var(--wave-height);
  margin-block: -1px;
  overflow: hidden;
  background: var(--wave-from);
  pointer-events: none;
}

.organic-wave--compact {
  --wave-height: clamp(46px, 4.75vw, 82px);
}

.organic-wave__shape {
  position: absolute;
  inset: -1px -1px -2px;
  display: block;
  width: calc(100% + 2px);
  height: calc(100% + 3px);
  fill: var(--wave-to);
}

.organic-wave--right {
  transform: scaleX(-1);
}
</style>
