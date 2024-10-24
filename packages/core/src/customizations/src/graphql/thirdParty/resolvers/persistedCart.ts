import type { MutationSyncPersistedCartArgs, CartV2 } from '@generated/graphql'
import type { Cart } from 'src/sdk/cart'

import type { Context } from './context'
import { getOrderFormIdFromContext } from './orderForm'
import { secureSubdomain } from '../../../../faststore.config'
import { getSessionFromContext } from './sessionToken'

const persistedCartResolvers = {
  Mutation: {
    syncPersistedCart: async (
      _: unknown,
      args: MutationSyncPersistedCartArgs,
      context: Context
    ) => {
      const orderFormId = getOrderFormIdFromContext(context) ?? ''
      const { email, revision } = args

      const cartId = (args.cartId?.length ?? 0) > 0 ? args.cartId : orderFormId
      const { cartSerialized } = args
      const cart = JSON.parse(cartSerialized ?? '{}') as Cart

      if (cart && (cart?.id?.length ?? 0) === 0) {
        cart.id = cartId as string
      }

      if (!email) {
        return
      }

      const token = getSessionFromContext(context)

      if (!token) {
        throw new Error('Unauthorized')
      }

      const response = await fetch(
        `${secureSubdomain}/_v/private/switch-persisted-cart`,
        {
          method: 'post',
          headers: {
            'content-type': 'application/json',
            cookie: `vtex_session=${token}`,
          },
          body: JSON.stringify({
            cartId,
            cart,
            email,
            token,
            revision,
            plainCartId: args.cartId,
          }),
        }
      )

      const cartResponse = (await response.json()) as {
        cart: CartV2
        revision: number
        cartPersistenceDisabled: boolean
      }

      if (
        !cartResponse ||
        cartResponse.cartPersistenceDisabled ||
        !cartResponse.cart
      ) {
        return null
      }

      await context.clients.commerce.checkout.orderForm({
        id: cartResponse.cart.id as string,
      })

      return {
        cart: cartResponse.cart,
        cartSerialized: JSON.stringify(cartResponse.cart),
        revision: cartResponse.revision,
      }
    },
  },
}

export default persistedCartResolvers
