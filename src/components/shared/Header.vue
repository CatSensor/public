<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
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
const isMenuOpen = ref(false)
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

function closeMobileMenu() {
  isMenuOpen.value = false
}

function toggleMobileMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    closeMobileMenu()
  }
}

function handleResize() {
  if (window.innerWidth >= 1024) {
    closeMobileMenu()
  }
}

watch(
  () => route.fullPath,
  () => closeMobileMenu(),
)

watch(isMenuOpen, (isOpen) => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  }
})

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('resize', handleResize)
  document.body.style.overflow = ''
})

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
          class="hidden cursor-pointer items-center gap-2 rounded-lg bg-[oklch(44%_0.095_158)] px-4 py-2 text-[13px] font-medium tracking-[-0.01em] text-white transition hover:-translate-y-px hover:bg-[oklch(52%_0.095_158)] active:translate-y-0 lg:inline-flex"
        >
          {{ primaryLabel }}
        </a>
        <button
          v-if="navLinks.length > 0"
          type="button"
          class="relative flex size-10 cursor-pointer items-center justify-center rounded-xl border border-black/10 bg-white/70 text-[oklch(13%_0.01_240)] transition hover:border-[oklch(44%_0.095_158)] hover:text-[oklch(44%_0.095_158)] lg:hidden"
          :aria-label="isMenuOpen ? t('nav.menuClose') : t('nav.menuOpen')"
          :aria-expanded="isMenuOpen"
          aria-controls="mobile-navigation"
          @click="toggleMobileMenu"
        >
          <span class="sr-only">
            {{ isMenuOpen ? t('nav.menuClose') : t('nav.menuOpen') }}
          </span>
          <span aria-hidden="true" class="relative block h-4 w-5">
            <span
              :class="[
                'absolute left-0 top-0.5 h-px w-5 bg-current transition-all duration-300',
                isMenuOpen && 'top-2 rotate-45',
              ]"
            ></span>
            <span
              :class="[
                'absolute left-0 top-2 h-px w-5 bg-current transition-all duration-200',
                isMenuOpen && 'scale-x-0 opacity-0',
              ]"
            ></span>
            <span
              :class="[
                'absolute bottom-0.5 left-0 h-px w-5 bg-current transition-all duration-300',
                isMenuOpen && 'bottom-[7px] -rotate-45',
              ]"
            ></span>
          </span>
        </button>
      </div>
    </div>

    <Transition name="mobile-menu">
      <div
        v-if="isMenuOpen"
        class="absolute inset-x-0 top-full z-[90] h-[calc(100dvh-68px)] overflow-y-auto bg-black/20 px-4 pb-4 pt-3 backdrop-blur-[2px] lg:hidden"
        @click.self="closeMobileMenu"
      >
        <nav
          id="mobile-navigation"
          :aria-label="t('nav.mobileNavAria')"
          class="mobile-menu-panel mx-auto max-w-md overflow-hidden rounded-2xl border border-black/8 bg-[oklch(98.5%_0.003_90_/_0.98)] p-2 shadow-[0_20px_60px_rgba(8,40,27,0.16)]"
        >
          <template
            v-for="(link, index) in navLinks"
            :key="link.href"
          >
            <RouterLink
              v-if="isRouterNavLink(link.href)"
              :to="resolveNavTo(link.href)"
              class="group flex min-h-12 cursor-pointer items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium tracking-[-0.02em] text-[oklch(20%_0.02_158)] no-underline transition hover:bg-[oklch(94%_0.025_155)] hover:text-[oklch(38%_0.09_158)]"
              @click="closeMobileMenu"
            >
              <span>{{ link.label }}</span>
              <span
                aria-hidden="true"
                class="h-px w-4 bg-current opacity-35 transition-all duration-300 group-hover:w-7 group-hover:opacity-80"
              ></span>
            </RouterLink>
            <a
              v-else
              :href="link.href"
              class="group flex min-h-12 cursor-pointer items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium tracking-[-0.02em] text-[oklch(20%_0.02_158)] no-underline transition hover:bg-[oklch(94%_0.025_155)] hover:text-[oklch(38%_0.09_158)]"
              @click="closeMobileMenu"
            >
              <span>{{ link.label }}</span>
              <span
                aria-hidden="true"
                class="h-px w-4 bg-current opacity-35 transition-all duration-300 group-hover:w-7 group-hover:opacity-80"
              ></span>
            </a>
            <div
              v-if="index < navLinks.length - 1"
              aria-hidden="true"
              class="mx-4 h-px bg-black/6"
            ></div>
          </template>

          <a
            href="#cta"
            class="mt-2 flex min-h-12 cursor-pointer items-center justify-center rounded-xl bg-[oklch(44%_0.095_158)] px-4 py-3 text-[14px] font-semibold tracking-[-0.01em] text-white no-underline transition hover:bg-[oklch(52%_0.095_158)] active:scale-[0.99]"
            @click="closeMobileMenu"
          >
            {{ primaryLabel }}
          </a>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 220ms ease;
}

.mobile-menu-enter-active .mobile-menu-panel,
.mobile-menu-leave-active .mobile-menu-panel {
  transition:
    opacity 220ms ease,
    transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
}

.mobile-menu-enter-from .mobile-menu-panel,
.mobile-menu-leave-to .mobile-menu-panel {
  opacity: 0;
  transform: translateY(-12px) scale(0.98);
}

@media (prefers-reduced-motion: reduce) {
  .mobile-menu-enter-active,
  .mobile-menu-leave-active,
  .mobile-menu-enter-active .mobile-menu-panel,
  .mobile-menu-leave-active .mobile-menu-panel {
    transition-duration: 1ms;
  }
}
</style>
