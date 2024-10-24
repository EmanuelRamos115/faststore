import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import HeroCarouselSlide from './HeroCarouselSlide'
import { NextArrow, PrevArrow } from './HeroCarouselArrowButtons'
import styles from './HeroCarouselSlider.module.scss'
import type {
  Slide,
  ImageLoadingStrategy,
} from '../../@generated/cms/HeroCarousel'

type HeroCarouselSliderProps = {
  slides: Slide[]
  imageLoadingStrategy: ImageLoadingStrategy
}

const HeroCarouselSlider = ({
  slides,
  imageLoadingStrategy,
}: HeroCarouselSliderProps) => {
  return (
    <div className={styles.heroCarouselSlider}>
      <Slider
        appendDots={(dots) => {
          return (
            <div role="region" aria-label="Hero Carousel" aria-live="polite">
              <ul className={`list-reset ${styles.dotWrapper}`}>{dots}</ul>
            </div>
          )
        }}
        arrows
        customPaging={(index) => {
          // ideally we'd use: <li role="group" aria-label={`Slide ${index}`}>...</li>
          // but any jsx here is automatically wrapped in a <li> by react-slick
          // so, the html would be: li > li > button :(
          return (
            <button className={styles.dotButton} type="button">
              Slide {index}
            </button>
          )
        }}
        dots
        infinite
        nextArrow={<NextArrow />}
        prevArrow={<PrevArrow />}
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
      >
        {slides.map((slide, index) => {
          return (
            <HeroCarouselSlide
              key={slide.heading}
              slide={slide}
              index={index}
              imageLoadingStrategy={imageLoadingStrategy}
            />
          )
        })}
      </Slider>
    </div>
  )
}

export default HeroCarouselSlider
