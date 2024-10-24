import { Suspense } from 'react'
import type { Filter_FacetsFragment } from '@generated/graphql'
import { useUI } from '@faststore/ui'
import { useFilter_unstable as useFilter } from '@faststore/core/experimental'
import FilterSkeleton from 'src/components/skeletons/FilterSkeleton'

import ProductGalleryFiltersDesktop from './ProductGalleryFiltersDesktop'
import ProductGalleryFiltersDrawer from './ProductGalleryFiltersDrawer'

type ProductGalleryFiltersProps = {
  facets: Filter_FacetsFragment[]
  hasProductsLoaded: boolean
  hideAppliedFacets?: boolean
}

const ProductGalleryFilters = ({
  facets,
  hasProductsLoaded,
  hideAppliedFacets,
}: ProductGalleryFiltersProps) => {
  const filter = useFilter(facets)
  const { filter: displayFilter } = useUI()

  return (
    <FilterSkeleton loading={!hasProductsLoaded}>
      {facets?.length > 0 && (
        <>
          <div className="hidden-mobile">
            <ProductGalleryFiltersDesktop
              hideAppliedFacets={hideAppliedFacets}
              {...filter}
            />
          </div>

          {displayFilter && (
            <Suspense fallback={null}>
              <ProductGalleryFiltersDrawer
                hideAppliedFacets={hideAppliedFacets}
                {...filter}
              />
            </Suspense>
          )}
        </>
      )}
    </FilterSkeleton>
  )
}

export default ProductGalleryFilters
