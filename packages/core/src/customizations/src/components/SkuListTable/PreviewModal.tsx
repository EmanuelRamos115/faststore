import { Modal } from '@faststore/ui'
import classNames from 'classnames'
import { useState } from 'react'

import ExpandCollapseIcon from '../Icons/General/ExpandCollapseIcon'
import CloseIcon from '../Icons/General/CloseIcon'
import styles from './PreviewModal.module.scss'
import type { SkuDetailsFormatted } from '../../typings/sku'
import { useScroll } from '../../hooks/useScroll'

type PreviewModalProps = {
  productTitle: string
  skuDetails: SkuDetailsFormatted
  button: {
    icon: JSX.Element
    text: string
  }
  children: JSX.Element
  expanded?: boolean
  isScore?: boolean
}

const PreviewModal = ({
  productTitle,
  skuDetails,
  children,
  button,
  expanded = false,
  isScore = false,
}: PreviewModalProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { blockScroll, allowScroll } = useScroll()
  const [modalIsExpanded, setModalIsExpanded] = useState(expanded)

  const handleOpen = () => {
    setIsOpen(true)
    blockScroll()
  }

  const handleClose = () => {
    setIsOpen(false)
    allowScroll()
  }

  const toggleIsExpandedState = () => {
    setModalIsExpanded((prev) => !prev)
  }

  const resetAllStates = () => {
    handleClose()
    setModalIsExpanded(expanded)
  }

  return (
    <div>
      <button
        className={styles.triggerButton}
        onClick={handleOpen}
        type="button"
      >
        {button.icon}
        <span>{button.text}</span>
      </button>

      {isOpen && (
        <Modal onDismiss={resetAllStates}>
          <div className={styles.modal} data-is-expanded={modalIsExpanded}>
            <header className={styles.header}>
              <div className="visually-hidden">{button.text}</div>
              <button
                aria-label={modalIsExpanded ? 'Collapse Modal' : 'Expand Modal'}
                className={classNames(styles.headerButton, styles.expandButton)}
                onClick={() => toggleIsExpandedState()}
                type="button"
              >
                <ExpandCollapseIcon />
              </button>

              <div className={styles.headerDivider} />

              <button
                aria-label="Close modal"
                className={classNames(styles.headerButton, styles.closeButton)}
                onClick={() => resetAllStates()}
                type="button"
              >
                <CloseIcon />
              </button>
            </header>

            <div
              className={classNames(
                styles.content,
                isScore && styles.contentScore
              )}
            >
              <div className={styles.body}>{children}</div>

              {isScore && <div className={styles.scoreDivider}></div>}

              <div className={styles.footer}>
                <div className={styles.skuDetails}>
                  <p className={styles.productName}>{productTitle} </p>
                  <p className={styles.skuName}>{skuDetails.skuName}</p>

                  <p className={styles.skuSpecs}>
                    {skuDetails.refId && `SKU: ${skuDetails.refId}`}{' '}
                    {skuDetails.supplierId && (
                      <>
                        <span className={styles.skuSpecsDivider}>|</span>{' '}
                        <span>Supplier ID: {skuDetails.supplierId}</span>
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default PreviewModal
