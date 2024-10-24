import type {
  ServerProductQueryQuery,
  ClientProductQueryQuery,
} from '@generated/graphql'

import { getSpec } from '../../utils/productData'
import styles from './ReproducibilityMessage.module.scss'
import type { ProductFullVariantList } from '../../typings/product'

type ReproducibilityProps = {
  product:
    | ServerProductQueryQuery['product']
    | ClientProductQueryQuery['product']
    | ProductFullVariantList[0]
}

const ReproducibilityMessage = ({ product }: ReproducibilityProps) => {
  const reproducibleText = getSpec(product.additionalProperty, 'Reproducible')

  const isReproducible = !!reproducibleText

  return isReproducible ? (
    <p className={styles.reproducible}>Reproducible</p>
  ) : null
}

export default ReproducibilityMessage
