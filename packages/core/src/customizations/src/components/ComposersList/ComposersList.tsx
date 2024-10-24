import Link from 'next/link'
import { Icon, Loader } from '@faststore/ui'
import useSWRInfinite from 'swr/infinite'
import { useRouter } from 'next/router'
import classNames from 'classnames'

import ComposersListPage from './ComposersListPage'
import Heading from '../Heading/Heading'
import styles from './ComposersList.module.scss'
import type { ComposersList as ComposersListProps } from '../../@generated/cms/ComposersList'
import {
  type AllComposersResponse,
  fetchComposers,
  type ComposersListParams,
} from '../../api/jwp/myScore/allComposers'

const PER_PAGE = 10

type QueryParams = ReturnType<typeof useRouter>['query']

export const routes = {
  byLetter: (currentPath: string, letter: string) =>
    `${currentPath}?lastNameFirstLetter=${letter}`,
  search: (currentPath: string, term: string) =>
    `${currentPath}?search=${term}`,
  page: (currentPath: string, query: QueryParams, page: number) => {
    const newQuery = { ...query, page: page.toString() }

    const params = new URLSearchParams(
      Object.entries(newQuery).filter(([, value]) => !!value)
    )

    return `${currentPath}?${params.toString()}`
  },
  composer: (slug: string) => `/myscore/${slug}`,
}

const ComposersList = ({ endpoint }: ComposersListProps) => {
  const router = useRouter()
  const { query, asPath, isReady } = router

  const [currentPath] = asPath.split('?')
  const currentPage = query.page ? parseInt(query.page.toString(), 10) : 1

  const { data, error, isLoading, size, setSize } = useSWRInfinite<
    AllComposersResponse,
    Error,
    (index: number) => false | [string, ComposersListParams]
  >(
    (index) =>
      isReady && [
        endpoint,
        {
          limit: PER_PAGE,
          offset: index * PER_PAGE,
          lastNameFirstLetter: query.lastNameFirstLetter?.toString(),
          search: query.search?.toString(),
        },
      ],
    async ([url, params]) => fetchComposers(url, params),
    { initialSize: currentPage }
  )

  if (error) {
    console.error(error)
  }

  const handlePageLoad = async () => {
    await router.replace(
      routes.page(
        currentPath,
        {
          search: query.search,
          lastNameFirstLetter: query.lastNameFirstLetter,
        },
        size + 1
      ),
      undefined,
      {
        scroll: false,
      }
    )

    setSize((s) => s + 1).catch((err) => console.error(err))
  }

  return (
    <div className={styles.section}>
      <section className={styles.search}>
        <div className={styles.container}>
          <Heading level={1} uiStyle={2} className={styles.heading}>
            My Score Composers
          </Heading>

          <form
            className={styles.searchForm}
            onSubmit={(e) => {
              const form = new FormData(e.currentTarget)

              const term = form.get('search')

              if (typeof term !== 'string') {
                throw new Error('Bad search input')
              }

              const path =
                term === '' ? currentPath : routes.search(currentPath, term)

              void router.push(path)

              e.preventDefault()
            }}
          >
            <label
              className={styles.searchLabel}
              htmlFor="searchByName"
              aria-label="Search Composers by Keyword"
            >
              <Icon name="MagnifyingGlass" />
            </label>

            <input
              className={styles.searchInput}
              id="searchByName"
              type="text"
              name="search"
              placeholder="Search Composers by Keyword"
              defaultValue={query.search}
            />

            <button className={styles.searchButton} type="submit">
              Search
            </button>
          </form>

          <div className={styles.divider} />

          <nav>
            <ul className={`list-reset ${styles.letterNav}`}>
              {Array.from({ length: 26 }, (_, i) =>
                String.fromCharCode(65 + i)
              ).map((letter) => (
                <li>
                  <Link
                    className={classNames(styles.letterLink, {
                      [styles.letterLinkActive]:
                        query.lastNameFirstLetter === letter,
                    })}
                    key={letter}
                    href={routes.byLetter(currentPath, letter)}
                    scroll={false}
                  >
                    {letter}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <section className={styles.searchResults}>
        <div className={styles.container}>
          {data?.map((page, i) => (
            <ComposersListPage
              key={`page${i}`}
              page={page}
              handlePageLoad={handlePageLoad}
              isCurrentPage={data.length === i + 1}
            />
          ))}

          {(isLoading || !isReady) && (
            <div className={styles.loading}>
              <Loader />
            </div>
          )}

          {data && data[0].composers?.length === 0 && (
            <div className={styles.error}>No composers found.</div>
          )}

          {error && <div className={styles.error}>Error loading composers</div>}
        </div>
      </section>
    </div>
  )
}

export default ComposersList
