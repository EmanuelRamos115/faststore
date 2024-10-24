import { gql } from '@generated/gql'

import type { OrganizationsState } from './types'

export const GET_ORGS_FROM_ORDER_FORM = gql(`
  query getOrderFormOrgs($id: String!) {
    orderForm(id: $id) {
      orderFormId
      marketingData {
      utmCampaign
      utmMedium
      }
    }
  }
`)

export const GetOrganizationsByEmail = gql(`
  query GetOrganizationsByEmail {
    getOrganizationsByEmail @context(provider: "vtex.b2b-organizations-graphql") {
      id
      costCenterName
      costId
      organizationName
      organizationStatus
      orgId
      role {
        id
        name
      }
    }
  }
`)

export const CheckUserPermission = gql(`
  query CheckUserPermission {
    checkUserPermission @context(provider: "vtex.storefront-permissions") {
      role {
        id
        name
        slug
      }
      permissions
    }
  }
`)

export const GetOrganizationByIdStorefront = gql(`
  query GetOrganizationByIdStorefront($orgId: ID) {
    getOrganizationByIdStorefront(id: $orgId) {
      id
      name
      status
      paymentTerms {
        id
        name
      }
    }
  }
`)

export const GetCostCenterByIdStorefront = gql(`
  query GetCostCenterByIdStorefront($orgId: ID) {
    getCostCenterByIdStorefront(id: $orgId) {
      id
      name
      organization
      paymentTerms {
        id
        name
      }
      addresses {
        addressId
        addressType
        addressQuery
        postalCode
        country
        receiverName
        city
        state
        street
        number
        complement
        neighborhood
        geoCoordinates
        reference
      }
      phoneNumber
      businessDocument
      stateRegistration
    }
  }
`)

export const GetB2BSettings = gql(`
  query GetB2BSettings {
    getB2BSettings @context(provider: "vtex.b2b-organizations-graphql") {
      uiSettings {
        showModal
      }
    }
  }
`)

export const SetCurrentOrganization = gql(`
  mutation SetCurrentOrganization($orgId: ID!, $costId: ID!) {
    setCurrentOrganization(orgId: $orgId, costId: $costId)
      @context(provider: "vtex.storefront-permissions") {
      status
      message
    }
  }
`)

export const defaultOrganization: OrganizationsState = {
  organizationOptions: [],
  costCenterOptions: [],
  organizationInput: '',
  costCenterInput: '',
  currentOrganization: '',
  currentRoleName: '',
  currentCostCenter: '',
  currentOrganizationStatus: '',
  dataList: [],
  totalDataList: 0,
}
