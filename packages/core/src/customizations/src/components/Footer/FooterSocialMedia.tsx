import Link from 'next/link'

import Facebook from '../Icons/SocialMedia/Facebook'
import Instagram from '../Icons/SocialMedia/Instagram'
import Linkedin from '../Icons/SocialMedia/Linkedin'
import X from '../Icons/SocialMedia/X'
import Youtube from '../Icons/SocialMedia/Youtube'
import styles from './FooterSocialMedia.module.scss'
import { getValidExternalUrl } from '../../utils/urls'
import type { SocialMedia } from '../../@generated/cms/CustomFooter'

const socialIcons = {
  Facebook,
  Instagram,
  Linkedin,
  X,
  Youtube,
}

type FooterSocialMediaProps = {
  socialLinks: SocialMedia
}

const FooterSocialMedia = ({ socialLinks }: FooterSocialMediaProps) => {
  return (
    <div className={styles.social}>
      {socialLinks.map((link) => {
        const key = link.icon.icon as keyof typeof socialIcons
        const SocialIcon = socialIcons[key]

        return (
          <Link
            className={styles.socialIcon}
            href={getValidExternalUrl(link.url, 'https')}
            key={link.icon.icon}
            aria-label={link.alt}
            rel="noreferrer"
            target="_blank"
          >
            {SocialIcon && <SocialIcon />}
          </Link>
        )
      })}
    </div>
  )
}

export default FooterSocialMedia
