import { useState } from 'react'
import Link from 'next/link'
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from '@faststore/ui'
import type { GetCategoryTreeQuery } from '@generated/graphql'

import styles from './CategoryNav.module.scss'
import ArrowDownIcon from '../Icons/General/ArrowDownIcon'
import ArrowUpIcon from '../Icons/General/ArrowUpIcon'

type SidebarNavProps = {
  categoryTree: NonNullable<GetCategoryTreeQuery['categoryTree']>
  placement: 'desktop' | 'mobile'
}

const SidebarNav = ({
  categoryTree,
  placement = 'desktop',
}: SidebarNavProps) => {
  const [indices, setIndices] = useState<Set<number>>(new Set([]))

  const handleOnChange = (index: number) => {
    if (indices.has(index)) {
      indices.delete(index)
      setIndices(new Set(indices))
    } else {
      setIndices(new Set(indices.add(index)))
    }
  }

  return (
    <Accordion indices={indices} onChange={handleOnChange}>
      {categoryTree.map((category, index) => (
        <AccordionItem
          key={category?.id}
          index={index}
          className={styles.accordionItem}
        >
          <AccordionButton
            className={styles.accordionHeading}
            expandedIcon={<ArrowUpIcon />}
            collapsedIcon={<ArrowDownIcon />}
            id={`${placement}-button-${category?.id ?? index}`}
            aria-controls={`${placement}-panel-${category?.id ?? index}`}
          >
            {category?.name}
          </AccordionButton>

          <AccordionPanel
            className={styles.accordionPanel}
            id={`${placement}-button-${category?.id ?? index}`}
            aria-labelledby={`${placement}-panel-${category?.id ?? index}`}
          >
            <ul className={`list-reset ${styles.secondaryNav}`}>
              <li className={styles.childCategoryItem}>
                <Link
                  className={styles.childCategory}
                  href={category?.url ?? '/'}
                >
                  All {category?.name}
                </Link>
              </li>

              {category?.children.map((childCategory) => (
                <li key={childCategory.id} className={styles.childCategoryItem}>
                  <Link
                    className={styles.childCategory}
                    href={childCategory.url}
                  >
                    {childCategory.name}
                  </Link>
                </li>
              ))}
            </ul>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default SidebarNav
