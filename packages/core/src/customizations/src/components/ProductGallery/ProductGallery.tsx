import { useState, useEffect } from 'react'
import type { Filter_FacetsFragment } from '@generated/graphql'

import styles from './ProductGallery.module.scss'
import ProductGalleryHeader from './ProductGalleryHeader'
import ProductGalleryFilters from './ProductGalleryFilters'
import ProductGalleryBrowseControls from './ProductGalleryBrowseControls'
import ProductGalleryProducts from './ProductGalleryProducts'
import ProductGalleryPagination from './ProductGalleryPagination'
import DepartmentBannerIO from '../DepartmentBanner/DepartmentBannerIO'
import type { TrustPilotStarsConfig } from '../../@generated/cms/CustomProductDetails'

type ProductGalleryProps = {
  title?: string
  searchTerm?: string
  facets: Filter_FacetsFragment[]
  productInfo?: {
    pageInfo: {
      totalCount: number
    }
  }
  trustPilotPlpConfig: TrustPilotStarsConfig
  hideAppliedFacets?: boolean
}

const ProductGallery = ({
  title,
  searchTerm,
  facets,
  productInfo,
  trustPilotPlpConfig,
  hideAppliedFacets,
}: ProductGalleryProps) => {
  const [view, setView] = useState<string>()

  const hasProductsLoaded = Boolean(productInfo)
  const totalCount = productInfo?.pageInfo?.totalCount ?? 0

  useEffect(() => {
    const storedView = localStorage.getItem('view')

    storedView ? setView(storedView) : setView('grid')
  }, [])

  useEffect(() => {
    if (view) {
      localStorage.setItem('view', view)
    }
  }, [view])

  return (
    <section data-testid="product-gallery" className={styles.section}>
      <ProductGalleryHeader
        title={title}
        searchTerm={searchTerm}
        totalCount={totalCount}
      />

      <DepartmentBannerIO />

      <div className={styles.main}>
        <div className={styles.layout}>
          <aside className={styles.leftColumn}>
            <ProductGalleryFilters
              facets={facets}
              hasProductsLoaded={hasProductsLoaded}
              hideAppliedFacets={hideAppliedFacets}
            />
          </aside>

          <div className={styles.rightColumn}>
            <ProductGalleryBrowseControls
              view={view}
              setView={setView}
              facets={facets}
            />

            <ProductGalleryProducts
              view={view}
              totalCount={totalCount}
              trustPilotPlpConfig={trustPilotPlpConfig}
              hasProductsLoaded={hasProductsLoaded}
            />

            <ProductGalleryPagination totalCount={totalCount} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductGallery
