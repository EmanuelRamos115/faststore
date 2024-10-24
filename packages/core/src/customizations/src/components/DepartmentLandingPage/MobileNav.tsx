import { useState } from 'react'
import { SlideOver, SlideOverHeader } from '@faststore/ui'
import type { GetCategoryTreeQuery } from '@generated/graphql'

import { useScroll } from '../../hooks/useScroll'
import styles from './MobileNav.module.scss'
import MenuIcon from '../Icons/General/MenuIcon'
import CategoryNav from './CategoryNav'

type MobileNavProps = {
  categoryTree: NonNullable<GetCategoryTreeQuery['categoryTree']>
}

const MobileNav = ({ categoryTree }: MobileNavProps) => {
  const [mobileNavVisibility, setMobileNavVisibility] = useState(false)
  const { blockScroll, allowScroll } = useScroll()

  const showNav = () => {
    setMobileNavVisibility(true)
    blockScroll()
  }

  const hideNav = () => {
    setMobileNavVisibility(false)
    allowScroll()
  }

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <button className={styles.button} onClick={showNav}>
          <span></span>
          <span>Shop by Category</span>
          <span>
            <MenuIcon />
          </span>
        </button>

        {mobileNavVisibility && (
          <SlideOver
            isOpen={mobileNavVisibility}
            direction="rightSide"
            size="full"
            fade="in"
            onDismiss={hideNav}
          >
            <SlideOverHeader onClose={hideNav}>
              Shop by Category
            </SlideOverHeader>
            <CategoryNav categoryTree={categoryTree} placement="mobile" />
          </SlideOver>
        )}
      </div>
    </div>
  )
}

export default MobileNav
