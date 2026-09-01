<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink, useRoute } from 'vue-router'

import footerForeground from '@/assets/footer/footer_foreground.png'
import logoMark from '@/assets/catsensor-logo-black.png'
import { buildPagePath, type SeoRouteMeta } from '@/router/route'

type PageKind = 'home' | 'privacy' | 'about'

type FooterLink = {
  label: string
  href: string
}

type FooterColumn = {
  title: string
  links: FooterLink[]
  description?: string
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
const footerColumns = computed(() => tm('footer.columns') as FooterColumn[])
const legalLinks = computed(() => tm('footer.legalLinks') as FooterLink[])
const currentLocale = computed(() => ((route.meta as SeoRouteMeta).locale ?? 'fr'))
const homeRoute = computed(() => ({ path: buildPagePath('home', currentLocale.value) }))

function isRouterLink(href: string) {
  return href === 'privacy' || href === 'about' || ((props.page === 'privacy' || props.page === 'about') && href.startsWith('#'))
}

function resolveHref(href: string) {
  if (href === 'privacy' || href === 'about') {
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

/* ---------- Parallax ---------- */
const stageRef = ref<HTMLElement | null>(null)
const wordmarkOffset = ref(0)
const foregroundOffset = ref(0)

let parallaxFrame: number | null = null

function updateParallax() {
  const el = stageRef.value
  if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    wordmarkOffset.value = 0
    foregroundOffset.value = 0
    return
  }

  const rect = el.getBoundingClientRect()
  const viewportH = Math.max(window.innerHeight, 1)
  // The progress spans the whole time the stage travels through the viewport.
  const progress = (viewportH - rect.top) / (viewportH + rect.height) - 0.5

  // Opposite directions make the depth relationship visible without moving the links.
  wordmarkOffset.value = Math.round(progress * -300)
  foregroundOffset.value = Math.round(progress * 80)
}

function scheduleParallax() {
  if (parallaxFrame !== null) return

  parallaxFrame = window.requestAnimationFrame(() => {
    parallaxFrame = null
    updateParallax()
  })
}

function onScroll() {
  scheduleParallax()
}

onMounted(() => {
  scheduleParallax()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', scheduleParallax)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', scheduleParallax)
  if (parallaxFrame !== null) {
    window.cancelAnimationFrame(parallaxFrame)
  }
})
</script>

<template>
  <footer class="footer-shell">
    <div class="footer-stage" aria-hidden="true" ref="stageRef">
      <div
        class="footer-wordmark"
        :style="{ transform: `translateX(-50%) translateY(${wordmarkOffset}px)` }"
      >
        <span>CAT</span>SENSOR
      </div>
      <img
        :src="footerForeground"
        alt=""
        class="footer-foreground"
        loading="lazy"
        decoding="async"
        :style="{ transform: `translateX(-50%) translateY(${foregroundOffset}px)` }"
      />
    </div>

    <div class="footer-content">
      <div class="footer-content-inner">
        <div class="footer-main">
          <div class="footer-brand">
            <RouterLink
              :to="homeRoute"
              class="footer-brand-link"
              :aria-label="t('footer.brandHome')"
            >
              <img
                :src="logoMark"
                alt=""
                width="42"
                height="42"
                loading="lazy"
                decoding="async"
                class="footer-logo"
              />
              <span>CatSensor</span>
            </RouterLink>
            <p class="footer-tagline">{{ t('footer.tagline') }}</p>
          </div>

          <nav class="footer-nav" :aria-label="t('footer.navigationLabel')">
            <section v-for="column in footerColumns" :key="column.title" class="footer-column">
              <h2 class="footer-column-title">{{ column.title }}</h2>
              <ul class="footer-link-list">
                <li v-for="link in column.links" :key="link.label">
                  <RouterLink
                    v-if="isRouterLink(link.href)"
                    :to="resolveRouterTo(link.href)"
                    class="footer-link"
                  >
                    {{ link.label }}
                  </RouterLink>
                    <a
                    v-else
                    :href="resolveHref(link.href)"
                    class="footer-link"
                  >
                    {{ link.label }}
                  </a>
                </li>
              </ul>
              <p v-if="column.description" class="footer-column-description">{{ column.description }}</p>
            </section>
          </nav>
        </div>

        <div class="footer-meta">
          <p class="footer-copyright">© {{ new Date().getFullYear() }} CatSensor</p>
          <ul class="footer-legal-list" :aria-label="t('footer.legalLabel')">
            <li v-for="link in legalLinks" :key="link.label">
              <RouterLink
                v-if="isRouterLink(link.href)"
                :to="resolveRouterTo(link.href)"
                class="footer-legal-link"
              >
                {{ link.label }}
              </RouterLink>
              <a v-else :href="resolveHref(link.href)" class="footer-legal-link">{{ link.label }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-shell {
  --footer-bg: oklch(96.5% 0.006 110);
  --footer-text: oklch(13% 0.01 240);
  --footer-muted: oklch(45% 0.01 240);
  --footer-subtle: oklch(52% 0.008 240);
  --footer-border: oklch(84% 0.02 150);
  --footer-accent: oklch(38% 0.095 158);
  position: relative;
  overflow: hidden;
  color: var(--footer-text);
  isolation: isolate;
}

.footer-stage {
  position: relative;
  height: clamp(390px, 42vw, 540px);
  overflow: hidden;
}

.footer-wordmark {
  position: absolute;
  z-index: 0;
  top: clamp(56px, 7vw, 98px);
  left: 50%;
  width: max-content;
  color: rgba(40, 82, 61, 0.1);
  font-size: clamp(5.5rem, 17vw, 13.5rem);
  font-weight: 700;
  letter-spacing: -0.11em;
  line-height: 0.8;
  white-space: nowrap;
  user-select: none;
  will-change: transform;
}

.footer-wordmark span {
  color: rgba(40, 82, 61, 0.17);
}

.footer-foreground {
  position: absolute;
  z-index: 1;
  top: 12px;
  left: 50%;
  width: min(1040px, 112vw);
  max-width: none;
  height: auto;
  opacity: 1;
  pointer-events: none;
  filter: none;
  user-select: none;
  will-change: transform;
}

.footer-content {
  position: relative;
  z-index: 3;
  margin-top: -122px;
  border-top: 1px solid var(--footer-border);
  background: rgba(245, 247, 241, 1);
  box-shadow: none;
  backdrop-filter: blur(8px);
}

.footer-content-inner {
  width: min(100% - 56px, 1320px);
  margin: 0 auto;
  padding: 38px 0 24px;
}

.footer-main {
  display: grid;
  grid-template-columns: minmax(220px, 0.82fr) minmax(0, 1.7fr);
  gap: clamp(42px, 7vw, 92px);
}

.footer-brand {
  max-width: 320px;
}

.footer-brand-link {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  gap: 10px;
  color: var(--footer-text);
  font-size: 1.05rem;
  font-weight: 650;
  letter-spacing: 0.02em;
  text-decoration: none;
  transition: color 180ms ease, transform 180ms ease;
}

.footer-brand-link:hover {
  color: var(--footer-accent);
}

.footer-logo {
  width: 42px;
  height: 42px;
  object-fit: contain;
}

.footer-tagline {
  max-width: 29ch;
  margin: 16px 0 0;
  color: var(--footer-muted);
  font-size: 0.86rem;
  line-height: 1.65;
}

.footer-nav {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(24px, 4.6vw, 70px);
}

.footer-column-title {
  margin: 0;
  color: var(--footer-text);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.13em;
  line-height: 1.2;
  text-transform: uppercase;
}

.footer-link-list,
.footer-legal-list {
  padding: 0;
  margin: 15px 0 0;
  list-style: none;
}

.footer-link-list {
  display: grid;
  gap: 9px;
}

.footer-link,
.footer-legal-link {
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  color: var(--footer-muted);
  font-size: 0.81rem;
  line-height: 1.35;
  text-decoration: none;
  transition: color 180ms ease, transform 180ms ease;
}

.footer-link:hover,
.footer-legal-link:hover {
  color: var(--footer-accent);
}

.footer-column-description {
  max-width: 24ch;
  margin: 15px 0 0;
  color: var(--footer-subtle);
  font-size: 0.75rem;
  line-height: 1.55;
}

.footer-meta {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  margin-top: 38px;
  padding-top: 15px;
  border-top: 1px solid var(--footer-border);
}

.footer-copyright {
  margin: 0;
  color: var(--footer-subtle);
  font-size: 0.75rem;
  line-height: 1.5;
}

.footer-legal-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 6px 22px;
  margin: 0;
}

.footer-legal-link {
  min-height: 22px;
  color: var(--footer-muted);
  font-size: 0.75rem;
}

.footer-brand-link:focus-visible,
.footer-link:focus-visible,
.footer-legal-link:focus-visible {
  outline: 2px solid var(--footer-accent);
  outline-offset: 4px;
  border-radius: 2px;
}

@media (max-width: 800px) {
  .footer-main {
    grid-template-columns: 1fr;
    gap: 34px;
  }

  .footer-brand {
    max-width: 34ch;
  }

  .footer-nav {
    gap: 24px;
  }
}

@media (max-width: 560px) {
  .footer-stage {
    height: 410px;
  }

  .footer-wordmark {
    top: 76px;
    font-size: 23vw;
  }

  .footer-foreground {
    top: 3%;
    width: 146vw;
  }

  .footer-content {
    margin-top: -74px;
  }

  .footer-content-inner {
    width: min(100% - 40px, 1320px);
    padding-top: 30px;
  }

  .footer-nav {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 30px;
  }

  .footer-column:last-child {
    grid-column: 1 / -1;
  }

  .footer-meta {
    flex-direction: column;
    gap: 12px;
    margin-top: 32px;
  }

  .footer-legal-list {
    justify-content: flex-start;
  }
}

@media (max-width: 380px) {
  .footer-nav {
    grid-template-columns: 1fr;
  }

  .footer-column:last-child {
    grid-column: auto;
  }
}
</style>
