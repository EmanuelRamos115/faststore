import PreviewModal from './PreviewModal'
import { mediaUrl } from '../../../faststore.config'
import MusicNoteIcon from '../Icons/General/MusicNoteIcon'
import type { PreviewModalProps } from '../../typings/sku'

const PreviewRange = ({ productTitle, skuDetails }: PreviewModalProps) => {
  return (
    <PreviewModal
      productTitle={productTitle}
      skuDetails={skuDetails}
      button={{
        icon: <MusicNoteIcon />,
        text: 'Range',
      }}
    >
      <iframe
        src={`${mediaUrl}?preview=true&product=${skuDetails.refId}&previewType=mints`}
        width="550px"
        height="550px"
      />
    </PreviewModal>
  )
}

export default PreviewRange
