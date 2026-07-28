<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import cegepstLogo from '@/assets/partner-logo/cegepst.webp'
import colosseLogo from '@/assets/partner-logo/COLOSSE_LOGO_AJUSTE.svg'
import hubLogo from '@/assets/partner-logo/hub-logo.webp'
import leviatLegalLogo from '@/assets/partner-logo/leviat-legal.webp'
import sapdsrLogo from '@/assets/partner-logo/sapdsr.png'
import tonEquipier from '@/assets/partner-logo/ton-equipier.webp'

type PartnerCopy = {
  key: string
  name: string
}

const { t, tm } = useI18n()

const partnerLogoMap = {
  cegepst: { logo: cegepstLogo, url: 'https://www.cegepst.qc.ca/' },
  colosse: { logo: colosseLogo, url: 'https://www.colosse.ca/' },
  sapdsr: { logo: sapdsrLogo, url: 'https://sapdsr.ca/' },
  tonequipier: { logo: tonEquipier, url: 'https://www.tonequipier.com/' },
  hub: { logo: hubLogo, url: 'https://hub-sorel-tracy.mathiscote.ca/' },
  leviat: { logo: leviatLegalLogo, url: 'https://www.leviatlegal.com/' },
} as const

const partners = computed(() =>
  (tm('partners.items') as PartnerCopy[]).map((partner) => ({
    ...partner,
    logo: partnerLogoMap[partner.key as keyof typeof partnerLogoMap],
  })),
)
</script>

<template>
  <section id="partners" class="partners-section relative overflow-hidden px-4 py-14 sm:px-6 md:px-10 md:py-16">
    <div class="relative mx-auto max-w-6xl">
      <div class="mx-auto max-w-[760px] text-center">
        <span
          data-aos="fade-up"
          class="mb-5 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-[oklch(79%_0.07_153)]"
        >
          <span aria-hidden="true" class="h-px w-6 bg-current"></span>
          {{ t('partners.eyebrow') }}
          <span aria-hidden="true" class="h-px w-6 bg-current"></span>
        </span>

        <h2
          data-aos="fade-up"
          data-aos-delay="70"
          class="text-[clamp(34px,4.4vw,54px)] leading-[1.04] font-medium tracking-[-0.05em] text-[oklch(98.5%_0.008_105)]"
        >
          {{ t('partners.title') }}
        </h2>

        <p
          data-aos="fade-up"
          data-aos-delay="130"
          class="mx-auto mt-5 max-w-[660px] text-[14px] leading-[1.65] font-light text-[oklch(87%_0.025_150_/_0.78)] sm:text-[16px]"
        >
          {{ t('partners.description') }}
        </p>
      </div>

      <div
        data-aos="fade-up"
        data-aos-delay="180"
        class="partner-gallery mt-10 overflow-hidden rounded-[12px] border border-white/12 bg-[oklch(98%_0.008_105)] shadow-[0_24px_56px_rgba(5,35,24,0.26)]"
      >
        <a
          v-for="partner in partners"
          :key="partner.key"
          :href="partner.logo.url"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`${partner.name} — ${t('partners.eyebrow')}`"
          class="partner-link group relative flex min-h-[104px] items-center justify-center px-5 py-6 transition-colors duration-300 hover:bg-white focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[oklch(38%_0.09_158)] sm:min-h-[112px]"
        >
          <img
            :src="partner.logo.logo"
            :alt="partner.name"
            loading="lazy"
            decoding="async"
            class="max-h-12 w-full max-w-[130px] object-contain opacity-70 grayscale transition-[filter,opacity,transform] duration-500 group-hover:scale-[1.04] group-hover:opacity-100 group-hover:grayscale-0 sm:max-w-[140px]"
          />
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.partners-section {
  background: oklch(38% 0.09 155);
}

.partner-gallery {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.partner-link {
  border-right: 1px solid oklch(25% 0.035 158 / 0.1);
  border-bottom: 1px solid oklch(25% 0.035 158 / 0.1);
}

.partner-link:nth-child(2n) {
  border-right: 0;
}

.partner-link:nth-last-child(-n + 2) {
  border-bottom: 0;
}

@media (min-width: 768px) {
  .partner-gallery {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .partner-link:nth-child(2n) {
    border-right: 1px solid oklch(25% 0.035 158 / 0.1);
  }

  .partner-link:nth-child(3n) {
    border-right: 0;
  }

  .partner-link:nth-last-child(-n + 3) {
    border-bottom: 0;
  }
}

@media (min-width: 1280px) {
  .partner-gallery {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }

  .partner-link {
    border-right: 1px solid oklch(25% 0.035 158 / 0.1);
    border-bottom: 0;
  }

  .partner-link:nth-child(3n) {
    border-right: 1px solid oklch(25% 0.035 158 / 0.1);
  }

  .partner-link:last-child {
    border-right: 0;
  }
}
</style>
