import ColorOverlay from '../ColorOverlay/ColorOverlay'
import Heading from '../Heading/Heading'
import Image from '../Image/Image'
import styles from './LiveEventsDetailsBanner.module.scss'
import type { LiveEventsDetailsBanner as LiveEventsDetailsBannerProps } from '../../@generated/cms/LiveEventsDetailsBanner'

const LiveEventsDetailsBanner = ({
  backgroundImage,
  colorOverlay,
  text,
}: LiveEventsDetailsBannerProps) => {
  return (
    <section className={styles.banner}>
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
        <p className={styles.sponsor}>{text.sponsor}</p>

        <div className={styles.headingsWrapper}>
          <Heading level={1} uiStyle={6}>
            {text.title}
          </Heading>

          <Heading level={2} uiStyle={2}>
            {text.tagline}
          </Heading>
        </div>

        <div>
          <Heading level={3} uiStyle={6}>
            {text.location}
          </Heading>

          <Heading level={3} uiStyle={6}>
            {text.date}
          </Heading>
        </div>
      </div>
    </section>
  )
}

export default LiveEventsDetailsBanner
