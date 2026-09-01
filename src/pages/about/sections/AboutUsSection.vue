<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { aboutImages } from '@/pages/about/content'

const { t } = useI18n()

type CreatorId = 'william' | 'samuel'

const hoveredCreator = ref<CreatorId | null>(null)
const selectedCreator = ref<CreatorId | null>(null)

const isCreatorRevealed = (creator: CreatorId) =>
  hoveredCreator.value === creator || selectedCreator.value === creator

const toggleCreator = (creator: CreatorId) => {
  selectedCreator.value = selectedCreator.value === creator ? null : creator
}
</script>

<template>
  <section class="w-full py-32">
    <div class="mx-auto w-full max-w-[1320px] px-4 sm:px-7 md:px-14">
      <div class="flex flex-col items-center justify-start gap-6 lg:flex-row">
        <div class="flex w-full flex-col items-start justify-start gap-24 lg:w-1/2">
          <div class="pr-6">
            <h1
              class="mb-6 text-4xl font-bold tracking-[-0.04em] text-[oklch(13%_0.01_240)] md:text-5xl lg:mb-10 lg:text-6xl"
              data-aos="fade-up"
            >
              {{ t('about.intro.title') }}
            </h1>
            <p
              class="mb-9 text-[15px] leading-[1.75] font-light text-[oklch(48%_0.008_240)] sm:text-[17px]"
              data-aos="fade-up"
              data-aos-delay="80"
            >
              {{ t('about.intro.description') }}
            </p>
          </div>

          <div class="flex w-full flex-col items-center justify-center gap-6 md:flex-row">
            <img
              :src="aboutImages.collageTall"
              :alt="t('about.story.imageAltTall')"
              width="480"
              height="720"
              fetchpriority="high"
              decoding="async"
              class="aspect-[0.7] w-full rounded-lg object-cover md:w-1/2"
              data-aos="fade-up"
              data-aos-delay="120"
            />

            <div class="flex w-full flex-col items-center justify-center gap-6 md:w-1/2">
              <button
                type="button"
                class="creator-image-frame creator-image-frame-william w-full"
                :class="{ 'is-revealed': isCreatorRevealed('william') }"
                :aria-label="t('about.team.members[1].name')"
                :aria-pressed="isCreatorRevealed('william')"
                @mouseenter="hoveredCreator = 'william'"
                @mouseleave="hoveredCreator = null"
                @focus="hoveredCreator = 'william'"
                @blur="hoveredCreator = null"
                @click="toggleCreator('william')"
              >
                <img
                  :src="aboutImages.collageMiddleTop"
                  :alt="t('about.story.imageAltWilliam')"
                  width="400"
                  height="400"
                  loading="lazy"
                  decoding="async"
                  class="aspect-[1.1] w-full rounded-lg object-cover"
                  data-aos="fade-up"
                  data-aos-delay="160"
                />
                <span class="creator-overlay" :aria-hidden="!isCreatorRevealed('william')">
                  <span class="creator-quote">{{ t('about.team.members[1].quote') }}</span>
                </span>
                <span class="creator-name">{{ t('about.team.members[1].name') }}</span>
              </button>
              <img
                :src="aboutImages.collageMiddleBottom"
                :alt="t('about.story.imageAltBottom')"
                width="1280"
                height="853"
                loading="lazy"
                decoding="async"
                class="aspect-[0.7] w-full rounded-lg object-cover"
                data-aos="fade-up"
                data-aos-delay="200"
              />
            </div>
          </div>
        </div>

        <div class="flex w-full flex-col items-center justify-center gap-12 pt-12 lg:w-1/2 lg:pt-48">
          <div class="flex w-full flex-col items-center justify-center gap-6 md:flex-row">
            <button
              type="button"
              class="creator-image-frame creator-image-frame-samuel w-full md:w-1/2"
              :class="{ 'is-revealed': isCreatorRevealed('samuel') }"
              :aria-label="t('about.team.members[0].name')"
              :aria-pressed="isCreatorRevealed('samuel')"
              @mouseenter="hoveredCreator = 'samuel'"
              @mouseleave="hoveredCreator = null"
              @focus="hoveredCreator = 'samuel'"
              @blur="hoveredCreator = null"
              @click="toggleCreator('samuel')"
            >
              <img
                :src="aboutImages.collageCenter"
                :alt="t('about.story.imageAltSamuel')"
                width="400"
                height="400"
                loading="lazy"
                decoding="async"
                class="aspect-[0.9] w-full rounded-lg object-cover"
                data-aos="fade-up"
                data-aos-delay="180"
              />
              <span class="creator-overlay" :aria-hidden="!isCreatorRevealed('samuel')">
                <span class="creator-quote">{{ t('about.team.members[0].quote') }}</span>
              </span>
              <span class="creator-name">{{ t('about.team.members[0].shortName') }}</span>
            </button>

            <div class="flex w-full flex-col items-center justify-center gap-6 md:w-1/2">
              <img
                :src="aboutImages.collageRightTop"
                :alt="t('about.story.imageAltTop')"
                width="1368"
                height="1824"
                loading="lazy"
                decoding="async"
                class="aspect-[0.8] w-full rounded-lg object-cover"
                data-aos="fade-up"
                data-aos-delay="220"
              />
              <img
                :src="aboutImages.collageRightBottom"
                :alt="t('about.story.imageAltOutdoor')"
                width="1200"
                height="1600"
                loading="lazy"
                decoding="async"
                class="aspect-[0.9] w-full rounded-lg object-cover"
                data-aos="fade-up"
                data-aos-delay="260"
              />
            </div>
          </div>

          <div class="w-full px-8" data-aos="fade-up" data-aos-delay="160">
            <h2 class="mb-8 text-2xl font-semibold tracking-[-0.03em] lg:mb-6">
              {{ t('about.workplace.title') }}
            </h2>
            <p class="mb-9 text-[15px] leading-[1.75] text-[oklch(28%_0.01_240)] sm:text-[17px]">
              {{ t('about.workplace.description') }}
            </p>
            <p class="text-[15px] leading-[1.75] font-light text-[oklch(48%_0.008_240)] sm:text-[17px]">
              {{ t('about.workplace.details') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.creator-image-frame {
  display: block;
  position: relative;
  min-width: 0;
  border: 0;
  padding: 0;
  background: transparent;
  text-align: left;
  cursor: pointer;
}

.creator-image-frame:focus-visible {
  outline: 2px solid oklch(38% 0.095 158);
  outline-offset: 4px;
}

.creator-image-frame::after {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 20%;
  border-radius: 0 0 0.5rem 0.5rem;
  background: linear-gradient(to top, rgb(0 0 0 / 50%), rgb(0 0 0 / 0%));
  content: '';
  pointer-events: none;
  opacity: 0.5;
  transition: height 420ms cubic-bezier(0.22, 1, 0.36, 1), opacity 420ms cubic-bezier(0.22, 1, 0.36, 1);
}

.creator-image-frame.is-revealed::after {
  height: 100%;
  border-radius: 0.5rem;
  background: linear-gradient(to top, rgb(0 0 0 / 80%) 0%, rgb(0 0 0 / 68%) 55%, rgb(0 0 0 / 20%) 100%);
  opacity: 0.8;
}

.creator-overlay {
  position: absolute;
  z-index: 2;
  inset: 0;
  display: flex;
  align-items: flex-end;
  padding: 24px 16px 52px;
  color: white;
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
  transform: translateY(18px);
  transition: opacity 280ms ease, transform 420ms cubic-bezier(0.22, 1, 0.36, 1), visibility 0s linear 420ms;
}

.creator-image-frame.is-revealed .creator-overlay {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
  transition: opacity 280ms ease, transform 420ms cubic-bezier(0.22, 1, 0.36, 1), visibility 0s linear 0s;
}

.creator-quote {
  display: block;
  max-height: 82%;
  overflow: hidden;
  font-size: clamp(0.75rem, 1.15vw, 0.98rem);
  font-weight: 450;
  line-height: 1.45;
  text-wrap: pretty;
}

.creator-name {
  position: absolute;
  z-index: 3;
  left: 16px;
  bottom: 16px;
  color: white;
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.2;
  text-shadow: 0 1px 8px rgb(0 0 0 / 55%);
  transition: bottom 420ms cubic-bezier(0.22, 1, 0.36, 1);
}

.creator-image-frame.is-revealed .creator-name {
  bottom: calc(100% - 16px - 1.2em);
}

@media (prefers-reduced-motion: reduce) {
  .creator-image-frame::after,
  .creator-overlay,
  .creator-name {
    transition: none;
  }
}
</style>
