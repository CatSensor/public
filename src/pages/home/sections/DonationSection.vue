<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import Eyebrow from '@/components/shared/Eyebrow.vue'

type DonationStep = {
  field: string
  value: string
}

const { t, tm } = useI18n()

const donationSteps = computed(() => tm('donation.steps') as DonationStep[])
</script>

<template>
  <section id="donation" class="bg-[oklch(98.5%_0.003_90)] px-4 py-12 sm:px-6 md:px-10 md:py-16">
    <div class="mx-auto max-w-6xl border-t border-[oklch(84%_0.02_150)] pt-8 lg:pt-10">
      <div class="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10 xl:gap-14">
        <div class="lg:pr-8">
          <Eyebrow
            data-aos="fade-up"
            bars="left"
            class="mb-5 text-[oklch(44%_0.095_158)]"
          >
            {{ t('donation.eyebrow') }}
          </Eyebrow>
          <h2
            data-aos="fade-up"
            data-aos-delay="80"
            class="max-w-[13ch] text-[clamp(28px,3vw,42px)] leading-[1.08] font-semibold tracking-[-0.035em] text-[oklch(13%_0.01_240)]"
          >
            {{ t('donation.title') }}
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="160"
            class="mt-4 max-w-[560px] text-[14px] leading-[1.65] font-light text-[oklch(48%_0.008_240)] sm:text-[15px]"
          >
            {{ t('donation.description') }}
          </p>

          <div data-aos="fade-up" data-aos-delay="240" class="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href="https://www.zeffy.com/fr-CA/donation-form/cd11da60-f953-44f0-afdd-15c34dbb6697"
              target="_blank"
              rel="noreferrer"
              class="inline-flex items-center justify-center rounded-[9px] bg-[oklch(44%_0.095_158)] px-5 py-2.5 text-[13px] font-medium tracking-[-0.01em] text-white transition hover:-translate-y-px hover:bg-[oklch(52%_0.095_158)] active:translate-y-0"
            >
              {{ t('donation.primaryCta') }}
            </a>
            <p class="text-sm leading-[1.6] text-[oklch(56%_0.008_240)]">
              {{ t('donation.secondaryNote') }}
            </p>
          </div>
        </div>

      <div
        data-aos="fade-up"
        data-aos-delay="200"
        class="lg:border-l lg:border-[oklch(84%_0.02_150)] lg:pl-8 xl:pl-10"
      >
        <Eyebrow bars="left" class="text-[oklch(44%_0.095_158)]">
          {{ t('donation.instructionsEyebrow') }}
        </Eyebrow>
        <p class="mt-3 max-w-[46ch] text-[15px] leading-[1.6] text-[oklch(13%_0.01_240)] sm:text-[16px]">
          {{ t('donation.instructionsLead') }}
        </p>

        <div class="mt-5 border-t border-[oklch(84%_0.02_150)]">
          <article
            v-for="(step, index) in donationSteps"
            :key="step.field"
            class="grid gap-3 border-b border-[oklch(84%_0.02_150)] py-3 sm:grid-cols-[32px_minmax(0,1fr)] sm:gap-4"
          >
            <span
              class="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[oklch(84%_0.02_150)] text-xs font-semibold text-[oklch(44%_0.095_158)]"
            >
              {{ index + 1 }}
            </span>
            <div>
              <p class="text-sm font-medium text-[oklch(13%_0.01_240)]">
                {{ step.field }}
              </p>
              <p class="mt-1 break-words font-mono text-[12px] leading-[1.6] text-[oklch(48%_0.008_240)] sm:text-[13px]">
                {{ step.value }}
              </p>
            </div>
          </article>
        </div>

        <p class="mt-4 max-w-[46ch] text-[13px] leading-[1.6] text-[oklch(48%_0.008_240)]">
          {{ t('donation.instructionsFoot') }}
        </p>
      </div>
      </div>
    </div>
  </section>
</template>
