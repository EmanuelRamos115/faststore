import styles from './LevelFour.module.scss'
import type { MenuItemProps } from '../../typings/props'
import MegaMenuItem from './MegaMenuItem'

type LevelFourProps = {
  menus: MenuItemProps[]
}

const LevelFour = ({ menus }: LevelFourProps) => {
  return (
    <div className={styles.levelFour}>
      <ul className={`list-reset ${styles.levelFourItems}`}>
        {menus.map((menu) => (
          <li key={menu.id} className={styles.levelFourItem}>
            <MegaMenuItem menu={menu} className={styles.levelFourLink} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LevelFour
