import styles from './FolderImprintingPreview.module.scss'
import { FOLDER_IMPRINTING_IMAGES } from '../../constants/folderImprinting'

type FolderImprintingPreviewProps = {
  refId: string
  middleLine1Text?: string
  middleLine2Text?: string
  upperLineText?: string
  lowerLineText?: string
}

const FolderImprintingPreview = ({
  refId,
  middleLine1Text = 'Middle Line 1',
  middleLine2Text = 'Middle Line 2',
  upperLineText = 'Upper Section',
  lowerLineText = 'Lower Section',
}: FolderImprintingPreviewProps) => {
  return (
    <div className={styles.wrapper}>
      <img
        className={styles.image}
        alt="Folder preview with custom text overlay"
        src={
          FOLDER_IMPRINTING_IMAGES[refId] || FOLDER_IMPRINTING_IMAGES.fallback
        }
      />

      <div className={styles.textOverlay}>
        <p className={styles.upperSection}>
          {upperLineText || 'Upper Section'}
        </p>
        <div className={styles.middleSection}>
          <p>{middleLine1Text || 'Middle Line 1'}</p>
          <p>{middleLine2Text || 'Middle Line 2'}</p>
        </div>
        <p className={styles.lowerSection}>
          {lowerLineText || 'Lower Section'}
        </p>
      </div>
    </div>
  )
}

export default FolderImprintingPreview
