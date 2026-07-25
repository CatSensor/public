<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

type PawPrint = {
  id: number
  x: number
  y: number
  rotation: number
  mirror: 1 | -1
  revealed: boolean
  onDark: boolean
}

type ContentRect = {
  left: number
  right: number
  top: number
  bottom: number
}

const route = useRoute()
const prints = ref<PawPrint[]>([])
const trailHeight = ref(0)

let resizeTimer: number | undefined
let scrollFrame: number | undefined
let settleTimer: number | undefined
let layoutObserver: ResizeObserver | undefined

const contentSelector = [
  'main h1',
  'main h2',
  'main h3',
  'main h4',
  'main p',
  'main li',
  'main a',
  'main button',
  'main input',
  'main textarea',
  'main label',
  'main form',
  'main img',
  'footer a',
  'footer img',
].join(',')

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum)
}

function overlaps(first: ContentRect, second: ContentRect) {
  return !(
    first.right < second.left ||
    first.left > second.right ||
    first.bottom < second.top ||
    first.top > second.bottom
  )
}

function collectContentRects() {
  const horizontalPadding = window.innerWidth < 640 ? 10 : 22
  const verticalPadding = window.innerWidth < 640 ? 14 : 24

  return Array.from(document.querySelectorAll<HTMLElement>(contentSelector))
    .filter((element) => {
      const style = window.getComputedStyle(element)
      return style.display !== 'none' && style.visibility !== 'hidden'
    })
    .map((element) => {
      const rect = element.getBoundingClientRect()
      return {
        left: rect.left + window.scrollX - horizontalPadding,
        right: rect.right + window.scrollX + horizontalPadding,
        top: rect.top + window.scrollY - verticalPadding,
        bottom: rect.bottom + window.scrollY + verticalPadding,
      }
    })
    .filter((rect) => rect.right > rect.left && rect.bottom > rect.top)
}

function findClearPosition(
  idealX: number,
  idealY: number,
  pageWidth: number,
  blockedRects: ContentRect[],
) {
  const pawRadius = pageWidth < 640 ? 16 : 20
  const edge = pageWidth < 640 ? 6 : 18
  const horizontalCandidates = Array.from({ length: pageWidth < 640 ? 9 : 15 }, (_, index) => {
    const divisions = pageWidth < 640 ? 8 : 14
    return edge + (index / divisions) * (pageWidth - edge * 2)
  }).sort((first, second) => Math.abs(first - idealX) - Math.abs(second - idealX))
  const verticalOffsets = [0, -52, 52, -96, 96]

  for (const yOffset of verticalOffsets) {
    for (const x of horizontalCandidates) {
      const candidate = {
        left: x - pawRadius,
        right: x + pawRadius,
        top: idealY + yOffset - pawRadius,
        bottom: idealY + yOffset + pawRadius,
      }

      if (!blockedRects.some((rect) => overlaps(candidate, rect))) {
        return { x, y: idealY + yOffset }
      }
    }
  }

  return null
}

function isDarkArea(y: number) {
  return Array.from(document.querySelectorAll<HTMLElement>('#cta, footer')).some((element) => {
    const rect = element.getBoundingClientRect()
    const top = rect.top + window.scrollY
    const bottom = rect.bottom + window.scrollY
    return y >= top && y <= bottom
  })
}

function updateReveal() {
  const revealLine = window.scrollY + window.innerHeight * 0.82
  let changed = false

  for (const print of prints.value) {
    if (!print.revealed && print.y <= revealLine) {
      print.revealed = true
      changed = true
    }
  }

  if (changed) {
    prints.value = [...prints.value]
  }
}

function requestRevealUpdate() {
  if (scrollFrame !== undefined) {
    return
  }

  scrollFrame = window.requestAnimationFrame(() => {
    scrollFrame = undefined
    updateReveal()
  })
}

function buildTrail() {
  const pageWidth = document.documentElement.clientWidth
  const pageHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
  )
  const blockedRects = collectContentRects()
  const spacing = pageWidth < 640 ? 210 : 178
  const generated: PawPrint[] = []
  const revealLine = window.scrollY + window.innerHeight * 0.82

  trailHeight.value = pageHeight

  for (let y = 210, index = 0; y < pageHeight - 130; y += spacing, index += 1) {
    const pathProgress = y / (pageWidth < 640 ? 520 : 660)
    const idealX =
      pageWidth * (0.5 + (pageWidth < 640 ? 0.42 : 0.45) * Math.sin(pathProgress)) +
      (index % 2 === 0 ? -12 : 12)
    const position = findClearPosition(
      clamp(idealX, 18, pageWidth - 18),
      y,
      pageWidth,
      blockedRects,
    )

    if (!position) {
      continue
    }

    const slope = (pageWidth * 0.45 * Math.cos(pathProgress)) / 660
    const rotation = clamp((Math.atan(slope) * 180) / Math.PI, -32, 32)

    generated.push({
      id: index,
      x: position.x,
      y: position.y,
      rotation,
      mirror: index % 2 === 0 ? 1 : -1,
      revealed: position.y <= revealLine,
      onDark: isDarkArea(position.y),
    })
  }

  prints.value = generated
}

