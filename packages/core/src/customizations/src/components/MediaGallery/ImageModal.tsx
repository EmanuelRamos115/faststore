import { useState } from 'react'
import { Modal, ModalHeader, ModalBody } from '@faststore/ui'

import Image from '../Image/Image'
import { breakpoints } from '../../constants/breakpoints'
import styles from './MediaGallery.module.scss'

type ImageProp = {
  original: string
  originalAlt: string
  thumbnail: string
  thumbnailAlt: string
  loading: 'lazy' | 'eager'
  videoUrl?: string
}

type ImageModalProp = {
  isSheetMusic?: boolean
  image: ImageProp
}

const ImageModal = ({ isSheetMusic, image }: ImageModalProp) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const toggleState = () => {
    setModalIsOpen((prev) => !prev)
  }

  return (
    <div className={styles.modalWrapper}>
      <button
        className={styles.imageButton}
        onClick={toggleState}
        type="button"
        aria-label="Open image modal"
      >
        <Image
          src={image.original}
          alt={image.originalAlt}
          width={isSheetMusic ? 480 : 640}
          height={640}
          sizes={`(max-width: ${breakpoints.phonelg}) 96vw, (max-width: ${breakpoints.notebookwide}) 320px, 560px`}
          loading={image.loading}
        />
      </button>
      {modalIsOpen && (
        <Modal
          className={styles.modal}
          onDismiss={() => {
            setModalIsOpen((prev) => !prev)
          }}
        >
          <div className={styles.modalContentWrapper}>
            <div className={styles.modalHeaderWrapper}>
              <ModalHeader
                onClose={() => {
                  toggleState()
                }}
                title=""
              />
            </div>
            <ModalBody>
              {!image?.videoUrl ? (
                <Image
                  className={(styles.image, isSheetMusic && styles.sheetImage)}
                  src={image.original}
                  alt={image.originalAlt}
                  width={isSheetMusic ? 360 : 440}
                  height={440}
                  sizes={`(max-width: ${breakpoints.phonelg}) 96vw, (max-width: ${breakpoints.notebookwide}) 50vw, 40vw`}
                />
              ) : (
                <div className={styles.video}>
                  <iframe src={image?.videoUrl} />
                </div>
              )}
            </ModalBody>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default ImageModal
