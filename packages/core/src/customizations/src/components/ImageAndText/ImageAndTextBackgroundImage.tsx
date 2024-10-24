import Image from '../Image/Image'
import type { ImageLoadingStrategy } from '../../@generated/cms/ImageAndText'
import { breakpoints } from '../../constants/breakpoints'

type ImageAndTextBackgroundImageProps = {
  imageSrc: string
  imageClasses: string
  imageLoadingStrategy: ImageLoadingStrategy
}

const ImageAndTextBackgroundImage = ({
  imageSrc,
  imageClasses,
  imageLoadingStrategy,
}: ImageAndTextBackgroundImageProps) => {
  return (
    <Image
      src={imageSrc}
      width={300}
      height={300}
      alt=""
      aria-hidden={true}
      className={imageClasses}
      loading={imageLoadingStrategy}
      sizes={`(max-width: ${breakpoints.tablet}) 100vw, 25vw`}
    />
  )
}

export default ImageAndTextBackgroundImage
