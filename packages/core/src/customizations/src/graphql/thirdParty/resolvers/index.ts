import festivalCollections from './festivalCollections'
import fullVariantList from './fullVariantList'
import liturgicalCalResolver from './liturgicalCalendar'
import stateAndFestivalListsResolver from './stateAndFestivalLists'
import menuItemsResolver from './menuItems'
import departmentBannerResolver from './departmentBanner'
import inventory from './inventory'
import categoryTreeResolver from './categoryTree'
import orderFormResolver from './orderForm'
import collectionDetailsResolver from './collectionDetails'
import brandResolver from './brand'
import { assemblyOptions } from './assemblyOptions'
import { sessionToken } from './sessionToken'
import { createOrganizationERPResolver } from './createOrganizationERP'
import { addToCart } from './addToCart'
import { removeFromCart } from './removeFromCart'
import persistedCartResolvers from './persistedCart'
import getSubcollectionId from './subcollectionProducts'
import getCollectionName from './getCollectionName'

const resolvers = {
  Query: {
    ...categoryTreeResolver,
    ...menuItemsResolver,
    ...departmentBannerResolver,
    ...getSubcollectionId,
    ...getCollectionName,
    ...liturgicalCalResolver,
    ...stateAndFestivalListsResolver,
    ...collectionDetailsResolver,
    ...brandResolver,
    ...orderFormResolver.queries,
    sessionToken,
  },
  Mutation: {
    ...orderFormResolver.mutations,
    ...createOrganizationERPResolver.mutations,
    ...persistedCartResolvers.Mutation,
    addToCart,
    removeFromCart,
  },
  StoreProductGroup: {
    ...fullVariantList,
    ...festivalCollections,
  },
  StoreProduct: {
    ...inventory,
    assemblyOptions,
  },
}

export default resolvers
