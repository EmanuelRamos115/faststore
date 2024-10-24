import classNames from 'classnames'

import ChevronLeft from '../Icons/General/ChevronLeft'
import ChevronRight from '../Icons/General/ChevronRight'
import styles from './HeroCarouselArrowButtons.module.scss'

// custom arrows docs: https://react-slick.neostack.com/docs/example/custom-arrows

type ArrowProps = {
  className?: string
  onClick?: () => void
}

const PrevArrow = ({ className, onClick }: ArrowProps) => {
  return (
    <button
      className={classNames(
        className,
        styles.sliderButton,
        styles.sliderButtonPrev
      )}
      onClick={onClick}
      type="button"
    >
      <ChevronLeft /> Previous Slide
    </button>
  )
}

const NextArrow = ({ className, onClick }: ArrowProps) => {
  return (
    <button
      className={classNames(
        className,
        styles.sliderButton,
        styles.sliderButtonNext
      )}
      onClick={onClick}
      type="button"
    >
      <ChevronRight /> Next Slide
    </button>
  )
}

export { PrevArrow, NextArrow }
