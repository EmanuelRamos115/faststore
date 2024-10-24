import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { SearchProvider } from '@faststore/sdk'
import { useProductsQuery } from '@faststore/core'
import classNames from 'classnames'
import type { NextParsedUrlQuery } from 'next/dist/server/request-meta'
import type {
  StoreSort,
  IStoreSelectedFacet,
  GetCollectionNameQuery,
} from '@generated/graphql'
import { gql } from '@generated/gql'
import { useQuery } from 'src/sdk/graphql/useQuery'
import { storeUrl } from 'src/customizations/faststore.config'

import styles from '../ProductGallery/ProductGallery.module.scss'
import stylesPage from '../ProductGallery/ProductGalleryPage.module.scss'
import ProductGalleryPageSkeleton from '../ProductGallery/ProductGalleryPageSkeleton'
import ProductSummaryCard from '../ProductSummaryCard/ProductSummaryCard'
import ProductGalleryFilters from '../ProductGallery/ProductGalleryFilters'
import BreadcrumbManualEntry from '../BreadcrumbManualEntry/BreadcrumbManualEntry'
import { useUpdateClusterPageState } from '../../hooks/useUpdateClusterGalleryState'
import { ITEMS_PER_PAGE } from '../../constants/global'
import ProductGalleryPagination from '../ProductGallery/ProductGalleryPagination'
import ProductGalleryBrowseControls from '../ProductGallery/ProductGalleryBrowseControls'
import ProductGalleryHeader from '../ProductGallery/ProductGalleryHeader'

export function transformQueryToOutput(query: NextParsedUrlQuery) {
  const selectedFacets: Array<{ key: string; value: string }> = []

  for (const key in query) {
    if (
      Object.prototype.hasOwnProperty.call(query, key) &&
      key !== 'slug' &&
      key !== 'sort' &&
      key !== 'page' &&
      key !== 'facets' &&
      key !== 'collectionId' &&
      key !== 'collectionName' &&
      key !== 'q' &&
      key !== 'productClusterIds'
    ) {
      const value = query[key]

      if (Array.isArray(value)) {
        value.forEach((val: string) => {
          selectedFacets.push({ key, value: val })
        })
      } else if (typeof value === 'string') {
        selectedFacets.push({ key, value })
      }
    }
  }

  const base = Array.isArray(query.slug) ? `/${query.slug.join('/')}` : ''

  const page = parseInt(query.page as string, 10) || 0

  return {
    sort: (query.sort ? query.sort.toString() : 'score_desc') as StoreSort,
    selectedFacets: selectedFacets as IStoreSelectedFacet[],
    term: '',
    base,
    first: ITEMS_PER_PAGE,
    after: `${page * ITEMS_PER_PAGE}`,
    page,
  }
}

const mockSearchParams = {
  sort: 'score_desc' as StoreSort,
  selectedFacets: [] as IStoreSelectedFacet[],
  term: undefined as string | undefined,
  base: '/',
  page: 0,
  first: ITEMS_PER_PAGE,
  after: '0',
}

const GET_COLLECTION_NAME = gql(`
  query getCollectionName($collectionId: String!){
    getCollectionName(collectionId: $collectionId) {
      Name
    }
  }
`)

const ClusterGallery = () => {
  const updateClusterPageState = useUpdateClusterPageState()
  const { query } = useRouter()
  const { collectionId, collectionName } = query

  const transformedQuery = transformQueryToOutput(query)
  const searchParams = {
    ...(transformedQuery ?? mockSearchParams),
    selectedFacets: [
      { key: 'productClusterIds', value: collectionId },
      ...(transformedQuery.selectedFacets ?? mockSearchParams.selectedFacets),
    ] as IStoreSelectedFacet[],
  }

  const collectionData = useQuery<GetCollectionNameQuery>(GET_COLLECTION_NAME, {
    collectionId,
  })

  const collectionRealName = collectionData.data?.getCollectionName?.Name
  const isTheCollectionName =
    collectionRealName?.replace(/\s+/g, '-').toLowerCase() === collectionName

  const data = useProductsQuery(searchParams, {
    doNotRun: !collectionId || !isTheCollectionName,
  })

  const products = data?.search?.products?.edges ?? []
  const totalCount = data?.search.products.pageInfo.totalCount ?? 0

  if (collectionRealName && collectionName && !isTheCollectionName) {
    throw new Error('page not found')
  }

  if (!collectionId || !collectionName || !collectionRealName) {
    return (
      <ProductGalleryPageSkeleton
        itemsPerPage={ITEMS_PER_PAGE}
        view={'list'}
        loading={products.length === 0}
      ></ProductGalleryPageSkeleton>
    )
  }

  const id: string = Array.isArray(collectionId)
    ? collectionId.join('')
    : collectionId ?? ''

  const canonicalUrl = `${storeUrl}/collection/${id}/${collectionRealName}`

  return (
    <SearchProvider
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onChange={updateClusterPageState}
      itemsPerPage={ITEMS_PER_PAGE}
      passThrough={new URLSearchParams({})}
      {...searchParams}
    >
      <NextSeo
        title={collectionRealName}
        titleTemplate={collectionRealName}
        canonical={canonicalUrl}
        openGraph={{
          type: 'website',
          url: canonicalUrl,
          title: collectionRealName,
        }}
      />
      <section className={styles.section}>
        <NextSeo title={collectionRealName} />
        <BreadcrumbManualEntry
          links={[
            {
              name: collectionRealName,
              item: `/collection/${id}`,
            },
          ]}
          showHomeLink={true}
        />
        <ProductGalleryHeader
          title={collectionRealName}
          totalCount={totalCount}
        />
        <div className={styles.main}>
          <div className={styles.layout}>
            <aside className={styles.leftColumn}>
              <ProductGalleryFilters
                facets={data?.search.facets ?? []}
                hasProductsLoaded={data !== undefined}
              />
            </aside>

            <div className={styles.rightColumn}>
              <ProductGalleryBrowseControls
                facets={data?.search.facets ?? []}
              />

              <ProductGalleryPageSkeleton
                itemsPerPage={ITEMS_PER_PAGE}
                view={'list'}
                loading={products.length === 0}
              >
                <ul
                  className={classNames(
                    'list-reset',
                    stylesPage.container,
                    stylesPage.list
                  )}
                >
                  {products.map(({ node: product }, idx: number) => (
                    <li key={product.id}>
                      <ProductSummaryCard
                        product={product}
                        trustPilotPlpConfig={{}}
                        index={5 * 1 + idx + 1}
                        isClusterPage={true}
                      />
                    </li>
                  ))}
                </ul>
              </ProductGalleryPageSkeleton>

              <ProductGalleryPagination totalCount={totalCount} />
            </div>
          </div>
        </div>
      </section>
    </SearchProvider>
  )
}

export default ClusterGallery
