import { useProductsQuery } from '@faststore/core'
import type { ClientManyProductsQueryQueryVariables } from '@generated/graphql'

import ProductListUI from './ProductListUI'
import type { ProductListQuery } from '../../@generated/cms/ProductList'

type ProductListProps = {
  cta?: ProductListQuery['cta']
  heading: ProductListQuery['heading']
  productQuery: ClientManyProductsQueryQueryVariables
}

const ProductList = ({ cta, heading, productQuery }: ProductListProps) => {
  if (!productQuery) {
    return null
  }

  const data = useProductsQuery(productQuery)
  const productEdges = data?.search?.products?.edges ?? []

  return (
    <ProductListUI cta={cta} heading={heading} productEdges={productEdges} />
  )
}

export default ProductList
