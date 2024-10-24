import { useEffect } from 'react'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { useHoverIntent } from 'react-use-hoverintent'

import MegaMenuItem from './MegaMenuItem'
import ArrowDownIcon from '../Icons/General/ArrowDownIcon'
import Dropdown from './Dropdown'
import styles from './LevelOne.module.scss'
import type { MenuItemProps } from '../../typings/props'

type LevelOneItemProps = {
  menu: MenuItemProps
}

const LevelOneItem = ({ menu }: LevelOneItemProps) => {
  const router = useRouter()

  const [isActive, intentRef, setIsActive] = useHoverIntent<HTMLLIElement>({
    timeout: 350,
    sensitivity: 15,
  })

  const handleExpand = () => {
    if (isActive) {
      setIsActive(false)
    } else {
      setIsActive(true)
    }
  }

  useEffect(() => {
    const handleChangeRoute = () => {
      setIsActive(false)
    }

    router.events.on('routeChangeStart', handleChangeRoute)

    return () => {
      router.events.off('routeChangeStart', handleChangeRoute)
    }
  }, [router])

  return (
    <li className={styles.levelOneItem} ref={intentRef}>
      <MegaMenuItem
        menu={menu}
        className={classNames(
          styles.levelOneLink,
          isActive ? styles.active : null
        )}
        handleExpand={handleExpand}
        expanded={isActive}
        expandIcon={<ArrowDownIcon />}
      />

      {isActive && menu.children && <Dropdown levelTwoItems={menu.children} />}
    </li>
  )
}

type LevelOneProps = {
  menus: MenuItemProps[]
}

const LevelOne = ({ menus }: LevelOneProps) => {
  return (
    <div className={styles.levelOne}>
      <ul className={`list-reset ${styles.levelOneItems}`}>
        {menus.map((menu) => (
          <LevelOneItem key={menu.id} menu={menu} />
        ))}
      </ul>
    </div>
  )
}

export default LevelOne
