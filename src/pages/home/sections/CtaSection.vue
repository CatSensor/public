<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import SignupForm from '@/pages/home/components/SignupForm.vue'
import { productImages } from '@/pages/home/content'

const { t } = useI18n()

const heroArticle = ref<HTMLElement | null>(null)
const phoneWrap = ref<HTMLElement | null>(null)

const TRAVEL = 480 // distance de départ (px) sous la position finale
const LERP_FACTOR = 0.05 // plus bas = plus "trainant"/smooth, plus haut = plus réactif

let targetY = TRAVEL
let currentY = TRAVEL
let rafId: number | null = null

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max)

function computeTarget() {
  const el = heroArticle.value
  if (!el) return

  const rect = el.getBoundingClientRect()
  const viewportH = window.innerHeight

  const start = viewportH // la section touche le bas du viewport
  const end = viewportH * 0.35 // la section est bien montée dans le viewport
  const progress = clamp((start - rect.top) / (start - end), 0, 1)
  const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic

  targetY = (1 - eased) * TRAVEL
}

function tick() {
  computeTarget()
  currentY += (targetY - currentY) * LERP_FACTOR

  if (phoneWrap.value) {
    phoneWrap.value.style.transform = `translateY(${currentY.toFixed(2)}px)`
    phoneWrap.value.style.opacity = String(clamp(1 - currentY / TRAVEL, 0.25, 1))
  }

  rafId = requestAnimationFrame(tick)
}

onMounted(() => {
  rafId = requestAnimationFrame(tick)
})

onUnmounted(() => {
  if (rafId !== null) cancelAnimationFrame(rafId)
})
</script>

<template>
  <section id="cta" class="bg-[oklch(98.5%_0.003_90)] px-4 py-16 sm:px-7 md:px-14 md:py-24">
    <div class="mx-auto max-w-[1320px] border-t border-[oklch(84%_0.02_150)] pt-8 sm:pt-12">
      <div class="grid gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(300px,0.8fr)] lg:gap-7 xl:gap-8">
        <article
          ref="heroArticle"
          data-aos="fade-up"
          class="relative isolate min-h-[500px] overflow-hidden rounded-[10px] bg-[oklch(27%_0.065_158)] px-6 py-8 text-[oklch(98.5%_0.003_90)] sm:min-h-[540px] sm:px-9 sm:py-10 lg:min-h-[390px] lg:px-9 lg:py-10 xl:min-h-[420px]"
        >
          <div class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_42%,oklch(58%_0.11_158/.28),transparent_44%)]"></div>

          <div class="relative z-10 max-w-[75%] sm:max-w-[62%] lg:max-w-[54%]">
            <span
              data-aos="fade-up"
              data-aos-delay="100"
              class="mb-4 block text-[11px] font-semibold uppercase tracking-[0.13em] text-[oklch(78%_0.09_158)]"
            >
              {{ t('cta.visualEyebrow') }}
            </span>
            <h2
              data-aos="fade-up"
              data-aos-delay="200"
              class="max-w-[14ch] text-[clamp(26px,3.4vw,46px)] leading-[1.03] font-semibold tracking-[-0.045em]"
            >
              {{ t('cta.visualTitle') }}
            </h2>
            <p
              data-aos="fade-up"
              data-aos-delay="300"
              class="mt-5 max-w-[32ch] text-[14px] leading-[1.65] text-[oklch(98.5%_0.003_90_/_0.72)] sm:text-[15px]"
            >
              {{ t('cta.visualDescription') }}
            </p>
          </div>

          <!-- Parallax custom : pas de data-aos ici, le JS gère déjà l'entrée -->
          <div
            ref="phoneWrap"
            class="pointer-events-none absolute bottom-[-32%] right-[-18%] z-0 w-[520px] will-change-transform sm:bottom-[-34%] sm:right-[-14%] sm:w-[620px] lg:bottom-[-36%] lg:right-[-16%] lg:w-[590px] xl:right-[-13%] xl:w-[650px]"
          >
            <div class="absolute left-[30%] top-[8%] h-[85%] w-[41%] overflow-hidden bg-white">
              <img
                :src="productImages.appPreview"
                :alt="t('cta.visualAlt')"
                width="365"
                height="734"
                loading="lazy"
                decoding="async"
                class="h-full w-full object-cover object-top"
              />
            </div>
            <img
              :src="productImages.phoneFrame"
              alt=""
              aria-hidden="true"
              width="350"
              height="350"
              loading="lazy"
              decoding="async"
              class="relative z-10 w-full"
            />
          </div>
        </article>

        <aside
          data-aos="fade-up"
          data-aos-delay="100"
          class="flex flex-col justify-center rounded-[10px] bg-[oklch(96.5%_0.006_110)] px-6 py-8 sm:px-9 sm:py-10 lg:px-8 xl:px-9"
        >
          <span
            data-aos="fade-up"
            data-aos-delay="200"
            class="mb-4 block text-[11px] font-semibold uppercase tracking-[0.13em] text-[oklch(44%_0.095_158)]"
          >
            {{ t('cta.eyebrow') }}
          </span>
          <h2
            data-aos="fade-up"
            data-aos-delay="300"
            class="max-w-[14ch] text-[clamp(26px,3vw,38px)] leading-[1.08] font-semibold tracking-[-0.04em] text-[oklch(13%_0.01_240)]"
          >
            {{ t('cta.titleStart') }}<br />{{ t('cta.titleEnd') }}
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="400"
            class="mt-4 max-w-[38ch] text-[14px] leading-[1.65] font-light text-[oklch(48%_0.008_240)] sm:text-[15px]"
          >
            {{ t('cta.description') }}
          </p>
          <div data-aos="fade-up" data-aos-delay="500" class="mt-7">
            <SignupForm stacked />
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>