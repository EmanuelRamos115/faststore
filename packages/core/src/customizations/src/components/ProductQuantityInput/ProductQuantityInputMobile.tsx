import { cartStore, useCart } from 'src/sdk/cart'
import { useEffect, useState } from 'react'
import { useUI } from '@faststore/ui'
import type { ChangeEvent, FocusEvent } from 'react'

import CircledCheckIcon from '../Icons/General/CircledCheckIcon'
import CircledMinusIcon from '../Icons/General/CircledMinusIcon'
import CircledPlusIcon from '../Icons/General/CircledPlusIcon'
import { MAX_QUANTITY } from '../../constants/global'
import styles from './ProductQuantityInputMobile.module.scss'
import { addToCart } from '../../utils/addToCart'
import type { Product, ProductFullVariantList } from '../../typings/product'

type ProductQuantityInputMobileProps = {
  sku: ProductFullVariantList[0]
  product: Product
  isDisabled?: boolean
  min?: number
  max?: number
  minSellQty: number
}

type CartItem = {
  id: string | null
  quantity: number
}

const ProductQuantityInputMobile = ({
  sku,
  product,
  isDisabled,
  min = 0,
  max = MAX_QUANTITY,
  minSellQty = 1,
}: ProductQuantityInputMobileProps) => {
  const { pushToast } = useUI()
  const [inputFocused, setInputFocused] = useState(false)
  const inputId = `mobile_sku_qty_${sku.productID}`
  const [cartItem, setCartItem] = useState<CartItem>({
    id: null,
    quantity: 0,
  })

  const cartData = useCart()

  useEffect(() => {
    const itemAdded = cartData?.items?.find(
      (item: { itemOffered: { sku: string } }) =>
        item.itemOffered.sku === sku.productID
    )

    if (!itemAdded) {
      setCartItem({
        id: null,
        quantity: 0,
      })
    } else {
      setCartItem({
        id: itemAdded.id,
        quantity: itemAdded.quantity,
      })
    }
  }, [cartData?.items])

  const changeQuantity = (newQuantity: number) => {
    newQuantity = Math.max(newQuantity, min)
    newQuantity = Math.min(newQuantity, max)

    if (cartItem?.id) {
      cartStore.updateItemQuantity(cartItem.id, newQuantity)
    }
  }

  const handleAddToCart = (quantity: number) => {
    addToCart({
      sku,
      isVariantOf: product.isVariantOf,
      brand: product.brand,
      quantity,
      timestamp: Date.now(),
    })
  }

  const handleDecrementQty = () => {
    changeQuantity(
      cartItem.quantity <= minSellQty ? min : cartItem.quantity - 1
    )
  }

  const handleIncrementQty = () => {
    changeQuantity(Math.max(cartItem.quantity + 1, minSellQty))
  }

  const handleQtyChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value)

    if (!cartItem?.id) {
      handleAddToCart(value)
    }

    changeQuantity(value)
  }

  const handleQtyBlur = (event: FocusEvent<HTMLInputElement>) => {
    const value = Number(event.target.value)

    if (value < minSellQty) {
      changeQuantity(minSellQty)

      pushToast({
        message:
          'Your quantity has been adjusted to meet the minimum required.',
        status: 'INFO',
      })
    }

    setInputFocused(false)
  }

  return cartItem.quantity > 0 || inputFocused ? (
    <div className={styles.quantitySelectorWrapper}>
      <div className={styles.quantitySelectorForm}>
        <button
          className={styles.quantityButton}
          disabled={isDisabled}
          onClick={handleDecrementQty}
          type="button"
        >
          <CircledMinusIcon />
          <span className="visually-hidden">Decrement Quantity</span>
        </button>

        <label className="visually-hidden" htmlFor={inputId}>
          Add Qty
        </label>

        <input
          className={styles.quantityInput}
          type="number"
          name="sku_qty"
          id={inputId}
          value={cartItem.quantity.toString()}
          onChange={handleQtyChange}
          onFocus={() => setInputFocused(true)}
          onBlur={handleQtyBlur}
          disabled={isDisabled}
        />

        <button
          className={styles.quantityButton}
          disabled={isDisabled}
          onClick={handleIncrementQty}
          type="button"
        >
          <CircledPlusIcon />
          <span className="visually-hidden">Increment Quantity</span>
        </button>
      </div>

      <div className={styles.quantitySelectorNotification}>
        <span className={styles.quantitySelectorNotificationIconWrapper}>
          <CircledCheckIcon />
        </span>{' '}
        {cartItem.quantity} {cartItem.quantity !== 1 ? 'items' : 'item'} added
        to cart
      </div>
    </div>
  ) : (
    <button
      className={styles.mobileAddToCartBtn}
      disabled={isDisabled}
      onClick={() => {
        handleAddToCart(minSellQty)
      }}
      type="button"
    >
      Add to Cart
    </button>
  )
}

export default ProductQuantityInputMobile
