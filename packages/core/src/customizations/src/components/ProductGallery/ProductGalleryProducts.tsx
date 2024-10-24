import { Suspense, lazy } from 'react'
import { useSearch } from '@faststore/sdk'

import ProductGalleryPageSkeleton from './ProductGalleryPageSkeleton'
import Heading from '../Heading/Heading'
import styles from './ProductGalleryProducts.module.scss'
import type { TrustPilotStarsConfig } from '../../@generated/cms/CustomProductDetails'

const ProductGalleryPage = lazy(() => import('./ProductGalleryPage'))

type ProductGalleryProductsProductsProps = {
  totalCount: number
  hasProductsLoaded: boolean
  trustPilotPlpConfig: TrustPilotStarsConfig
  view?: string
}

const ProductGalleryProducts = ({
  totalCount,
  hasProductsLoaded,
  trustPilotPlpConfig,
  view,
}: ProductGalleryProductsProductsProps) => {
  const {
    itemsPerPage,
    state: { page: currentPage },
  } = useSearch()

  if (hasProductsLoaded && totalCount === 0) {
    return <div className={styles.noResultBox}>No Results</div>
  }

  return (
    <div className={styles.section}>
      <Heading level={2} uiStyle={2} className="visually-hidden">
        Products
      </Heading>

      {hasProductsLoaded ? (
        <Suspense
          fallback={
            <ProductGalleryPageSkeleton
              view={view}
              itemsPerPage={itemsPerPage}
              loading
            />
          }
        >
          <ProductGalleryPage
            key={`gallery-page-${currentPage}`}
            trustPilotPlpConfig={trustPilotPlpConfig}
            page={currentPage}
            itemsPerPage={itemsPerPage}
            view={view}
          />
        </Suspense>
      ) : (
        <ProductGalleryPageSkeleton
          view={view}
          itemsPerPage={itemsPerPage}
          loading
        />
      )}
    </div>
  )
}

export default ProductGalleryProducts
