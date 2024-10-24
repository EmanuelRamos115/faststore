import styles from './ProductSummary.module.scss'
import type { TrustPilotWidgetProps } from '../TrustPilot/TrustPilotWidget'
import TrustPilotWidget from '../TrustPilot/TrustPilotWidget'

const ProductSummaryRating = ({
  trustPilotStarsConfig,
  skuId,
}: {
  trustPilotStarsConfig?: TrustPilotWidgetProps
  skuId: string
}) => {
  return (
    <div className={styles.rating}>
      <TrustPilotWidget
        templateId={trustPilotStarsConfig?.templateId}
        businessId={trustPilotStarsConfig?.businessId}
        stars={trustPilotStarsConfig?.stars}
        reviewLanguages={trustPilotStarsConfig?.reviewLanguages}
        theme={trustPilotStarsConfig?.theme}
        width={trustPilotStarsConfig?.width}
        height={trustPilotStarsConfig?.height}
        locale={trustPilotStarsConfig?.locale}
        skuId={skuId}
      />
    </div>
  )
}

export default ProductSummaryRating
