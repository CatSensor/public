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
    <span class="organic-wave__swell organic-wave__swell--wide"></span>
    <span class="organic-wave__swell organic-wave__swell--narrow"></span>
    <span class="organic-wave__base"></span>
  </div>
</template>

<style scoped>
.organic-wave {
  --wave-height: clamp(54px, 7vw, 104px);
  position: relative;
  z-index: 1;
  height: var(--wave-height);
  margin-block: -1px;
  overflow: hidden;
  background: var(--wave-from);
  pointer-events: none;
}

.organic-wave--compact {
  --wave-height: clamp(42px, 5vw, 72px);
}

.organic-wave__base,
.organic-wave__swell {
  position: absolute;
  display: block;
  background: var(--wave-to);
}

.organic-wave__base {
  inset: auto -2px -2px;
  height: 38%;
}

.organic-wave__swell {
  bottom: 14%;
  border-radius: 50% 50% 0 0 / 100% 100% 0 0;
  transform-origin: 50% 100%;
  will-change: transform;
}

.organic-wave__swell--wide {
  left: -18%;
  width: 82%;
  height: 76%;
  transform: translateY(36%) rotate(1.4deg);
  animation: wave-drift-wide 16s ease-in-out infinite alternate;
}

.organic-wave__swell--narrow {
  right: -16%;
  width: 76%;
  height: 90%;
  transform: translateY(43%) rotate(-1.8deg);
  animation: wave-drift-narrow 19s ease-in-out infinite alternate;
}

.organic-wave--right {
  transform: scaleX(-1);
}

@keyframes wave-drift-wide {
  to {
    transform: translate(2.5%, 31%) rotate(-0.6deg) scaleX(1.035);
  }
}

@keyframes wave-drift-narrow {
  to {
    transform: translate(-2%, 47%) rotate(0.8deg) scaleX(1.025);
  }
}

@media (prefers-reduced-motion: reduce) {
  .organic-wave__swell {
    animation: none;
  }
}
</style>
