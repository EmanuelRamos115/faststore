import classNames from 'classnames'

import styles from './ColorOverlay.module.scss'

const colorOverlayClasses: Record<string, string> = {
  black: styles.colorOverlayBlack,
  maroon: styles.colorOverlayMaroon,
  darkGrey: styles.colorOverlayDarkGrey,
}

type ColorOverlayProps = {
  color: string
}

const ColorOverlay = ({ color }: ColorOverlayProps) => {
  return (
    <div
      className={classNames(
        styles.colorOverlay,
        colorOverlayClasses[color] || styles.colorOverlayBlack
      )}
    />
  )
}

export default ColorOverlay
