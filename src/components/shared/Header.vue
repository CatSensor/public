<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

import logoMark from '@/assets/catsensor-logo-black.png'
import { useLocale } from '@/composables/useLocale'

type PageKind = 'home' | 'privacy'

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
const { toggleLocale } = useLocale()
const isScrolled = ref(true)
const navLinks = computed(() => (props.page === 'home' ? (tm('nav.links') as NavLink[]) : []))
const homeRoute = { name: 'home', hash: '#hero' }
const primaryLabel = computed(() => (props.page === 'home' ? t('nav.preorder') : t('privacy.header.backHome')))

function updateScrollState() {
  isScrolled.value = window.scrollY > 40
}

onMounted(() => {
  updateScrollState()
  window.addEventListener('scroll', updateScrollState, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateScrollState)
})
</script>

<template>
  <header
    :class="[
      'fixed inset-x-0 top-0 z-[100] border-b border-black/6 bg-[oklch(98.5%_0.003_90_/_0.88)] px-4 backdrop-blur-[18px] transition-[padding] duration-300 sm:px-7 md:px-14',
      isScrolled ? 'py-[15px]' : 'py-[22px]',
    ]"
  >
    <div class="mx-auto flex max-w-[1320px] items-center justify-between gap-3">
      <component
        :is="props.page === 'privacy' ? RouterLink : 'a'"
        :to="props.page === 'privacy' ? homeRoute : undefined"
        :href="props.page === 'home' ? '#hero' : undefined"
        class="group flex cursor-pointer shrink-0 items-center gap-2 text-[15px] font-semibold tracking-[-0.03em] text-[oklch(13%_0.01_240)] no-underline sm:gap-3 sm:text-[17px]"
        aria-label="CatSensor home"
      >
        <img
          :src="logoMark"
          alt="CatSensor logo"
          class="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.04] sm:h-12"
        />
        <span class="leading-none">
          CatSensor
        </span>
      </component>

      <nav
        v-if="navLinks.length > 0"
        class="hidden items-center gap-6 lg:flex"
      >
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="text-sm font-normal text-[oklch(48%_0.008_240)] no-underline transition hover:text-[oklch(13%_0.01_240)]"
        >
          {{ link.label }}
        </a>
      </nav>

      <div class="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          :aria-label="t('nav.localeAria')"
          class="inline-flex cursor-pointer items-center justify-center rounded-[6px] border border-black/12 bg-white/70 px-2.5 py-2.5 text-xs font-semibold tracking-[0.04em] text-[oklch(13%_0.01_240)] transition hover:border-[oklch(44%_0.095_158)] hover:text-[oklch(44%_0.095_158)] sm:px-3 sm:py-[11px] sm:text-sm"
          @click="toggleLocale"
        >
          {{ t('nav.localeButton') }}
        </button>
        <component
          :is="props.page === 'privacy' ? RouterLink : 'a'"
          :to="props.page === 'privacy' ? homeRoute : undefined"
          :href="props.page === 'home' ? '#cta' : undefined"
          class="inline-flex cursor-pointer items-center gap-2 rounded-[6px] bg-[oklch(44%_0.095_158)] px-[18px] py-[10px] text-sm font-medium tracking-[-0.01em] text-white transition hover:-translate-y-px hover:bg-[oklch(52%_0.095_158)] active:translate-y-0 sm:px-[22px] sm:py-[11px]"
        >
          {{ primaryLabel }}
        </component>
      </div>
    </div>
  </header>
</template>
