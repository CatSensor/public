export type TimelineEntry = {
  period: string
  title: string
  summary: string
  details: string[]
  proofUrl?: string
  proofLabel?: string
}

export const timelineHighlightImage = '/images/us/winner.png'

export type TeamMemberText = {
  name: string
  role: string
  bio: string
}

export const aboutImages = {
  collageTall: '/images/us/vertical_1.png',
  collageTop: '/images/us/winner.png',
  collageBottom: '/images/us/wide.png',
  samuel: '/images/us/Samuel.png',
  william: '/images/us/William.png',
}
