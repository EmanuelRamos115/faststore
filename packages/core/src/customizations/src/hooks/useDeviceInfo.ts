import { useState, useEffect } from 'react'

export const useDeviceInfo = () => {
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const getDevice = () => {
    let device

    if (windowWidth > 0 && windowWidth <= 500) {
      device = 'mobile'
    } else if (windowWidth > 500 && windowWidth <= 768) {
      device = 'tablet'
    } else {
      device = 'desktop'
    }

    return device
  }

  return {
    device: getDevice(),
  }
}
