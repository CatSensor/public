<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink, useRoute } from 'vue-router'

import logoMark from '@/assets/catsensor-logo-black.png'
import { useLocale } from '@/composables/useLocale'
import { buildPagePath, type SeoRouteMeta } from '@/router/route'

type PageKind = 'home' | 'privacy' | 'about'

type NavLink = {
  label: string
  href: string
}

const props = withDefaults(
  defineProps<{
    page?: PageKind
  }>(),
  {
    page: 'home',
  },
)

const { t, tm } = useI18n()
const route = useRoute()
const { toggleLocale } = useLocale()
const isMarketingPage = computed(() => props.page !== 'privacy')
const navLinks = computed(() => (isMarketingPage.value ? (tm('nav.links') as NavLink[]) : []))
const currentLocale = computed(() => ((route.meta as Partial<SeoRouteMeta>).locale ?? 'fr'))
const homeHeroRoute = computed(() => ({ path: buildPagePath('home', currentLocale.value), hash: '#hero' }))
const homeRoute = computed(() => ({ path: buildPagePath('home', currentLocale.value) }))
const isSecondaryPage = computed(() => props.page !== 'home')
const primaryLabel = computed(() => {
  if (isMarketingPage.value) {
    return t('nav.preorder')
  }

  return t('privacy.header.backHome')
})

function resolveNavTo(href: string) {
  const normalizedPath = href.split(/[?#]/, 1)[0]?.replace(/\/+$/, '') ?? ''

  if (normalizedPath === '/about' || normalizedPath === '/en/about') {
    return { path: buildPagePath('about', currentLocale.value) }
  }

  if (href.startsWith('/')) {
    return { path: href }
  }

  return {
    path: buildPagePath('home', currentLocale.value),
    hash: href,
  }
}

function isRouterNavLink(href: string) {
  return href.startsWith('/') || (props.page === 'about' && href.startsWith('#'))
}

</script>

<template>
  <header
    :class="[
      'fixed inset-x-0 top-0 z-[100] h-[68px] max-h-[68px] border-b border-black/6 bg-[oklch(98.5%_0.003_90_/_0.88)] px-4 backdrop-blur-[18px] sm:px-6 md:px-10',
    ]"
  >
    <div class="mx-auto flex h-full max-w-6xl items-center justify-between gap-3">
      <RouterLink
        v-if="isSecondaryPage"
        :to="homeHeroRoute"
        class="group flex cursor-pointer shrink-0 items-center gap-2 text-[14px] font-semibold tracking-[-0.03em] text-[oklch(13%_0.01_240)] no-underline sm:text-[16px]"
        aria-label="CatSensor home"
      >
        <img
          :src="logoMark"
          alt="CatSensor logo"
          width="48"
          height="48"
          class="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.04]"
        />
        <span class="leading-none">
          CatSensor
        </span>
      </RouterLink>
      <a
        v-else
        href="#hero"
        class="group flex cursor-pointer shrink-0 items-center gap-2 text-[14px] font-semibold tracking-[-0.03em] text-[oklch(13%_0.01_240)] no-underline sm:text-[16px]"
        aria-label="CatSensor home"
      >
        <img
          :src="logoMark"
          alt="CatSensor logo"
          width="48"
          height="48"
          class="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.04]"
        />
        <span class="leading-none">
          CatSensor
        </span>
      </a>

      <nav
        v-if="navLinks.length > 0"
        class="hidden items-center gap-5 lg:flex"
      >
        <template
          v-for="link in navLinks"
          :key="link.href"
        >
          <RouterLink
            v-if="isRouterNavLink(link.href)"
            :to="resolveNavTo(link.href)"
            class="cursor-pointer text-[13px] font-normal text-[oklch(48%_0.008_240)] no-underline transition hover:text-[oklch(13%_0.01_240)]"
          >
            {{ link.label }}
          </RouterLink>
          <a
            v-else
            :href="link.href"
            class="cursor-pointer text-[13px] font-normal text-[oklch(48%_0.008_240)] no-underline transition hover:text-[oklch(13%_0.01_240)]"
          >
            {{ link.label }}
          </a>
        </template>
      </nav>

      <div class="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          :aria-label="t('nav.localeAria')"
          class="inline-flex cursor-pointer items-center justify-center rounded-lg border border-black/12 bg-white/70 px-2.5 py-2 text-xs font-semibold tracking-[0.04em] text-[oklch(13%_0.01_240)] transition hover:border-[oklch(44%_0.095_158)] hover:text-[oklch(44%_0.095_158)] sm:px-3"
          @click="toggleLocale"
        >
          {{ t('nav.localeButton') }}
        </button>
        <RouterLink
          v-if="!isMarketingPage"
          :to="homeRoute"
          class="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[oklch(44%_0.095_158)] px-4 py-2 text-[13px] font-medium tracking-[-0.01em] text-white transition hover:-translate-y-px hover:bg-[oklch(52%_0.095_158)] active:translate-y-0"
        >
          {{ primaryLabel }}
        </RouterLink>
        <a
          v-else
          href="#cta"
          class="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[oklch(44%_0.095_158)] px-4 py-2 text-[13px] font-medium tracking-[-0.01em] text-white transition hover:-translate-y-px hover:bg-[oklch(52%_0.095_158)] active:translate-y-0"
        >
          {{ primaryLabel }}
        </a>
      </div>
    </div>
  </header>
</template>
