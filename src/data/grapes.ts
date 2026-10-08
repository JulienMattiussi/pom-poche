export type GrapeColor = 'purple' | 'green' | 'red' | 'black' | 'pink' | 'amber'

type Tones = { light: string; base: string; dark: string }

export const GRAPE_COLORS: Record<GrapeColor, Tones> = {
  purple: { light: '#a46bb0', base: '#5e2a6e', dark: '#2a0f33' },
  green: { light: '#e4f29a', base: '#a8c847', dark: '#5b7a1c' },
  red: { light: '#e2768a', base: '#a3243b', dark: '#4e0a18' },
  black: { light: '#7a6488', base: '#33203f', dark: '#120817' },
  pink: { light: '#f8c3d6', base: '#d9729a', dark: '#8a3256' },
  amber: { light: '#fbe08c', base: '#d7a12a', dark: '#8a5a0c' },
}
