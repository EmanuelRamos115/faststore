import classNames from 'classnames'

import styles from './LevelTwo.module.scss'
import type { MenuItemProps } from '../../typings/props'
import MegaMenuItem from './MegaMenuItem'
import ArrowRightIcon from '../Icons/General/ArrowRightIcon'

type LevelTwoProps = {
  menus: MenuItemProps[]
  activeId: string
  handleExpand: (menu: MenuItemProps) => void
  handleMouseEnter: (menu: MenuItemProps) => void
}

const LevelTwo = ({
  menus,
  activeId,
  handleExpand,
  handleMouseEnter,
}: LevelTwoProps) => {
  return (
    <div className={styles.levelTwo}>
      <ul className={`list-reset ${styles.levelTwoItems}`}>
        {menus.map((menu) => (
          <li key={menu.id} className={styles.levelTwoItem}>
            <MegaMenuItem
              menu={menu}
              className={classNames(
                styles.levelTwoLink,
                activeId === menu.id ? styles.active : null
              )}
              expanded={activeId === menu.id}
              expandIcon={<ArrowRightIcon />}
              handleMouseEnter={() => {
                handleMouseEnter(menu)
              }}
              handleExpand={() => {
                handleExpand(menu)
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LevelTwo
