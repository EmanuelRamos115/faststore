import type { MutationRemoveFromCartArgs } from '@generated/graphql'

import type { Context } from './context'
import { NotFoundError } from '../../../utils/NotFoundError'
import type { OrderFormInputItem } from '../../../typings/orderForm'

export async function removeFromCart(
  _: unknown,
  args: MutationRemoveFromCartArgs,
  context: Context
) {
  const [, , orderFormId] =
    context.headers.cookie
      ?.split(';')
      .map((c) => c.trim().split('='))
      .find(([key]) => key === 'checkout.vtex.com') ?? []

  if (!orderFormId) {
    throw new Error('No cart found')
  }

  const existingCart = await context.clients.commerce.checkout.orderForm({
    id: orderFormId,
  })

  let updated = 0
  const items = existingCart.items.map((item, idx): OrderFormInputItem => {
    if (item.id === args.skuId) {
      updated += 1

      return {
        id: item.id,
        index: idx,
        seller: item.seller,
        quantity: 0,
      }
    }

    return {
      id: item.id,
      index: idx,
      seller: item.seller,
      quantity: item.quantity,
      attachments: item.attachments,
    }
  })

  if (updated === 0) {
    throw new NotFoundError('Item not found in cart', { status: 404 })
  }

  await context.clients.commerce.checkout.updateOrderFormItems({
    id: orderFormId,
    orderItems: items,
    shouldSplitItem: false,
  })

  return true
}
