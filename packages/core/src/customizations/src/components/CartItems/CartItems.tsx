import { useState, useEffect } from 'react'
import { gql } from '@generated/gql'
import { useCart } from 'src/sdk/cart'
import { useQuery } from 'src/sdk/graphql/useQuery'
import type { GetOrderFormCartQuery } from '@generated/graphql'
import type { CartItem as CartItemProp } from 'src/sdk/cart/index'

import CartItem from './CartItem'
import { parseJson } from '../../utils/parseJson'
import { getCustomDataFields } from '../../utils/orderForm'
import type {
  CustomDataOpenExtraParts,
  CustomDataFolderImprinting,
} from '../../typings/orderForm'
import type { CustomCartItem, CartItemOption } from '../../typings/cart'
import { getLatestItems } from '../../utils/productData'
import { useUpdateMinQuantity } from '../../hooks/useUpdateMinQuantity'

const GET_ORDER_FORM = gql(`
  query getOrderFormCart($id: String!) {
    orderForm(id: $id) {
      orderFormId
      items {
        id
        quantity
        seller
        parentItemIndex
        parentAssemblyBinding
        listPrice
        sellingPrice
        skuName
      }
      customData {
        customApps {
          id
          major
          fields {
            key
            value
          }
        }
      }
    }
  }
`)

const addOptionsToItems = (
  items: CartItemProp[],
  orderFormData?: GetOrderFormCartQuery
): CustomCartItem[] => {
  const freeItemIndices: number[] = []

  orderFormData?.orderForm.items.forEach((orderFormItem, i) => {
    if (orderFormItem.sellingPrice === 0) {
      freeItemIndices.push(i)
    }
  })

  return items.map((item, i): CustomCartItem => {
    freeItemIndices.forEach((freeItemIndex) => {
      if (i >= freeItemIndex) {
        i++
      }
    })

    const options = orderFormData?.orderForm.items
      .filter((orderFormItem) => orderFormItem.parentItemIndex === i)
      .map((option) => {
        return {
          ...option,
          quantity: item.quantity,
        }
      })

    return {
      ...item,
      options,
    }
  })
}

export const removeAssemblyOptionLineItems = (
  items: CustomCartItem[] | CartItemProp[]
): CustomCartItem[] | CartItemProp[] => {
  return items.filter((item) => !/FIM|FIU|FIL/.test(item.itemOffered.gtin))
}

const mergeAssemblyOptions = (
  optionsA?: CartItemOption[],
  optionsB?: CartItemOption[]
): CartItemOption[] | undefined => {
  if (!optionsA && !optionsB) {
    return undefined
  }

  return [...(optionsA ?? []), ...(optionsB ?? [])].reduce(
    (acc: CartItemOption[], option): CartItemOption[] => {
      const optionMatch = acc.find(({ id }) => id === option.id)

      if (optionMatch) {
        optionMatch.quantity += option.quantity
      } else {
        acc.push(option)
      }

      return acc
    },
    []
  )
}

const mergeFolderLineItems = (items: CustomCartItem[]): CustomCartItem[] => {
  return items.reduce((acc: CustomCartItem[], item): CustomCartItem[] => {
    const splitItem = acc?.find(({ id }) => id === item.id)

    if (splitItem) {
      splitItem.quantity += item.quantity

      const mergedOptions = mergeAssemblyOptions(
        splitItem.options,
        item.options
      )

      splitItem.options = mergedOptions
    } else {
      acc.push(item)
    }

    return acc
  }, [])
}

export const getTotalQuantity = (items: CartItemProp[]): number => {
  const filteredItems = removeAssemblyOptionLineItems(items) as CartItemProp[]

  return (
    filteredItems?.reduce((n, item) => Number(n) + Number(item.quantity), 0) ??
    0
  )
}

const CartItems = ({ isCartPage = false }: { isCartPage?: boolean }) => {
  useUpdateMinQuantity()
  const { items, id } = useCart()

  const { data: orderFormData } = useQuery<GetOrderFormCartQuery>(
    GET_ORDER_FORM,
    {
      id,
    }
  )

  const [openExtraParts, setOpenExtraParts] =
    useState<CustomDataOpenExtraParts>()

  const [folderImprinting, setFolderImprinting] =
    useState<CustomDataFolderImprinting>()

  const [validateImprinting, setValidateImprinting] = useState(false)
  const [cartItems, setCartItems] = useState<CustomCartItem[]>()

  useEffect(() => {
    if (!orderFormData) {
      return
    }

    const openExtraPartsString = getCustomDataFields({
      orderForm: orderFormData,
      appId: 'extraparts',
    })?.[0].value

    const folderImprintingString = getCustomDataFields({
      orderForm: orderFormData,
      appId: 'folderimprinting',
    })?.[0].value

    if (openExtraPartsString) {
      setOpenExtraParts(
        parseJson<CustomDataOpenExtraParts>(openExtraPartsString)
      )
    }

    if (folderImprintingString) {
      setFolderImprinting(
        parseJson<CustomDataFolderImprinting>(folderImprintingString)
      )
    }

    const cartItemsModified = mergeFolderLineItems(
      removeAssemblyOptionLineItems(addOptionsToItems(items, orderFormData))
    )

    const latestItems = getLatestItems(cartItemsModified)

    setCartItems(isCartPage ? cartItemsModified : latestItems)
  }, [orderFormData, items])

  return (
    <>
      {cartItems?.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          isCartPage={isCartPage}
          openExtraParts={openExtraParts?.[item.itemOffered.gtin]}
          folderImprinting={folderImprinting?.[item.itemOffered.gtin]}
          validateImprinting={validateImprinting}
          setValidateImprinting={setValidateImprinting}
        />
      ))}
    </>
  )
}

export default CartItems
