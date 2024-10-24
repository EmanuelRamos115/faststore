import Link from 'next/link'

import Image from '../Image/Image'
import type {
  UtilityNavigationLinks,
  Link as LinkProp,
} from '../../@generated/cms/Header'
import styles from './HeaderUtilityNav.module.scss'

export type HeaderUtilityNavProps = {
  links: UtilityNavigationLinks
}

export default function HeaderUtilityNav({ links }: HeaderUtilityNavProps) {
  const desktopLinks = links.filter((link: LinkProp) => !link.mobileOnly)

  return (
    <nav className={styles.utilityNav}>
      <ul className={`list-reset ${styles.utilityNavMenu}`}>
        {desktopLinks.map((link) => (
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
                  loading="eager"
                  width={16}
                  height={16}
                  sizes="16px"
                  alt=""
                />
              )}
              <span className={styles.utilityNavLinkText}>{link.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
