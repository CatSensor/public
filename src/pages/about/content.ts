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
  role: string
  bio: string
}

export const aboutImages = {
  collageTall: '/images/us/vertical_1.webp',
  collageTop: '/images/us/winner.webp',
  collageBottom: '/images/us/wide.webp',
  samuel: '/images/us/Samuel.webp',
  william: '/images/us/William.webp',
}
