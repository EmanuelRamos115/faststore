import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import Image from '../Image/Image'
import Action from '../Action/Action'
import Heading from '../Heading/Heading'
import styles from './CirclesGrid.module.scss'
import { useDeviceInfo } from '../../hooks/useDeviceInfo'
import { breakpoints } from '../../constants/breakpoints'
import type { CirclesGrid as CirclesGridProps } from '../../@generated/cms/CirclesGrid'

const CirclesGrid = ({
  headingText,
  items,
  imageLoadingStrategy,
}: CirclesGridProps) => {
  const { device } = useDeviceInfo()

  const scrollToRef = useRef<HTMLDivElement>(null)

  const [isGridExpanded, setGridExpanded] = useState(false)

  useEffect(() => {
    setGridExpanded(device === 'mobile' || device === 'tablet')
  }, [])

  const handleExpandAndCollapse = () => {
    setGridExpanded((prevState) => !prevState)

    if (isGridExpanded && scrollToRef.current) {
      scrollToRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div
      className={styles.circlesGridWrapper}
      data-is-grid-expanded={isGridExpanded}
    >
      {headingText && (
        <div className={styles.headingWrapper} ref={scrollToRef}>
          <Heading level={2} uiStyle={8} allCaps bold divider>
            {headingText}
          </Heading>
        </div>
      )}

      <ul className={`list-reset ${styles.gridList}`}>
        {items.map((item) => {
          return (
            <li className={styles.gridListItem} key={item.text}>
              <div className={styles.gridListItemImageWrapper}>
                <Link href={item.url} className={styles.gridListItemImageLink}>
                  <Image
                    src={item.image.src}
                    alt={item.image.alt ?? ''}
                    width={115}
                    height={115}
                    placeholder="blur"
                    blurDataURL={item.image.src}
                    loading={imageLoadingStrategy}
                    sizes={`(max-width: ${breakpoints.phonelg}) 80px, (max-width: ${breakpoints.notebook}) 96px, 115px`}
                  />
                </Link>
              </div>

              <Link href={item.url} className={styles.gridListItemLink}>
                {item.text}
              </Link>
            </li>
          )
        })}
      </ul>

      <div className={styles.mobileCtaWrapper}>
        <Action
          as="button"
          color="neutralLight"
          onClick={handleExpandAndCollapse}
          size="small"
          type="button"
        >
          Show {isGridExpanded ? 'Less' : 'All'}
        </Action>
      </div>
    </div>
  )
}

export default CirclesGrid
