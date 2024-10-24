import { Modal, ModalHeader, ModalBody } from '@faststore/ui'
import { useState } from 'react'

import FolderImprintingPreview from './FolderImprintingPreview'
import { useScroll } from '../../hooks/useScroll'
import styles from './FolderImprintingPreviewModal.module.scss'

type FolderImprintingPreviewModalProps = {
  refId: string
  index: number
  middleLine1Text?: string
  middleLine2Text?: string
  upperLineText?: string
  lowerLineText?: string
}

const FolderImprintingPreviewModal = ({
  refId,
  index,
  middleLine1Text,
  middleLine2Text,
  upperLineText,
  lowerLineText,
}: FolderImprintingPreviewModalProps) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const { blockScroll, allowScroll } = useScroll()

  const toggleState = () => {
    setModalIsOpen((prev) => !prev)
    if (!modalIsOpen) {
      blockScroll()
    } else {
      allowScroll()
    }
  }

  return (
    <div className={styles.modalWrapper}>
      <button className={styles.button} onClick={toggleState} type="button">
        Preview
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
                title={`Folder ${index} Preview`}
              />
            </div>
            <ModalBody>
              <FolderImprintingPreview
                refId={refId}
                middleLine1Text={middleLine1Text}
                middleLine2Text={middleLine2Text}
                upperLineText={upperLineText}
                lowerLineText={lowerLineText}
              />
            </ModalBody>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default FolderImprintingPreviewModal
