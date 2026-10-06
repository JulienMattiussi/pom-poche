export const scrollToTop = () => {
  history.replaceState(null, '', location.pathname + location.search)
  window.scrollTo({ top: 0 })
}
