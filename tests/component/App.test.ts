import { fireEvent, render, screen, within } from '@testing-library/vue'
import App from '@/App.vue'

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
    expect(within(iconics).getAllByRole('img', { name: 'Photo à venir' })).toHaveLength(3)
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

  it('fills the community reel with placeholders, duplicates hidden from assistive tech', () => {
    render(App)
    const community = screen
      .getByRole('heading', { name: "Complètement Pom'Poche" })
      .closest('section')!
    const visible = within(community).getAllByRole('img', { name: /à venir$/ })
    expect(visible.length).toBeGreaterThan(0)
    expect(within(community).getAllByRole('listitem', { hidden: true }).length).toBeGreaterThan(
      within(community).getAllByRole('listitem').length,
    )
  })
})
