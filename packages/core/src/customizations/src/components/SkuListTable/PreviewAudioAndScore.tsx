import PreviewModal from './PreviewModal'
import AudioAndScorePreviewIcon from '../Icons/General/AudioAndScorePreviewIcon'
import { mediaUrl } from '../../../faststore.config'
import type { PreviewModalProps } from '../../typings/sku'

type PreviewAudioAndScoreProps = PreviewModalProps

const PreviewAudioAndScore = ({
  productTitle,
  skuDetails,
}: PreviewAudioAndScoreProps) => {
  return (
    <PreviewModal
      productTitle={productTitle}
      skuDetails={skuDetails}
      button={{
        icon: <AudioAndScorePreviewIcon />,
        text: 'Preview',
      }}
      expanded
      isScore
    >
      <iframe
        width="550px"
        height="550px"
        src={`${mediaUrl}?preview=true&product=${skuDetails.refId}`}
      />
    </PreviewModal>
  )
}

export default PreviewAudioAndScore
