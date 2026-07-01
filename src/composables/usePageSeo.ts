import { computed, watchEffect } from 'vue'
import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'

import brandIconUrl from '@/assets/catsenser/icon.png'
import { i18n, messages, persistLocale, syncDocumentLanguage } from '@/i18n'
import {
  buildCanonicalUrl,
  buildPagePath,
  getAlternateLocale,
  SITE_URL,
  type SeoRouteMeta,
} from '@/router/route'

const localeCodeMap = {
  en: 'en-CA',
  fr: 'fr-CA',
} as const

const ogLocaleMap = {
  en: 'en_CA',
  fr: 'fr_CA',
} as const

export function usePageSeo() {
  const route = useRoute()

  const seoMeta = computed(() => route.meta as SeoRouteMeta)
  const locale = computed(() => seoMeta.value.locale)
  const alternateLocale = computed(() => getAlternateLocale(locale.value))
  const title = computed(() => resolveSeoCopy(locale.value, seoMeta.value.titleKey))
  const description = computed(() => resolveSeoCopy(locale.value, seoMeta.value.descriptionKey))
  const canonicalUrl = computed(() => buildCanonicalUrl(seoMeta.value.canonicalPath))
  const alternateUrl = computed(() => buildCanonicalUrl(buildPagePath(seoMeta.value.pageId, alternateLocale.value)))
  const brandImageUrl = new URL(brandIconUrl, `${SITE_URL}/`).toString()
  const jsonLd = computed(() =>
    JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        ...(seoMeta.value.pageId === 'home' && locale.value === 'fr'
          ? [
              {
                '@type': 'Organization',
                '@id': `${SITE_URL}/#organization`,
                name: 'CatSensor',
                url: `${SITE_URL}/`,
                description: resolveSeoCopy('fr', 'meta.description'),
                email: 'contact@catsensor.ca',
                foundingDate: '2026',
                areaServed: {
                  '@type': 'Country',
                  name: 'Canada',
                },
                founder: [
                  { '@type': 'Person', name: 'Samuel Courchesne' },
                  { '@type': 'Person', name: 'William Beaudin' },
                ],
                logo: {
                  '@type': 'ImageObject',
                  url: brandImageUrl,
                  width: 400,
                  height: 400,
                },
                sameAs: ['https://github.com/CatSensor'],
              },
              {
                '@type': 'WebSite',
                '@id': `${SITE_URL}/#website`,
                name: 'CatSensor',
                url: `${SITE_URL}/`,
                publisher: { '@id': `${SITE_URL}/#organization` },
                inLanguage: ['fr-CA', 'en-CA'],
              },
            ]
          : []),
        {
          '@type': seoMeta.value.pageId === 'about' ? 'AboutPage' : 'WebPage',
          '@id': `${canonicalUrl.value}#webpage`,
          url: canonicalUrl.value,
          name: title.value,
          description: description.value,
          inLanguage: localeCodeMap[locale.value],
          isPartOf: {
            '@id': `${SITE_URL}/#website`,
          },
        },
      ],
    }),
  )

  watchEffect(() => {
    i18n.global.locale.value = locale.value
    persistLocale(locale.value)
    syncDocumentLanguage(locale.value)
  })

  useHead(() => ({
    title: title.value,
    htmlAttrs: {
      lang: locale.value,
    },
    meta: [
      { key: 'description', name: 'description', content: description.value },
      {
        key: 'robots',
        name: 'robots',
        content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      },
      { key: 'og:type', property: 'og:type', content: 'website' },
      { key: 'og:site_name', property: 'og:site_name', content: 'CatSensor' },
      { key: 'og:title', property: 'og:title', content: title.value },
      { key: 'og:description', property: 'og:description', content: description.value },
      { key: 'og:url', property: 'og:url', content: canonicalUrl.value },
      { key: 'og:image', property: 'og:image', content: brandImageUrl },
      { key: 'og:image:type', property: 'og:image:type', content: 'image/png' },
      { key: 'og:image:width', property: 'og:image:width', content: '400' },
      { key: 'og:image:height', property: 'og:image:height', content: '400' },
      { key: 'og:image:alt', property: 'og:image:alt', content: 'CatSensor logo' },
      { key: 'og:locale', property: 'og:locale', content: ogLocaleMap[locale.value] },
      {
        key: 'og:locale:alternate',
        property: 'og:locale:alternate',
        content: ogLocaleMap[alternateLocale.value],
      },
      { key: 'twitter:card', name: 'twitter:card', content: 'summary' },
      { key: 'twitter:title', name: 'twitter:title', content: title.value },
      { key: 'twitter:description', name: 'twitter:description', content: description.value },
      { key: 'twitter:image', name: 'twitter:image', content: brandImageUrl },
      { key: 'twitter:image:alt', name: 'twitter:image:alt', content: 'CatSensor logo' },
    ],
    link: [
      { key: 'canonical', rel: 'canonical', href: canonicalUrl.value },
      { key: 'alternate-self', rel: 'alternate', hreflang: localeCodeMap[locale.value], href: canonicalUrl.value },
      { key: 'alternate-other', rel: 'alternate', hreflang: localeCodeMap[alternateLocale.value], href: alternateUrl.value },
      {
        key: 'alternate-default',
        rel: 'alternate',
        hreflang: 'x-default',
        href: buildCanonicalUrl(buildPagePath(seoMeta.value.pageId, 'fr')),
      },
    ],
    script: [
      {
        key: 'schema-graph',
        type: 'application/ld+json',
        innerHTML: jsonLd.value,
      },
    ],
  }))
}

function resolveSeoCopy(
  locale: keyof typeof messages,
  key: SeoRouteMeta['titleKey'] | SeoRouteMeta['descriptionKey'],
) {
  const localizedValue = readMessageValue(messages[locale], key)

  if (typeof localizedValue === 'string') {
    return localizedValue
  }

  const fallbackValue = readMessageValue(messages.en, key)

  return typeof fallbackValue === 'string' ? fallbackValue : ''
}

function readMessageValue(source: unknown, key: string) {
  return key.split('.').reduce<unknown>((value, segment) => {
    if (value && typeof value === 'object' && segment in value) {
      return (value as Record<string, unknown>)[segment]
    }

    return undefined
  }, source)
}
