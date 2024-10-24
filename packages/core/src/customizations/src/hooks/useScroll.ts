export const useScroll = () => {
  const blockScroll = () => {
    document.body.classList.add('no-scroll')
  }

  const allowScroll = () => {
    document.body.classList.remove('no-scroll')
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }

  return { blockScroll, allowScroll, scrollToTop }
}
