import Link from 'next/link'

import Image from '../Image/Image'
import styles from './MegaMenuItem.module.scss'
import type { MenuItemProps } from '../../typings/props'

type MenuItemContentProps = {
  menu: MenuItemProps
}

type MenuItemButtonProps = {
  title: string
  expandIcon?: JSX.Element
  expanded: boolean
  handleExpand: () => void
}

type MegaMenuItemProps = {
  menu: MenuItemProps
  className: string
  expanded?: boolean
  expandIcon?: JSX.Element
  handleExpand?: () => void
  handleMouseEnter?: () => void
}

const MenuItemContent = ({ menu }: MenuItemContentProps) => {
  return (
    <span className={styles.textWrapper}>
      {menu?.imageUrl && (
        <Image
          className={styles.icon}
          src={menu.imageUrl}
          height={17}
          width={17}
          aria-hidden
          alt=""
          loading="eager"
          sizes="17px"
        />
      )}
      {menu.title}
    </span>
  )
}

const MenuItemButton = ({
  title,
  expandIcon,
  expanded,
  handleExpand,
}: MenuItemButtonProps) => {
  return (
    <button
      className={styles.button}
      aria-expanded={expanded}
      onClick={() => handleExpand()}
    >
      {expandIcon}
      <span className={styles.buttonLabel}>{`Open menu for ${title}`}</span>
    </button>
  )
}

const MegaMenuItem = ({
  menu,
  className,
  expandIcon,
  expanded,
  handleExpand,
  handleMouseEnter,
}: MegaMenuItemProps) => {
  const expandable = menu.children && expandIcon && handleExpand

  return (
    <span className={className} onMouseEnter={handleMouseEnter}>
      {menu.url ? (
        <>
          <Link href={menu.url}>
            <MenuItemContent menu={menu} />
          </Link>
          {expandable && (
            <MenuItemButton
              title={menu.title}
              expandIcon={expandIcon}
              expanded={expanded ?? false}
              handleExpand={handleExpand}
            />
          )}
        </>
      ) : (
        <>
          <MenuItemContent menu={menu} />
          {expandable && (
            <MenuItemButton
              title={menu.title}
              expandIcon={expandIcon}
              expanded={expanded ?? false}
              handleExpand={handleExpand}
            />
          )}
        </>
      )}
    </span>
  )
}

export default MegaMenuItem
