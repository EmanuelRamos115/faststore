/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useState, useEffect, useRef, type RefObject } from 'react'
import classNames from 'classnames'
import { useQuery } from 'src/sdk/graphql/useQuery'
import { gql } from '@generated/gql'

import type { MenuItemProps } from '../../typings/props'
import type { UtilityNavigationLinks } from '../../@generated/cms/Header'
import MobileMenuItem from './MobileMenuItem'
import MobileMenuFooter from './MobileMenuFooter'
import ArrowRightIcon from '../Icons/General/ArrowRightIcon'
import ArrowLeftIcon from '../Icons/General/ArrowLeftIcon'
import styles from './MobileMenu.module.scss'

type MobileMenuProps = {
  closeMenu: () => void
  utilityNavLinks: UtilityNavigationLinks
  closeRef: RefObject<HTMLButtonElement>
}

type MenuItemsQuery = {
  menuItems: MenuItemProps[]
}

type MenuProps = {
  parent?: MobileMenuItemProps | null
  prevParent?: MobileMenuItemProps
  items: MobileMenuItemProps[]
}

type MobileMenuItemProps = MenuItemProps & { hasChildren?: boolean }

/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */
const GET_MENU_ITEMS = gql(`
  query getMenuItems {
    menuItems {
      id
      parentId
      type
      position
      title
      url
      imageUrl
      altText
      ctaText
    }
  }
`)

const getParent = (items: MenuItemProps[], parentId: string | null) => {
  return items.find((menu) => menu.id === parentId && menu.type === 'text')
}

const getChildren = (items: MenuItemProps[], parentId: string | null) => {
  return items.filter(
    (menu) => menu.parentId === parentId && menu.type === 'text'
  )
}

const prepareData = (items: MenuItemProps[]) => {
  return items
    .map((item) => {
      return {
        ...item,
        hasChildren: items.some(
          (i) => i.parentId === item.id && i.type === 'text'
        ),
      }
    }, [])
    .sort((a, b) => a.position - b.position)
}

const MobileMenu = ({
  closeMenu,
  utilityNavLinks,
  closeRef,
}: MobileMenuProps) => {
  const [allItems, setAllItems] = useState<MenuItemProps[]>()
  const backRef = useRef<HTMLButtonElement>(null)
  const containerRef = useRef<HTMLElement>(null)
  const [parent, setParent] = useState<MobileMenuItemProps | null | undefined>(
    null
  )

  const [menu, setMenu] = useState<MenuProps>()
  /* eslint-disable-next-line @typescript-eslint/no-unsafe-argument */
  const { data } = useQuery<MenuItemsQuery>(GET_MENU_ITEMS, {})

  useEffect(() => {
    if (data?.menuItems) {
      setAllItems(prepareData(data.menuItems))
    }
  }, [data])

  useEffect(() => {
    if (allItems) {
      setMenu({
        parent: null,
        items: getChildren(allItems, null),
      })
    }
  }, [allItems])

  useEffect(() => {
    if (allItems) {
      setMenu({
        parent,
        prevParent: getParent(allItems, parent?.parentId ?? null),
        items: getChildren(allItems, parent?.id ?? null),
      })
    }
  }, [parent])

  useEffect(() => {
    backRef.current?.focus()
  }, [menu])

  return (
    <nav
      ref={containerRef}
      className={classNames(styles.mobileMenu)}
      onBlur={(event) => {
        if (containerRef?.current?.contains(event.relatedTarget)) {
          return
        }

        closeRef.current?.focus()
      }}
    >
      <div className={styles.menusContainer}>
        {menu?.parent && (
          <>
            <button
              ref={backRef}
              className={styles.backButton}
              onClick={() => setParent(menu?.prevParent)}
            >
              <ArrowLeftIcon />
              <span>Back to {menu?.prevParent?.title ?? 'Menu'}</span>
            </button>

            <div className={styles.heading}>{menu?.parent.title}</div>
          </>
        )}

        {menu?.items && (
          <ul className={`list-reset ${styles.menuList}`}>
            {menu.items.map((item) => (
              <li key={item.id} className={styles.menuItem}>
                <MobileMenuItem
                  title={item.title}
                  url={item.url}
                  hasChildren={item.hasChildren}
                  toggleIcon={<ArrowRightIcon />}
                  className={styles.menuLink}
                  onClick={(e) => {
                    e.stopPropagation()
                    setParent(item)
                  }}
                />
              </li>
            ))}

            {menu?.parent?.url && (
              <li className={styles.menuItem}>
                <MobileMenuItem
                  title={`Shop All ${menu?.parent.title}`}
                  url={menu?.parent.url}
                  hasChildren={false}
                  className={`${styles.menuLink} ${styles.menuLinkShopAll}`}
                />
              </li>
            )}
          </ul>
        )}
      </div>

      {!menu?.parent && <MobileMenuFooter utilityNavLinks={utilityNavLinks} />}
    </nav>
  )
}

export default MobileMenu
