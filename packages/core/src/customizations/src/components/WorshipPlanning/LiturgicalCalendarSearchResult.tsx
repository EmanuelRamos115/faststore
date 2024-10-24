/* eslint-disable @typescript-eslint/no-floating-promises */
import { useState } from 'react'
import { useRouter } from 'next/router'

import type { SearchResult } from '../../typings/props'
import ChevronRight from '../Icons/General/ChevronRight'
import Action from '../Action/Action'
import { slugify } from '../../utils/slugify'
import styles from './LiturgicalCalendarSearchResult.module.scss'

type LiturgicalCalendarSearchResultProps = {
  result: SearchResult
}

const LiturgicalCalendarSearchResult = ({
  result,
}: LiturgicalCalendarSearchResultProps) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen((prevState) => !prevState)
  }

  const handleSearch = (searchText: string) => {
    const selectedFacets = {
      key: '',
      value: '',
    }

    const chapter = searchText.split(':')[0]

    selectedFacets.key = 'Chapter'
    selectedFacets.value = chapter

    if (selectedFacets.key && selectedFacets.value) {
      router.push(
        `/liturgical-calendar-search-result?${slugify(selectedFacets.key)}=${slugify(selectedFacets.value)}`
      )
    }
  }

  return (
    <div className={styles.searchResultsListItem} data-is-open={isOpen}>
      <button
        className={styles.toggleButton}
        onClick={handleClick}
        type="button"
      >
        <span className={styles.chevron}>
          <ChevronRight />
        </span>{' '}
        <span className={styles.date}>{result.date}</span>{' '}
        <span>{result?.dateTitle}</span>
      </button>

      {result.readings && result.readings?.length > 0 && (
        <div className={styles.ulWrapper}>
          <p>Readings:</p>
          <ul className={`list-reset ${styles.list}`}>
            {result.readings.map((reading, index) => {
              return (
                <li key={`${reading}-${index}`} className={styles.listItem}>
                  <Action
                    type="button"
                    as="button"
                    color="neutralLight"
                    size="small"
                    onClick={() => handleSearch(reading)}
                  >
                    {reading}
                  </Action>
                </li>
              )
            })}
          </ul>
        </div>
      )}
      {result.altReadings && result.altReadings?.length > 0 && (
        <div className={styles.ulWrapper}>
          <p>Alternative Readings:</p>
          <ul className={`list-reset ${styles.list}`}>
            {result.altReadings?.map((altReading, index) => (
              <li key={`${altReading}-${index}`} className={styles.listItem}>
                <Action
                  type="button"
                  as="button"
                  color="neutralLight"
                  size="small"
                  onClick={() => handleSearch(altReading)}
                >
                  {altReading}
                </Action>
              </li>
            ))}
          </ul>
        </div>
      )}
      {result.holyDays && result.holyDays?.length > 0 && (
        <div className={styles.ulWrapper}>
          <p>Holy Readings:</p>
          <ul className={`list-reset ${styles.list}`}>
            {result.holyDays?.map((holyDay, index) => (
              <li key={`${holyDay}-${index}`} className={styles.listItem}>
                <Action
                  type="button"
                  as="button"
                  color="neutralLight"
                  size="small"
                  onClick={() => handleSearch(holyDay)}
                >
                  {holyDay}
                </Action>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default LiturgicalCalendarSearchResult
