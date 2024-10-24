import { Modal, ModalHeader, ModalBody } from '@faststore/ui'
import { useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { useRouter } from 'next/router'
import type { ServerProductQueryQuery } from '@generated/graphql'

import OrderExtraModalContent from './OrderExtraModalContent'
import { useScroll } from '../../hooks/useScroll'
import styles from './OrderExtraModal.module.scss'
import { getTraditionalExtraParts } from '../../utils/productData'
import type { ClientManyProductsQueryQueryProductEdges } from '../../typings/product'

type OrderExtraModal = {
  buttonNode: ReactNode
  sku: ServerProductQueryQuery['product']['isVariantOf']['fullVariantList'][0]
  product:
    | ServerProductQueryQuery['product']
    | ClientManyProductsQueryQueryProductEdges[0]['node']
  isDesktop?: boolean
}
const OrderExtraModal = ({
  buttonNode,
  sku,
  product,
  isDesktop,
}: OrderExtraModal) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const { blockScroll, allowScroll } = useScroll()
  const { query } = useRouter()
  const traditionalParts = getTraditionalExtraParts(product)

  const toggleState = () => {
    setModalIsOpen((prev) => !prev)
    if (!modalIsOpen) {
      blockScroll()
    } else {
      allowScroll()
    }
  }

  useEffect(() => {
    if (!query.extrapart || modalIsOpen || !isDesktop) {
      return
    }

    const hasExtraPart = traditionalParts.find(
      (item) => item.gtin.includes(sku.gtin) && item.gtin === query.extrapart
    )

    if (hasExtraPart) {
      toggleState()
    }
  }, [query])

  return (
    <div className={styles.modalWrapper}>
      <button
        className={styles.orderButton}
        onClick={toggleState}
        type="button"
      >
        {buttonNode}
      </button>
      {modalIsOpen && (
        <Modal
          className={styles.modal}
          onDismiss={() => {
            setModalIsOpen((prev) => !prev)
            allowScroll()
          }}
        >
          <div className={styles.modalContentWrapper}>
            <div className={styles.modalHeaderWrapper}>
              <ModalHeader
                onClose={() => {
                  toggleState()
                }}
                title="Order Extra Part"
              />
            </div>
            <ModalBody>
              <OrderExtraModalContent
                sku={sku}
                product={product}
                setModalIsOpen={setModalIsOpen}
              />
            </ModalBody>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default OrderExtraModal
