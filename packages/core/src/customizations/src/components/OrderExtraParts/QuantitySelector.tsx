import React, { useEffect, useState } from 'react'
import { Icon, IconButton, Input } from '@faststore/ui'

import { MAX_QUANTITY } from '../../constants/global'
import styles from './QuantitySelector.module.scss'

export interface QuantitySelectorProps {
  name: string
  qty?: string
  max?: number
  min?: number
  initial?: number
  disabled?: boolean
  onChange?: (value: number, name: string, callback?: () => void) => void
}

const QuantitySelector = ({
  name,
  max = MAX_QUANTITY,
  min = 0,
  initial,
  disabled = false,
  onChange,
}: QuantitySelectorProps) => {
  const [quantity, setQuantity] = useState<number>(initial ?? min)

  const isLeftDisabled = quantity === min
  const isRightDisabled = quantity === max

  const changeQuantity = (increaseValue: number) => {
    const quantityValue = validateQuantityBounds(quantity + increaseValue)

    onChange?.(quantityValue, name)
    setQuantity(quantityValue)
  }

  const increase = () => changeQuantity(1)

  const decrease = () => changeQuantity(-1)

  function validateQuantityBounds(n: number): number {
    const maxValue = min ? Math.max(n, min) : n

    return max ? Math.min(maxValue, max) : maxValue
  }

  function validateInput(e: React.FormEvent<HTMLInputElement>) {
    const val = e.currentTarget.value

    if (!Number.isNaN(Number(val))) {
      setQuantity(() => {
        const quantityValue = validateQuantityBounds(Number(val))

        onChange?.(quantityValue, name)

        return quantityValue
      })
    }
  }

  useEffect(() => {
    initial && setQuantity(initial)
  }, [initial])

  return (
    <div
      className={styles.quantitySelector}
      data-fs-quantity-selector={disabled ? 'disabled' : 'true'}
      data-testid="fs-quantity-selector"
    >
      <IconButton
        data-quantity-selector-button="left"
        icon={<Icon name="Minus" width={16} height={16} weight="bold" />}
        aria-label="Decrement Quantity"
        aria-controls="quantity-selector-input"
        disabled={isLeftDisabled || disabled}
        onClick={decrease}
        testId="fs-quantity-selector-left-button"
        size="small"
        type="button"
      />
      <Input
        data-quantity-selector-input
        id="quantity-selector-input"
        aria-label="Quantity"
        value={quantity}
        onChange={validateInput}
        disabled={disabled}
      />
      <IconButton
        data-quantity-selector-button="right"
        aria-controls="quantity-selector-input"
        aria-label="Increment Quantity"
        disabled={isRightDisabled || disabled}
        icon={<Icon name="Plus" width={16} height={16} weight="bold" />}
        onClick={increase}
        testId="fs-quantity-selector-right-button"
        size="small"
        type="button"
      />
    </div>
  )
}

export default QuantitySelector
