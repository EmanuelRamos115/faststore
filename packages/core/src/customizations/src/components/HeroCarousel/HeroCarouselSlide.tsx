import Image from '../Image/Image'
import ColorOverlay from '../ColorOverlay/ColorOverlay'
import Action from '../Action/Action'
import styles from './HeroCarouselSlide.module.scss'
import type {
  Slide,
  ImageLoadingStrategy,
} from '../../@generated/cms/HeroCarousel'
import Heading from '../Heading/Heading'

type HeroCarouselStaticProps = {
  slide: Slide
  index: number
  imageLoadingStrategy: ImageLoadingStrategy
}

const HeroCarouselSlide = ({
  slide,
  index,
  imageLoadingStrategy,
}: HeroCarouselStaticProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.backgroundImageWrapper}>
        <Image
          className={styles.backgroundImage}
          src={slide.backgroundImage.src}
          fill={true}
          alt={slide.backgroundImage.alt ?? ''}
          loading={index === 0 ? imageLoadingStrategy : 'lazy'}
          priority={index === 0 && imageLoadingStrategy === 'eager'}
          sizes="100vw"
        />

        <ColorOverlay color={slide.colorOverlay} />
      </div>

      <div className={styles.contentWrapper}>
        <Heading level={1} uiStyle={1}>
          {slide.heading}
        </Heading>

        <p className={styles.slideCopy}>{slide.copy}</p>

        <div className={styles.ctasWrapper}>
          {slide.ctas.map((cta) => {
            return (
              <Action
                key={cta.text}
                as="a"
                href={cta.url}
                color={cta.color}
                size={cta.size}
              >
                {cta.text}
              </Action>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default HeroCarouselSlide
