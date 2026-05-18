<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

type DonationStep = {
  field: string
  value: string
}

const { t, tm } = useI18n()

const donationSteps = computed(() => tm('donation.steps') as DonationStep[])
</script>

<template>
  <section id="donation" class="bg-[oklch(98.5%_0.003_90)] px-4 py-16 sm:px-7 md:px-14 md:py-24">
    <div class="mx-auto max-w-[1320px] border-t border-[oklch(84%_0.02_150)] pt-10 lg:pt-14">
      <div class="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 xl:gap-24">
        <div class="lg:pr-8">
          <span
            data-aos="fade-up"
            class="mb-4 block text-[11px] font-semibold uppercase tracking-[0.13em] text-[oklch(44%_0.095_158)]"
          >
            {{ t('donation.eyebrow') }}
          </span>
          <h2
            data-aos="fade-up"
            data-aos-delay="80"
            class="max-w-[13ch] text-[clamp(30px,3.5vw,50px)] leading-[1.08] font-semibold tracking-[-0.035em] text-[oklch(13%_0.01_240)]"
          >
            {{ t('donation.title') }}
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="160"
            class="mt-5 max-w-[620px] text-[15px] leading-[1.75] font-light text-[oklch(48%_0.008_240)] sm:text-[17px]"
          >
            {{ t('donation.description') }}
          </p>

          <div data-aos="fade-up" data-aos-delay="240" class="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href="https://www.zeffy.com/fr-CA/donation-form/cd11da60-f953-44f0-afdd-15c34dbb6697"
              target="_blank"
              rel="noreferrer"
              class="inline-flex items-center justify-center rounded-[6px] bg-[oklch(44%_0.095_158)] px-[22px] py-[11px] text-sm font-medium tracking-[-0.01em] text-white transition hover:-translate-y-px hover:bg-[oklch(52%_0.095_158)] active:translate-y-0"
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
        class="lg:border-l lg:border-[oklch(84%_0.02_150)] lg:pl-10 xl:pl-14"
      >
        <p class="text-[11px] font-semibold uppercase tracking-[0.13em] text-[oklch(44%_0.095_158)]">
          {{ t('donation.instructionsEyebrow') }}
        </p>
        <p class="mt-3 max-w-[46ch] text-[17px] leading-[1.65] text-[oklch(13%_0.01_240)] sm:text-[18px]">
          {{ t('donation.instructionsLead') }}
        </p>

        <div class="mt-8 border-t border-[oklch(84%_0.02_150)]">
          <article
            v-for="(step, index) in donationSteps"
            :key="step.field"
            class="grid gap-3 border-b border-[oklch(84%_0.02_150)] py-5 sm:grid-cols-[32px_minmax(0,1fr)] sm:gap-4"
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
              <p class="mt-2 break-words font-mono text-[13px] leading-[1.7] text-[oklch(48%_0.008_240)] sm:text-[14px]">
                {{ step.value }}
              </p>
            </div>
          </article>
        </div>

        <p class="mt-6 max-w-[46ch] text-sm leading-[1.7] text-[oklch(48%_0.008_240)]">
          {{ t('donation.instructionsFoot') }}
        </p>
      </div>
      </div>
    </div>
  </section>
</template>
