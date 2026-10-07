import { scrollToTop } from '@/lib/scroll'

describe('scrollToTop', () => {
  it('drops the URL fragment and scrolls to the top', () => {
    history.replaceState(null, '', '/?ref=menu#engagements')
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    scrollToTop()
    expect(location.hash).toBe('')
    expect(location.search).toBe('?ref=menu')
    expect(scrollTo).toHaveBeenCalledWith({ top: 0 })
  })
})
