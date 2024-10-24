import classNames from 'classnames'

import BasicLibraryFull from '../Icons/Badges/Full/BasicLibrary'
import EditorsChoiceFull from '../Icons/Badges/Full/EditorsChoice'
import styles from './ProductSummary.module.scss'

type ProductSummarySheetMusicBadgesProps = {
  editorsChoice?: boolean
  basicLibrary?: boolean
}

const ProductSummarySheetMusicBadges = ({
  editorsChoice,
  basicLibrary,
}: ProductSummarySheetMusicBadgesProps) => {
  return (
    <ul className={`list-reset ${styles.badges}`}>
      {editorsChoice && (
        <li className={classNames(styles.badge, styles.badgeEditorsChoice)}>
          <EditorsChoiceFull />
        </li>
      )}
      {basicLibrary && (
        <li className={styles.badge}>
          <BasicLibraryFull />
        </li>
      )}
    </ul>
  )
}

export default ProductSummarySheetMusicBadges
