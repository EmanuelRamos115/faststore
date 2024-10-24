import classNames from 'classnames'

import styles from './FolderImprintingTotalPrice.module.scss'
import { useFormattedPrice } from '../../hooks/useFormattedPrice'

type FolderImprintingTotalPriceProps = {
  quantity: number
  imprintingPrice: number
  folderPrice: number
  totalPrice: number
}

const FolderImprintingTotalPrice = ({
  quantity,
  imprintingPrice,
  folderPrice,
  totalPrice,
}: FolderImprintingTotalPriceProps) => {
  const imprintingPriceFormatted = useFormattedPrice(imprintingPrice)

  return (
    <div className={styles.container}>
      <p className={styles.price}>
        <span className={styles.label}>Imprinting Cost: </span>
        <span className={styles.value}>
          {imprintingPrice === 0 && quantity >= 50
            ? 'FREE'
            : imprintingPriceFormatted}
        </span>
      </p>

      <p className={styles.price}>
        <span className={styles.label}>Folder Cost: </span>
        <span className={styles.value}>{useFormattedPrice(folderPrice)}</span>
      </p>

      <p className={styles.price}>
        <span className={styles.label}>Folder/Imprinting Total: </span>
        <span className={classNames(styles.value, styles.valueTotal)}>
          {useFormattedPrice(totalPrice)}
        </span>
      </p>
    </div>
  )
}

export default FolderImprintingTotalPrice
