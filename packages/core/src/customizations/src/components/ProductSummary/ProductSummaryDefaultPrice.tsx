import { ProductPrice } from '@faststore/ui'
import type { ServerProductQueryQuery } from '@generated/graphql'

import NotInStockMessage from '../NotInStockMessage/NotInStockMessage'
import styles from './ProductSummary.module.scss'
import { useFormattedPrice } from '../../hooks/useFormattedPrice'
import type { ClientManyProductsQueryQueryProductEdges } from '../../typings/product'

type ProductSummaryDefaultPriceProps = {
  isPLP: boolean
  isNotInStock: boolean
  offers:
    | ServerProductQueryQuery['product']['offers']
    | ClientManyProductsQueryQueryProductEdges[0]['node']['offers']
}

const ProductSummaryDefaultPrice = ({
  isPLP,
  isNotInStock,
  offers,
}: ProductSummaryDefaultPriceProps) => {
  const {
    offers: [{ price, listPrice }],
  } = offers

  return (
    <div className={styles.priceWrapper}>
      {isPLP && offers.lowPrice < offers.highPrice ? (
        <p className={styles.priceFrom}>
          <span>From</span>
          <span className={styles.priceAmount}>
            {useFormattedPrice(offers.lowPrice)}
          </span>
        </p>
      ) : (
        <div className={styles.priceAmount}>
          <ProductPrice
            formatter={useFormattedPrice}
            listPrice={listPrice}
            value={price}
          />
        </div>
      )}

      {isPLP && isNotInStock && <NotInStockMessage size="small" />}
    </div>
  )
}

export default ProductSummaryDefaultPrice
