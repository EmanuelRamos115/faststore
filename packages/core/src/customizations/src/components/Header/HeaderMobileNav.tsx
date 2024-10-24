import {
  useState,
  useRef,
  useEffect,
  type Dispatch,
  type SetStateAction,
} from 'react'
import { useRouter } from 'next/router'
import { IconButton, Icon as UIIcon } from '@faststore/ui'

import type { UtilityNavigationLinks } from '../../@generated/cms/Header'
import styles from './HeaderMobileNav.module.scss'
import MobileMenu from '../MobileMenu/MobileMenu'
import { useScroll } from '../../hooks/useScroll'

type HeaderMobileNavProps = {
  utilityNavLinks: UtilityNavigationLinks
  setShowB2B: Dispatch<SetStateAction<boolean>>
}

export default function HeaderMobileNav({
  utilityNavLinks,
  setShowB2B,
}: HeaderMobileNavProps) {
  const router = useRouter()
  const [showNav, setShowNav] = useState(false)
  const { blockScroll, allowScroll, scrollToTop } = useScroll()
  const closeRef = useRef<HTMLButtonElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  const openMenu = () => {
    scrollToTop()
    setShowNav(true)
    blockScroll()
    setShowB2B(false)
  }

  const closeMenu = () => {
    setShowNav(false)
    allowScroll()
    setShowB2B(true)
  }

  const toggleOpen = () => {
    showNav ? closeMenu() : openMenu()
  }

  useEffect(() => {
    router.events.on('routeChangeComplete', closeMenu)

    return () => {
      router.events.off('routeChangeComplete', closeMenu)
    }
  }, [router])

  const handleClickOutside = (event: MouseEvent) => {
    if (
      headerRef.current &&
      !headerRef.current.contains(event.target as Node)
    ) {
      closeMenu()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div ref={headerRef}>
      <div className={styles.mobileNav}>
        <IconButton
          data-fs-navbar-button-menu
          className={styles.mobileNavButton}
          icon={
            showNav ? (
              <UIIcon name="X" width={32} height={32} />
            ) : (
              <UIIcon name="List" width={32} height={32} />
            )
          }
          aria-label="Open Navigation"
          aria-expanded={showNav}
          onClick={toggleOpen}
          ref={closeRef}
        />
      </div>

      {showNav && (
        <MobileMenu
          closeMenu={closeMenu}
          utilityNavLinks={utilityNavLinks}
          closeRef={closeRef}
        />
      )}
    </div>
  )
}
