import { gql } from '@generated/gql'
import { cartStore } from 'src/sdk/cart'
import { useLazyQuery } from 'src/sdk/graphql/useLazyQuery'
import type { CartItem } from 'src/sdk/cart/index'

import Action from '../Action/Action'
import SaveIcon from '../Icons/General/SaveIcon'
import Trashcan from '../Icons/General/Trashcan'
import styles from './CartDetailsItemsActions.module.scss'
import { useScroll } from '../../hooks/useScroll'
import AddToWishlistButton from '../Wishlist/AddToWishlistButton'

const REMOVE_EXTRA_PARTS = gql(`
  mutation removeExtraParts($skuGtin: String) {
    removeExtraParts(skuGtin: $skuGtin)
  }
`)

const REMOVE_FOLDER_IMPRINTING = gql(`
  mutation removeFolderImprinting($skuGtin: String) {
    removeFolderImprinting(skuGtin: $skuGtin)
  }
`)

type CartDetailsItemsActionsProps = {
  items: CartItem[]
}

const CartDetailsItemsActions = ({ items }: CartDetailsItemsActionsProps) => {
  const [removeExtraParts] = useLazyQuery(REMOVE_EXTRA_PARTS, {})
  const [removeFolderImprinting] = useLazyQuery(REMOVE_FOLDER_IMPRINTING, {})
  const { scrollToTop } = useScroll()

  const handleRemoveAll = () => {
    void removeExtraParts({})
    void removeFolderImprinting({})

    cartStore.emptyCart()

    scrollToTop()
  }

  return (
    <>
      <AddToWishlistButton
        skus={items.map((item) => {
          const skuId = item.itemOffered.sku
          const { quantity } = item

          return {
            skuId,
            quantity,
          }
        })}
        isCart={true}
      >
        <SaveIcon /> Save Cart to Wishlist
      </AddToWishlistButton>

      <Action
        className={styles.button}
        as="button"
        type="button"
        color="neutralLight"
        size="medium"
        onClick={handleRemoveAll}
      >
        <Trashcan /> Remove All Items
      </Action>
    </>
  )
}

export default CartDetailsItemsActions
