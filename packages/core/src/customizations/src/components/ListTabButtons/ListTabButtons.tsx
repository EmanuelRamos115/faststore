import Link from 'next/link'

import Heading from '../Heading/Heading'
import CircledArrow from '../Icons/General/CircledArrow'
import styles from './ListTabButtons.module.scss'
import type { ListTabButtons as ListTabButtonsProps } from '../../@generated/cms/ListTabButtons'

const ListTabButtons = ({ headingText, links }: ListTabButtonsProps) => {
  return (
    <div className={styles.listTabButtonsWrapper}>
      {headingText ? (
        <Heading level={2} uiStyle={6}>
          {headingText}
        </Heading>
      ) : null}

      <div className={styles.listTabButtons}>
        {links?.map((link) => {
          return (
            <Link key={link.text} href={link.url} className={styles.link}>
              <span className={styles.linkText}>{link.text}</span>
              <div className={styles.iconWrapper}>
                <CircledArrow />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default ListTabButtons
