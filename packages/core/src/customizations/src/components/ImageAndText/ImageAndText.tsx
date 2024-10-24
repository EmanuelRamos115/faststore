import classNames from 'classnames'
import type { CSSProperties } from 'react'

import ImageAndTextContent from './ImageAndTextContent'
import ImageAndTextImage from './ImageAndTextImage'
import ImageAndTextBackgroundImage from './ImageAndTextBackgroundImage'
import styles from './ImageAndText.module.scss'
import type { ImageAndText as ImageAndTextProps } from '../../@generated/cms/ImageAndText'

const setBackgroundImageDesktopPositionXClass = (position: string) => {
  switch (position) {
    case 'left':
      return styles.backgroundImageDesktopPositionXLeft

    case 'center':
      return styles.backgroundImageDesktopPositionXCenter

    case 'right':
      return styles.backgroundImageDesktopPositionXRight

    default:
      return styles.backgroundImageDesktopPositionXCenter
  }
}

const setBackgroundImageDesktopPositionYClass = (position: string) => {
  switch (position) {
    case 'top':
      return styles.backgroundImageDesktopPositionYTop

    case 'center':
      return styles.backgroundImageDesktopPositionYCenter

    case 'bottom':
      return styles.backgroundImageDesktopPositionYBottom

    default:
      return styles.backgroundImageDesktopPositionYCenter
  }
}

const setBackgroundImageMobilePositionXClass = (position: string) => {
  switch (position) {
    case 'left':
      return styles.backgroundImageMobilePositionXLeft

    case 'center':
      return styles.backgroundImageMobilePositionXCenter

    case 'right':
      return styles.backgroundImageMobilePositionXRight

    default:
      return styles.backgroundImageMobilePositionXCenter
  }
}

const setBackgroundImageMobilePositionYClass = (position: string) => {
  switch (position) {
    case 'top':
      return styles.backgroundImageMobilePositionYTop

    case 'center':
      return styles.backgroundImageMobilePositionYCenter

    case 'bottom':
      return styles.backgroundImageMobilePositionYBottom

    default:
      return styles.backgroundImageMobilePositionYCenter
  }
}

export type LayoutProps = {
  layout: 'fullBleed' | 'contained'
}

const ImageAndText = ({
  content,
  image,
  imageLoadingStrategy,
  layout = 'fullBleed',
}: ImageAndTextProps & LayoutProps) => {
  const contentStyles: CSSProperties = {
    backgroundColor: content.background?.color ?? 'transparent',
    color: content.textColor,
  }

  let backgroundImageClasses = ''

  if (content.background) {
    const {
      desktopPositionX,
      desktopPositionY,
      mobilePositionX,
      mobilePositionY,
    } = content.background

    backgroundImageClasses = classNames(
      styles.backgroundImage,
      setBackgroundImageDesktopPositionXClass(desktopPositionX),
      setBackgroundImageDesktopPositionYClass(desktopPositionY),
      setBackgroundImageMobilePositionXClass(mobilePositionX),
      setBackgroundImageMobilePositionYClass(mobilePositionY)
    )
  }

  return (
    <div
      className={classNames(
        styles.row,
        image.imagePosition === 'left' ? styles.imageLeft : styles.imageRight,
        layout === 'contained' ? styles.contained : styles.fullBleed,
        content.background?.mobilePositionY === 'bottom' &&
          styles.mobileBackgroundBottom
      )}
    >
      <div className={classNames(styles.box, styles.boxImage)}>
        <ImageAndTextImage
          image={image}
          imageLoadingStrategy={imageLoadingStrategy}
        />
      </div>

      <div
        className={classNames(styles.box, styles.boxContent)}
        style={contentStyles}
      >
        {content.background?.src && (
          <ImageAndTextBackgroundImage
            imageSrc={content.background.src}
            imageClasses={backgroundImageClasses}
            imageLoadingStrategy={imageLoadingStrategy}
          />
        )}
        <ImageAndTextContent content={content} layout={layout} />
      </div>
    </div>
  )
}

export default ImageAndText
