import HeroCarouselSlider from './HeroCarouselSlider'
import HeroCarouselSlide from './HeroCarouselSlide'
import type { HeroCarousel as HeroCarouselProps } from '../../@generated/cms/HeroCarousel'

const CAROUSEL_MINIMUM_SLIDES = 2

const HeroCarousel = ({ slides, imageLoadingStrategy }: HeroCarouselProps) => {
  const isCarousel = slides.length >= CAROUSEL_MINIMUM_SLIDES

  return isCarousel ? (
    <HeroCarouselSlider
      slides={slides}
      imageLoadingStrategy={imageLoadingStrategy}
    />
  ) : (
    <HeroCarouselSlide
      slide={slides[0]}
      imageLoadingStrategy={imageLoadingStrategy}
      index={0}
    />
  )
}

export default HeroCarousel
