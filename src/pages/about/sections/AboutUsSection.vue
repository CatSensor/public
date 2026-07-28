<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import Eyebrow from '@/components/shared/Eyebrow.vue'
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
  <section class="relative overflow-hidden px-4 pb-4 pt-[88px] sm:px-6 md:px-10 md:pt-[88px]">
    <div class="mx-auto max-w-6xl">
      <div class="about-hero grid min-h-[calc(100svh-104px)] items-center gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:gap-10">
        <div class="relative z-10 max-w-[540px]">
          <Eyebrow
            data-aos="fade-up"
            bars="left"
            class="mb-5 tracking-[0.15em] text-[oklch(38%_0.09_158)]"
          >
            {{ t('about.story.eyebrow') }}
          </Eyebrow>

          <h1
            data-aos="fade-up"
            data-aos-delay="70"
            class="whitespace-nowrap text-[clamp(42px,6vw,70px)] leading-[0.92] tracking-[-0.065em]"
          >
            <span class="font-medium text-[oklch(16%_0.02_155)]">{{ t('about.story.brandLead') }}</span><span class="font-light italic text-[oklch(38%_0.09_158)]">{{ t('about.story.brandTail') }}</span>
          </h1>

          <div
            data-aos="fade-up"
            data-aos-delay="140"
            class="mt-8 max-w-[520px] border-l border-[oklch(38%_0.09_158_/_0.35)] pl-5"
          >
            <p class="text-[11px] font-semibold uppercase tracking-[0.14em] text-[oklch(38%_0.09_158)]">
              {{ t('about.story.missionLabel') }}
            </p>
            <h2 class="mt-3 max-w-[17ch] text-[clamp(23px,2.5vw,32px)] leading-[1.1] font-medium tracking-[-0.04em] text-[oklch(17%_0.02_158)]">
              {{ t('about.story.missionTitle') }}
            </h2>
            <p class="mt-4 max-w-[54ch] text-[14px] leading-[1.65] font-light text-[oklch(43%_0.018_158)] sm:text-[16px]">
              {{ t('about.story.missionBody') }}
            </p>
          </div>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="100"
          class="about-collage relative mx-auto aspect-[0.96] w-full max-w-[480px]"
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
        </div>
      </div>

      <div
        data-aos="fade-up"
        class="about-approach relative mt-10 grid gap-6 overflow-hidden border-y border-[oklch(77%_0.035_153)] py-6 md:grid-cols-[0.42fr_0.78fr_1.2fr] md:items-start md:gap-8"
      >
        <p class="relative text-[11px] font-semibold uppercase tracking-[0.14em] text-[oklch(38%_0.09_158)]">
          {{ t('about.story.approachLabel') }}
        </p>
        <h2 class="relative max-w-[15ch] text-[clamp(23px,2.3vw,30px)] leading-[1.1] font-medium tracking-[-0.04em] text-[oklch(17%_0.02_158)]">
          {{ t('about.story.approachTitle') }}
        </h2>
        <p class="relative max-w-[62ch] text-[14px] leading-[1.65] font-light text-[oklch(43%_0.018_158)] sm:text-[16px]">
          {{ t('about.story.approachBody') }}
        </p>
      </div>

      <div class="mt-14">
        <Eyebrow
          data-aos="fade-up"
          bars="left"
          class="mb-8 tracking-[0.15em] text-[oklch(38%_0.09_158)]"
        >
          {{ t('about.team.eyebrow') }}
        </Eyebrow>

        <div class="grid gap-12 md:grid-cols-2 md:gap-10 lg:gap-14">
        <article
          v-for="(member, index) in teamMembers"
          :key="member.name"
          data-aos="fade-up"
          :data-aos-delay="index * 120 + 120"
          class="team-profile"
        >
          <div
            :class="[
              'team-portrait relative mx-auto aspect-square w-full max-w-[360px] overflow-hidden bg-[oklch(91%_0.025_150)] md:mx-0',
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

          <div class="mx-auto mt-5 w-full max-w-[360px] md:mx-0">
            <p class="text-[11px] font-semibold uppercase tracking-[0.14em] text-[oklch(38%_0.09_158)]">
              {{ member.role }}
            </p>
            <h3 class="mt-2 text-[clamp(28px,3vw,40px)] leading-[1.04] font-medium tracking-[-0.05em] text-[oklch(16%_0.02_155)]">
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
    margin-top: 48px;
  }
}

@media (max-width: 639px) {
  .collage-frame {
    border-width: 3px;
    box-shadow: 0 12px 30px oklch(28% 0.055 155 / 0.1);
  }
}
</style>
