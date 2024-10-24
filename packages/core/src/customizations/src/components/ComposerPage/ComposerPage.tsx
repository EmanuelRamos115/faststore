import { NextSeo } from 'next-seo'
import Link from 'next/link'

import styles from './ComposerPage.module.scss'
import type { ComposerPage as ComposerPageProps } from '../../@generated/cms/ComposerPage'
import Image from '../Image/Image'
import MissingAvatarImage from '../ComposersList/MissingAvatarImage'
import Heading from '../Heading/Heading'
import TruncatedText from '../TruncatedText/TruncatedText'
import ComposerPageCollection from './ComposerPageCollection'
import ComposerPageCatalog from './ComposerPageCatalog'
import MyScoreHeaderBanner from '../MyScoreHeaderBanner/MyScoreHeaderBanner'
import { getValidExternalUrl } from '../../utils/urls'
import { useMyscoreComposerData } from '../../hooks/useMyscoreComposer'

const ComposerPage = ({ banner, imageLoadingStrategy }: ComposerPageProps) => {
  const composer = useMyscoreComposerData()

  const name = [composer.first_name, composer.last_name]
    .filter(Boolean)
    .join(' ')

  return (
    <div>
      <NextSeo title={`${name} | My Score`} />

      <div className={styles.header}>
        {banner.backgroundImage?.src && (
          <Image
            className={styles.headerBackgroundImage}
            src={banner.backgroundImage.src}
            alt=""
            width={1000}
            height={441}
            sizes="100vw"
            loading={imageLoadingStrategy}
          />
        )}

        <div className={styles.headerContent}>
          <div className={styles.headerBanner}>
            <MyScoreHeaderBanner
              logo={banner.logo}
              linkOne={banner.linkOne}
              linkTwo={banner.linkTwo}
              buttonOne={banner.buttonOne}
              buttonTwo={banner.buttonTwo}
              imageLoadingStrategy={imageLoadingStrategy}
            />
          </div>
          <div className={styles.headerComposer}>
            <div className={styles.avatar}>
              {composer.photo ? (
                <img
                  className={styles.avatarImage}
                  src={composer.photo}
                  height={305}
                  width={305}
                  alt="Composer's avatar"
                  loading={imageLoadingStrategy}
                />
              ) : (
                <MissingAvatarImage className={styles.avatarImage} />
              )}
            </div>

            <div className={styles.composerDetails}>
              <div>
                <Heading className={styles.name} level={1} uiStyle={2}>
                  {name}
                </Heading>

                {composer.formal_name && (
                  <p className={styles.formalName}>{composer.formal_name}</p>
                )}
              </div>

              {composer.socials.length > 0 && (
                <ul className={`list-reset ${styles.socialLinks}`}>
                  {composer.socials.map((social) => (
                    <li key={social.iconAltText}>
                      <Link href={getValidExternalUrl(social.url, 'http')}>
                        <img
                          className={styles.socialImage}
                          src={social.icon}
                          alt={social.iconAltText}
                          width={28}
                          height={28}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.contentWrapper}>
        <p className={styles.bio}>
          {composer.bio && (
            <TruncatedText
              copy={composer.bio}
              charCount={480}
              maxLines={10}
              expandable={true}
            />
          )}
        </p>

        {composer.collections && (
          <div className={styles.collections}>
            {composer.collections.map((collection) => (
              <ComposerPageCollection collection={collection} />
            ))}
          </div>
        )}
      </div>

      {composer.vtex_brand_id && (
        <ComposerPageCatalog brandId={composer.vtex_brand_id} />
      )}
    </div>
  )
}

export default ComposerPage
