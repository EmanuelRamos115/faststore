import { QuantitySelector } from '@faststore/ui'
import type { ServerProductQueryQuery } from '@generated/graphql'
import type { Dispatch, SetStateAction } from 'react'

import AddToCartButton from '../AddToCart/AddToCartButton'
import AvailabilityMessage from '../AvailabilityMessage/AvailabilityMessage'
import Limited from '../SkuListTable/Limited'
import NotInStockMessage from '../NotInStockMessage/NotInStockMessage'
import { MAX_QUANTITY } from '../../constants/global'
import { getSkuNotInStock, getSkuAvailability } from '../../utils/productData'
import styles from './ProductOptionsForm.module.scss'

type ProductOptionsAddToCart = {
  product: ServerProductQueryQuery['product']
  quantity: number
  minSellQty: number
  setQuantity: Dispatch<SetStateAction<number>>
  handleAddToCart?: () => void
  hideQuantity?: boolean
  formId?: string
  loading?: boolean
  buttonText?: string
}
const ProductOptionsAddToCart = ({
  product,
  quantity,
  minSellQty,
  setQuantity,
  handleAddToCart,
  hideQuantity = false,
  formId,
  loading = false,
  buttonText = 'Add to Cart',
}: ProductOptionsAddToCart) => {
  const isNotInStock = getSkuNotInStock(product)
  const notAvailable =
    getSkuAvailability(product, product.gtin)?.short_message === 'Not Available'

  return (
    <div className={styles.addToCartWrapper}>
      {!hideQuantity && (
        <div className={styles.qtyWrapper}>
          <QuantitySelector
            min={minSellQty}
            max={MAX_QUANTITY}
            initial={quantity}
            onChange={(value) => setQuantity(value)}
          />

          <div className={styles.qtyMessaging}>
            {isNotInStock ? (
              <NotInStockMessage />
            ) : (
              <>
                <Limited sku={product} />
                <AvailabilityMessage
                  product={product}
                  skuRefId={product.gtin}
                />
              </>
            )}
          </div>
        </div>
      )}

      <AddToCartButton
        onClick={handleAddToCart}
        disabled={isNotInStock || notAvailable || loading}
        loading={loading}
        form={formId}
        text={buttonText}
      />
    </div>
  )
}

export default ProductOptionsAddToCart
