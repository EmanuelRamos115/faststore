import Link from 'next/link'

import Image from '../Image/Image'
import styles from './HeaderLogo.module.scss'
import { breakpoints } from '../../constants/breakpoints'

export type HeaderLogoProps = {
  logo: {
    src: string
    alt: string
  }
}

export default function HeaderLogo({ logo }: HeaderLogoProps) {
  return (
    <div className={styles.logo}>
      <Link href="/" className={styles.logoLink}>
        <Image
          src={logo.src}
          alt={logo.alt}
          width={220}
          height={64}
          loading="eager"
          sizes={`(max-width: ${breakpoints.notebook}) 112px, 220px`}
          priority
          className={styles.logoImage}
        />
      </Link>
    </div>
  )
}
