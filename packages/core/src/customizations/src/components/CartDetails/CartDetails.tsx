import { useEffect } from 'react'
import { useCart } from 'src/sdk/cart'

import Heading from '../Heading/Heading'
import CartDetailsItemsActions from './CartDetailsItemsActions'
import CartDetailsSummary from './CartDetailsSummary'
import CartItems, { getTotalQuantity } from '../CartItems/CartItems'
import type { CartDetails as CartDetailsProps } from '../../@generated/cms/CartDetails'
import { useBeginCheckoutEvent } from '../../hooks/useBeginCheckoutEvent'
import styles from './CartDetails.module.scss'

const CartDetails = ({ messages, ctas, additionalLinks }: CartDetailsProps) => {
  const { items } = useCart()
  const totalQuantity = getTotalQuantity(items)
  const { sendBeginCheckoutEvent } = useBeginCheckoutEvent()

  useEffect(() => {
    sendBeginCheckoutEvent(items)
  }, [])

  return (
    <section className={styles.section}>
      <Heading level={1} uiStyle={3} className={styles.heading}>
        Shopping Cart{' '}
        <span>
          ({totalQuantity} {totalQuantity === 1 ? 'item' : 'items'})
        </span>
      </Heading>

      <div className={styles.cartContent}>
        <div className={styles.cartItems}>
          {totalQuantity > 0 ? (
            <>
              <CartItems isCartPage={true} />

              <div className={styles.cartItemsActions}>
                <CartDetailsItemsActions items={items} />
              </div>
            </>
          ) : (
            <div>
              <p>Cart is empty</p>
            </div>
          )}
        </div>

        <div className={styles.cartSummary}>
          <CartDetailsSummary
            messages={messages}
            ctas={ctas}
            additionalLinks={additionalLinks}
          />
        </div>
      </div>
    </section>
  )
}

export default CartDetails
