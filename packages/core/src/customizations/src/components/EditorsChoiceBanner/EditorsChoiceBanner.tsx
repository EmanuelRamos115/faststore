import ColorOverlay from '../ColorOverlay/ColorOverlay'
import Heading from '../Heading/Heading'
import Image from '../Image/Image'
import styles from './EditorsChoiceBanner.module.scss'
import type { EditorsChoiceBanner as EditorsChoiceBannerProps } from '../../@generated/cms/EditorsChoiceBanner'

const EditorsChoiceBanner = ({
  backgroundImage,
  colorOverlay,
  copy,
  heading,
  icon,
}: EditorsChoiceBannerProps) => {
  return (
    <div className={styles.banner}>
      <div className={styles.backgroundImageWrapper}>
        <Image
          className={styles.backgroundImage}
          src={backgroundImage.src}
          alt={backgroundImage.alt ?? ''}
          width={1000}
          height={500}
          sizes="100vw"
          loading="eager"
        />

        <ColorOverlay color={colorOverlay} />
      </div>

      <div className={styles.contentWrapper}>
        <Image
          className={styles.icon}
          src={icon.src}
          alt={icon.alt ?? ''}
          width={150}
          height={22}
          sizes="288px"
        />

        <Heading level={1} uiStyle={2}>
          {heading}
        </Heading>

        <p>{copy}</p>
      </div>
    </div>
  )
}

export default EditorsChoiceBanner
