import { useCallback } from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import { cartStore } from 'src/sdk/cart'
import { QuantitySelector } from '@faststore/ui'
import type { CartItem } from 'src/sdk/cart/index'
import type { ClientProductQueryQuery } from '@generated/graphql'

import AvailabilityMessage from '../AvailabilityMessage/AvailabilityMessage'
import ReproducibilityMessage from '../ReproducibilityMessage/ReproducibilityMessage'
import Limited from '../SkuListTable/Limited'
import { MAX_QUANTITY } from '../../constants/global'
import styles from './CartItemQuantitySelector.module.scss'
import { getSpec } from '../../utils/productData'
import { useCartItemEvent } from '../../hooks/useCartItemEvent'
import type { OpenExtraParts, FolderImprinting } from '../../typings/orderForm'

type CartItemQuantitySelectorProps = {
  item: CartItem
  product?: ClientProductQueryQuery['product']
  isCartPage?: boolean
  openExtraParts?: OpenExtraParts
  folderImprinting?: FolderImprinting
}

const CartItemQuantitySelector = ({
  item,
  product,
  isCartPage = false,
  openExtraParts,
  folderImprinting,
}: CartItemQuantitySelectorProps) => {
  const { sendCartItemEvent } = useCartItemEvent()
  const minimumQuantity = Number(
    getSpec(item.itemOffered.additionalProperty, 'Minimum Sell Quantity') ?? 1
  )

  const onQuantityChange = useCallback(
    (qty: number) => {
      sendCartItemEvent(item, qty)
      cartStore.updateItemQuantity(item.id, qty)
    },
    [item, sendCartItemEvent]
  )

  return (
    <div className={classNames(styles.wrapper, isCartPage && styles.cartPage)}>
      {minimumQuantity > 1 && (
        <p className={styles.quantityMessage}>Min. {minimumQuantity} copies</p>
      )}

      {product && <Limited sku={product} />}

      <QuantitySelector
        min={minimumQuantity}
        max={MAX_QUANTITY}
        initial={item.quantity}
        onChange={onQuantityChange}
        disabled={!!openExtraParts || !!folderImprinting}
      />

      {openExtraParts && product && (
        <Link
          className={styles.extraPartLink}
          href={`/${product.slug}/p?extrapart=${product.gtin}`}
        >
          Edit extra part
        </Link>
      )}

      {folderImprinting && product && (
        <Link
          className={styles.folderImprintingLink}
          href={`/${product.slug}/p`}
        >
          Edit imprinting
        </Link>
      )}

      {product && (
        <div className={styles.availabilityMessage}>
          <AvailabilityMessage product={product} skuRefId={product.gtin} />
          <ReproducibilityMessage product={product} />
        </div>
      )}
    </div>
  )
}

export default CartItemQuantitySelector
