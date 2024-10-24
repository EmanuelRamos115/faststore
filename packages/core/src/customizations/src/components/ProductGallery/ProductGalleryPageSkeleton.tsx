import type { PropsWithChildren } from 'react'
import classNames from 'classnames'
import ProductCardSkeleton from 'src/components/skeletons/ProductCardSkeleton'

import styles from './ProductGalleryPage.module.scss'

interface ProductGalleryPageSkeletonProps {
  loading?: boolean
  aspectRatio?: number
  itemsPerPage: number
  view?: string
}

function ProductGalleryPageSkeleton({
  children,
  aspectRatio,
  loading = true,
  itemsPerPage,
  view,
}: PropsWithChildren<ProductGalleryPageSkeletonProps>) {
  return loading ? (
    <div
      className={classNames(
        styles.container,
        view === 'list' ? styles.list : styles.grid
      )}
    >
      {Array.from({ length: itemsPerPage }, (_, index) => (
        <ProductCardSkeleton key={index} aspectRatio={aspectRatio} bordered />
      ))}
    </div>
  ) : (
    <>{children}</>
  )
}

export default ProductGalleryPageSkeleton
