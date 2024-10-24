import PreviewModal from './PreviewModal'
import VideoIcon from '../Icons/General/VideoIcon'
import type { PreviewModalProps } from '../../typings/sku'
import { mediaUrl } from '../../../faststore.config'

const PreviewVideo = ({ productTitle, skuDetails }: PreviewModalProps) => {
  return (
    <PreviewModal
      productTitle={productTitle}
      skuDetails={skuDetails}
      button={{
        icon: <VideoIcon />,
        text: 'Video',
      }}
    >
      <iframe
        src={`${mediaUrl}?preview=true&product=${skuDetails.refId}&previewType=video`}
      />
    </PreviewModal>
  )
}

export default PreviewVideo
