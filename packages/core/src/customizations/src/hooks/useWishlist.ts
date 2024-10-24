import { gql } from '@generated/gql'
import type {
  CreateListMutation,
  ListByIdQueryVariables,
  ViewListsQueryVariables,
} from '@generated/graphql'
import { request } from 'src/sdk/graphql/request'
import { useQuery } from 'src/sdk/graphql/useQuery'
import { useSession } from 'src/sdk/session'

import type {
  AddToListMutationResponse,
  ListByIdQueryResponse,
  ProductVariant,
  UpdateListItemMutationResponse,
  UpdateListItemMutationVariables,
  ViewListsQueryResponse,
} from '../typings/wishlist'
import { useAddToWishlistEvent } from './useAddToWishlistEvent'

export const viewListQuery = gql(`
  query ViewLists {
    getWishlistsByEmail {
      id
      email
      wishlistType
      products {
        ID
        Image
        linkProduct
        nameProduct
        quantityProduct
        skuCodeReference
        department
        bundle
        notes
      }
      isPublic
      fieldsConfig {
        department
        description
      }
      createdIn
    }
  }
`)

export const listByIdQuery = gql(`
  query listById($id: ID!) {
    getWishlist(id: $id) {
       id
      email
      wishlistType
      products {
        ID
        Image
        linkProduct
        nameProduct
        quantityProduct
        skuCodeReference
        department
        bundle
        notes
      }
      isPublic
      fieldsConfig {
        department
        description
      }
      createdIn
    }
  }
`)

export const createListMutation = gql(`
  mutation CreateList($wishlist: WishlistInput!) {
    createWishlist(wishlist: $wishlist) {
      Id
    }
  }
`)

export const addListMutation = gql(`
  mutation AddToList($wishlist: WishlistInput) {
    updateWishlist(wishlist: $wishlist) {
      id
    }
  }
`)

export const updateListItemMutation = gql(`
  mutation UpdateListItem($wishlist: WishlistInput) {
    updateWishlist(wishlist: $wishlist) {
      id
    }
  }
`)

export const updateListMutation = gql(`
  mutation UpdateList($wishlist: WishlistInput) {
    updateWishlist(wishlist: $wishlist) {
      id
    }
  }
`)

const mapProductsToWishlist = (
  products: ProductVariant[] = [],
  notes?: string
) =>
  products.map((sku) => ({
    ID: Number(sku?.sku ?? ''),
    Image: sku?.image[0].url ?? '',
    linkProduct: `https://portal.vtexcommercestable.com.br/${sku?.slug ?? ''}/p`,
    nameProduct:
      sku?.name && sku.isVariantOf.name
        ? `${sku.isVariantOf.name} - ${sku.name}`
        : sku?.name ?? '',
    quantityProduct: sku.quantityProduct,
    skuCodeReference: sku?.gtin ?? '',
    department: sku.department,
    bundle: 1,
    notes: notes ?? '',
  }))

const mapProductsToAnalytics = (products: ProductVariant[] = []) =>
  products.map((sku) => {
    const {
      sku: skuID,
      gtin,
      name,
      quantityProduct,
      isVariantOf,
      offers: {
        offers: [{ price, listPrice }],
      },
    } = sku

    return {
      itemOffered: {
        isVariantOf: {
          productGroupID: isVariantOf.productGroupID,
          name: isVariantOf.name,
        },
        brand: {
          name,
        },
        sku: skuID,
        name,
        gtin,
      },
      quantity: quantityProduct,
      price,
      listPrice,
    }
  })

