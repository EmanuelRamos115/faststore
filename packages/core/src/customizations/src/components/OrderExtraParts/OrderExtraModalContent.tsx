import { useState } from 'react'
import type { ServerProductQueryQuery } from '@generated/graphql'

import {
  getEprintExtraParts,
  getTraditionalExtraParts,
  hasEPrintExtraParts,
  hasTraditionalExtraParts,
} from '../../utils/productData'
import type { ClientManyProductsQueryQueryProductEdges } from '../../typings/product'
import AdditionalPartsForm from './AdditionalPartsForm'
import Disclaimer from './Disclaimer'
import EprintPartsForm from './EprintPartsForm'
import styles from './OrderExtraParts.module.scss'

type OrderExtraModalContentProps = {
  sku: ServerProductQueryQuery['product']['isVariantOf']['fullVariantList'][0]
  product:
    | ServerProductQueryQuery['product']
    | ClientManyProductsQueryQueryProductEdges[0]['node']
  setModalIsOpen: (arg: boolean) => void
}

const OrderExtraModalContent = ({
  sku,
  product,
  setModalIsOpen,
}: OrderExtraModalContentProps) => {
  const [showDisclaimer, setShowDisclaimer] = useState(false)

  const traditionalParts = getTraditionalExtraParts(product)
  const eParts = getEprintExtraParts(product)

  return (
    <div className={styles.modalContent}>
      {hasEPrintExtraParts(product, sku.gtin) ? (
        <EprintPartsForm
          product={product}
          parts={eParts}
          sku={sku}
          setModalIsOpen={setModalIsOpen}
        />
      ) : showDisclaimer ? (
        <Disclaimer setShowDisclaimer={setShowDisclaimer} />
      ) : hasTraditionalExtraParts(product, sku.gtin) ? (
        <AdditionalPartsForm
          product={product}
          setModalIsOpen={setModalIsOpen}
          setShowDisclaimer={setShowDisclaimer}
          sku={sku}
          traditionalParts={traditionalParts}
        />
      ) : null}
    </div>
  )
}

export default OrderExtraModalContent
