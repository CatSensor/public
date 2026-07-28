<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import type { TimelineEntry } from '@/pages/about/content'

const { t, tm } = useI18n()
const timelineEntries = computed(() => (tm('about.timeline.items') as TimelineEntry[]).slice().reverse())
</script>

<template>
  <section
    id="timeline"
    class="timeline-section overflow-hidden px-4 py-14 sm:px-6 md:px-10 md:py-16"
  >
    <div class="mx-auto max-w-6xl">
      <div class="grid gap-8 lg:grid-cols-[0.42fr_1.58fr] lg:gap-12">
        <span
          data-aos="fade-up"
          class="flex items-center gap-3 self-start pt-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-[oklch(38%_0.09_158)]"
        >
          <span aria-hidden="true" class="h-px w-6 bg-current"></span>
          {{ t('about.timeline.eyebrow') }}
        </span>

        <div>
          <h2
            data-aos="fade-up"
            data-aos-delay="70"
            class="max-w-[12ch] text-[clamp(36px,5vw,62px)] leading-[0.97] font-medium tracking-[-0.055em] text-[oklch(16%_0.02_155)]"
          >
            {{ t('about.timeline.title') }}
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="130"
            class="mt-4 max-w-[600px] text-[14px] leading-[1.65] font-light text-[oklch(43%_0.018_158)] sm:text-[16px]"
          >
            {{ t('about.timeline.description') }}
          </p>
        </div>
      </div>

      <ol class="mt-12 border-b border-[oklch(72%_0.045_153_/_0.42)]">
        <li
          v-for="(entry, index) in timelineEntries"
          :key="`${entry.period}-${entry.title}`"
          data-aos="fade-up"
          :data-aos-delay="Math.min(index * 70, 210)"
          class="timeline-entry relative grid gap-6 border-t border-[oklch(72%_0.045_153_/_0.42)] py-8 md:grid-cols-[130px_minmax(0,1fr)_170px] md:gap-8 lg:grid-cols-[150px_minmax(0,1fr)_180px] lg:gap-10 lg:py-10"
        >
          <div class="relative">
            <span class="mb-3 block size-1.5 bg-[oklch(59%_0.1_153)]"></span>
            <p class="text-[15px] leading-[1.3] font-medium tracking-[-0.02em] text-[oklch(31%_0.07_158)] sm:text-base">
              {{ entry.period }}
            </p>
          </div>

          <article class="max-w-[720px]">
            <h3 class="text-[clamp(22px,2.3vw,30px)] leading-[1.1] font-medium tracking-[-0.04em] text-[oklch(16%_0.02_155)]">
              {{ entry.title }}
            </h3>
            <p class="mt-3 text-[14px] leading-[1.65] font-light text-[oklch(42%_0.018_158)] sm:text-[15px]">
              {{ entry.summary }}
            </p>

            <ul class="mt-4 space-y-2">
              <li
                v-for="detail in entry.details"
                :key="detail"
                class="flex gap-3 text-[13px] leading-[1.7] font-light text-[oklch(45%_0.018_158)] sm:text-sm"
              >
                <span aria-hidden="true" class="mt-[0.78em] h-px w-3 shrink-0 bg-[oklch(48%_0.075_158_/_0.65)]"></span>
                <span>{{ detail }}</span>
              </li>
            </ul>

            <a
              v-if="entry.proofUrl"
              :href="entry.proofUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="group mt-6 inline-flex items-center gap-2 border-b border-[oklch(38%_0.09_158_/_0.35)] pb-1 text-[13px] font-semibold text-[oklch(35%_0.09_158)] transition hover:border-[oklch(38%_0.09_158)]"
            >
              {{ entry.proofLabel || t('about.timeline.proofDefaultLabel') }}
              <span aria-hidden="true" class="transition-transform duration-300 group-hover:translate-x-1">↗</span>
            </a>
          </article>

          <div class="timeline-visual flex items-center justify-center md:justify-end">
            <div
              v-if="entry.image"
              class="timeline-image aspect-[0.82] w-full max-w-[150px] overflow-hidden border-[3px] border-[oklch(98%_0.006_120)] bg-[oklch(91%_0.025_150)] shadow-[0_16px_38px_rgba(22,78,56,0.11)] md:max-w-[160px]"
            >
              <img
                :src="entry.image"
                :alt="entry.title"
                loading="lazy"
                decoding="async"
                class="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.035]"
              />
            </div>
            <div v-else aria-hidden="true" class="timeline-rule"></div>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.timeline-section {
  background: oklch(96.5% 0.018 150);
}

.timeline-image {
  border-radius: 12px;
}

.timeline-entry:nth-child(even) .timeline-image {
  border-radius: 12px;
}

.timeline-rule {
  width: min(100%, 190px);
  height: 1px;
  border-top: 1.5px dashed oklch(52% 0.075 158 / 0.38);
}

@media (max-width: 767px) {
  .timeline-visual {
    justify-content: flex-start;
  }

  .timeline-image {
    max-width: 210px;
  }

  .timeline-rule {
    width: 150px;
    height: 1px;
  }
}
</style>
