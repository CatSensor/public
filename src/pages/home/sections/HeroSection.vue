<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { productImages } from '@/pages/home/content'

const { t } = useI18n()
</script>

<template>
  <section id="hero" class="hero-section relative overflow-hidden bg-[oklch(98.5%_0.003_90)] px-4 pb-20 pt-[124px] sm:px-7 md:px-14 md:pb-24 md:pt-[150px]">
    <div aria-hidden="true" class="hero-wash"></div>

    <div class="relative mx-auto grid min-h-[calc(100svh-174px)] max-w-[1400px] items-center gap-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 xl:gap-16">
      <div class="relative z-10 max-w-[790px]">
        <h1
          data-aos="fade-up"
          data-aos-delay="70"
          class="text-[clamp(46px,6.1vw,88px)] leading-[0.92] font-medium tracking-[-0.065em] text-[oklch(14%_0.018_158)]"
        >
          <span class="block">{{ t('hero.titleStart') }}</span>
          <em class="mt-2 block font-light italic text-[oklch(38%_0.09_158)]">
            {{ t('hero.titleAccent') }}
          </em>
          <span class="mt-2 block text-[oklch(23%_0.025_158)]">
            {{ t('hero.titleEnd') }}
          </span>
        </h1>

        <p
          data-aos="fade-up"
          data-aos-delay="140"
          class="mt-8 max-w-[610px] text-[17px] leading-[1.7] font-light text-[oklch(42%_0.018_158)] sm:text-xl"
        >
          {{ t('hero.description') }}
        </p>

        <div
          data-aos="fade-up"
          data-aos-delay="210"
          class="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center"
        >
          <a
            href="#cta"
            class="inline-flex w-full items-center justify-center rounded-[10px] bg-[oklch(38%_0.09_158)] px-6 py-3.5 text-sm font-semibold tracking-[-0.01em] text-white shadow-[0_12px_30px_rgba(18,84,58,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-[oklch(45%_0.095_158)] hover:shadow-[0_16px_36px_rgba(18,84,58,0.24)] active:translate-y-0 sm:w-auto"
          >
            {{ t('hero.primaryCta') }}
          </a>
          <a
            href="#how"
            class="inline-flex w-full items-center justify-center rounded-[10px] border border-[oklch(25%_0.025_158_/_0.2)] bg-white/45 px-6 py-3.5 text-sm font-medium tracking-[-0.01em] text-[oklch(20%_0.025_158)] backdrop-blur-sm transition duration-300 hover:border-[oklch(38%_0.09_158)] hover:bg-white/75 hover:text-[oklch(38%_0.09_158)] sm:w-auto"
          >
            {{ t('hero.secondaryCta') }}
          </a>
        </div>
      </div>

      <div
        data-aos="fade-up"
        data-aos-delay="130"
        class="hero-visual relative mx-auto flex aspect-[0.95] w-full max-w-[650px] items-center justify-center lg:mx-0 lg:justify-self-end"
      >
        <div aria-hidden="true" class="hero-orbit hero-orbit-one"></div>
        <div aria-hidden="true" class="hero-orbit hero-orbit-two"></div>
        <div class="hero-blob absolute inset-[4%] bg-[oklch(91.5%_0.046_150)]"></div>

        <img
          data-float
          :src="productImages.line"
          :alt="t('hero.productAlt')"
          width="900"
          height="864"
          fetchpriority="high"
          decoding="async"
          class="relative z-10 w-[82%] max-w-[560px] drop-shadow-[0_30px_50px_rgba(12,70,48,0.15)]"
        />

        <div
          aria-hidden="true"
          class="health-card absolute bottom-[1%] left-[1%] z-20 w-[178px] rounded-[14px] border border-white/80 bg-white/88 px-5 py-4 shadow-[0_20px_48px_rgba(12,70,48,0.14)] backdrop-blur-md sm:bottom-[5%] sm:left-0 sm:w-[210px] sm:px-6 sm:py-5 lg:-left-[3%]"
        >
          <div class="mb-4 flex items-center justify-between gap-3">
            <span class="text-[10px] font-semibold uppercase tracking-[0.1em] text-[oklch(48%_0.03_158)]">
              {{ t('how.monitor.title') }}
            </span>
            <span class="flex items-center gap-1.5 text-[10px] font-medium text-[oklch(38%_0.09_158)]">
              <span class="size-1.5 rounded-full bg-[oklch(59%_0.11_153)]"></span>
              94/100
            </span>
          </div>

          <div class="space-y-3">
            <div class="health-row">
              <span>{{ t('how.monitor.weight') }}</span>
              <span class="health-line"><span class="w-[82%]"></span></span>
            </div>
            <div class="health-row">
              <span>{{ t('how.monitor.hydration') }}</span>
              <span class="health-line"><span class="w-[91%]"></span></span>
            </div>
            <div class="health-row">
              <span>{{ t('how.monitor.muscle') }}</span>
              <span class="health-line"><span class="w-[75%]"></span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-wash {
  position: absolute;
  top: 8%;
  left: -12%;
  width: 58vw;
  height: 55vw;
  max-height: 780px;
  border-radius: 50%;
  background: oklch(93% 0.025 150 / 0.45);
  filter: blur(2px);
  pointer-events: none;
  transform: rotate(-16deg);
}

.hero-blob {
  border-radius: 43% 57% 52% 48% / 57% 39% 61% 43%;
  box-shadow: inset 0 0 0 1px oklch(38% 0.09 158 / 0.06);
  transform: rotate(-5deg);
}

.hero-orbit {
  position: absolute;
  border: 1px solid oklch(42% 0.08 158 / 0.2);
  border-radius: 50%;
  pointer-events: none;
}

.hero-orbit-one {
  inset: 0 4% 8% 0;
  transform: rotate(13deg);
}

.hero-orbit-two {
  inset: 9% -1% -2% 9%;
  border-style: dashed;
  opacity: 0.55;
  transform: rotate(-11deg);
}

.health-row {
  display: grid;
  grid-template-columns: 56px 1fr;
  align-items: center;
  gap: 10px;
  font-size: 10px;
  color: oklch(48% 0.018 158);
}

.health-line {
  height: 3px;
  overflow: hidden;
  border-radius: 9999px;
  background: oklch(88% 0.025 153);
}

.health-line > span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: oklch(38% 0.09 158);
}

@media (max-width: 1023px) {
  .hero-wash {
    top: 5%;
    left: -32%;
    width: 110vw;
    height: 88vw;
  }
}

@media (max-width: 639px) {
  .hero-section {
    text-align: center;
  }

  .hero-visual {
    margin-top: -10px;
  }

  .health-row {
    grid-template-columns: 48px 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-orbit {
    display: none;
  }
}
</style>
