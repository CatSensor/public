<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink, useRoute } from 'vue-router'

import logoMark from '@/assets/catsensor-logo-white.png'
import OrganicWave from '@/components/shared/OrganicWave.vue'
import SignupForm from '@/pages/home/components/SignupForm.vue'
import { buildPagePath, type SeoRouteMeta } from '@/router/route'

type SiteFooterPage = 'home' | 'privacy' | 'about'

type FooterLink = {
  label: string
  href: string
}

const props = withDefaults(
  defineProps<{
    page?: SiteFooterPage
  }>(),
  {
    page: 'home',
  },
)

const { t, tm } = useI18n()
const route = useRoute()
const footerLinks = computed(() => tm('footer.links') as FooterLink[])
const currentLocale = computed(() => ((route.meta as SeoRouteMeta).locale ?? 'fr'))
const footerWaveFrom = computed(() =>
  props.page === 'about' ? 'oklch(96.5% 0.018 150)' : 'oklch(98.5% 0.003 90)',
)

function isRouterLink(href: string) {
  return href === 'privacy' || href === 'about' || ((props.page === 'privacy' || props.page === 'about') && href.startsWith('#'))
}

function resolveHref(href: string) {
  if (href === 'privacy') {
    return undefined
  }

  if (href === 'about') {
    return undefined
  }

  if ((props.page === 'privacy' || props.page === 'about') && href.startsWith('#')) {
    return `/${href}`
  }

  return href
}

function resolveRouterTo(href: string) {
  if (href === 'privacy') {
    return { path: buildPagePath('privacy', currentLocale.value) }
  }

  if (href === 'about') {
    return { path: buildPagePath('about', currentLocale.value) }
  }

  if ((props.page === 'privacy' || props.page === 'about') && href.startsWith('#')) {
    return { path: buildPagePath('home', currentLocale.value), hash: href }
  }

  return { path: buildPagePath('home', currentLocale.value), hash: href }
}
</script>

<template>
  <OrganicWave
    v-if="page !== 'home'"
    :from="footerWaveFrom"
    to="oklch(38% 0.09 155)"
    direction="left"
  />
  <footer class="relative overflow-hidden bg-[oklch(38%_0.09_155)] text-white">
    <div
      v-if="page === 'home'"
      aria-hidden="true"
      class="pointer-events-none absolute -bottom-28 -right-24 size-[420px] rounded-full bg-white/[0.035] sm:-bottom-44 sm:-right-28 sm:size-[560px]"
    ></div>

    <section
      v-if="page === 'home'"
      id="cta"
      class="relative px-4 pb-20 pt-16 sm:px-7 md:px-14 md:pb-28 md:pt-24"
    >
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
          <span class="mt-1 block font-light text-[oklch(75%_0.09_150)]">
            {{ t('cta.titleEnd') }}
          </span>
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

    <div class="relative z-10 border-t border-white/10 px-4 py-8 sm:px-7 md:px-14 md:py-9">
      <div class="mx-auto flex max-w-[1320px] flex-col items-center justify-between gap-4 text-center md:flex-row md:flex-wrap md:gap-5 md:text-left">
        <div class="flex items-center gap-[9px] text-base font-semibold text-white">
          <img
            :src="logoMark"
            alt="CatSensor logo"
            width="48"
            height="48"
            loading="lazy"
            decoding="async"
            class="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.04]"
          />
          CatSensor
        </div>
        <div class="flex flex-wrap justify-center gap-5 sm:gap-7">
          <template
            v-for="link in footerLinks"
            :key="link.label"
          >
            <RouterLink
              v-if="isRouterLink(link.href)"
              :to="resolveRouterTo(link.href)"
              class="text-[13px] font-light text-white/65 no-underline transition hover:text-white"
            >
              {{ link.label }}
            </RouterLink>
            <a
              v-else
              :href="resolveHref(link.href)"
              class="text-[13px] font-light text-white/65 no-underline transition hover:text-white"
            >
              {{ link.label }}
            </a>
          </template>
        </div>
        <div class="text-xs font-light text-white/45">&copy; {{ new Date().getFullYear() }} CatSensor</div>
      </div>
    </div>
  </footer>
</template>
