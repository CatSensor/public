import lineRender from '@/assets/catsenser/pasted-1777735292784-0.png'

export type NavLink = {
  label: string
  href: string
}

export type ProblemItem = {
  number: string
  title: string
  body: string
  stat: string
}

export type HowStep = {
  title: string
  body: string
}

export type FeatureIcon = 'clock' | 'trend' | 'report' | 'routine'

export type FeatureItem = {
  title: string
  description: string
  icon: FeatureIcon
}

export type FooterLink = {
  label: string
  href: string
}

export const productImages = {
  line: lineRender,
}
