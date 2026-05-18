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
  <section class="px-4 pb-6 pt-[132px] sm:px-7 md:px-6 md:pb-6 md:pt-[156px]">
    <div class="mx-auto max-w-[1320px]">
      <div class="max-w-[980px] mb-10">
        <span
          data-aos="fade-up"
          class="mb-4 block text-[clamp(14px,1.4vw,18px)] leading-none font-medium tracking-[0.08em] uppercase"
        >
          {{ t('about.story.eyebrow') }}
        </span>
        <h2
          data-aos="fade-up"
          data-aos-delay="80"
          class="text-[clamp(46px,9vw,112px)] leading-[0.9] font-semibold tracking-[-0.045em] text-[oklch(34%_0.1_155)]"
        >
          <span>{{ t('about.story.brandLead') }}</span>{{ t('about.story.brandTail') }}
        </h2>
      </div>

      <div class="grid items-start gap-10 pt-10 lg:grid-cols-[0.95fr_1fr] lg:gap-14 lg:pt-12">
        <div
          data-aos="fade-up"
          class="mx-auto grid w-full max-w-[520px] grid-cols-2 gap-3 sm:gap-4"
        >
          <div class="row-span-2 overflow-hidden rounded-[6px] bg-[oklch(91%_0.012_120)]">
            <img
              :src="aboutImages.collageTall"
              :alt="t('about.story.imageAltTall')"
              class="h-full w-full object-cover"
            />
          </div>
          <div class="overflow-hidden rounded-[6px] bg-[oklch(91%_0.012_120)]">
            <img
              :src="aboutImages.collageTop"
              :alt="t('about.story.imageAltTop')"
              class="aspect-square h-full w-full object-cover"
            />
          </div>
          <div class="overflow-hidden rounded-[6px] bg-[oklch(91%_0.012_120)]">
            <img
              :src="aboutImages.collageBottom"
              :alt="t('about.story.imageAltBottom')"
              class="aspect-square h-full w-full object-cover"
            />
          </div>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="120"
          class="space-y-12"
        >
          <div>
            <p class="text-sm font-semibold tracking-[0.12em] uppercase text-[oklch(34%_0.1_155)]">
              {{ t('about.story.missionLabel') }}
            </p>
            <h3 class="mt-3 max-w-[16ch] text-[clamp(26px,3vw,42px)] leading-[1.06] font-semibold tracking-[-0.02em] text-[oklch(16%_0.02_155)]">
              {{ t('about.story.missionTitle') }}
            </h3>
            <p class="mt-4 max-w-[62ch] text-[clamp(15px,1.45vw,21px)] leading-[1.6] font-light text-[oklch(43%_0.012_160)]">
              {{ t('about.story.missionBody') }}
            </p>
          </div>

          <div>
            <p class="text-sm font-semibold tracking-[0.12em] uppercase text-[oklch(34%_0.1_155)]">
              {{ t('about.story.approachLabel') }}
            </p>
            <h3 class="mt-3 max-w-[16ch] text-[clamp(26px,3vw,42px)] leading-[1.06] font-semibold tracking-[-0.02em] text-[oklch(16%_0.02_155)]">
              {{ t('about.story.approachTitle') }}
            </h3>
            <p class="mt-4 max-w-[62ch] text-[clamp(15px,1.45vw,21px)] leading-[1.6] font-light text-[oklch(43%_0.012_160)]">
              {{ t('about.story.approachBody') }}
            </p>
          </div>
        </div>
      </div>

      <div class="mt-12 h-px w-full bg-[oklch(85%_0.015_140)] md:mt-14"></div>

      <div class="mt-10 space-y-12 lg:mt-12">
        <article
          v-for="(member, index) in teamMembers"
          :key="member.name"
          data-aos="fade-up"
          :data-aos-delay="index * 120 + 120"
          class="grid items-center gap-6 border-b border-[oklch(88%_0.012_150)] pb-10 last:border-b-0 md:grid-cols-2 md:gap-10 md:pb-12"
        >
          <div
            :class="[
              'mx-auto w-full max-w-[340px] overflow-hidden rounded-[6px] bg-[oklch(91%_0.012_120)] sm:max-w-[400px] md:max-w-[420px]',
              index % 2 === 0 ? 'md:order-1 md:justify-self-start' : 'md:order-2 md:justify-self-end',
            ]"
          >
            <img
              :src="member.image"
              :alt="member.name"
              class="aspect-[4/3] h-full w-full object-cover"
            />
          </div>
          <div :class="[index % 2 === 0 ? 'md:order-2' : 'md:order-1']">
            <h3 class="text-[clamp(28px,3vw,40px)] leading-[1.04] font-semibold tracking-[-0.025em] text-[oklch(16%_0.02_155)]">
              {{ member.name }}
            </h3>
            <p class="mt-2 text-[clamp(17px,1.6vw,24px)] leading-[1.3] font-medium text-[oklch(34%_0.1_155)]">
              {{ member.role }}
            </p>
            <p class="mt-4 max-w-[60ch] text-[clamp(15px,1.3vw,20px)] leading-[1.6] font-light text-[oklch(43%_0.012_160)]">
              {{ member.bio }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
