import { useState, useEffect, useRef } from 'react'

import styles from './Dropdown.module.scss'
import type { MenuItemProps } from '../../typings/props'
import LevelTwo from './LevelTwo'
import LevelThree from './LevelThree'
import ContentBlocks from './ContentBlocks'

type DropdownProps = {
  levelTwoItems: MenuItemProps[]
}

const Dropdown = ({ levelTwoItems }: DropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const focusRef = useRef<HTMLDivElement>(null)
  const [levelTwoActive, setLevelTwoActive] = useState<MenuItemProps>(
    levelTwoItems[0]
  )

  const [levelThreeItems, setLevelThreeItems] = useState<
    MenuItemProps[] | null
  >()

  const [contentBlocks, setContentBlocks] = useState<MenuItemProps[] | null>()

  useEffect(() => {
    setLevelThreeItems(levelTwoActive?.children)
    setContentBlocks(levelTwoActive?.blocks)
  }, [levelTwoActive])

  const handleMouseEnter = (menu: MenuItemProps) => {
    setLevelTwoActive(menu)
  }

  const handleExpand = (menu: MenuItemProps) => {
    setLevelTwoActive(menu)
    focusRef.current?.focus()
  }

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      dropdownRef.current?.getElementsByTagName('a')[0].focus()
    }
  }

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <div className={styles.wrapper}>
        {levelTwoItems && (
          <div className={styles.levelTwo}>
            <LevelTwo
              menus={levelTwoItems}
              activeId={levelTwoActive.id}
              handleExpand={handleExpand}
              handleMouseEnter={handleMouseEnter}
            />
          </div>
        )}

        {(levelThreeItems || contentBlocks) && (
          <div
            className={styles.levelThreeWrapper}
            tabIndex={0}
            ref={focusRef}
            onBlur={handleBlur}
          >
            {levelThreeItems && (
              <div className={styles.levelThree}>
                <LevelThree menus={levelThreeItems} />
              </div>
            )}

            {contentBlocks && (
              <div className={styles.contentBlocks}>
                <ContentBlocks contentBlocks={contentBlocks} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dropdown
