import type { ReactNode } from 'react'
import { useState } from 'react'
import { IconButton, Loader, useUI } from '@faststore/ui'
import { useSession } from 'src/sdk/session'

import { useWishlist } from '../../hooks/useWishlist'
import AddToNewWishlistForm from './components/forms/AddToNewList'
import AddToWishlistForm from './components/forms/AddToList'
import ListModal from './components/ListModal'
import SaveIcon from '../Icons/General/SaveIcon'
import SavedIcon from '../Icons/General/SavedIcon'
import styles from './AddToWishlistButton.module.scss'
import ShowLists from './components/forms/ShowLists'

type Props = {
  skus: SkuItem[]
  type?: string
  isCart?: boolean
  children?: ReactNode
}

export type SkuItem = {
  skuId: string
  quantity: number
}

const AddToWishlistButton = ({ skus, type, isCart, children }: Props) => {
  const { lists, revalidate, loading } = useWishlist()
  const [formStep, setFormStep] = useState<'add' | 'create' | 'list'>('add')
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const { person } = useSession()
  const { pushToast } = useUI()

  const alreadyInList =
    !isCart &&
    lists.some((list) =>
      list?.products?.some((item) => item && String(item.ID) === skus[0].skuId)
    )

  const openModal = () => {
    if (!person?.id) {
      pushToast({
        message: 'You need to log in before adding it to the list',
        status: 'INFO',
      })

      return
    }

    void revalidate()

    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
    setFormStep('add')
  }

  const steps = {
    add: {
      title: 'Save to Wishlist',
      component: (
        <AddToWishlistForm
          skuItems={skus}
          onChangeStep={() => setFormStep('create')}
          onSubmit={() => closeModal()}
        />
      ),
    },
    create: {
      title: 'Create a name for the list',
      component: (
        <AddToNewWishlistForm skuItems={skus} onSubmit={() => closeModal()} />
      ),
    },
    list: {
      title: 'Saved to Wishlist(s)',
      component: <ShowLists onChangeStep={() => setFormStep('add')} />,
    },
  }

  const currentStep = steps[formStep]

  return (
    <div className={styles.wishlistButtonContainer}>
      {children ? (
        <button
          className={`${styles.textButton} ${styles.cartAddListButton}`}
          type="button"
          onClick={openModal}
          aria-label="Save Cart to Wishlist"
        >
          {children}
        </button>
      ) : type === 'text' ? (
        <button
          className={styles.textButton}
          type="button"
          onClick={openModal}
          aria-label={
            alreadyInList ? 'Remove from wishlist' : 'Add to wishlist'
          }
        >
          Save to Wishlist
        </button>
      ) : (
        <IconButton
          type="button"
          onClick={openModal}
          icon={alreadyInList ? <SavedIcon /> : <SaveIcon />}
          aria-label={
            alreadyInList ? 'Remove from wishlist' : 'Add to wishlist'
          }
          data-fs-add-wishlist-icon
          data-fs-add-wishlist-icon-selected={alreadyInList}
        />
      )}

      {modalIsOpen && (
        <ListModal closeModal={closeModal} title={currentStep?.title ?? ''}>
          {loading ? <Loader /> : currentStep?.component}
        </ListModal>
      )}
    </div>
  )
}

export default AddToWishlistButton
