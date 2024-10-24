import type { GetOrderFormQuery } from '@generated/graphql'
import type { Cart } from 'src/sdk/cart'

type GetCustomDataArgs = {
  orderForm: GetOrderFormQuery
  appId: string
}

export const getCustomDataFields = ({
  orderForm,
  appId,
}: GetCustomDataArgs):
  | Array<{
      key: string
      value: string
    }>
  | undefined => {
  return orderForm?.orderForm?.customData?.customApps.find(
    (app) => app.id === appId
  )?.fields
}

type CartItemSummary = {
  id: string
  quantity: number
}

export const cartsAreDeepSimilar = (cart1: Cart | null, cart2: Cart | null) => {
  if (
    (!cart1 && cart2) ||
    (cart1 && !cart2) ||
    cart1?.id !== cart2?.id ||
    cart1?.items?.length !== cart2?.items?.length ||
    cart1?.messages?.length !== cart2?.messages?.length
  ) {
    return false
  }

  const cart1Summary: CartItemSummary[] | undefined = cart1?.items.map(
    (it) => ({
      id: it.id,
      quantity: it.quantity,
    })
  )

  const cart2Summary: CartItemSummary[] | undefined = cart2?.items.map(
    (it) => ({
      id: it.id,
      quantity: it.quantity,
    })
  )

  for (const summary of cart1Summary ?? []) {
    if (
      !(cart2Summary ?? []).some(
        (it2) => summary.id === it2.id && summary.quantity === it2.quantity
      )
    ) {
      return false
    }
  }

  return true
}

export const cartsAreSimilar = (cart1: Cart | null, cart2: Cart | null) => {
  if (cart1?.id !== cart2?.id) {
    return false
  }

  return true
}
