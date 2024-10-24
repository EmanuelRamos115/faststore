import type { SkuDetailsFormatted } from '../../typings/sku'
import styles from './SkuListItem.module.scss'

type MobileDrawerSkuDetailsProps = {
  skuDetails: SkuDetailsFormatted
}

const MobileDrawerSkuDetails = ({
  skuDetails,
}: MobileDrawerSkuDetailsProps) => {
  return (
    <div className={styles.mobileDrawerSkuDetails}>
      <p className={styles.mobileDrawerSkuName}>{skuDetails.skuName}</p>

      <p className={styles.mobileDrawerSkuSpecs}>
        <span>SKU: {skuDetails.refId}</span>

        {skuDetails.supplierId && (
          <span>Supplier ID: {skuDetails.supplierId}</span>
        )}
      </p>
    </div>
  )
}

export default MobileDrawerSkuDetails
