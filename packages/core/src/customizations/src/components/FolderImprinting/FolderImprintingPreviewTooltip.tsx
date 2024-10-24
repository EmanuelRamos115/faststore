import FolderImprintingPreview from './FolderImprintingPreview'
import styles from './FolderImprintingPreviewTooltip.module.scss'

type FolderImprintingPreviewTooltipProps = {
  refId: string
  middleLine1Text?: string
  middleLine2Text?: string
  upperLineText?: string
  lowerLineText?: string
}

const FolderImprintingPreviewTooltip = ({
  refId,
  middleLine1Text,
  middleLine2Text,
  upperLineText,
  lowerLineText,
}: FolderImprintingPreviewTooltipProps) => {
  return (
    <div className={styles.tooltipWrapper}>
      <FolderImprintingPreview
        refId={refId}
        middleLine1Text={middleLine1Text}
        middleLine2Text={middleLine2Text}
        upperLineText={upperLineText}
        lowerLineText={lowerLineText}
      />
      <p className={styles.label}>Preview</p>
    </div>
  )
}

export default FolderImprintingPreviewTooltip
