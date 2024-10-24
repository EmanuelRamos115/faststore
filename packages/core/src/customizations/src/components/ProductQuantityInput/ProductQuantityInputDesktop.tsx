import { useUI } from '@faststore/ui'
import { useEffect, useState } from 'react'
import type { ChangeEvent, MouseEvent, FocusEvent } from 'react'

import { MAX_QUANTITY } from '../../constants/global'
import styles from './ProductQuantityInputDesktop.module.scss'
import type { OrderProducts } from '../SkuListTable/SkuListTable'

type ProductQtyInputDesktopProps = {
  id: string
  changeOrderDesktop: (value: number, id: string) => void
  orderProducts: OrderProducts
  isDisabled?: boolean
  min?: number
  max?: number
  minSellQty: number
}

const ProductQuantityInputDesktop = ({
  id,
  isDisabled,
  changeOrderDesktop,
  orderProducts,
  min = 0,
  max = MAX_QUANTITY,
  minSellQty = 1,
}: ProductQtyInputDesktopProps) => {
  const { pushToast } = useUI()
  const [quantity, setQuantity] = useState(min)
  const inputId = `desktop_sku_qty_${id}`

  const changeQuantity = (newQuantity: number) => {
    newQuantity = Math.max(newQuantity, min)
    newQuantity = Math.min(newQuantity, max)

    changeOrderDesktop(newQuantity, id)
    setQuantity(newQuantity)
  }

  const handleDecrementQty = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    changeQuantity(quantity <= minSellQty ? min : quantity - 1)
  }

  const handleIncrementQty = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    changeQuantity(Math.max(quantity + 1, minSellQty))
  }

  const handleQtyChange = (event: ChangeEvent<HTMLInputElement>) => {
    changeQuantity(Number(event.target.value))
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
  }

  useEffect(() => {
    if (Object.keys(orderProducts).length === 0) {
      setQuantity(min)
    }
  }, [orderProducts])

  return (
    <div className={styles.addQtyForm}>
      <button
        className={styles.addQtyButton}
        disabled={isDisabled}
        onClick={handleDecrementQty}
        type="button"
      >
        - <span className="visually-hidden">Decrement Quantity</span>
      </button>

      <label className="visually-hidden" htmlFor={inputId}>
        Add Qty
      </label>

      <input
        className={styles.addQtyInput}
        type="number"
        name="sku_qty"
        id={inputId}
        value={quantity.toString()}
        onChange={handleQtyChange}
        onBlur={handleQtyBlur}
        disabled={isDisabled}
      />

      <button
        className={styles.addQtyButton}
        disabled={isDisabled}
        onClick={handleIncrementQty}
        type="button"
      >
        + <span className="visually-hidden">Increment Quantity</span>
      </button>
    </div>
  )
}

export default ProductQuantityInputDesktop
