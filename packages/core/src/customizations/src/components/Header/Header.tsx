import { useState } from 'react'
// import { mark } from 'src/sdk/tests/mark'

import styles from './Header.module.scss'
import HeaderUtilityNav from './HeaderUtilityNav'
import HeaderContactMessage from './HeaderContactMessage'
import HeaderLogo from './HeaderLogo'
import HeaderSearch from './HeaderSearch'
import HeaderUserActions from './HeaderUserActions'
import HeaderMobileNav from './HeaderMobileNav'
import MegaMenu from '../MegaMenu/MegaMenu'
import CartSwitcher from './CartSwitcher'
import type { Header as HeaderProps } from '../../@generated/cms/Header'
import B2BOrganizationsBar from '../B2BOrganizations/B2BOrganizationsBar'

function Header({
  contact,
  logo,
  searchInput,
  cart,
  utilityNavLinks,
  accountDropdown,
}: HeaderProps) {
  const [showB2B, setShowB2B] = useState(true)

  return (
    <>
      <div className={styles.skipTo}>
        <p className={styles.skipToLabel}>Skip to:</p>
        <ol>
          <li>
            <a href="#navigation">Skip to navigation</a>
          </li>
          <li>
            <a href="#search-input">Skip to search</a>
          </li>
          <li>
            <a href="#main">Skip to content</a>
          </li>
          <li>
            <a href="#footer">Skip to footer</a>
          </li>
        </ol>
      </div>

      {showB2B && <B2BOrganizationsBar />}

      <div className={styles.topRow}>
        <div className={styles.topWrapper}>
          <div className={styles.topCellNav}>
            {utilityNavLinks && <HeaderUtilityNav links={utilityNavLinks} />}
          </div>
          <div className={styles.topCellContact}>
            <HeaderContactMessage message={contact.message} />
          </div>
        </div>
      </div>
      <header className={styles.header}>
        <div className={styles.mainRow}>
          <div className={styles.mainWrapper}>
            <div className={styles.mainCellMobileNav}>
              {utilityNavLinks && (
                <HeaderMobileNav
                  utilityNavLinks={utilityNavLinks}
                  setShowB2B={setShowB2B}
                />
              )}
            </div>
            <div className={styles.mainCellLogo}>
              <HeaderLogo logo={logo} />
            </div>
            <div className={styles.mainCellSearch}>
              <HeaderSearch id="search-input" sort={searchInput.sort} />
            </div>

            <div className={styles.mainCellUserActions}>
              <HeaderUserActions
                accountDropdown={accountDropdown}
                cartUrl={cart.url}
              />
            </div>
          </div>
        </div>
      </header>

      <div className={styles.bottomRow}>
        <div className={styles.bottomRowSearch}>
          <HeaderSearch id="search-input-mobile" sort={searchInput.sort} />
        </div>
      </div>

      <MegaMenu />

      <CartSwitcher />

      <div id="main"></div>
    </>
  )
}

Header.displayName = 'Header'
export default Header
