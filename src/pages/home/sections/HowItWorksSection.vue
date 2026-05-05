<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { productImages, type HowStep } from '@/pages/home/content'

const { t, tm } = useI18n()
const activeStepIndex = ref(0)
const howSteps = computed(() => tm('how.steps') as HowStep[])
</script>

<template>
  <section id="how" class="px-4 py-16 sm:px-7 md:px-14 md:py-28">
    <div class="mx-auto max-w-[1320px]">
      <span data-aos="fade-up" class="mb-4 block text-[11px] font-semibold uppercase tracking-[0.13em] text-[oklch(44%_0.095_158)]">
        {{ t('how.eyebrow') }}
      </span>
      <h2 data-aos="fade-up" data-aos-delay="80" class="mb-[18px] text-[clamp(30px,3.5vw,50px)] leading-[1.1] font-semibold tracking-[-0.035em]">
        {{ t('how.titleStart') }}<br />{{ t('how.titleEnd') }}
      </h2>

      <div class="mt-12 grid grid-cols-1 gap-10 md:mt-[72px] md:grid-cols-2 md:items-center md:gap-24">
        <div class="flex flex-col">
          <button
            v-for="(step, index) in howSteps"
            :key="step.title"
            type="button"
            data-aos="fade-up"
            :data-aos-delay="index === 0 ? 0 : index === 1 ? 160 : 240"
            :class="[
              'flex w-full gap-4 border-x-0 border-t border-b-0 border-[oklch(0%_0_0_/_0.07)] bg-transparent py-6 text-left sm:gap-7 sm:py-7',
              index === howSteps.length - 1 ? 'border-b' : '',
            ]"
            @mouseenter="activeStepIndex = index"
            @focus="activeStepIndex = index"
            @click="activeStepIndex = index"
          >
            <div
              :class="[
                'min-w-5 shrink-0 pt-1 text-[11px] font-semibold tracking-[0.08em] transition-colors',
                index === activeStepIndex ? 'text-[oklch(44%_0.095_158)]' : 'text-[oklch(72%_0.006_240)]',
              ]"
            >
              {{ index + 1 }}
            </div>
            <div>
              <h3
                :class="[
                  'mb-2 text-base font-medium tracking-[-0.015em] transition-colors sm:text-[17px]',
                  index === activeStepIndex ? 'text-[oklch(35%_0.08_158)]' : 'text-[oklch(13%_0.01_240)]',
                ]"
              >
                {{ step.title }}
              </h3>
              <p class="text-sm leading-[1.7] font-light text-[oklch(48%_0.008_240)]">{{ step.body }}</p>
            </div>
          </button>
        </div>

        <div data-aos="fade-up" data-aos-delay="160" class="group relative flex aspect-[0.95] items-center justify-center overflow-hidden rounded-[24px] bg-[oklch(95%_0.032_150)] sm:aspect-square">
          <img
            :src="productImages.line"
            alt="CatSenser device"
            class="w-[80%] drop-shadow-[0_16px_32px_rgba(0,0,0,0.12)] transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
          />
          <div class="absolute bottom-4 left-4 right-4 min-w-0 bg-white px-4 py-4 shadow-[0_8px_32px_rgba(0,0,0,0.10)] sm:bottom-6 sm:left-auto sm:right-6 sm:min-w-44 sm:px-[22px] sm:py-[18px]">
            <div class="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.09em] text-[oklch(72%_0.006_240)]">{{ t('how.monitor.title') }}</div>
            <div class="mb-[7px] flex items-center gap-2.5">
              <div class="w-12 text-[11px] font-normal text-[oklch(48%_0.008_240)] sm:w-14">{{ t('how.monitor.weight') }}</div>
              <div class="h-[3px] flex-1 overflow-hidden bg-[oklch(90%_0.02_155)]">
                <div class="h-full w-[82%] bg-[oklch(44%_0.095_158)]"></div>
              </div>
            </div>
            <div class="mb-[7px] flex items-center gap-2.5">
              <div class="w-12 text-[11px] font-normal text-[oklch(48%_0.008_240)] sm:w-14">{{ t('how.monitor.hydration') }}</div>
              <div class="h-[3px] flex-1 overflow-hidden bg-[oklch(90%_0.02_155)]">
                <div class="h-full w-[91%] bg-[oklch(44%_0.095_158)]"></div>
              </div>
            </div>
            <div class="mb-[7px] flex items-center gap-2.5">
              <div class="w-12 text-[11px] font-normal text-[oklch(48%_0.008_240)] sm:w-14">{{ t('how.monitor.muscle') }}</div>
              <div class="h-[3px] flex-1 overflow-hidden bg-[oklch(90%_0.02_155)]">
                <div class="h-full w-[75%] bg-[oklch(44%_0.095_158)]"></div>
              </div>
            </div>
            <div class="mt-2.5 text-[20px] font-semibold tracking-[-0.03em] text-[oklch(44%_0.095_158)]">
              94 <span class="text-[11px] font-normal text-[oklch(72%_0.006_240)]">/ 100</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
