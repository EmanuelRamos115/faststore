import Link from 'next/link'
import { useState, useRef } from 'react'
import { useSession } from 'src/sdk/session'
import { useCart } from 'src/sdk/cart'
import { useRouter } from 'next/router'

import CartIcon from '../Icons/General/CartIcon'
import AccountIcon from '../Icons/General/AccountIcon'
import styles from './HeaderUserActions.module.scss'
import { getTotalQuantity } from '../CartItems/CartItems'
import type { Header as HeaderProps } from '../../@generated/cms/Header'
import { accountUrl } from '../../../faststore.config'
import { getLoginUrlWithReturn } from '../../utils/urls'

type HeaderUserActionsProps = {
  accountDropdown: HeaderProps['accountDropdown']
  cartUrl: string
}

const HeaderUserActions = ({
  accountDropdown,
  cartUrl,
}: HeaderUserActionsProps) => {
  const { asPath } = useRouter()
  const { person } = useSession()
  const { items } = useCart()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const dropdownButtonRef = useRef<HTMLButtonElement>(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const totalQuantity = getTotalQuantity(items)
  const loginUrl = getLoginUrlWithReturn(asPath)

  const handleClickOutside = (event: MouseEvent) => {
    if (
      !dropdownButtonRef.current?.contains(event.target as Node) &&
      !dropdownRef.current?.contains(event.target as Node)
    ) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      closeDropdown()
    }
  }

  const openDropdown = () => {
    document.addEventListener('mousedown', handleClickOutside)
    setShowDropdown(true)
  }

  const closeDropdown = () => {
    document.removeEventListener('mousedown', handleClickOutside)
    setShowDropdown(false)
  }

  const toggleDropdown = () => {
    showDropdown ? closeDropdown() : openDropdown()
  }

  return (
    <div className={styles.userActions}>
      {person?.id && accountDropdown ? (
        <div className={styles.accountWrapper}>
          <button
            type="button"
            className={styles.accountLink}
            onClick={() => toggleDropdown()}
            ref={dropdownButtonRef}
            aria-label={
              showDropdown
                ? 'Open My Account Navigation'
                : 'Close My Account Navigation'
            }
            aria-expanded={showDropdown}
          >
            <AccountIcon className={styles.accountLinkIcon} />
            <span className={styles.accountLinkText}>My Account</span>
          </button>

          {showDropdown && (
            <div
              className={styles.dropdownMenu}
              aria-label="My Account Links"
              ref={dropdownRef}
            >
              {accountDropdown.map((link) => {
                return (
                  <Link
                    key={link.text}
                    href={link.url}
                    className={styles.dropdownItem}
                  >
                    {link.text}
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      ) : (
        <Link
          data-fs-button-signin-link
          className={styles.accountLink}
          href={person?.id ? accountUrl : loginUrl}
        >
          <AccountIcon className={styles.accountLinkIcon} />
          <span className={styles.accountLinkText}>
            {person?.id ? 'My Account' : 'Log In / Sign Up'}
          </span>
        </Link>
      )}

      <Link
        aria-label={`Open cart containing ${totalQuantity} items`}
        className={styles.cartButton}
        data-fs-cart-toggle
        href={cartUrl}
      >
        <CartIcon className={styles.cartButtonIcon} />
        <span className={styles.cartButtonBadge}>{totalQuantity}</span>
      </Link>
    </div>
  )
}

export default HeaderUserActions
