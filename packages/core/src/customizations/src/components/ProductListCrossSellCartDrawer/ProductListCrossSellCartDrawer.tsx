import type { StoreSort, IStoreSelectedFacet } from '@generated/graphql'
import { useCart } from 'src/sdk/cart'
import { useProductsQuery } from '@faststore/core'

import ProductListUI from '../ProductList/ProductListUI'
import { removeCurrentProduct } from '../../utils/productData'

const ProductListCrossSellCartDrawer = () => {
  const { items } = useCart()

  const lastProductGroupId =
    items?.[items.length - 1]?.itemOffered?.isVariantOf?.productGroupID

  const productQuery = {
    first: 6,
    after: '0',
    sort: 'orders_desc' as StoreSort,
    term: '',
    selectedFacets: [
      {
        key: 'buy',
        value: lastProductGroupId,
      },
    ] as IStoreSelectedFacet[],
  }

  const data = useProductsQuery(productQuery)

  if (!data) {
    return null
  }

  const productEdges = removeCurrentProduct(
    lastProductGroupId,
    data?.search?.products?.edges
  )

  return (
    <ProductListUI
      heading="Customers Also Bought"
      productEdges={productEdges}
      productsToShow={2}
      showDots={true}
    />
  )
}

export default ProductListCrossSellCartDrawer
