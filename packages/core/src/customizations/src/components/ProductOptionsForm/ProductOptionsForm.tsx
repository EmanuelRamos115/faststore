import { useState } from 'react'
import { useCartToggleButton } from 'src/sdk/cart/useCartToggleButton'
import type { ServerProductQueryQuery } from '@generated/graphql'

import ProductSkuSelector from '../ProductSkuSelector/ProductSkuSelector'
import ProductOptionsAddToCart from './ProductOptionsAddToCart'
import styles from './ProductOptionsForm.module.scss'
import { getSpec } from '../../utils/productData'
import { addToCart } from '../../utils/addToCart'

type ProductOptionsFormProps = {
  product: ServerProductQueryQuery['product']
}

const ProductOptionsForm = ({ product }: ProductOptionsFormProps) => {
  const { onClick: toggleCart } = useCartToggleButton()
  const minSellQty =
    getSpec(product.additionalProperty, 'Minimum Sell Quantity') ?? 1

  const [quantity, setQuantity] = useState<number>(Number(minSellQty))

  const handleAddToCart = () => {
    if (quantity === 0) {
      return
    }

    addToCart({
      sku: product,
      isVariantOf: product.isVariantOf,
      brand: product.brand,
      quantity,
      timestamp: Date.now(),
    })

    toggleCart()
    setQuantity(Number(minSellQty))
  }

  return (
    <div className={styles.productOptionsFormWrapper}>
      <ProductSkuSelector product={product} />
      <ProductOptionsAddToCart
        product={product}
        quantity={quantity}
        minSellQty={Number(minSellQty)}
        setQuantity={setQuantity}
        handleAddToCart={handleAddToCart}
      />
    </div>
  )
}

export default ProductOptionsForm
