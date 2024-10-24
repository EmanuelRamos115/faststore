import type { StoreSort, IStoreSelectedFacet } from '@generated/graphql'
import { useCart } from 'src/sdk/cart'
import { useProductsQuery } from '@faststore/core'

import ProductListUI from '../ProductList/ProductListUI'
import { removeCurrentProduct } from '../../utils/productData'
import type { ProductListCrossSellCart as ProductListCrossSellCartProps } from '../../@generated/cms/ProductListCrossSellCart'

const ProductListCrossSellCart = ({
  numberOfItems,
  heading,
  kind,
}: ProductListCrossSellCartProps) => {
  const { items } = useCart()

  const productGroupID =
    items?.[items.length - 1]?.itemOffered?.isVariantOf?.productGroupID

  const data = useProductsQuery({
    first: numberOfItems + 1,
    after: '0',
    sort: 'orders_desc' as StoreSort,
    term: '',
    selectedFacets: [
      {
        key: kind,
        value: productGroupID,
      },
    ] as IStoreSelectedFacet[],
  })

  if (!data?.search?.products?.edges) {
    return null
  }

  const productEdges = removeCurrentProduct(
    productGroupID,
    data?.search?.products?.edges
  )

  return <ProductListUI heading={heading} productEdges={productEdges} />
}

export default ProductListCrossSellCart
