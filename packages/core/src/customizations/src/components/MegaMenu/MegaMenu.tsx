import { useState, useEffect } from 'react'
import { useQuery } from 'src/sdk/graphql/useQuery'
import { gql } from '@generated/gql'

import type { MenuItemProps } from '../../typings/props'
import LevelOne from './LevelOne'
import styles from './MegaMenu.module.scss'

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

type MenuItemsQuery = {
  menuItems: MenuItemProps[]
}

type ParentMapping = Partial<Record<string, MenuItemProps[]>>

const constructTree = (
  byParentId: ParentMapping,
  current: MenuItemProps
): MenuItemProps => {
  const childNodes =
    byParentId[current.id]
      ?.map((child) => constructTree(byParentId, child))
      .sort((a, b) => a.position - b.position) ?? []

  const children = childNodes.filter((n) => n.type === 'text')
  const blocks = childNodes.filter((n) => n.type !== 'text')

  return {
    ...current,
    children: children.length > 0 ? children : null,
    blocks: blocks.length > 0 ? blocks : null,
  }
}

const arrayToTree = (dataset: MenuItemProps[]) => {
  const byParentId = dataset.reduce<ParentMapping>((result, item) => {
    return {
      ...result,
      [item.parentId ?? '']: [...(result[item.parentId ?? ''] ?? []), item],
    }
  }, {})

  return constructTree(byParentId, {
    id: '',
    type: 'text',
    parentId: null,
    title: 'root',
    position: 0,
  })
}

const MegaMenu = () => {
  const [menus, setMenus] = useState<MenuItemProps>()
  /* eslint-disable-next-line @typescript-eslint/no-unsafe-argument */
  const { data } = useQuery<MenuItemsQuery>(GET_MENU_ITEMS, {})

  useEffect(() => {
    if (data?.menuItems) {
      setMenus(arrayToTree(data.menuItems))
    }
  }, [data])

  return (
    <nav id="navigation" className={styles.megaMenu}>
      {menus?.children && <LevelOne menus={menus.children} />}
    </nav>
  )
}

export default MegaMenu
