import { memo } from 'react'
import classNames from 'classnames'
import { useCreateUseGalleryPage } from 'src/sdk/product/usePageProductsQuery'

import styles from './ProductGalleryPage.module.scss'
import ProductCard from '../ProductCard/ProductCard'
import ProductSummaryCard from '../ProductSummaryCard/ProductSummaryCard'
import ProductGalleryPageSkeleton from './ProductGalleryPageSkeleton'
import type { TrustPilotStarsConfig } from '../../@generated/cms/CustomProductDetails'

type ProductGalleryPageProps = {
  page: number
  trustPilotPlpConfig: TrustPilotStarsConfig
  itemsPerPage: number
  view?: string
}

function ProductGalleryPage({
  page,
  itemsPerPage,
  trustPilotPlpConfig,
  view,
}: ProductGalleryPageProps) {
  const { useGalleryPage } = useCreateUseGalleryPage()
  const { data } = useGalleryPage(page)
  const products = data?.search?.products?.edges ?? []

  return (
    <>
      <ProductGalleryPageSkeleton
        itemsPerPage={itemsPerPage}
        view={view}
        loading={products.length === 0}
      >
        <ul
          className={classNames(
            'list-reset',
            styles.container,
            view === 'list' ? styles.list : styles.grid
          )}
        >
          {products.map(({ node: product }, idx: number) => (
            <li key={product.id}>
              {view === 'list' ? (
                <ProductSummaryCard
                  product={product}
                  trustPilotPlpConfig={trustPilotPlpConfig}
                  index={itemsPerPage * page + idx + 1}
                />
              ) : (
                <ProductCard
                  product={product}
                  trustPilotPlpConfig={trustPilotPlpConfig}
                  index={itemsPerPage * page + idx + 1}
                />
              )}
            </li>
          ))}
        </ul>
      </ProductGalleryPageSkeleton>
    </>
  )
}

export default memo(ProductGalleryPage)
