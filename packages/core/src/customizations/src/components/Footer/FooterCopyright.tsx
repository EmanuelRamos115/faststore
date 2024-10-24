import { Link } from '@faststore/ui'
import classNames from 'classnames'

import HeaderLogo from '../Header/HeaderLogo'
import styles from './FooterCopyright.module.scss'
import type { Logo } from '../../@generated/cms/CustomFooter'

type CopyrightLinks = {
  href: string
  label: string
}

type FooterCopyrightProps = {
  copyrightInfo: string
  copyrightLinks: CopyrightLinks[]
  logo: Logo
}

const FooterCopyright = ({
  copyrightInfo,
  copyrightLinks,
  logo,
}: FooterCopyrightProps) => {
  return (
    <div className={styles.copyright}>
      <div className={classNames(styles.logo, styles.mobile)}>
        <HeaderLogo logo={logo} />
      </div>

      <p className={styles.copyrightText}>{copyrightInfo}</p>

      <div className={styles.copyrightLinks}>
        {copyrightLinks?.map((link) => {
          return (
            <Link variant="footer" href={link.href} key={link.label}>
              {link.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default FooterCopyright
