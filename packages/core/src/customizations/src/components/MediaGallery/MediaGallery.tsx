import ImageGallery from 'react-image-gallery'

import { VIDEO_COVER_IMAGE } from '../../constants/global'
import ImageModal from './ImageModal'
import { useDeviceInfo } from '../../hooks/useDeviceInfo'
import { mediaUrl } from '../../../faststore.config'
import styles from './MediaGallery.module.scss'

type MediaGalleryImage = {
  original: string
  thumbnail: string
  thumbnailClass?: string
  originalAlt: string
  thumbnailAlt: string
  originalTitle?: string
  thumbnailTitle?: string
  thumbnailLabel?: string
  srcSet?: string
  sizes?: string
  originalHeight?: number
  originalWidth?: number
  videoUrl?: string
}

type MediaGalleryProps = {
  isSheetMusic?: boolean
  images: MediaGalleryImage[]
  refId?: string
  isVideoAvailable?: boolean
}

type ImageProp = {
  original: string
  originalAlt: string
  thumbnail: string
  thumbnailAlt: string
  loading: 'lazy' | 'eager'
  videoUrl?: string
}

const MediaGallery = ({
  isSheetMusic,
  images,
  refId,
  isVideoAvailable,
}: MediaGalleryProps) => {
  const { device } = useDeviceInfo()

  const renderItem = (image: ImageProp) => {
    return <ImageModal isSheetMusic={isSheetMusic} image={image} />
  }

  const videoUrl = refId
    ? `${mediaUrl}?preview=true&product=${refId}&previewType=video`
    : ''

  const mediaItems = [...images]

  if (isVideoAvailable) {
    mediaItems.splice(1, 0, {
      original: VIDEO_COVER_IMAGE,
      originalAlt: 'product-video',
      thumbnail: VIDEO_COVER_IMAGE,
      thumbnailAlt: 'product-video-thumbnail',
      videoUrl,
    })
  }

  return (
    <div className={styles.gallery}>
      <ImageGallery
        items={mediaItems.map((image) => ({
          ...image,
          originalClass: styles.slide,
        }))}
        showNav={false}
        showFullscreenButton={false}
        thumbnailPosition="left"
        showPlayButton={false}
        showBullets={images.length > 1}
        showThumbnails={device === 'desktop'}
        additionalClass={
          isSheetMusic ? styles.sheetMusic : styles.defaultProduct
        }
        renderItem={renderItem}
      />
    </div>
  )
}

export default MediaGallery
