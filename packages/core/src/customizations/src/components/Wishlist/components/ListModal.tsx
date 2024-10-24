import React, { type ReactNode } from 'react'
import { Modal, ModalHeader, ModalBody } from '@faststore/ui'

import styles from './ListModal.module.scss'

type ListModalProps = {
  children?: ReactNode
  title: string
  closeModal: () => void
}

function ListModal({ children, title, closeModal }: ListModalProps) {
  return (
    <Modal overlayProps={{ onClick: closeModal }}>
      <div className={styles.modalContentWrapper}>
        <ModalHeader
          title={title}
          onClose={closeModal}
          closeBtnProps={{ variant: 'secondary' }}
        />
        <ModalBody>{children}</ModalBody>
      </div>
    </Modal>
  )
}

export default ListModal
