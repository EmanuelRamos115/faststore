import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useSession } from 'src/sdk/session'

import styles from './MobileMenuFooter.module.scss'
import type { UtilityNavigationLinks } from '../../@generated/cms/Header'
import CompanyLogo from '../Icons/Logos/CompanyLogo'
import AccountIcon from '../Icons/General/AccountIcon'
import { socialIcons } from '../../constants/social'
import { accountUrl } from '../../../faststore.config'
import { getLoginUrlWithReturn } from '../../utils/urls'

type MobileMenuFooterProps = {
  utilityNavLinks: UtilityNavigationLinks
}

const MobileMenuFooter = ({ utilityNavLinks }: MobileMenuFooterProps) => {
  const { asPath } = useRouter()
  const { person } = useSession()
  const loginUrl = getLoginUrlWithReturn(asPath)

  return (
    <div className={styles.mobileMenuFooter}>
      <ul className={`list-reset ${styles.utilityNav}`}>
        <li className={styles.utilityNavItem}>
          <Link
            data-fs-button-signin-link
            className={styles.utilityNavLink}
            href={person?.id ? accountUrl : loginUrl}
          >
            <AccountIcon className={styles.utilityNavLinkIcon} />
            <span className={styles.utilityNavLinkText}>
              {person?.id ? 'My Account' : 'Log In / Sign Up'}
            </span>
          </Link>
        </li>

        {utilityNavLinks.map((link) => (
          <li key={link.text} className={styles.utilityNavItem}>
            <Link
              href={link.url}
              prefetch={false}
              className={styles.utilityNavLink}
            >
              {link.icon && (
                <Image
                  className={styles.utilityNavLinkIcon}
                  src={link.icon}
                  aria-hidden
                  alt=""
                  height={28}
                  width={28}
                  sizes="28px"
                />
              )}
              <span className={styles.utilityNavLinkText}>{link.text}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className={styles.pepperlogo}>
        <CompanyLogo />
      </div>

      <ul className={`list-reset ${styles.socialItems}`}>
        {socialIcons.map((socialIcon) => (
          <li key={socialIcon.url} className={styles.socialItem}>
            <a
              href={socialIcon.url}
              className={styles.socialLink}
              aria-label={socialIcon.label}
            >
              {socialIcon.icon}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MobileMenuFooter
