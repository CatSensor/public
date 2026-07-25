<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { aboutImages, type TeamMemberText } from '@/pages/about/content'

const { t, tm } = useI18n()

const teamText = computed(() => tm('about.team.members') as TeamMemberText[])
const teamMembers = computed(() =>
  teamText.value.map((member, index) => ({
    ...member,
    image: index === 0 ? aboutImages.samuel : aboutImages.william,
  })),
)
</script>

<template>
  <section class="relative overflow-hidden px-4 pb-6 pt-[124px] sm:px-7 md:px-14 md:pb-6 md:pt-[142px]">
    <div class="mx-auto max-w-[1320px]">
      <div class="about-hero grid min-h-[calc(100svh-170px)] items-center gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:gap-12 xl:gap-20">
        <div class="relative z-10 max-w-[600px]">
          <span
            data-aos="fade-up"
            class="mb-7 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-[oklch(38%_0.09_158)]"
          >
            <span aria-hidden="true" class="h-px w-6 bg-current"></span>
            {{ t('about.story.eyebrow') }}
          </span>

          <h1
            data-aos="fade-up"
            data-aos-delay="70"
            class="whitespace-nowrap text-[clamp(52px,8vw,96px)] leading-[0.9] tracking-[-0.07em]"
          >
            <span class="font-medium text-[oklch(16%_0.02_155)]">{{ t('about.story.brandLead') }}</span><span class="font-light italic text-[oklch(38%_0.09_158)]">{{ t('about.story.brandTail') }}</span>
          </h1>

          <div
            data-aos="fade-up"
            data-aos-delay="140"
            class="mt-12 max-w-[560px] border-l border-[oklch(38%_0.09_158_/_0.35)] pl-5 sm:pl-7"
          >
            <p class="text-[11px] font-semibold uppercase tracking-[0.14em] text-[oklch(38%_0.09_158)]">
              {{ t('about.story.missionLabel') }}
            </p>
            <h2 class="mt-3 max-w-[17ch] text-[clamp(26px,3vw,40px)] leading-[1.08] font-medium tracking-[-0.04em] text-[oklch(17%_0.02_158)]">
              {{ t('about.story.missionTitle') }}
            </h2>
            <p class="mt-5 max-w-[54ch] text-[16px] leading-[1.75] font-light text-[oklch(43%_0.018_158)] sm:text-lg">
              {{ t('about.story.missionBody') }}
            </p>
          </div>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="100"
          class="about-collage relative mx-auto aspect-[0.96] w-full max-w-[610px]"
        >
          <div class="collage-frame collage-frame-main">
            <img
              :src="aboutImages.collageTall"
              :alt="t('about.story.imageAltTall')"
              width="480"
              height="720"
              fetchpriority="high"
              decoding="async"
              class="h-full w-full object-cover"
            />
          </div>
          <div class="collage-frame collage-frame-top">
            <img
              :src="aboutImages.collageTop"
              :alt="t('about.story.imageAltTop')"
              width="960"
              height="640"
              loading="lazy"
              decoding="async"
              class="h-full w-full object-cover"
            />
          </div>
          <div class="collage-frame collage-frame-bottom">
            <img
              :src="aboutImages.collageBottom"
              :alt="t('about.story.imageAltBottom')"
              width="960"
              height="640"
              loading="lazy"
              decoding="async"
              class="h-full w-full object-cover"
            />
          </div>
          <div aria-hidden="true" class="collage-swoop"></div>
        </div>
      </div>

      <div
        data-aos="fade-up"
        class="about-approach relative mt-12 grid gap-6 overflow-hidden border-y border-[oklch(77%_0.035_153)] py-9 md:grid-cols-[0.42fr_0.78fr_1.2fr] md:items-start md:gap-10 md:py-12 lg:mt-20"
      >
        <div aria-hidden="true" class="approach-wash"></div>
        <p class="relative text-[11px] font-semibold uppercase tracking-[0.14em] text-[oklch(38%_0.09_158)]">
          {{ t('about.story.approachLabel') }}
        </p>
        <h2 class="relative max-w-[15ch] text-[clamp(26px,2.7vw,38px)] leading-[1.08] font-medium tracking-[-0.04em] text-[oklch(17%_0.02_158)]">
          {{ t('about.story.approachTitle') }}
        </h2>
        <p class="relative max-w-[62ch] text-[16px] leading-[1.75] font-light text-[oklch(43%_0.018_158)] sm:text-lg">
          {{ t('about.story.approachBody') }}
        </p>
      </div>

      <div class="mt-20 lg:mt-28">
        <span
          data-aos="fade-up"
          class="mb-12 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-[oklch(38%_0.09_158)] md:mb-16"
        >
          <span aria-hidden="true" class="h-px w-6 bg-current"></span>
          {{ t('about.team.eyebrow') }}
        </span>

        <div class="grid gap-16 md:grid-cols-2 md:gap-14 lg:gap-24">
        <article
          v-for="(member, index) in teamMembers"
          :key="member.name"
          data-aos="fade-up"
          :data-aos-delay="index * 120 + 120"
          class="team-profile"
        >
          <div
            :class="[
              'team-portrait relative mx-auto aspect-square w-full max-w-[440px] overflow-hidden bg-[oklch(91%_0.025_150)] md:mx-0',
              index % 2 === 0 ? 'team-portrait-left' : 'team-portrait-right',
            ]"
          >
            <img
              :src="member.image"
              :alt="member.name"
              width="400"
              height="400"
              loading="lazy"
              decoding="async"
              class="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.025]"
            />
          </div>

          <div class="mx-auto mt-7 w-full max-w-[440px] md:mx-0 md:mt-9">
            <p class="text-[11px] font-semibold uppercase tracking-[0.14em] text-[oklch(38%_0.09_158)]">
              {{ member.role }}
            </p>
            <h3 class="mt-3 text-[clamp(32px,4vw,54px)] leading-[1.02] font-medium tracking-[-0.055em] text-[oklch(16%_0.02_155)]">
              {{ member.name }}
            </h3>
          </div>
        </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-hero::before {
  position: absolute;
  top: 6%;
  left: -19%;
  width: 52%;
  height: 58%;
  border-radius: 50%;
  background: oklch(94% 0.022 150 / 0.5);
  content: '';
  filter: blur(4px);
  pointer-events: none;
  transform: rotate(-12deg);
}

