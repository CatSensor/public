import type { ConsentService } from '@/modules/consent'

type Gtag = (...args: unknown[]) => void

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: Gtag
  }
}

const SCRIPT_ID = 'catsensor-google-analytics'

function removeGoogleAnalyticsCookies() {
  const cookieNames = document.cookie
    .split(';')
    .map((cookie) => cookie.split('=')[0]?.trim())
    .filter((name): name is string => Boolean(name))
    .filter((name) => name === '_ga' || name === '_gid' || name === '_gat' || name.startsWith('_ga_') || name.startsWith('_gac_') || name.startsWith('_gcl_'))

  const domains = ['', location.hostname, `.${location.hostname}`]

  for (const name of cookieNames) {
    for (const domain of domains) {
      const domainPart = domain ? `; Domain=${domain}` : ''
      document.cookie = `${name}=; Max-Age=0; Path=/${domainPart}; SameSite=Lax`
    }
  }
}

export function createGoogleAnalytics(measurementId: string) {
  let isActive = false
  let isConfigured = false
  let lastTrackedPath = ''
  const disableKey = `ga-disable-${measurementId}`

  const setDisabled = (disabled: boolean) => {
    ;(window as unknown as Record<string, unknown>)[disableKey] = disabled
  }

  const ensureGtag = () => {
    window.dataLayer = window.dataLayer ?? []
    window.gtag = window.gtag ?? ((...args: unknown[]) => window.dataLayer?.push(args))
    return window.gtag
  }

  const activate = () => {
    if (typeof window === 'undefined') {
      return
    }

    isActive = true
    setDisabled(false)
    const gtag = ensureGtag()

    if (!isConfigured) {
      gtag('consent', 'default', {
        ad_personalization: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        analytics_storage: 'denied',
      })
    }

    gtag('consent', 'update', {
      ad_personalization: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      analytics_storage: 'granted',
    })

    if (!isConfigured) {
      gtag('js', new Date())
      gtag('config', measurementId, {
        allow_ad_personalization_signals: false,
        allow_google_signals: false,
        anonymize_ip: true,
        send_page_view: false,
      })
      isConfigured = true
    }

    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement('script')
      script.id = SCRIPT_ID
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`
      document.head.append(script)
    }

    trackPageView(`${location.pathname}${location.search}${location.hash}`, document.title)
  }

  const deactivate = () => {
    if (typeof window === 'undefined') {
      return
    }

    isActive = false
    setDisabled(true)
    window.gtag?.('consent', 'update', {
      ad_personalization: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      analytics_storage: 'denied',
    })
    removeGoogleAnalyticsCookies()
  }

  const trackPageView = (pagePath: string, pageTitle: string) => {
    if (!isActive || typeof window === 'undefined' || lastTrackedPath === pagePath) {
      return
    }

    lastTrackedPath = pagePath
    ensureGtag()('event', 'page_view', {
      page_location: window.location.href,
      page_path: pagePath,
      page_title: pageTitle,
    })
  }

  const service: ConsentService = {
    id: 'google-analytics',
    categoryId: 'analytics',
    activate,
    deactivate,
  }

  return { service, trackPageView }
}
