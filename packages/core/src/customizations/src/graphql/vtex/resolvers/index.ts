import { print, type GraphQLResolveInfo } from 'graphql'
import { type Resolver } from '@faststore/api'

import createOrganizationResolver from './createOrganization'

const ioGraphQLUrl = `https://master--jwpepperdev.myvtex.com/_v/private/graphql/v1`

const nativeIOResolver: Resolver = async (
  root,
  args,
  ctx,
  info: GraphQLResolveInfo
) => {
  const options: RequestInit = {
    method: 'POST',
    headers: {
      cookie: ctx.headers.cookie,
      accept: 'application/json',
      'content-type': 'application/json',
      'x-b2b-senderapp': 'vtex.b2b-organizations@1.x',
    },
    body: JSON.stringify({
      query: print(info.operation).replace(/(\r\n|\n|\r)/gm, ''),
      variables: args ?? {},
    }),
  }

  const response = await fetch(ioGraphQLUrl, options)

  const { data, errors } = (await response.json()) as {
    data?: Record<string, unknown>
    errors: Array<{
      message: string
      extensions: unknown
      operationId: string
      requestId: string
    }>
  }

  if (errors && errors.length > 0) {
    throw new Error(errors[0].message)
  }

  return data?.[info.fieldName]
}

export default {
  Query: {
    getWishlist: nativeIOResolver,
    getWishlistsByEmail: nativeIOResolver,
    getAppSettings: nativeIOResolver,
    getOrganizationRequests: nativeIOResolver,
    getOrganizationRequestById: nativeIOResolver,
    getOrganizations: nativeIOResolver,
    getOrganizationsWithoutSalesManager: nativeIOResolver,
    getOrganizationById: nativeIOResolver,
    getOrganizationByIdStorefront: nativeIOResolver,
    getCostCenters: nativeIOResolver,
    getCostCentersByOrganizationId: nativeIOResolver,
    getCostCentersByOrganizationIdStorefront: nativeIOResolver,
    getCostCenterById: nativeIOResolver,
    getCostCenterByIdStorefront: nativeIOResolver,
    getUsers: nativeIOResolver,
    getUsersPaginated: nativeIOResolver,
    getPaymentTerms: nativeIOResolver,
    getOrganizationsByEmail: nativeIOResolver,
    checkOrganizationIsActive: nativeIOResolver,
    getSalesChannels: nativeIOResolver,
    getBinding: nativeIOResolver,
    getMarketingTags: nativeIOResolver,
    getB2BSettings: nativeIOResolver,
    getSellers: nativeIOResolver,
    getRole: nativeIOResolver,
    hasUsers: nativeIOResolver,
    listRoles: nativeIOResolver,
    getFeaturesByModule: nativeIOResolver,
    listFeatures: nativeIOResolver,
    getUser: nativeIOResolver,
    getB2BUser: nativeIOResolver,
    checkCustomerSchema: nativeIOResolver,
    getUserByEmail: nativeIOResolver,
    listAllUsers: nativeIOResolver,
    listUsers: nativeIOResolver,
    listUsersPaginated: nativeIOResolver,
    checkImpersonation: nativeIOResolver,
    checkUserPermission: nativeIOResolver,
    getSessionWatcher: nativeIOResolver,
    getUsersByEmail: nativeIOResolver,
    getActiveUserByEmail: nativeIOResolver,
  },

  Mutation: {
    ...createOrganizationResolver.Mutation,
    createWishlist: nativeIOResolver,
    updateWishlist: nativeIOResolver,
    deleteWishlist: nativeIOResolver,
    saveAppSettings: nativeIOResolver,
    createOrganizationRequest: nativeIOResolver,
    updateOrganizationRequest: nativeIOResolver,
    deleteOrganizationRequest: nativeIOResolver,
    createOrganizationAndCostCentersWithId: nativeIOResolver,
    createCostCenter: nativeIOResolver,
    createCostCenterWithId: nativeIOResolver,
    updateOrganization: nativeIOResolver,
    updateCostCenter: nativeIOResolver,
    createCostCenterAddress: nativeIOResolver,
    updateCostCenterAddress: nativeIOResolver,
    deleteOrganization: nativeIOResolver,
    deleteCostCenter: nativeIOResolver,
    saveUser: nativeIOResolver,
    addUser: nativeIOResolver,
    removeUserWithEmail: nativeIOResolver,
    updateUser: nativeIOResolver,
    removeUser: nativeIOResolver,
    impersonateUser: nativeIOResolver,
    impersonateB2BUser: nativeIOResolver,
    saveSalesChannels: nativeIOResolver,
    setMarketingTags: nativeIOResolver,
    saveB2BSettings: nativeIOResolver,
    sessionWatcher: nativeIOResolver,
    saveRole: nativeIOResolver,
    deleteRole: nativeIOResolver,
    addCostCenterToUser: nativeIOResolver,
    addOrganizationToUser: nativeIOResolver,
    setActiveUserByOrganization: nativeIOResolver,
    deleteUser: nativeIOResolver,
    setCurrentOrganization: nativeIOResolver,
    ignoreB2BSessionData: nativeIOResolver,
    subscribeNewsletter: nativeIOResolver,
  },
}
