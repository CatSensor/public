<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import cegepstLogo from '@/assets/partner-logo/cegepst.webp'
import colosseLogo from '@/assets/partner-logo/COLOSSE_LOGO_AJUSTE.svg'
import tonEquipier from '@/assets/partner-logo/ton-equipier.webp'
import hubLogo from '@/assets/partner-logo/hub-logo.webp'
import leviatLegalLogo from '@/assets/partner-logo/leviat-legal.webp'

type PartnerCopy = {
  key: string
  name: string
}

const { t, tm } = useI18n()

const partnerLogoMap = {
  cegepst: { logo: cegepstLogo, url: 'https://www.cegepst.qc.ca/' },
  colosse: { logo: colosseLogo, url: 'https://www.colosse.ca/' },
  tonequipier: { logo: tonEquipier, url: 'https://www.tonequipier.com/' },
  hub: { logo: hubLogo, url: 'https://hub-sorel-tracy.mathiscote.ca/' },
  leviat: { logo: leviatLegalLogo, url: 'https://www.leviatlegal.com/' }
} as const

const partners = computed(() =>
  (tm('partners.items') as PartnerCopy[]).map((partner) => ({
    ...partner,
    logo: partnerLogoMap[partner.key as keyof typeof partnerLogoMap],
  })),
)
</script>

<template>
  <section id="partners" class="bg-[oklch(96.5%_0.006_110)] px-4 py-16 sm:px-7 md:px-14 md:py-24">
    <div class="mx-auto max-w-[1320px]">
      <div class="mb-12 max-w-[760px] md:mb-14">
        <span data-aos="fade-up"
          class="mb-4 block text-[11px] font-semibold uppercase tracking-[0.13em] text-[oklch(44%_0.095_158)]">
          {{ t('partners.eyebrow') }}
        </span>
        <h2 data-aos="fade-up" data-aos-delay="80"
          class="text-[clamp(30px,3.5vw,50px)] leading-[1.08] font-semibold tracking-[-0.035em] text-[oklch(13%_0.01_240)]">
          {{ t('partners.title') }}
        </h2>
        <p data-aos="fade-up" data-aos-delay="160"
          class="mt-5 max-w-[700px] text-[15px] leading-[1.7] font-light text-[oklch(48%_0.008_240)] sm:text-[17px]">
          {{ t('partners.description') }}
        </p>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <article v-for="(partner, index) in partners" :key="partner.key" data-aos="fade-up" :data-aos-delay="index * 80"
          class="group flex min-h-[140px] items-center justify-center rounded-[6px] border border-black/8 bg-[#fbfaf8] px-6 py-8 shadow-[0_18px_44px_rgba(0,0,0,0.05)] transition-transform duration-300 hover:-translate-y-1 hover:bg-white">
          <a :href="partner.logo.url">
            <img :src="partner.logo.logo" :alt="partner.name" loading="lazy" decoding="async"
              class="max-h-14 w-full object-contain opacity-65 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0">
          </a>
        </article>
      </div>
    </div>
  </section>
</template>
