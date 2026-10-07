export type Network = 'picolagram' | 'tiktrinque' | 'facebouteille' | 'berond' | 'youtube'

export type Post = { network: Network; tilt: number }

export const NETWORKS: { id: Exclude<Network, 'youtube'>; label: string }[] = [
  { id: 'picolagram', label: 'Picolagram' },
  { id: 'tiktrinque', label: 'TikTrinque' },
  { id: 'facebouteille', label: 'FaceBouteille' },
  { id: 'berond', label: 'BeRond' },
]

export const SHORTS = [
  'MqKGQs1DcSg',
  '6WmUl5IH3mw',
  'QJTlnT3UdrE',
  'GSvb4rjeN2I',
  'rfly8Ud9d1M',
  'xkWiacz_JY0',
  'z3TcDFawCvQ',
  '7wDUx1WdbD8',
]

export const BACKUP_ONLY = ['tgDtO0RzZVs']

export type Photo = { src: string; alt: string }

export const PHOTOS: Photo[] = [
  { src: 'community/fan-rue.jpg', alt: 'Un fan dans la rue, canette à la main' },
  { src: 'community/fan-trottoir.jpg', alt: 'Un fan sur le trottoir, canette à la main' },
  { src: 'community/canette.jpg', alt: 'Une main tenant une canette entamée' },
  { src: 'community/selfie-canette.jpg', alt: 'Deux fans hilares en selfie, canette levée' },
  {
    src: 'community/trottoir-nuit.jpg',
    alt: 'Trois fans endormis contre un mur, la nuit, entourés de canettes',
  },
]

export const POSTS: Post[] = [
  { network: 'berond', tilt: 3 },
  { network: 'youtube', tilt: -3 },
  { network: 'facebouteille', tilt: 2 },
  { network: 'youtube', tilt: -2 },
  { network: 'picolagram', tilt: 3 },
  { network: 'youtube', tilt: -4 },
  { network: 'berond', tilt: 2 },
  { network: 'youtube', tilt: -2 },
  { network: 'tiktrinque', tilt: 3 },
  { network: 'youtube', tilt: -3 },
]
