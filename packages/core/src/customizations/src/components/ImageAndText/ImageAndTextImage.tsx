import Image from '../Image/Image'
import { breakpoints } from '../../constants/breakpoints'
import styles from './ImageAndTextImage.module.scss'
import type { ImageLoadingStrategy } from '../../@generated/cms/ImageAndText'
import type { FastStoreImage } from '../../typings/faststore'

type ImageAndTextImageProps = {
  image: FastStoreImage
  imageLoadingStrategy: ImageLoadingStrategy
}

const ImageAndTextImage = ({
  image,
  imageLoadingStrategy,
}: ImageAndTextImageProps) => {
  return (
    <div className={styles.wrapper}>
      <Image
        src={image.src}
        alt={image.alt}
        width={414}
        height={248}
        loading={imageLoadingStrategy}
        priority={imageLoadingStrategy === 'eager'}
        sizes={`(max-width: ${breakpoints.tablet}) 100vw, 50vw`}
      />
    </div>
  )
}

export default ImageAndTextImage
