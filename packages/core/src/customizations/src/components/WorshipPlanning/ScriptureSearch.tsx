/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useState, useEffect, type FormEvent } from 'react'
import { useLazyQuery } from 'src/sdk/graphql/useLazyQuery'
import type { IStoreSelectedFacet } from '@generated/graphql'
import { gql } from '@generated/gql'
import { useRouter } from 'next/router'

import { slugify } from '../../utils/slugify'
import { DEFAULT_BOOKS, DISABLED_BOOKS } from '../../constants/books'
import type { ScriptureSearch as ScriptureSearchProps } from '../../@generated/cms/ScriptureSearch'
import Image from '../Image/Image'
import Action from '../Action/Action'
import Heading from '../Heading/Heading'
import { colors } from '../../constants/colors'
import { breakpoints } from '../../constants/breakpoints'
import styles from './LiturgicalAndScriptureShared.module.scss'

type FacetValues = {
  label: string
  value: string
  quantity: string
}

type Facets = {
  key: string
  label: string
  values: FacetValues[]
}

type Search = {
  facets: Facets[]
}

type FacetQueryResponse = {
  search: Search
}

const getFacetsQuery = gql(`
  query getFacets($selectedFacets: [IStoreSelectedFacet!]) {
    search(first: 1, selectedFacets: $selectedFacets) {
      facets {
        ... on StoreFacetBoolean {
          key
          label
          values {
            label
            value
            selected
            quantity
          }
        }
      }
    }
  }
`)

const ScriptureSearch = ({
  headingText,
  image,
  imageLoadingStrategy,
}: ScriptureSearchProps) => {
  const [selectedBook, setSelectedBook] = useState<string>()
  const [selectedChapter, setSelectedChapter] = useState<string>()
  const [selectedVerse, setSelectedVerse] = useState<string>()

  const [chapters, setChapters] = useState<FacetValues[]>([])
  const [verseRanges, setVerseRanges] = useState<FacetValues[]>([])
  const [buttonLoading, setButtonLoading] = useState(false)

  const router = useRouter()

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!selectedChapter && !selectedVerse) {
      return
    }

    setButtonLoading(true)

    const selectedFacets = []

    if (selectedVerse) {
      selectedFacets.push({
        key: 'Verse Range',
        value: selectedVerse,
      })
    } else if (selectedChapter) {
      selectedFacets.push({
        key: 'Chapter',
        value: selectedChapter,
      })
    }

    const formattedSelectedFacets = selectedFacets?.map(
      (facet: IStoreSelectedFacet) => ({
        key: slugify(facet.key),
        value: slugify(facet.value),
      })
    )

    if (formattedSelectedFacets.length > 0) {
      router.push(
        `/scripture-search-result?${formattedSelectedFacets[0].key}=${formattedSelectedFacets[0].value}`
      )
    }
  }

  const [searchFacets, { data }] = useLazyQuery<FacetQueryResponse>(
    getFacetsQuery,
    {}
  )

  const handleBookChange = (value: string) => {
    setSelectedBook(value)
    searchFacets({
      selectedFacets: {
        key: 'Book',
        value,
      },
    })
  }

  const sortChapter = (a: FacetValues, b: FacetValues): number => {
    if (!selectedBook) {
      return 1
    }

    const aChapter = Number(a.label.replace(selectedBook, '').trim())
    const bChapter = Number(b.label.replace(selectedBook, '').trim())

    return aChapter - bChapter
  }

  useEffect(() => {
    setSelectedChapter(undefined)
    sessionStorage.removeItem('selectedFacets')

    if (!data?.search?.facets?.length || !selectedBook) {
      setChapters([])

      return
    }

    const filteredChapters =
      data.search.facets
        .find((facet) => facet.key === 'chapter')
        ?.values.filter((chapter) => chapter.label.includes(selectedBook))
        ?.sort(sortChapter) ?? []

    setChapters(filteredChapters)
  }, [data?.search?.facets?.length, selectedBook])

  const sortVerseRange = (a: FacetValues, b: FacetValues): number => {
    if (!selectedChapter) {
      return -1
    }

    const getRange = (label: string): number[] => {
      return label
        .replace(`${selectedChapter}:`, '')
        .split('-')
        .map((range) => Number(range))
    }

    const aRange = getRange(a.label)
    const bRange = getRange(b.label)

    if (aRange[0] === bRange[0]) {
      return (aRange[1] ?? 0) - (bRange[1] ?? 0)
    }

    return aRange[0] - bRange[0]
  }

  useEffect(() => {
    setSelectedVerse(undefined)

    if (!data?.search?.facets?.length || !selectedChapter) {
      setVerseRanges([])

      return
    }

    const filteredVerseRanges =
      data.search.facets
        .find((facet) => facet.key === 'verse-range')
        ?.values.filter((verseRange) =>
          verseRange.label.includes(`${selectedChapter}:`)
        )
        ?.sort(sortVerseRange) ?? []

    setVerseRanges(filteredVerseRanges)
  }, [data?.search?.facets?.length, selectedChapter])

  return (
    <div className={styles.scriptureSearchWrapper}>
      <div className={styles.headerWrapper}>
        <div className={styles.imageWrapper}>
          <Image
            src={image.src}
            alt={image.alt ?? ''}
            width={80}
            height={80}
            sizes={`(max-width: ${breakpoints.notebook}) 56px, 80px`}
            loading={imageLoadingStrategy}
          />
        </div>

        <Heading level={2} uiStyle={5}>
          {headingText}
        </Heading>
      </div>

      <div className={styles.inputsWrapper}>
        <form onSubmit={handleSearch} className={styles.inputsForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="scripture_select" className={styles.inputLabel}>
              Book
            </label>

            <select
              name="scripture_select"
              id="scripture_select"
              onChange={(e) => handleBookChange(e.target.value)}
            >
              <option value="">Select a Book</option>
              {DEFAULT_BOOKS.map((book) => {
                return (
                  <option
                    key={book}
                    value={book}
                    disabled={DISABLED_BOOKS.includes(book)}
                  >
                    {book}
                  </option>
                )
              })}
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="chapter_select" className={styles.inputLabel}>
              Chapter
            </label>

            <select
              name="chapter_select"
              id="chapter_select"
              onChange={(e) => setSelectedChapter(e.target.value)}
            >
              <option value="">Select a Chapter</option>
              {chapters.map((chapter) => {
                return (
                  <option key={chapter.value} value={chapter.label}>
                    {chapter.label}
                  </option>
                )
              })}
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="verse_select" className={styles.inputLabel}>
              Verse Range
            </label>

            <select
              name="verse_select"
              id="verse_select"
              onChange={(e) => setSelectedVerse(e.target.value)}
            >
              <option value="">Select a Verse Range</option>
              {verseRanges.map((verse) => {
                return (
                  <option key={verse.value} value={verse.label}>
                    {verse.label}
                  </option>
                )
              })}
            </select>
          </div>

          <Action
            type="submit"
            as="button"
            color={colors.maroon.token}
            size="large"
            disabled={!(!!selectedBook && !!selectedChapter)}
          >
            {buttonLoading ? 'Loading...' : 'Search'}
          </Action>
        </form>
      </div>
    </div>
  )
}

export default ScriptureSearch
