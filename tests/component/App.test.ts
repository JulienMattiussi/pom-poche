import { fireEvent, render, screen, within } from '@testing-library/vue'
import { nextTick } from 'vue'
import App from '@/App.vue'
import { BACKUP_ONLY, PHOTOS, SHORTS } from '@/data/community'

describe('App', () => {
  it('opens on the hero headline', () => {
    render(App)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      "La vigne, ça rend complètement Pom'Poche !",
    )
  })

  it('links every header entry to its section', () => {
    const { container } = render(App)
    const nav = screen.getByRole('navigation', { name: 'Navigation principale' })
    for (const label of ['Produits', 'Engagements', 'Qui sommes-nous', 'Communauté']) {
      const href = screen.getByRole('link', { name: label }).getAttribute('href')
      expect(nav).toContainElement(screen.getByRole('link', { name: label }))
      expect(container.querySelector(href!)).not.toBeNull()
    }
  })

  it('gives every iconic card its hover badge', () => {
    render(App)
    for (const badge of ['Sans sucres ajoutés', 'Bio', '5 cépages']) {
      expect(screen.getByText(badge)).toBeInTheDocument()
    }
    const iconics = screen.getByRole('heading', { name: 'Les iconiques' }).closest('section')!
    expect(within(iconics).getAllByRole('img', { name: /^Poche PomPoche/ })).toHaveLength(3)
  })

  it('scrolls back to the top when the logo is clicked', async () => {
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    render(App)
    const [headerLogo, footerLogo] = screen.getAllByRole('link', {
      name: 'PomPoche, retour en haut',
    })
    await fireEvent.click(headerLogo!)
    await fireEvent.click(footerLogo!)
    await fireEvent.click(screen.getByRole('button', { name: 'Retour en haut' }))
    expect(scrollTo).toHaveBeenCalledTimes(3)
    expect(scrollTo).toHaveBeenCalledWith({ top: 0 })
  })

  it('credits the author in the footer', () => {
    render(App)
    expect(screen.getByText("Pom'Poche 2026")).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Fait avec ❤️ par YavaDeus' })).toHaveAttribute(
      'href',
      'https://yavadeus.dev',
    )
  })

  it('hides the looping copy of the community reel from assistive tech', () => {
    render(App)
    const community = screen
      .getByRole('heading', { name: "Complètement Pom'Poche" })
      .closest('section')!
    expect(within(community).getAllByRole('listitem', { hidden: true }).length).toBeGreaterThan(
      within(community).getAllByRole('listitem').length,
    )
  })

  it('mounts a muted YouTube player on demand when it cannot preload', async () => {
    const { container } = render(App)
    const [play] = screen.getAllByRole('button', { name: 'Lire la vidéo (sans le son)' })
    expect(container.querySelector('.post iframe')).toBeNull()
    await fireEvent.click(play!)
    const src = container.querySelector('.post iframe')!.getAttribute('src')!
    expect(src).toContain('youtube-nocookie.com/embed/')
    expect(src).toContain('mute=1')
    await fireEvent.click(screen.getByRole('button', { name: 'Arrêter la vidéo' }))
    expect(screen.getAllByRole('button', { name: 'Lire la vidéo (sans le son)' })).toHaveLength(5)
  })

  it('embeds a muted video in every polaroid', () => {
    const { container } = render(App)
    const sources = [...container.querySelectorAll('.polaroid iframe')].map((frame) =>
      frame.getAttribute('src')!,
    )
    expect(sources).toHaveLength(3)
    expect(sources[0]).toContain('youtube-nocookie.com/embed/mFtzcQA8oHA')
    expect(sources[1]).toContain('youtube-nocookie.com/embed/24HBTNZI-0U')
    expect(sources[2]).toContain('youtube-nocookie.com/embed/t6JkG0oHcoM')
    for (const src of sources) expect(src).toContain('mute=1')
  })

  it('switches a Short to a backup video when YouTube reports an error', async () => {
    const { container } = render(App)
    const [play] = screen.getAllByRole('button', { name: 'Lire la vidéo (sans le son)' })
    await fireEvent.click(play!)
    const frame = container.querySelector<HTMLIFrameElement>('.post iframe')!
    const first = frame.getAttribute('src')!
    window.dispatchEvent(
      new MessageEvent('message', {
        data: JSON.stringify({ event: 'onError', info: 150 }),
        source: frame.contentWindow,
      }),
    )
    await nextTick()
    const next = container.querySelector('.post iframe')!.getAttribute('src')!
    expect(next).not.toBe(first)
    const id = (src: string) => new URL(src).pathname.split('/').pop()
    expect([...SHORTS, ...BACKUP_ONLY]).toContain(id(next))
  })

  it('shows every community photo once in the reel', () => {
    render(App)
    for (const photo of PHOTOS) {
      expect(screen.getByRole('img', { name: photo.alt })).toHaveAttribute('src', photo.src)
    }
  })

  it('plays the background video in the hero and the pioneers video under its title', () => {
    const { container } = render(App)
    expect(container.querySelector('.hero iframe')!.getAttribute('src')).toContain(
      '/embed/MStv4W841dE',
    )
    expect(container.querySelector('.about__hero')!.getAttribute('src')).toContain(
      '/embed/qciVY1Hma_s',
    )
  })

  it('shows the Cabernet pouch in the hero', () => {
    render(App)
    expect(
      screen.getByRole('img', { name: 'Poche PomPoche Cabernet-Sauvignon, Cuvée des anciens' }),
    ).toHaveAttribute('src', 'pouches/cabernet.webp')
  })
})
