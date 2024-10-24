import Link from 'next/link'

import type { DepartmentBanner as DepartmentBannerProps } from '../../@generated/cms/DepartmentBanner'
import styles from './DepartmentBanner.module.scss'
import { breakpoints } from '../../constants/breakpoints'
import Image from '../Image/Image'
import Heading from '../Heading/Heading'

const DepartmentBanner = ({
  heading,
  links,
  imageLoadingStrategy,
}: DepartmentBannerProps) => {
  return (
    <div className={styles.section}>
      {heading && (
        <Heading level={1} uiStyle={2} className={styles.heading}>
          {heading}
        </Heading>
      )}

      {links && (
        <div className={styles.links}>
          <ul className="list-reset">
            {links.map((link) => (
              <li key={link.text}>
                <Link href={link.url}>
                  <Image
                    src={link.imageSrc}
                    height={200}
                    width={384}
                    alt={link.imageAlt}
                    sizes={`(max-width: ${breakpoints.tabletlg}) calc(100vw / 2 - 3rem), (max-width: ${breakpoints.layoutContent}) calc(100vw / 4 - 7rem), calc(${breakpoints.layoutContent} / 4 - 7rem)`}
                    loading={imageLoadingStrategy}
                  />
                  <p>{link.text}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default DepartmentBanner
