<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import SignupForm from '@/pages/home/components/SignupForm.vue'

const { t } = useI18n()
</script>

<template>
  <section
    id="cta"
    class="relative overflow-hidden bg-[oklch(38%_0.09_155)] px-4 pb-20 pt-16 text-white sm:px-7 md:px-14 md:pb-28 md:pt-24"
  >
    <div
      aria-hidden="true"
      class="pointer-events-none absolute -bottom-36 -right-20 size-[360px] rounded-full bg-white/[0.035] sm:-bottom-44 sm:-right-24 sm:size-[460px]"
    ></div>

    <div class="relative z-10 mx-auto max-w-[720px] text-center">
      <span
        data-aos="fade-up"
        class="mb-5 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.13em] text-[oklch(78%_0.07_155)] before:h-px before:w-5 before:bg-current"
      >
        {{ t('cta.eyebrow') }}
      </span>
      <h2
        data-aos="fade-up"
        data-aos-delay="80"
        class="mx-auto max-w-[15ch] text-[clamp(34px,5vw,66px)] leading-[1.02] font-semibold tracking-[-0.045em]"
      >
        <span class="block text-white">{{ t('cta.titleStart') }}</span>
        <span class="mt-1 block font-light text-[oklch(75%_0.09_150)]">{{ t('cta.titleEnd') }}</span>
      </h2>
      <p
        data-aos="fade-up"
        data-aos-delay="160"
        class="mx-auto mt-6 max-w-[580px] text-[15px] leading-[1.75] font-light text-white/65 sm:text-[17px]"
      >
        {{ t('cta.description') }}
      </p>

      <div data-aos="fade-up" data-aos-delay="240" class="mt-8 w-full md:mt-10">
        <SignupForm />
      </div>
    </div>
  </section>
</template>
