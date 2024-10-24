import type { ReactNode } from 'react'
import { useFadeEffect } from '@faststore/ui'

import CloseIcon from '../Icons/General/CloseIcon'
import styles from './MobileDrawer.module.scss'

type MobileDrawerProps = {
  bodyContent: ReactNode
  drawerIsOpen: boolean
  footerContent: ReactNode
  handleDrawerClose: () => void
  headerText: string
}

const MobileDrawer = ({
  bodyContent,
  drawerIsOpen,
  footerContent,
  handleDrawerClose,
  headerText,
}: MobileDrawerProps) => {
  const { fade, fadeOut } = useFadeEffect()

  const onTransitionEnd = () => {
    fade === 'out' && handleDrawerClose()
  }

  return (
    <>
      <div
        className={styles.mobileDrawerBackdrop}
        data-drawer-is-open={fade === 'in'}
        onClick={fadeOut}
        role="presentation"
      />

      <div
        className={styles.mobileDrawerWrapper}
        data-drawer-is-open={fade === 'in'}
        onTransitionEnd={onTransitionEnd}
      >
        <div className={styles.mobileDrawerHeader}>
          <span>{headerText}</span>

          <button
            className={styles.closeMobileDrawerButton}
            onClick={fadeOut}
            type="button"
          >
            <CloseIcon /> <span className="visually-hidden">Close Drawer</span>
          </button>
        </div>

        <div className={styles.mobileDrawerBody}>{bodyContent}</div>

        <div className={styles.mobileDrawerFooter}>{footerContent}</div>
      </div>
    </>
  )
}

export default MobileDrawer
