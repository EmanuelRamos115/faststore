import { useMemo } from 'react'
import { useRouter } from 'next/router'
import type {
  ClientManyProductsQueryQueryVariables,
  IStoreSelectedFacet,
} from '@generated/graphql'
import type { SearchState } from '@faststore/sdk'
import {
  useSearch,
  SearchProvider,
  parseSearchState,
  formatSearchState,
} from '@faststore/sdk'
import {
  useProductGalleryQuery_unstable as useProductGalleryQuery,
  useDelayedFacets_unstable as useDelayedFacets,
} from '@faststore/core/experimental'
import { useApplySearchState } from 'src/sdk/search/state'

import ProductGallery from '../ProductGallery/ProductGallery'
import { ITEMS_PER_PAGE } from '../../constants/global'
import type { TrustPilotStarsConfig } from '../../@generated/cms/CustomProductDetails'

type UseSearchParams = {
  selectedFacets: IStoreSelectedFacet[]
  term: string
  sort: SearchState['sort']
}

// useSearchParams() was copied from '.faststore/src/components/templates/ProductListingPage/ProductListingPage.tsx
const useSearchParams = ({
  selectedFacets,
  term,
  sort,
}: UseSearchParams): SearchState => {
  const { asPath } = useRouter()

  const hrefState = useMemo(() => {
    const url = new URL(asPath, 'http://localhost')

    const shouldUpdateDefaultSort = sort && !url.searchParams.has('sort')

    if (shouldUpdateDefaultSort) {
      url.searchParams.set('sort', sort)
    }

    const shouldUpdateDefaultTerm = term && !url.searchParams.has('q')

    if (shouldUpdateDefaultTerm) {
      url.searchParams.set('q', term)
    }

    const newState = parseSearchState(url)

    // In case we are in an incomplete url
    if (newState.selectedFacets.length === 0) {
      newState.selectedFacets = selectedFacets
    }

    return formatSearchState(newState).href
  }, [asPath, selectedFacets, sort, term])

  return useMemo(() => parseSearchState(new URL(hrefState)), [hrefState])
}

type CustomProductGalleryWithRulesProps = {
  trustPilotPlpConfig: TrustPilotStarsConfig
  heading: string
  productQuery: Partial<ClientManyProductsQueryQueryVariables> & {
    selectedFacets: IStoreSelectedFacet[]
  }
  hideAppliedFacets?: boolean
}

const ContentProvider = ({
  trustPilotPlpConfig,
  heading,
  productQuery,
  hideAppliedFacets,
}: CustomProductGalleryWithRulesProps) => {
  if (!productQuery) {
    return null
  }

  const {
    state: { sort, term, selectedFacets },
  } = useSearch()

  const context = useProductGalleryQuery({
    term,
    sort,
    selectedFacets,
    itemsPerPage: ITEMS_PER_PAGE,
  })

  const productInfo = context?.data?.search?.products
  const facets = useDelayedFacets(context?.data) ?? []

  return (
    <ProductGallery
      trustPilotPlpConfig={trustPilotPlpConfig}
      title={heading}
      facets={facets}
      productInfo={productInfo}
      hideAppliedFacets={hideAppliedFacets}
    />
  )
}

const CustomProductGalleryWithRules = ({
  trustPilotPlpConfig,
  heading,
  productQuery,
  hideAppliedFacets,
}: CustomProductGalleryWithRulesProps) => {
  const applySearchState = useApplySearchState()

  const searchParams = useSearchParams({
    selectedFacets: productQuery.selectedFacets,
    term: productQuery.term,
    sort: productQuery.sort as SearchState['sort'],
  })

  return (
    <SearchProvider
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onChange={applySearchState}
      itemsPerPage={ITEMS_PER_PAGE}
      {...searchParams}
    >
      <ContentProvider
        trustPilotPlpConfig={trustPilotPlpConfig}
        heading={heading}
        productQuery={productQuery}
        hideAppliedFacets={hideAppliedFacets}
      />
    </SearchProvider>
  )
}

export default CustomProductGalleryWithRules
