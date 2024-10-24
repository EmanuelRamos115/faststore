import classNames from 'classnames'
import { useSession } from 'src/sdk/session'
import { useCart } from 'src/sdk/cart'
import Link from 'next/link'

import Heading from '../Heading/Heading'
import Action from '../Action/Action'
import ArrowAltIcon from '../Icons/General/ArrowAltIcon'
import { cartValidationBaseUrl } from '../../../faststore.config'
import { useFormattedPrice } from '../../hooks/useFormattedPrice'
import { getTotalQuantity } from '../CartItems/CartItems'
import styles from './CartDetailsSummary.module.scss'
import type { CartDetails as CartDetailsProps } from '../../@generated/cms/CartDetails'
import { getLoginUrlWithReturn } from '../../utils/urls'
import { routes } from '../../constants/routes'

const CartDetailsSummary = ({
  messages,
  ctas,
  additionalLinks,
}: CartDetailsProps) => {
  const { person } = useSession()
  const { id, items, subTotal, total } = useCart()
  const cartValidationUrl = `${cartValidationBaseUrl}/${id}`
  const totalQuantity = getTotalQuantity(items)
  const discount = subTotal - total
  const formattedSubtotal = useFormattedPrice(subTotal)
  const formattedTotal = useFormattedPrice(total)
  const formattedDiscount = useFormattedPrice(discount)
  const loginUrl = getLoginUrlWithReturn(cartValidationUrl, false)
  const disableCheckout = items.length === 0

  return (
    <>
      <div className={styles.summary}>
        <Heading level={2} uiStyle={6} className={styles.heading}>
          Order Summary
        </Heading>

        <div className={styles.amountWrapper}>
          <div className={styles.amount}>
            <span className={styles.amountTitle}>
              Subtotal ({totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}
              )
            </span>
            <span className={styles.amountValue}>{formattedSubtotal}</span>
          </div>

          {discount > 0 && (
            <div className={styles.amount}>
              <span className={styles.amountTitle}>Discount</span>
              <span className={styles.amountValue}>-{formattedDiscount}</span>
            </div>
          )}
        </div>

        <div className={styles.amountWrapper}>
          <div className={classNames(styles.amount, styles.amountTotal)}>
            <span className={styles.amountTitle}>Estimated Total:</span>
            <span className={styles.amountValue}>{formattedTotal}</span>
          </div>

          {messages && (
            <div className={classNames(styles.amountTaxInfo)}>
              {messages.taxDelivery && <p>{messages.taxDelivery}</p>}
              {messages.price && <p>{messages.price}</p>}
            </div>
          )}
        </div>
      </div>

      <div className={styles.actionsWrapper}>
        <div className={styles.actionsRow}>
          {person?.id ? (
            <Action
              className={classNames(styles.actionsButton, {
                [styles.actionsButtonDisabled]: disableCheckout,
              })}
              as="a"
              href={cartValidationUrl}
              color="important"
              size="large"
              fullWidth={true}
              onClick={(e) => disableCheckout && e.preventDefault()}
              aria-disabled={disableCheckout ? true : undefined}
            >
              {ctas.checkoutButton.textLoggedIn}
            </Action>
          ) : (
            <Action
              className={classNames(styles.actionsButton, {
                [styles.actionsButtonDisabled]: disableCheckout,
              })}
              as="a"
              href={loginUrl}
              color="important"
              size="large"
              fullWidth={true}
              onClick={(e) => disableCheckout && e.preventDefault()}
              aria-disabled={disableCheckout ? true : undefined}
            >
              {ctas.checkoutButton.textLoggedOut}
            </Action>
          )}

          <Link
            className={styles.actionsLink}
            href={
              person?.id
                ? `${routes.b2bForm}?returnUrl=/cart`
                : getLoginUrlWithReturn(`${routes.b2bForm}?returnUrl=/cart`)
            }
          >
            {ctas.createAccountLink.text}{' '}
            <ArrowAltIcon className={styles.altArrow} />
          </Link>
        </div>

        <div className={styles.actionsRow}>
          <Action
            className={styles.actionsButton}
            as="a"
            href={ctas.continueShoppingButton.url}
            color="neutralLight"
            size="large"
            fullWidth={true}
          >
            {ctas.continueShoppingButton.text}
          </Action>

          {ctas.quotesLink && (
            <Link
              className={classNames(
                styles.actionsLink,
                styles.actionsLinkQuote
              )}
              href={ctas.quotesLink.url}
              target={ctas.quotesLink.newTab ? '_blank' : undefined}
            >
              {ctas.quotesLink.text}{' '}
              <ArrowAltIcon className={styles.altArrow} />
            </Link>
          )}
        </div>
      </div>

      {additionalLinks && (
        <ul className={`list-reset ${styles.linksWrapper}`}>
          {additionalLinks.map((link) => (
            <li key={link.text}>
              <Link
                href={link.url}
                className={styles.link}
                target={link.newTab ? '_blank' : undefined}
              >
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default CartDetailsSummary
