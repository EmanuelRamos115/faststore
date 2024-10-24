import type { CartItem } from 'src/sdk/cart/index'

import type { SkuItem } from '../Wishlist/AddToWishlistButton'
import AddToWishlistButton from '../Wishlist/AddToWishlistButton'

type CartItemWishlistProps = {
  item: CartItem
}

const CartItemWishlist = ({ item }: CartItemWishlistProps) => {
  const skuItem: SkuItem = {
    skuId: item.itemOffered.sku,
    quantity: item.quantity,
  }

  return (
    <>
      <AddToWishlistButton skus={[skuItem]} type={'text'} />
    </>
  )
}

export default CartItemWishlist
