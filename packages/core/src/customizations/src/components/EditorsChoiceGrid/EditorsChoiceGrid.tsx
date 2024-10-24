import Link from 'next/link'
import { useCallback, useMemo, useState } from 'react'
import type { MouseEvent } from 'react'

import FullArrowRightIcon from '../Icons/General/FullArrowRightIcon'
import Heading from '../Heading/Heading'
import Image from '../Image/Image'
import styles from './EditorsChoiceGrid.module.scss'
import type { EditorsChoiceGrid as EditorsChoiceGridProps } from '../../@generated/cms/EditorsChoiceGrid'

const EditorsChoiceGrid = ({
  cards,
  heading,
  yearButtons,
}: EditorsChoiceGridProps) => {
  const firstYear = yearButtons[0].text

  const [activeYear, setActiveYear] = useState(firstYear)

  const filteredItems = useMemo(() => {
    return cards.filter((item) => item.year === activeYear)
  }, [activeYear, cards])

  const handleYearButtonClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const year = event.currentTarget.dataset.year as string

      setActiveYear(year)
    },
    []
  )

  return (
    <div className={styles.outerWrapper}>
      <div className={styles.innerWrapper}>
        <div className={styles.headingWrapper}>
          <Heading level={2} uiStyle={8} allCaps divider>
            {heading}
          </Heading>
        </div>

        <div>
          <ul className={`list-reset ${styles.yearButtonRow}`}>
            {yearButtons.map((yearButton) => (
              <li key={yearButton.text}>
                <button
                  className={styles.yearButton}
                  aria-pressed={activeYear === yearButton.text}
                  data-is-active={activeYear === yearButton.text}
                  data-year={yearButton.text}
                  onClick={handleYearButtonClick}
                  type="button"
                >
                  {yearButton.text}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <ul className={`list-reset ${styles.cardGrid}`}>
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => {
                const {
                  linkText,
                  baseImage,
                  hoverImage,
                  icon,
                  heading: itemHeading,
                  link,
                } = item

                const linkTextArray = linkText.split(' ')
                const [year, ...rest] = linkTextArray
                const text = rest.join(' ')

                return (
                  <li
                    key={`${itemHeading}-${index}`}
                    className={styles.cardItem}
                  >
                    <Link href={link} className={styles.cardLink}>
                      <div className={styles.imagesWrapper}>
                        <Image
                          src={baseImage.src}
                          alt={baseImage.alt ?? ''}
                          height={375}
                          width={375}
                        />

                        <Image
                          src={hoverImage.src}
                          alt={hoverImage.alt ?? ''}
                          className={styles.hoverImage}
                          height={375}
                          width={375}
                        />

                        <div className={styles.gradientOverlay} />
                      </div>

                      <div className={styles.contentWrapper}>
                        <div className={styles.cardIconWrapper}>
                          <Image
                            src={icon.src}
                            alt={icon.alt ?? ''}
                            className={styles.cardIcon}
                            height={40}
                            width={40}
                          />
                        </div>

                        <Heading level={3} uiStyle={3}>
                          {itemHeading}
                        </Heading>

                        <p className={styles.linkText}>
                          <span>
                            <span className={styles.linkYearText}>{year}</span>{' '}
                            {text}
                          </span>

                          <span className={styles.arrowIconWrapper}>
                            <FullArrowRightIcon />
                          </span>
                        </p>
                      </div>
                    </Link>
                  </li>
                )
              })
            ) : (
              <li>
                <p>No items found</p>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default EditorsChoiceGrid
