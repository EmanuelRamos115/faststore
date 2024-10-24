import { useEffect, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { useQuery } from 'src/sdk/graphql/useQuery'
import { gql } from '@generated/gql'

import type { SearchResult } from '../../typings/props'
import Image from '../Image/Image'
import Action from '../Action/Action'
import Heading from '../Heading/Heading'
import LiturgicalCalendarSearchResult from './LiturgicalCalendarSearchResult'
import { colors } from '../../constants/colors'
import type { FastStoreImage } from '../../typings/faststore'
import { breakpoints } from '../../constants/breakpoints'
import styles from './LiturgicalAndScriptureShared.module.scss'

const GET_LITCAL_ITEMS = gql(`
  query getLitCalItems {
    liturgicalCalendar {
      season
      year
      date
      dateTitle
      title
      type
      calendar
    }
  }
`)

type LitCalItem = {
  season: string
  year: string
  date: string
  title: string
  type: string
  calendar: string
  dateTitle: string
}

type LitCalQuery = {
  liturgicalCalendar: LitCalItem[]
}

type LiturgicalCalendarSearchProps = {
  headingText: string
  image: FastStoreImage
}

const LiturgicalCalendarSearch = ({
  headingText,
  image,
}: LiturgicalCalendarSearchProps) => {
  const { data } = useQuery<LitCalQuery>(GET_LITCAL_ITEMS, {})

  const [calendarValues, setCalendarValues] = useState<string[]>([])
  const [selectedCalendar, setSelectedCalendar] = useState('')

  const [yearValues, setYearValues] = useState<string[]>([])
  const [selectedYear, setSelectedYear] = useState('')

  const [seasonValues, setSeasonValues] = useState<string[]>([])
  const [selectedSeason, setSelectedSeason] = useState('')
  const [searchedYear, setSearchedYear] = useState('')

  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [didPerformSearch, setDidPerformSearch] = useState(false)

  useEffect(() => {
    const allCalendars: string[] = data?.liturgicalCalendar.map(
      (lit: LitCalItem) => lit.calendar
    )

    const uniqueCalendars = Array.from(new Set(allCalendars))

    setCalendarValues(uniqueCalendars)

    const allYears: string[] = data?.liturgicalCalendar.map(
      (lit: LitCalItem) => lit.year
    )

    const uniqueYears = Array.from(new Set(allYears))

    const sortedYears = [...uniqueYears]

    sortedYears.sort((a, b) => {
      const [aYear] = a.split(' ')
      const [bYear] = b.split(' ')

      return parseInt(bYear, 10) - parseInt(aYear, 10)
    })
    setYearValues(sortedYears)
  }, [data])

  const handleCalendarSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target

    setSelectedCalendar(value)

    const filteredReadings = data?.liturgicalCalendar.filter(
      (lit: LitCalItem) => {
        return lit.calendar === value
      }
    )

    const seasons: string[] = filteredReadings.map(
      (reading: LitCalItem) => reading.season
    )

    const uniqueSeasons = Array.from(new Set(seasons))

    uniqueSeasons.sort((a, b) => a.localeCompare(b))
    setSeasonValues(uniqueSeasons)
  }

  const handleYearSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value)
  }

  const handleSeasonSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSeason(event.target.value)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const filteredReadings = data?.liturgicalCalendar.filter(
      (lit: LitCalItem) => {
        return (
          lit.year === selectedYear &&
          lit.season === selectedSeason &&
          lit.calendar === selectedCalendar
        )
      }
    )

    const groupedDates: { [date: string]: LitCalItem[] } = {}

    filteredReadings.forEach((reading: LitCalItem) => {
      if (!groupedDates[reading.date]) {
        groupedDates[reading.date] = []
      }

      groupedDates[reading.date].push(reading)
    })

    const results = Object.keys(groupedDates).map((date) => ({
      date,
      dateTitle: groupedDates[date][0].dateTitle,
      readings: groupedDates[date]
        .filter((item) => item.type === 'Readings')
        .map((item) => item.title),
      altReadings: groupedDates[date]
        .filter((item) => item.type === 'Alt Readings')
        .map((item) => item.title),
      holyDays: groupedDates[date]
        .filter((item) => item.type === 'Holy Readings')
        .map((item) => item.title),
    }))

    if (results.length) {
      setSearchResults(results)
    } else {
      setSearchResults([])
    }

    setDidPerformSearch(true)
    setSearchedYear(selectedYear)
  }

  return (
    <div className={styles.liturgicalCalendarSearchWrapper}>
      <div className={styles.headerWrapper}>
        <div className={styles.imageWrapper}>
          <Image
            src={image.src}
            alt={image.alt}
            width={80}
            height={80}
            sizes={`(max-width: ${breakpoints.notebook}) 56px, 80px`}
          />
        </div>

        <Heading level={2} uiStyle={5}>
          {headingText}
        </Heading>
      </div>

      <div className={styles.inputsWrapper}>
        <form
          id="liturgical_calendar_search"
          className={styles.inputsForm}
          onSubmit={handleSubmit}
        >
          {/* CALENDAR GROUP */}
          <div className={styles.inputGroup}>
            <label htmlFor="calendar_select" className={styles.inputLabel}>
              Calendar
            </label>

            <select
              name="calendar_select"
              id="calendar_select"
              onChange={handleCalendarSelect}
              defaultValue={selectedCalendar}
            >
              <option value="">Select a Liturgical Calendar</option>

              {calendarValues.map((calendarText) => {
                return (
                  <option key={calendarText} value={calendarText}>
                    {calendarText}
                  </option>
                )
              })}
            </select>
          </div>

          {/* YEAR GROUP */}
          <div className={styles.inputGroup}>
            <label htmlFor="year_select" className={styles.inputLabel}>
              Year
            </label>

            <select
              name="year_select"
              id="year_select"
              onChange={handleYearSelect}
              defaultValue={selectedYear}
            >
              <option value="">Select a Year</option>

              {yearValues.map((year) => {
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                )
              })}
            </select>
          </div>

          {/* SEASON GROUP */}
          <div className={styles.inputGroup}>
            <label htmlFor="season_select" className={styles.inputLabel}>
              Season
            </label>

            <select
              name="season_select"
              id="season_select"
              onChange={handleSeasonSelect}
              defaultValue={selectedSeason}
            >
              <option value="">Select a Season</option>

              {seasonValues.map((season, index) => {
                return (
                  <option key={`${season}-${index}`} value={season}>
                    {season}
                  </option>
                )
              })}
            </select>
          </div>

          <Action
            as="button"
            color={colors.maroon.token}
            size="large"
            type="submit"
            disabled={
              !(!!selectedCalendar && !!selectedYear && !!selectedSeason)
            }
          >
            Search
          </Action>
        </form>
      </div>

      {/* DISPLAY SEARCH RESULTS */}
      {searchResults.length && didPerformSearch ? (
        <div className={styles.searchResultsWrapper}>
          <p className={styles.searchResultsText}>
            Search Results:
            <br />
            <span>{searchedYear} Season</span>
          </p>

          <ul className={`list-reset ${styles.searchResultsList}`}>
            {searchResults.map((result) => {
              return (
                <LiturgicalCalendarSearchResult
                  key={result.date}
                  result={result}
                />
              )
            })}
          </ul>
        </div>
      ) : null}

      {/* DISPLAY NO RESULTS FOUND */}
      {!searchResults.length && didPerformSearch ? (
        <div className={styles.searchResultsWrapper}>
          <p className={styles.searchResultsText}>
            Search Results:
            <br />
            <span>{selectedYear} Season</span>
          </p>

          <p className={styles.searchResultsNoResultsText}>No results found.</p>
        </div>
      ) : null}
    </div>
  )
}

export default LiturgicalCalendarSearch
