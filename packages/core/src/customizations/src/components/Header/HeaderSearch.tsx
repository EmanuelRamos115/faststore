/* eslint-disable @typescript-eslint/require-await, @typescript-eslint/no-floating-promises */
import type { SearchEvent, SearchState } from '@faststore/sdk'
import { sendAnalyticsEvent } from '@faststore/sdk'
import type {
  SearchInputFieldProps as UISearchInputFieldProps,
  SearchInputFieldRef as UISearchInputFieldRef,
  SearchProviderContextValue,
} from '@faststore/ui'
import { SearchInput as UISearchInput } from '@faststore/ui'
import { useRouter } from 'next/router'
import type { CSSProperties } from 'react'
import {
  Suspense,
  forwardRef,
  lazy,
  useDeferredValue,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { formatSearchPath } from 'src/sdk/search/formatSearchPath'
import useSearchHistory from 'src/sdk/search/useSearchHistory'
import useSuggestions from 'src/sdk/search/useSuggestions'
import useOnClickOutside from 'src/sdk/ui/useOnClickOutside'

import HeaderSearchInputField from './HeaderSearchInputField'
import styles from './HeaderSearch.module.scss'

const SearchDropdown = lazy(
  () => import('src/components/search/SearchDropdown')
)

const MAX_SUGGESTIONS = 3

export type SearchInputProps = {
  id: string
  onSearchClick?: () => void
  buttonTestId?: string
  containerStyle?: CSSProperties
  sort?: SearchState['sort']
} & Omit<UISearchInputFieldProps, 'onSubmit'>

export type SearchInputRef = UISearchInputFieldRef & {
  resetSearchInput: () => void
}

const sendAnalytics = async (term: string) => {
  sendAnalyticsEvent<SearchEvent>({
    name: 'search',
    params: { search_term: term },
  })
}

const HeaderSearch = forwardRef<SearchInputRef, SearchInputProps>(
  function HeaderSearch(
    {
      id,
      onSearchClick,
      buttonTestId = 'fs-search-button',
      containerStyle,
      sort,
    },
    ref
  ) {
    const [searchQuery, setSearchQuery] = useState<string>('')
    const searchQueryDeferred = useDeferredValue(searchQuery)
    const [searchDropdownVisible, setSearchDropdownVisible] =
      useState<boolean>(false)

    const searchRef = useRef<HTMLDivElement>(null)
    const { addToSearchHistory } = useSearchHistory()
    const router = useRouter()

    useImperativeHandle(ref, () => ({
      resetSearchInput: () => setSearchQuery(''),
    }))

    const onSearchSelection: SearchProviderContextValue['onSearchSelection'] = (
      term,
      path
    ) => {
      addToSearchHistory({ term, path })
      sendAnalytics(term)
      setSearchDropdownVisible(false)
      setSearchQuery(term)
    }

    useOnClickOutside(searchRef, () => setSearchDropdownVisible(false))

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { data, error } = useSuggestions(searchQueryDeferred)
    const terms = (data?.search.suggestions.terms ?? []).slice(
      0,
      MAX_SUGGESTIONS
    )

    const products = (data?.search.suggestions.products ?? []).slice(
      0,
      MAX_SUGGESTIONS
    )

    const isLoading = !error && !data

    return (
      <div className={styles.search}>
        <UISearchInput
          ref={searchRef}
          visibleDropdown={searchDropdownVisible}
          onSearchSelection={onSearchSelection}
          term={searchQueryDeferred}
          terms={terms}
          products={products}
          isLoading={isLoading}
        >
          <HeaderSearchInputField
            id={id}
            ref={ref}
            buttonProps={{
              onClick: onSearchClick,
              testId: buttonTestId,
            }}
            onChange={(e) => setSearchQuery(e.target.value)}
            onSubmit={(term) => {
              const path = formatSearchPath({
                term,
                sort: sort as SearchState['sort'],
              })

              onSearchSelection(term, path)
              router.push(path)
            }}
            onFocus={() => setSearchDropdownVisible(true)}
            value={searchQuery}
          />

          {searchDropdownVisible && (
            <Suspense fallback={null}>
              <div className={styles.searchDropdown}>
                <SearchDropdown sort={sort ?? 'score_desc'} />
              </div>
            </Suspense>
          )}
        </UISearchInput>
      </div>
    )
  }
)

export default HeaderSearch
