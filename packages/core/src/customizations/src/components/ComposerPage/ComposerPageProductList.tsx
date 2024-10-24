import classNames from 'classnames'
import { useProductsQuery } from '@faststore/core'
import type { ClientManyProductsQueryQueryVariables } from '@generated/graphql'

import styles from './ComposerPageProductList.module.scss'
import Heading from '../Heading/Heading'
import Action from '../Action/Action'
import ProductCard from '../ProductCard/ProductCard'

type ComposerPageProductListProps = {
  heading: string
  cta: {
    text: string
    url: string
    color: string
  }
  productQuery: Partial<ClientManyProductsQueryQueryVariables>
}

const ComposerPageProductList = ({
  heading,
  cta,
  productQuery,
}: ComposerPageProductListProps) => {
  const data = useProductsQuery(productQuery)
  const productEdges = data?.search?.products?.edges

  if (!data?.search?.products?.edges?.length) {
    return null
  }

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <Heading level={2} uiStyle={4}>
          {heading}
        </Heading>

        {cta && (
          <Action as="a" href={cta.url} color={cta.color} size={'small'}>
            {cta.text}
          </Action>
        )}
      </div>

      <div
        className={classNames(
          styles.grid,
          productQuery.first === 5 ? styles.fiveProducts : styles.tenProducts
        )}
      >
        {productEdges?.map(({ node: product }, index) => (
          <div className={styles.product}>
            <ProductCard key={product.id} product={product} index={index} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ComposerPageProductList
