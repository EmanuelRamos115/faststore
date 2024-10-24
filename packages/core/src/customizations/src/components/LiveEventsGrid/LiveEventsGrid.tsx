import Link from 'next/link'
import { useState } from 'react'
import type { ChangeEvent, MouseEvent } from 'react'

import ColorOverlay from '../ColorOverlay/ColorOverlay'
import Heading from '../Heading/Heading'
import Image from '../Image/Image'
import ShareButton from '../ShareButton/ShareButton'
import styles from './LiveEventsGrid.module.scss'
import type {
  Card,
  LiveEventsGrid as LiveEventsGridProps,
} from '../../@generated/cms/LiveEventsGrid'

const DESCRIPTION_CHARACTER_LIMIT = 275

const LiveEventsGrid = ({ cards }: LiveEventsGridProps) => {
  // default cards should be sorted by date (newest first)
  const defaultCards = cards.sort((a, b) => {
    const aStartDate = new Date(a.startDate).getTime()
    const bStartDate = new Date(b.startDate).getTime()

    return aStartDate - bStartDate
  })

  const [eventCards, setEventCards] = useState<Card[]>(defaultCards)
  const [selectedState, setSelectedState] = useState('')

  const handleDateChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target

    const sortedCards = [...eventCards].sort((a, b) => {
      const aStartDate = new Date(a.startDate).getTime()
      const bStartDate = new Date(b.startDate).getTime()

      return value === 'sort_newest'
        ? aStartDate - bStartDate
        : bStartDate - aStartDate
    })

    setEventCards(sortedCards)
  }

  const handleStateChange = (event: MouseEvent<HTMLButtonElement>) => {
    const { state } = event.currentTarget.dataset

    if (state) {
      const filteredCards = defaultCards.filter((card) => card.state === state)

      setSelectedState(state)
      setEventCards(filteredCards)
    } else {
      setEventCards(defaultCards)
    }
  }

  const handleResetStateSelection = () => {
    setSelectedState('')
    setEventCards(defaultCards)
  }

  // create a duplicate free list of states in alphabetical order
  const states = Array.from(new Set(cards.map((card) => card.state))).sort(
    (a, b) => a.localeCompare(b)
  )

  return (
    <section className={styles.wrapper}>
      <div className={styles.row}>
        <aside className={styles.statesFilter}>
          <div className={styles.statesFilterHeadingWrapper}>
            <Heading level={2} uiStyle={7}>
              State/Province
            </Heading>
          </div>

          <ul className={styles.statesFilterList}>
            <li>
              <button
                className={styles.statesFilterButton}
                onClick={handleResetStateSelection}
                type="button"
              >
                See All
              </button>
            </li>

            {states.map((state) => (
              <li key={state}>
                <button
                  className={styles.statesFilterButton}
                  data-is-selected={state === selectedState}
                  data-state={state}
                  onClick={handleStateChange}
                  type="button"
                >
                  {state}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className={styles.cardAndFilterWrapper}>
          <div className={styles.filterWrapper}>
            <label htmlFor="sort" className="visually-hidden">
              Sort by:
            </label>

            <select
              name="sort"
              id="sort"
              className={styles.filterSelect}
              onChange={handleDateChange}
            >
              <option value="sort_newest">Sort by: Date (Newest First)</option>
              <option value="sort_oldest">Sort by: Date (Oldest First)</option>
            </select>
          </div>

          <ul className={styles.cardGrid}>
            {eventCards.map((card) => (
              <li key={card.heading} className={styles.card}>
                <div className={styles.cardImageWrapper}>
                  <Link href={card.linkUrl}>
                    <Image
                      src={card.image.src}
                      alt={card.image.alt ?? ''}
                      width={500}
                      height={500}
                      sizes="(min-width: 1590px) calc((1590px - 25rem) / 2), (min-width: 1300px) calc((100vw - 25rem) / 2), (min-width: 900px) calc(100vw - 25rem), 100vw"
                      loading="eager"
                    />

                    <ColorOverlay color={card.colorOverlay} />
                  </Link>
                </div>

                <div className={styles.contentWrapper}>
                  <div className={styles.contentHeadingWrapper}>
                    <Link
                      href={card.linkUrl}
                      className={styles.cardHeadingLink}
                    >
                      <Heading level={3} uiStyle={6}>
                        {card.heading}
                      </Heading>
                    </Link>

                    <div className={styles.shareWrapper}>
                      <ShareButton
                        buttonText={card.heading}
                        toastMessage="Event link copied to your clipboard."
                        url={card.linkUrl}
                      />
                    </div>
                  </div>

                  <p className={styles.contentDate}>{card.date}</p>

                  <div className={styles.contentDivider} />

                  <p>
                    {card.description.length > DESCRIPTION_CHARACTER_LIMIT
                      ? `${card.description.substring(0, DESCRIPTION_CHARACTER_LIMIT)}...`
                      : card.description}
                  </p>

                  <Link href={card.linkUrl} className={styles.contentLink}>
                    {card.linkText}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default LiveEventsGrid
