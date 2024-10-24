import { gql } from '@generated/gql'
import { useLazyQuery } from 'src/sdk/graphql/useLazyQuery'
import { useRemoveButton } from 'src/sdk/cart/useRemoveButton'
import {
  useState,
  useEffect,
  type MouseEvent,
  type Dispatch,
  type SetStateAction,
} from 'react'
import type { CartItem } from 'src/sdk/cart/index'
import { cartStore, useCart } from 'src/sdk/cart'

import Trashcan from '../Icons/General/Trashcan'
import styles from './CartItemRemoveButton.module.scss'

const REMOVE_EXTRA_PARTS = gql(`
  mutation removeExtraParts($skuGtin: String) {
    removeExtraParts(skuGtin: $skuGtin)
  }
`)

const REMOVE_FOLDER_IMPRINTING = gql(`
  mutation removeFolderImprinting($skuGtin: String) {
    removeFolderImprinting(skuGtin: $skuGtin)
  }
`)

type CartItemRemoveButtonProps = {
  item: CartItem
  hasExtraParts?: boolean
  hasFolderImprinting?: boolean
  validateImprinting: boolean
  setValidateImprinting: Dispatch<SetStateAction<boolean>>
}

const CartItemRemoveButton = ({
  item,
  hasExtraParts = false,
  hasFolderImprinting = false,
  validateImprinting,
  setValidateImprinting,
}: CartItemRemoveButtonProps) => {
  const [disabled, setDisabled] = useState(false)
  const { isValidating, items } = useCart()
  const [removeExtraParts] = useLazyQuery(REMOVE_EXTRA_PARTS, {})
  const [removeFolderImprinting] = useLazyQuery(REMOVE_FOLDER_IMPRINTING, {})
  const { onClick: removeFromCart } = useRemoveButton(item)

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (hasFolderImprinting) {
      const cart = cartStore.read()

      const newCartItems = items.filter(
        (cartItem) => cartItem.itemOffered.sku !== item.itemOffered.sku
      )

      cartStore.set({
        ...cart,
        items: newCartItems,
      })
      setValidateImprinting(true)
      void removeFolderImprinting({
        skuGtin: item.itemOffered.gtin,
      })

      return
    }

    removeFromCart(e)

    if (hasExtraParts) {
      void removeExtraParts({
        skuGtin: item.itemOffered.gtin,
      })
    }
  }

  useEffect(() => {
    if (validateImprinting && isValidating) {
      setDisabled(true)
      setValidateImprinting(false)

      return
    }

    setDisabled(false)
  }, [isValidating])

  return (
    <button
      className={styles.button}
      aria-label="Remove item from cart"
      type="button"
      onClick={handleClick}
      disabled={disabled}
    >
      <Trashcan />
    </button>
  )
}

export default CartItemRemoveButton
