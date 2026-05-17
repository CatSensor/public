<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink, useRoute } from 'vue-router'

import logoMark from '@/assets/catsensor-logo-white.png'
import { getLocalizedRouteName, type SeoRouteMeta } from '@/router/route'

type PageKind = 'home' | 'privacy'

type FooterLink = {
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

const { tm } = useI18n()
const route = useRoute()
const footerLinks = computed(() => tm('footer.links') as FooterLink[])
const currentLocale = computed(() => ((route.meta as SeoRouteMeta).locale ?? 'en'))

function isRouterLink(href: string) {
  return href === 'privacy' || (props.page === 'privacy' && href.startsWith('#'))
}

function resolveHref(href: string) {
  if (href === 'privacy') {
    return undefined
  }

  if (props.page === 'privacy' && href.startsWith('#')) {
    return undefined
  }

  return href
}

function resolveRouterTo(href: string) {
  if (href === 'privacy') {
    return { name: getLocalizedRouteName('privacy', currentLocale.value) }
  }

  return { name: getLocalizedRouteName('home', currentLocale.value), hash: href }
}
</script>

<template>
  <footer class="border-t border-[oklch(34%_0.09_155)] bg-[oklch(38%_0.09_155)] px-4 py-10 sm:px-7 md:px-14 md:py-12">
    <div class="mx-auto flex max-w-[1320px] flex-col items-center justify-between gap-4 text-center md:flex-row md:flex-wrap md:gap-5 md:text-left">
      <div class="flex items-center gap-[9px] text-base font-semibold text-white">
        <img
          :src="logoMark"
          alt="CatSensor logo"
          class="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.04] sm:h-12"
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
            class="text-[13px] font-light text-[oklch(80%_0.06_155)] no-underline transition hover:text-white"
          >
            {{ link.label }}
          </RouterLink>
          <a
            v-else
            :href="resolveHref(link.href)"
            class="text-[13px] font-light text-[oklch(80%_0.06_155)] no-underline transition hover:text-white"
          >
            {{ link.label }}
          </a>
        </template>
      </div>
      <div class="text-xs font-light text-[oklch(72%_0.06_155)]">&copy; {{ new Date().getFullYear() }} CatSensor</div>
    </div>
  </footer>
</template>
