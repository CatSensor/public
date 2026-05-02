<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import SignupForm from '@/pages/home/components/SignupForm.vue'

const { t } = useI18n()
</script>

<template>
  <section id="cta" class="bg-[oklch(96.5%_0.006_110)] px-4 py-16 sm:px-7 md:px-14 md:py-28">
    <div class="mx-auto max-w-[1320px] border-t border-[oklch(84%_0.02_150)] pt-10 lg:pt-14">
      <div class="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(420px,0.8fr)] lg:items-end lg:gap-16 xl:gap-24">
        <div class="lg:pr-8">
          <span data-aos="fade-up" class="mb-4 block text-[11px] font-semibold uppercase tracking-[0.13em] text-[oklch(44%_0.095_158)]">
            {{ t('cta.eyebrow') }}
          </span>
          <h2 data-aos="fade-up" data-aos-delay="80" class="mb-[18px] max-w-[15ch] text-[clamp(30px,3.5vw,50px)] leading-[1.08] font-semibold tracking-[-0.035em]">
            {{ t('cta.titleStart') }}<br />{{ t('cta.titleEnd') }}
          </h2>
          <p data-aos="fade-up" data-aos-delay="160" class="max-w-[620px] text-[15px] leading-[1.7] font-light text-[oklch(48%_0.008_240)] sm:text-[17px]">
            {{ t('cta.description') }}
          </p>
        </div>

        <div data-aos="fade-up" data-aos-delay="240" class="w-full lg:pb-1">
          <SignupForm />
        </div>
      </div>
    </div>
  </section>
</template>
