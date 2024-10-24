import { gql } from '@generated/gql'
import type {
  CartItemInputV2,
  SyncPersistedCartMutation,
  SyncPersistedCartMutationVariables,
} from '@generated/graphql'
import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import type { Cart } from 'src/sdk/cart'
import { cartStore, useCart } from 'src/sdk/cart'
import { useSession } from 'src/sdk/session'
import { request } from 'src/sdk/graphql/request'

import { cartsAreDeepSimilar } from '../../utils/orderForm'
import usePersistedCart from '../../hooks/useCartPersistence'

const SYNC_PERSISTED_CART = gql(`
  mutation syncPersistedCart($email: String, $cartId: ID, $cart: CartInputV2, $cartSerialized: String, $revision: Int) {
    syncPersistedCart(email: $email, cartId: $cartId, cart: $cart, cartSerialized: $cartSerialized, revision: $revision) {
      revision
      cartSerialized
      cart {
        id
        messages {
          text
          status
        }
        items {
          id
          quantity
          price
          listPrice
          seller {
            identifier
          }
          itemOffered {
            sku
            name
            unitMultiplier
            gtin
            image {
              url
              alternateName
            }
            brand {
              name
            }
            isVariantOf {
              productGroupID
              name
              skuVariants {
                activeVariations
                slugsMap
                availableVariations
              }
            }
            additionalProperty {
              propertyID
              name
              value
              valueReference
            }
          }
        }
      }
    }
  }
`)

const CartSwitcher: FC = () => {
  const cart = useCart()
  const { person } = useSession()
  const { cartRevision, setCartRevision } = usePersistedCart()
  const [validationCount, setValidationCount] = useState(0)

  useEffect(() => {
    setValidationCount(validationCount + 1)
  }, [cart.isValidating])

  useEffect(() => {
    console.info('Cart persistence check in effect', {
      email: person?.email,
      cartItemCount: cart.items.length,
      validationCount,
      revision: cartRevision.localRevision,
      cart,
    })
    if (validationCount < 2 || !person?.email) {
      return
    }

    async function fetchPersistedCart() {
      const { syncPersistedCart: persistedCart = null } = await request<
        SyncPersistedCartMutation,
        SyncPersistedCartMutationVariables
      >(SYNC_PERSISTED_CART, {
        cartId: cart.id,
        email: person?.email ?? null,
        cart: {
          id: cart.id,
          items: cart.items as CartItemInputV2[],
          messages: cart.messages ?? [],
        },
        cartSerialized: JSON.stringify({
          id: cart.id,
          items: cart.items,
          messages: cart.messages ?? [],
        }),
        revision: cartRevision.localRevision + 1,
      })

      return persistedCart
    }

    fetchPersistedCart()
      .then((response) => {
        if (!response) {
          return
        }

        const correctCart = JSON.parse(response.cartSerialized ?? '{}') as Cart

        if (!cartsAreDeepSimilar(cart, correctCart)) {
          cartStore.set(correctCart)
        }

        if (cartRevision.localRevision !== (response.revision ?? 0)) {
          setCartRevision(response.revision ?? 0)
        }
      })
      .catch((e) => {
        console.error(e)
      })
  }, [person?.email, validationCount, cart.id])

  return <div />
}

export default CartSwitcher
