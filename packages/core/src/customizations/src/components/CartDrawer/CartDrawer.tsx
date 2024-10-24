import { useMemo, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  CartSidebar,
  CartSidebarList,
  CartSidebarFooter,
  OrderSummary,
  useUI,
  useFadeEffect,
} from '@faststore/ui'
import classNames from 'classnames'
import { useCart } from 'src/sdk/cart'
import { useSession } from 'src/sdk/session'

import Action from '../Action/Action'
import ArrowAltIcon from '../Icons/General/ArrowAltIcon'
import ProductListCrossSellCartDrawer from '../ProductListCrossSellCartDrawer/ProductListCrossSellCartDrawer'
import CartItems, {
  removeAssemblyOptionLineItems,
  getTotalQuantity,
} from '../CartItems/CartItems'
import CircledCheckIcon from '../Icons/General/CircledCheckIcon'
import styles from './CartDrawer.module.scss'
import { useFormattedPrice } from '../../hooks/useFormattedPrice'
import { cartValidationBaseUrl } from '../../../faststore.config'
import type { CartDrawer as CartDrawerProps } from '../../@generated/cms/CartDrawer'
import { getLatestItems } from '../../utils/productData'
import { getLoginUrlWithReturn } from '../../utils/urls'
import { routes } from '../../constants/routes'
import { useViewCartEvent } from '../../hooks/useViewCartEvent'

const CartDrawer = ({ messages, ctas }: CartDrawerProps) => {
  const { person } = useSession()
  const router = useRouter()
  let { id, items } = useCart()
  const cartValidationUrl = `${cartValidationBaseUrl}/${id}`
  const loginUrl = getLoginUrlWithReturn(cartValidationUrl, false)
  const disableCheckout = items.length === 0

  items = removeAssemblyOptionLineItems(items)
  const totalQuantity = getTotalQuantity(items)
  const { subTotal, total } = useCart()
  const { sendViewCartEvent } = useViewCartEvent()

  const latestItems = getLatestItems(items)
  const latestItemsQuantity = latestItems.reduce(
    (n, { quantity }) => n + quantity,
    0
  )

  const { cart: displayCart, closeCart } = useUI()
  const { fadeOut } = useFadeEffect()
  const isEmpty = useMemo(() => items.length === 0, [items])

  const discount = subTotal - total
  const formattedSubtotal = useFormattedPrice(subTotal)
  const formattedTotal = useFormattedPrice(total)
  const formattedDiscount = useFormattedPrice(discount)

  useEffect(() => {
    router.events.on('routeChangeStart', closeCart)

    return () => {
      router.events.off('routeChangeStart', closeCart)
    }
  }, [router])

  useEffect(() => {
    if (displayCart) {
      sendViewCartEvent()
    }
  }, [displayCart])

  return (
    <div>
      {displayCart && (
        <CartSidebar
          title={isEmpty ? 'No items added to cart' : 'Added to Cart'}
          className={styles.sideBar}
          alertIcon={
            isEmpty ? '' : <CircledCheckIcon className={styles.icon} />
          }
          alertText={
            isEmpty
              ? ''
              : ` ${latestItemsQuantity} ${latestItemsQuantity === 1 ? 'item has' : 'items have'} been added to your cart`
          }
          totalItems={latestItemsQuantity}
          onClose={fadeOut}
        >
          <CartSidebarList>
            {items.length > 0 ? (
              <CartItems />
            ) : (
              <div>
                <p>Cart is empty</p>
              </div>
            )}
          </CartSidebarList>

          <CartSidebarFooter>
            <span className={styles.cartNumber}>
              {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'} in cart
            </span>
            <OrderSummary
              subtotalLabel="Subtotal"
              subtotalValue={discount > 0 ? formattedSubtotal : undefined}
              discountValue={discount > 0 ? `-${formattedDiscount}` : undefined}
              totalLabel="Order Total"
              totalValue={formattedTotal}
            />
            {messages?.taxDelivery && (
              <p className={styles.footerText}>{messages.taxDelivery}</p>
            )}
            {messages?.price && (
              <p className={styles.footerText}>{messages.price}</p>
            )}
          </CartSidebarFooter>

          <div className={styles.mainActions}>
            <Action
              as="a"
              href={ctas.cartButton.url}
              color="important"
              size="large"
              fullWidth
            >
              {ctas.cartButton.text}
            </Action>

            <Action
              className={classNames(styles.actionButton, {
                [styles.actionsButtonDisabled]: disableCheckout,
              })}
              as="a"
              href={person?.id ? cartValidationUrl : loginUrl}
              color="neutralLight"
              size="large"
              fullWidth
              onClick={(e) => disableCheckout && e.preventDefault()}
              aria-disabled={disableCheckout ? true : undefined}
            >
              {person?.id
                ? ctas.checkoutButton.textLoggedIn
                : ctas.checkoutButton.textLoggedOut}
            </Action>
          </div>

          <div className={styles.subActions}>
            <Link
              href={
                person?.id
                  ? routes.b2bForm
                  : getLoginUrlWithReturn(routes.b2bForm)
              }
              className={styles.subLink}
            >
              {ctas.createAccountLink.text}{' '}
              <ArrowAltIcon className={styles.altArrow} />
            </Link>

            <div className={styles.subLinkDivider} />

            <button
              type="button"
              className={styles.subLink}
              onClick={closeCart}
            >
              {ctas.continueShoppingLink.text}{' '}
              <ArrowAltIcon className={styles.altArrow} />
            </button>
          </div>
          <div className={styles.productAlsoBought}>
            <ProductListCrossSellCartDrawer />
          </div>
        </CartSidebar>
      )}
    </div>
  )
}

export default CartDrawer