export function useWishlist() {
  const { person } = useSession()
  const { sendAddToWishlistEvent } = useAddToWishlistEvent()

  const {
    data: lists,
    mutate,
    isLoading,
  } = useQuery<ViewListsQueryResponse, ViewListsQueryVariables>(
    viewListQuery,
    {},
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      doNotRun: !person?.id,
    }
  )

  const createList = async (
    name: string,
    products: ProductVariant[] = [],
    notes?: string
  ) => {
    const { createWishlist: list } = await request<CreateListMutation>(
      createListMutation,
      {
        wishlist: {
          wishlistType: name,
          products: mapProductsToWishlist(products, notes),
          isPublic: false,
        },
      }
    )

    sendAddToWishlistEvent(mapProductsToAnalytics(products))

    await mutate()

    return list
  }

  const addToList = async (
    listId: string,
    products: ProductVariant[],
    notes?: string
  ) => {
    const { getWishlist: wishlist } = await request<
      ListByIdQueryResponse,
      ListByIdQueryVariables
    >(listByIdQuery, { id: listId })

    if (!wishlist) {
      throw new Error('Wishlist not found')
    }

    const { updateWishlist: list } = await request<AddToListMutationResponse>(
      addListMutation,
      {
        wishlist: {
          id: wishlist.id,
          products: [
            ...(wishlist.products ?? []),
            ...mapProductsToWishlist(products, notes),
          ],
          wishlistType: wishlist.wishlistType,
          isPublic: wishlist.isPublic,
          fieldsConfig: wishlist.fieldsConfig,
        },
      }
    )

    sendAddToWishlistEvent(mapProductsToAnalytics(products))

    await mutate()

    return list
  }

  const removeFromList = async (listId: string, skuIds: string[]) => {
    const { getWishlist: wishlist } = await request<
      ListByIdQueryResponse,
      ListByIdQueryVariables
    >(listByIdQuery, { id: listId })

    if (!wishlist || !wishlist?.products?.length) {
      throw new Error('Wishlist not found')
    }

    const newWishlistProducts = wishlist.products.filter(
      (product) => product?.ID && !skuIds.includes(product?.ID?.toString())
    )

    const { updateWishlist: list } = await request<
      UpdateListItemMutationResponse,
      UpdateListItemMutationVariables
    >(updateListItemMutation, {
      wishlist: {
        id: wishlist.id,
        products: newWishlistProducts,
        wishlistType: wishlist.wishlistType,
        isPublic: wishlist.isPublic,
        fieldsConfig: wishlist.fieldsConfig,
      },
    })

    await mutate()

    return list
  }

  const updateListItem = async (listId: string, skuId: string, notes = '') => {
    const { getWishlist: wishlist } = await request<
      ListByIdQueryResponse,
      ListByIdQueryVariables
    >(listByIdQuery, { id: listId })

    if (!wishlist || !wishlist.products?.length) {
      throw new Error('Wishlist not found')
    }

    const updatedProduct = {
      ...wishlist.products.find(
        (product) => product?.ID && product?.ID.toString() === skuId
      ),
      notes,
    }

    const index = wishlist.products.findIndex(
      (prod) => prod?.ID?.toString() === skuId
    )

    if (index !== -1) {
      wishlist?.products?.splice(index, 1)
    }

    const { updateWishlist: list } = await request<
      UpdateListItemMutationResponse,
      UpdateListItemMutationVariables
    >(updateListItemMutation, {
      wishlist: {
        id: listId,
        products: [...wishlist.products, updatedProduct],
        wishlistType: wishlist.wishlistType,
        isPublic: wishlist.isPublic,
        fieldsConfig: wishlist.fieldsConfig,
      },
    })

    await mutate()

    return list
  }

  const updateList = async (listId: string, name?: string, notes?: string) => {
    const wishlist = lists?.getWishlistsByEmail?.find(
      (listItem) => listItem?.id === listId
    )

    if (!wishlist) {
      throw new Error('Wishlist not found')
    }

    const { updateWishlist: list } = await request<
      UpdateListItemMutationResponse,
      UpdateListItemMutationVariables
    >(updateListMutation, {
      wishlist: {
        id: wishlist.id,
        wishlistType: name?.replace(' ', '_') ?? null,
        fieldsConfig: {
          ...wishlist.fieldsConfig,
          description: notes ?? null,
        },
        products: wishlist.products,
        isPublic: wishlist.isPublic,
      },
    })

    await mutate()

    return list
  }

  return {
    lists: lists?.getWishlistsByEmail ?? [],
    addToList,
    removeFromList,
    createList,
    updateListItem,
    updateList,
    revalidate: mutate,
    loading: isLoading || !person?.id,
  }
}
