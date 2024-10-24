import Image from '../Image/Image'
import Action from '../Action/Action'
import ColorOverlay from '../ColorOverlay/ColorOverlay'
import Heading from '../Heading/Heading'
import styles from './Banner.module.scss'
import type { Banner as BannerProps } from '../../@generated/cms/Banner'

const Banner = ({
  backgroundImage,
  colorOverlay,
  copy,
  cta,
  heading,
  taglineImage,
  imageLoadingStrategy,
}: BannerProps) => {
  return (
    <div className={styles.banner}>
      <div className={styles.backgroundImageWrapper}>
        <Image
          className={styles.backgroundImage}
          src={backgroundImage.src}
          alt={backgroundImage.alt ?? ''}
          width={1000}
          height={500}
          loading={imageLoadingStrategy}
          priority={imageLoadingStrategy === 'eager'}
          sizes="100vw"
        />

        <ColorOverlay color={colorOverlay} />
      </div>

      <div className={styles.contentWrapper}>
        <Image
          className={styles.taglineImage}
          src={taglineImage.src}
          alt={taglineImage.alt ?? ''}
          loading={imageLoadingStrategy}
          width={288}
          height={13}
          sizes="288px"
        />

        <Heading level={2} uiStyle={5}>
          {heading}
        </Heading>

        <p>{copy}</p>

        <Action as="a" href={cta.url} color={cta.color} size={cta.size}>
          {cta.text}
        </Action>
      </div>
    </div>
  )
}

export default Banner
