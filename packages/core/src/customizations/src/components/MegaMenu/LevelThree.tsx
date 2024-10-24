import styles from './LevelThree.module.scss'
import type { MenuItemProps } from '../../typings/props'
import MegaMenuItem from './MegaMenuItem'
import LevelFour from './LevelFour'

type LevelThreeProps = {
  menus: MenuItemProps[]
}

const LevelThree = ({ menus }: LevelThreeProps) => {
  const anyChildren = menus.some((menu) => menu?.children)

  return (
    <div className={styles.levelThree}>
      {anyChildren ? (
        <ul className={`list-reset ${styles.levelThreeItems}`}>
          {menus.map((menu) => (
            <li key={menu.id} className={styles.levelThreeItem}>
              <MegaMenuItem menu={menu} className={styles.levelThreeLink} />

              {menu.children && <LevelFour menus={menu.children} />}
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.noChildrenWrapper}>
          <LevelFour menus={menus} />
        </div>
      )}
    </div>
  )
}

export default LevelThree
