export type Section = { id: string; label: string }

const SECTIONS: Section[] = [
  { id: 'produits', label: 'Produits' },
  { id: 'engagements', label: 'Engagements' },
  { id: 'qui-sommes-nous', label: 'Qui sommes-nous' },
  { id: 'communaute', label: 'Communauté' },
]

const toLink = ({ id, label }: Section) => ({ href: `#${id}`, label })

export const LEFT_LINKS = SECTIONS.slice(0, 2).map(toLink)
export const RIGHT_LINKS = SECTIONS.slice(2).map(toLink)
