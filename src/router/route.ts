import type { RouteRecordRaw, RouterScrollBehavior } from 'vue-router'

import type { AppLocale } from '@/i18n'
import MarketingLayout from '@/layouts/MarketingLayout.vue'
import PolicyLayout from '@/layouts/PolicyLayout.vue'
import AboutPage from '@/pages/about/AboutPage.vue'
import HomePage from '@/pages/home/HomePage.vue'
import PrivacyPage from '@/pages/privacy/PrivacyPage.vue'

export type PageId = 'home' | 'privacy' | 'about'
export type LocalizedPageId = PageId

export type SeoRouteMeta = {
  locale: AppLocale
  pageId: PageId
  titleKey: 'meta.title' | 'privacy.meta.title'
  descriptionKey: 'meta.description' | 'privacy.meta.description'
  canonicalPath: string
}

export const SITE_URL = 'https://catsensor.ca'
export const DEFAULT_OG_IMAGE_URL = `${SITE_URL}/favicon.svg`

export function getLocalizedRouteName(pageId: LocalizedPageId, locale: AppLocale) {
  return `${pageId}-${locale}` as const
}

export function buildPagePath(pageId: LocalizedPageId, locale: AppLocale) {
  if (pageId === 'home') {
    return locale === 'fr' ? '/' : '/en'
  }

  if (pageId === 'about') {
    return locale === 'fr' ? '/about' : '/en/about'
  }

  return locale === 'fr' ? '/privacy' : '/en/privacy'
}

export function buildCanonicalUrl(path: string) {
  return new URL(path, `${SITE_URL}/`).toString()
}

export function getAlternateLocale(locale: AppLocale): AppLocale {
  return locale === 'en' ? 'fr' : 'en'
}

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MarketingLayout,
    children: [
      {
        path: '',
        name: getLocalizedRouteName('home', 'fr'),
        component: HomePage,
        meta: {
          locale: 'fr',
          pageId: 'home',
          titleKey: 'meta.title',
          descriptionKey: 'meta.description',
          canonicalPath: '/',
        } satisfies SeoRouteMeta,
      },
      {
        path: 'about',
        name: getLocalizedRouteName('about', 'fr'),
        component: AboutPage,
        meta: {
          locale: 'fr',
          pageId: 'about',
        },
      },
    ],
  },
  {
    path: '/en',
    component: MarketingLayout,
    children: [
      {
        path: '',
        name: getLocalizedRouteName('home', 'en'),
        component: HomePage,
        meta: {
          locale: 'en',
          pageId: 'home',
          titleKey: 'meta.title',
          descriptionKey: 'meta.description',
          canonicalPath: '/en',
        } satisfies SeoRouteMeta,
      },
      {
        path: 'about',
        name: getLocalizedRouteName('about', 'en'),
        component: AboutPage,
        meta: {
          locale: 'en',
          pageId: 'about',
        },
      },
    ],
  },
  {
    path: '/',
    component: PolicyLayout,
    children: [
      {
        path: 'privacy',
        name: getLocalizedRouteName('privacy', 'fr'),
        component: PrivacyPage,
        meta: {
          locale: 'fr',
          pageId: 'privacy',
          titleKey: 'privacy.meta.title',
          descriptionKey: 'privacy.meta.description',
          canonicalPath: '/privacy',
        } satisfies SeoRouteMeta,
      },
    ],
  },
  {
    path: '/en',
    component: PolicyLayout,
    children: [
      {
        path: 'privacy',
        name: getLocalizedRouteName('privacy', 'en'),
        component: PrivacyPage,
        meta: {
          locale: 'en',
          pageId: 'privacy',
          titleKey: 'privacy.meta.title',
          descriptionKey: 'privacy.meta.description',
          canonicalPath: '/en/privacy',
        } satisfies SeoRouteMeta,
      },
    ],
  },
]

export const scrollBehavior: RouterScrollBehavior = (to, _from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  }

  if (to.hash) {
    return {
      el: to.hash,
      behavior: 'smooth',
    }
  }

  return {
    top: 0,
  }
}
