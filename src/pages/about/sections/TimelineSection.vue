<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { type TimelineEntry } from '@/pages/about/content'

const { t, tm } = useI18n()

const timelineEntries = computed(() => (tm('about.timeline.items') as TimelineEntry[]).slice().reverse())
const timelineRows = computed(() =>
  timelineEntries.value.map((entry, index) => ({
    ...entry,
    side: index % 2 === 0 ? 'left' : 'right',
  })),
)
</script>

<template>
  <section
    id="timeline"
    class="px-4 pb-14 pt-8 sm:px-7 md:px-14 md:pb-20 md:pt-10"
  >
    <div class="mx-auto max-w-[1320px]">
      <div class="max-w-[780px]">
        <span
          data-aos="fade-up"
          class="mb-4 block text-[11px] font-semibold uppercase tracking-[0.13em] text-[oklch(44%_0.095_158)]"
        >
          {{ t('about.timeline.eyebrow') }}
        </span>
        <h2
          data-aos="fade-up"
          data-aos-delay="80"
          class="max-w-[15ch] text-[clamp(32px,7vw,64px)] leading-[0.98] font-semibold tracking-[-0.045em] text-[oklch(13%_0.01_240)]"
        >
          {{ t('about.timeline.title') }}
        </h2>
        <p
          data-aos="fade-up"
          data-aos-delay="140"
          class="mt-5 max-w-[64ch] text-[15px] leading-[1.75] font-light text-[oklch(48%_0.008_240)] sm:text-[17px]"
        >
          {{ t('about.timeline.description') }}
        </p>
      </div>

      <div class="relative mt-12 space-y-10 md:space-y-12">
        <div class="pointer-events-none absolute top-0 left-1/2 hidden h-full w-px -translate-x-1/2 bg-[oklch(84%_0.018_150)] md:block"></div>

        <div
          v-for="(entry, index) in timelineRows"
          :key="`${entry.period}-${entry.title}`"
          data-aos="fade-up"
          :data-aos-delay="index * 90 + 120"
          class="relative grid gap-4 md:grid-cols-[minmax(0,1fr)_56px_minmax(0,1fr)] md:items-stretch md:gap-6"
        >
          <div class="pointer-events-none absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:flex">
            <span class="flex size-6 items-center justify-center rounded-full bg-[oklch(44%_0.095_158_/_0.2)]">
              <span class="size-2.5 rounded-full bg-[oklch(44%_0.095_158)]"></span>
            </span>
          </div>

          <article
            :class="[
              'p-1 sm:p-7 md:row-start-1',
              entry.side === 'left' ? 'md:col-start-1' : 'md:col-start-3',
            ]"
          >
            <h3 class="text-[22px] leading-[1.12] font-semibold tracking-[-0.03em] text-[oklch(13%_0.01_240)] sm:text-[26px]">
              {{ entry.title }}
            </h3>
            <p class="mt-3 text-[15px] leading-[1.75] font-light text-[oklch(45%_0.01_240)] sm:text-[16px]">
              {{ entry.summary }}
            </p>

            <div
              v-if="entry.image"
              class="mt-4 overflow-hidden rounded-[6px] bg-[oklch(92%_0.01_120)]"
            >
              <img
                :src="entry.image"
                :alt="entry.title"
                class="aspect-[16/10] h-full w-full object-cover"
              />
            </div>

            <ul class="mt-4 list-inside list-disc space-y-2 text-[14px] leading-[1.7] font-light text-[oklch(43%_0.01_240)] sm:text-[15px]">
              <li
                v-for="detail in entry.details"
                :key="detail"
              >
                {{ detail }}
              </li>
            </ul>

            <a
              v-if="entry.proofUrl"
              :href="entry.proofUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-5 inline-flex items-center rounded-[6px] border border-[oklch(34%_0.1_155_/_0.35)] bg-[oklch(44%_0.095_158_/_0.08)] px-4 py-2.5 text-sm font-medium text-[oklch(34%_0.1_155)] transition hover:bg-[oklch(44%_0.095_158_/_0.14)]"
            >
              {{ entry.proofLabel || t('about.timeline.proofDefaultLabel') }}
            </a>
          </article>

          <div
            :class="[
              'hidden px-2 md:row-start-1 md:flex md:items-center',
              entry.side === 'left' ? 'md:col-start-3 md:justify-start' : 'md:col-start-1 md:justify-end',
            ]"
          >
            <p class="text-[clamp(16px,1.7vw,26px)] leading-[1.15] font-medium tracking-[-0.01em] text-[oklch(13%_0.01_240_/_0.8)]">
              {{ entry.period }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
