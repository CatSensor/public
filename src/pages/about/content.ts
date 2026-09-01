export type TimelineEntry = {
  period: string
  title: string
  summary: string
  details: string[]
  image?: string
  proofUrl?: string
  proofLabel?: string
}

export type TeamMemberText = {
  name: string
  shortName: string
  role: string
  bio: string
  quote: string
}

export const aboutImages = {
  collageTall: '/images/us/vertical_1.webp',
  collageMiddleTop: '/images/us/William.webp',
  collageMiddleBottom: '/images/us/wide.webp',
  collageCenter: '/images/us/Samuel.webp',
  collageRightTop: '/images/us/winner.webp',
  collageRightBottom: '/images/us/golf.webp',
  samuel: '/images/us/Samuel.webp',
  william: '/images/us/William.webp',
}