function scheduleTrailBuild() {
  window.clearTimeout(resizeTimer)
  resizeTimer = window.setTimeout(buildTrail, 140)
}

watch(
  () => route.fullPath,
  async () => {
    await nextTick()
    window.setTimeout(buildTrail, 120)
  },
)

onMounted(() => {
  buildTrail()
  settleTimer = window.setTimeout(buildTrail, 1300)
  window.addEventListener('scroll', requestRevealUpdate, { passive: true })
  window.addEventListener('resize', scheduleTrailBuild, { passive: true })
  window.addEventListener('load', scheduleTrailBuild, { once: true })

  const main = document.querySelector('main')
  if (main) {
    layoutObserver = new ResizeObserver(scheduleTrailBuild)
    layoutObserver.observe(main)
  }

  document.fonts?.ready.then(scheduleTrailBuild)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', requestRevealUpdate)
  window.removeEventListener('resize', scheduleTrailBuild)
  window.clearTimeout(resizeTimer)
  window.clearTimeout(settleTimer)
  layoutObserver?.disconnect()

  if (scrollFrame !== undefined) {
    window.cancelAnimationFrame(scrollFrame)
  }
})
</script>

<template>
  <div
    class="paw-trail"
    :style="{ height: `${trailHeight}px` }"
    aria-hidden="true"
  >
    <div
      v-for="print in prints"
      :key="print.id"
      :class="[
        'paw-trail__step',
        {
          'paw-trail__step--revealed': print.revealed,
          'paw-trail__step--dark': print.onDark,
        },
      ]"
      :style="{
        left: `${print.x}px`,
        top: `${print.y}px`,
        '--paw-rotation': `${print.rotation}deg`,
        '--paw-mirror': print.mirror,
      }"
    >
      <div class="paw-trail__mark">
        <span class="paw-trail__pad"></span>
        <span class="paw-trail__toe paw-trail__toe--one"></span>
        <span class="paw-trail__toe paw-trail__toe--two"></span>
        <span class="paw-trail__toe paw-trail__toe--three"></span>
        <span class="paw-trail__toe paw-trail__toe--four"></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.paw-trail {
  position: absolute;
  z-index: 40;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  pointer-events: none;
}

.paw-trail__step {
  --paw-rotation: 0deg;
  --paw-mirror: 1;
  position: absolute;
  width: 34px;
  height: 38px;
  color: oklch(59% 0.075 155 / 0.16);
  opacity: 0;
  transform: translate(-50%, -38%) scale(0.72);
  transition:
    opacity 900ms ease,
    transform 1100ms cubic-bezier(0.22, 1, 0.36, 1);
}

.paw-trail__step--revealed {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

.paw-trail__step--dark {
  color: oklch(84% 0.055 150 / 0.15);
}

.paw-trail__mark {
  position: relative;
  width: 100%;
  height: 100%;
  transform: rotate(calc(180deg + var(--paw-rotation))) scaleX(var(--paw-mirror));
}

.paw-trail__pad,
.paw-trail__toe {
  position: absolute;
  display: block;
  background: currentcolor;
}

.paw-trail__pad {
  bottom: 1px;
  left: 50%;
  width: 19px;
  height: 17px;
  border-radius: 52% 52% 58% 58% / 56% 56% 68% 68%;
  transform: translateX(-50%);
}

.paw-trail__toe {
  width: 8px;
  height: 10px;
  border-radius: 50%;
}

.paw-trail__toe--one {
  top: 10px;
  left: 1px;
  transform: rotate(-24deg);
}

.paw-trail__toe--two {
  top: 2px;
  left: 9px;
  transform: rotate(-8deg);
}

.paw-trail__toe--three {
  top: 2px;
  right: 9px;
  transform: rotate(8deg);
}

.paw-trail__toe--four {
  top: 10px;
  right: 1px;
  transform: rotate(24deg);
}

@media (max-width: 639px) {
  .paw-trail__step {
    width: 28px;
    height: 32px;
  }

  .paw-trail__pad {
    width: 16px;
    height: 14px;
  }

  .paw-trail__toe {
    width: 7px;
    height: 8px;
  }

  .paw-trail__toe--one,
  .paw-trail__toe--four {
    top: 9px;
  }

  .paw-trail__toe--two {
    left: 7px;
  }

  .paw-trail__toe--three {
    right: 7px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .paw-trail__step {
    transition: none;
  }
}
</style>
