import Image from '../Image/Image'
import FooterContact from './FooterContact'
import FooterCopyright from './FooterCopyright'
import FooterLinks from './FooterLinks'
import FooterNewsletter from './FooterNewsletter'
import Over145YearsButton from '../Over145YearsButton/Over145YearsButton'
import BrightedgeBlock from '../Brightedge/BrightedgeBlock'
import styles from './Footer.module.scss'
import { colors } from '../../constants/colors'
import type { CustomFooter as FooterProps } from '../../@generated/cms/CustomFooter'

const Footer = ({
  background,
  copyrightInfo,
  copyrightLinks,
  footerLinks,
  footerSocial,
  logo,
}: FooterProps) => {
  return (
    <footer
      id="footer"
      className={styles.footer}
      style={{
        background: background?.image
          ? `url(${background.image}), center / cover no-repeat`
          : `linear-gradient(127.04deg, ${colors.darkGrey.hexCode} 23.79%, ${colors.maroon.hexCode} 100.75%)`,
      }}
    >
      <div className={styles.footerContainer}>
        <div className={styles.menuLinks}>
          <div className={styles.headerButton}>
            <Over145YearsButton />
          </div>

          <FooterLinks footerLinks={footerLinks} />

          <BrightedgeBlock />

          <div className={styles.logoFooterContainer}>
            <Image
              className={styles.logoFooterImage}
              src={logo.src}
              alt={logo.alt ?? 'jwpepper-logo'}
              height="77"
              width="244"
              sizes="244px"
            />

            <span className={styles.logoFooterDivider}>|</span>

            <span className={styles.logoFooterTagline}>{logo.tagline}</span>
          </div>
        </div>

        <div className={styles.infoCard}>
          <FooterNewsletter socialLinks={footerSocial.socialLinks} />

          <FooterContact />
        </div>
      </div>

      <FooterCopyright
        copyrightInfo={copyrightInfo}
        logo={logo}
        copyrightLinks={copyrightLinks}
      />
    </footer>
  )
}

export default Footer
