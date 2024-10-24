import type { StoreSort, IStoreSelectedFacet } from '@generated/graphql'
import { usePDP, useProductsQuery } from '@faststore/core'

import type { ProductListCrossSell as ProductListCrossSellProps } from '../../@generated/cms/ProductListCrossSell'
import ProductListUI from '../ProductList/ProductListUI'
import { removeCurrentProduct } from '../../utils/productData'

const ProductListCrossSell = ({
  numberOfItems,
  heading,
  kind,
}: ProductListCrossSellProps) => {
  const context = usePDP()
  const productGroupID =
    context?.data?.product?.isVariantOf?.productGroupID ?? ''

  const productBreadcrumbs =
    context?.data?.product?.breadcrumbList?.itemListElement ?? []

  const productCategory = productBreadcrumbs[productBreadcrumbs.length - 2] ?? {
    name: '',
    position: 1,
  }

  const facetKey =
    kind === 'category' ? `category-${productCategory.position}` : kind

  const facetValue = kind === 'category' ? productCategory.name : productGroupID

  const productQuery = {
    first: numberOfItems + 1,
    after: '0',
    sort: 'orders_desc' as StoreSort,
    term: '',
    selectedFacets: [
      {
        key: facetKey,
        value: facetValue,
      },
    ] as IStoreSelectedFacet[],
  }

  const data = useProductsQuery(productQuery)

  if (!data) {
    return null
  }

  const productEdges = removeCurrentProduct(
    productGroupID,
    data?.search?.products?.edges
  )

  return <ProductListUI heading={heading} productEdges={productEdges} />
}

export default ProductListCrossSell
