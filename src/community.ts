export type Network = 'instagram' | 'tiktok' | 'facebook' | 'bereal'

type Post = { network: Network; video: boolean; tilt: number }

export const NETWORKS: { id: Network; label: string }[] = [
  { id: 'instagram', label: 'Instagram' },
  { id: 'tiktok', label: 'TikTok' },
  { id: 'facebook', label: 'Facebook' },
  { id: 'bereal', label: 'BeReal' },
]

export const POSTS: Post[] = [
  { network: 'bereal', video: false, tilt: 3 },
  { network: 'tiktok', video: true, tilt: -3 },
  { network: 'facebook', video: false, tilt: 2 },
  { network: 'instagram', video: true, tilt: -2 },
  { network: 'bereal', video: false, tilt: 3 },
  { network: 'tiktok', video: true, tilt: -4 },
  { network: 'instagram', video: false, tilt: 2 },
  { network: 'facebook', video: true, tilt: -2 },
]