.about-collage::before {
  position: absolute;
  inset: 7% 4% 9% 4%;
  border-radius: 50%;
  background: oklch(94% 0.018 145 / 0.48);
  content: '';
  filter: blur(18px);
  pointer-events: none;
}

.collage-frame {
  position: absolute;
  overflow: hidden;
  border: 4px solid oklch(98.5% 0.003 90);
  background: oklch(91% 0.012 120);
  box-shadow: 0 18px 45px oklch(28% 0.055 155 / 0.11);
}

.collage-frame-main {
  z-index: 1;
  top: 5%;
  left: 0;
  width: 59%;
  height: 70%;
  border-radius: 48% 52% 46% 54% / 42% 44% 56% 58%;
}

.collage-frame-top {
  z-index: 3;
  top: 0;
  right: 1%;
  width: 49%;
  height: 38%;
  border-radius: 51% 49% 47% 53% / 52% 46% 54% 48%;
}

.collage-frame-bottom {
  z-index: 2;
  right: 3%;
  bottom: 7%;
  width: 54%;
  height: 39%;
  border-radius: 49% 51% 53% 47% / 50% 44% 56% 50%;
}

.collage-swoop {
  position: absolute;
  z-index: 0;
  bottom: 1.5%;
  left: 10%;
  width: 52%;
  height: 15%;
  border-bottom: 1.5px solid oklch(50% 0.075 158 / 0.68);
  border-radius: 50%;
  transform: rotate(3deg);
  transform-origin: center;
}

.approach-wash {
  position: absolute;
  top: -90%;
  right: 5%;
  width: 38%;
  height: 260%;
  border-radius: 50%;
  background: oklch(91.5% 0.04 150 / 0.45);
  pointer-events: none;
  transform: rotate(-12deg);
}

.team-portrait {
  box-shadow: 0 20px 50px oklch(28% 0.055 155 / 0.1);
}

.team-portrait::after {
  position: absolute;
  inset: 0;
  border: 1px solid oklch(38% 0.09 158 / 0.1);
  border-radius: inherit;
  content: '';
  pointer-events: none;
}

.team-portrait-left {
  border-radius: 48% 52% 46% 54% / 45% 43% 57% 55%;
}

.team-portrait-right {
  border-radius: 53% 47% 51% 49% / 47% 54% 46% 53%;
}

@media (min-width: 768px) {
  .team-profile:nth-child(2) {
    margin-top: 96px;
  }
}

@media (max-width: 639px) {
  .about-hero::before {
    top: 0;
    left: -45%;
    width: 120%;
    height: 38%;
  }

  .collage-frame {
    border-width: 3px;
    box-shadow: 0 12px 30px oklch(28% 0.055 155 / 0.1);
  }
}
</style>
