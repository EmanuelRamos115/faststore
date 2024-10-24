import NewBadge from '../Badges/NewBadge'
import SaleBadge from '../Badges/SaleBadge'
import styles from './ProductSummary.module.scss'

type ProductSummaryDefaultSpecsProps = {
  newProduct?: boolean
  onSale?: boolean
}

const ProductSummaryDefaultSpecs = ({
  newProduct,
  onSale,
}: ProductSummaryDefaultSpecsProps) => {
  return (
    <div className={styles.badges}>
      {newProduct && <NewBadge />}
      {onSale && <SaleBadge />}
    </div>
  )
}

export default ProductSummaryDefaultSpecs
