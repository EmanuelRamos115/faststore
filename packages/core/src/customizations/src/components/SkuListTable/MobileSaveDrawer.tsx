import { useEffect, useState } from 'react'
import { useUI, Loader } from '@faststore/ui'
import classNames from 'classnames'
import { useSession } from 'src/sdk/session'

import SaveIcon from '../Icons/General/SaveIcon'
import MobileDrawer from '../MobileDrawer/MobileDrawer'
import styles from './SkuListItem.module.scss'
import { useScroll } from '../../hooks/useScroll'
import AddToWishlistForm from '../Wishlist/components/forms/AddToList'
import AddToNewWishlistForm from '../Wishlist/components/forms/AddToNewList'
import ShowLists from '../Wishlist/components/forms/ShowLists'
import type { SkuItem } from '../Wishlist/AddToWishlistButton'
import { useWishlist } from '../../hooks/useWishlist'
import SavedIcon from '../Icons/General/SavedIcon'
import type { Wishlist } from '../../typings/wishlist'

type MobileSaveDrawerProps = {
  skus: SkuItem[]
}

type Product = {
  ID: number
  Image: string
  bundle: number
  department: string
  linkProduct: string
  nameProduct: string
  notes: string | null
  quantityProduct: number
  skuCodeReference: string
}

type WishlistItem = {
  createdIn: string
  email: string
  fieldsConfig: any | null
  id: string
  isPublic: boolean
  products: Product[]
  wishlistType: string
}

const MobileSaveDrawer = ({ skus }: MobileSaveDrawerProps) => {
  const { blockScroll, allowScroll } = useScroll()
  const { lists, revalidate, loading } = useWishlist()
  const [drawerIsOpen, setDrawerIsOpen] = useState(false)
  const [formStep, setFormStep] = useState<'add' | 'create' | 'list'>('add')
  const [alreadyInList, setAlreadyInList] = useState(false)

  const { person } = useSession()
  const { pushToast } = useUI()

  function checkProductsInWishlist(
    wishlist: Array<Wishlist | null>,
    skuItems: SkuItem[]
  ): boolean {
    if (wishlist.includes(null)) {
      return false
    }

    return wishlist.some(
      (item) =>
        item?.products?.some((product) => {
          const productId = product?.ID?.toString()

          return productId && skuItems.some((sku) => sku.skuId === productId)
        }) ?? false
    )
  }

  useEffect(() => {
    setAlreadyInList(checkProductsInWishlist(lists, skus))
  }, [lists])

  const handleDrawerOpen = () => {
    if (!person?.id) {
      pushToast({
        message: 'You need to log in before adding it to the list',
        status: 'INFO',
      })

      return
    }

    void revalidate()

    setDrawerIsOpen(true)
    blockScroll()
  }

  const handleDrawerClose = () => {
    setDrawerIsOpen(false)
    setFormStep('add')
    allowScroll()
  }

  const steps = {
    add: {
      title: 'Save to Wishlist',
      component: (
        <AddToWishlistForm
          skuItems={skus}
          onChangeStep={() => setFormStep('create')}
          onSubmit={() => handleDrawerClose()}
        />
      ),
    },
    create: {
      title: 'Create a name for the list',
      component: (
        <AddToNewWishlistForm
          skuItems={skus}
          onSubmit={() => handleDrawerClose()}
        />
      ),
    },
    list: {
      title: 'Saved to Wishlist(s)',
      component: <ShowLists onChangeStep={() => setFormStep('add')} />,
    },
  }

  const currentStep = steps[formStep]

  return (
    <>
      <button
        className={classNames(
          styles.mobileControlIconButton,
          styles.mobileSaveButton
        )}
        onClick={handleDrawerOpen}
        type="button"
      >
        {alreadyInList ? <SavedIcon /> : <SaveIcon />}
        <span className={styles.mobileControlButtonText}>
          {alreadyInList ? 'Saved' : 'Save'}
        </span>
      </button>

      {drawerIsOpen && (
        <MobileDrawer
          drawerIsOpen={drawerIsOpen}
          bodyContent={loading ? <Loader /> : currentStep?.component}
          footerContent={<></>}
          handleDrawerClose={handleDrawerClose}
          headerText={currentStep.title}
        />
      )}
    </>
  )
}

export default MobileSaveDrawer
