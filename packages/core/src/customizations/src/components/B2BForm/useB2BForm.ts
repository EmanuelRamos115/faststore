import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { gql } from '@generated/gql'
import { useUI } from '@faststore/ui'
import { request } from 'src/sdk/graphql/request'
import { validateSession } from 'src/sdk/session'
import type {
  CreateOrganizationErpMutation,
  CreateOrganizationErpMutationVariables,
  CreateOrganizationMutation,
  CreateUserWithEmailMutation,
} from '@generated/graphql'

import type { B2BSchema } from './schema'
import storeConfig from '../../../faststore.config'
import useB2BOrganizations from '../B2BOrganizations/hooks/useB2BOrganizations'

const createOrganizationMutation = gql(`
  mutation CreateOrganization($input: OrganizationInput!, $notifyUsers: Boolean) {
    createOrganization(input: $input, notifyUsers: $notifyUsers) @context(provider: "vtex.b2b-organizations-graphql") {
      id
      costCenterId
      href
      status
    }
  }
`)

const createUserWithEmailMutation = gql(`
  mutation CreateUserWithEmail($roleId: ID!, $name: String!,$email: String!, $orgId: ID!,$costId: ID!) {
    createUserWithEmail(roleId: $roleId,name: $name,email: $email,orgId: $orgId, costId: $costId) @context(provider: "vtex.b2b-organizations-graphql"){
      status
    }
  }
`)

const createOrganizationERPMutation = gql(`
  mutation CreateOrganizationERP($input: CreateOrganizationERPInput) {
    createOrganizationERP(input: $input) {
      message
      requestId
    }
  }
`)

const queryCostCenter = gql(`
  query CostCenterByOrgId($id: ID) {
    getCostCentersByOrganizationId(id: $id) {
      data {
        id
      }
    }
  }
`)

type Person = {
  id: string
  email: string
  givenName: string
  familyName: string
}

function useIsAuth(
  cb?: (person: Person | null) => void,
  dependecies: unknown[] = []
) {
  const [person, setPerson] = useState<Person | null>()

  useEffect(() => {
    void validateSession(storeConfig.session).then((s) => {
      if (s) {
        setPerson(s.person)
        cb?.(s.person)
      }
    })
  }, dependecies)

  return person
}

function paymentTermsSwitch(orgType: string) {
  if (
    orgType === 'Fine Arts School' ||
    orgType === 'College' ||
    orgType === 'Public Library' ||
    orgType === 'Military' ||
    orgType === 'School District (Board of Ed)' ||
    orgType === 'School'
  ) {
    return [
      { id: 999999, name: 'Credit card' },
      { id: 17, name: 'Promissory' },
    ]
  }

  if (
    orgType === 'Church' ||
    orgType === 'Community Group' ||
    orgType === 'Professional Ensemble' ||
    orgType === 'Private Music Studio' ||
    orgType === 'Booster Group' ||
    orgType === 'Home School' ||
    orgType === 'Music Department' ||
    orgType === 'Acquisitions' ||
    orgType === 'Bookstore' ||
    orgType === 'Other'
  ) {
    return [{ id: 999999, name: 'Credit card' }]
  }

  return [{ id: 999999, name: 'Credit card' }]
}

function mapCustomFields(data: B2BSchema) {
  return [
    {
      name: 'Billing Address Line 1',
      type: 'text',
      value: data.billing.street ?? '',
    },
    {
      name: 'Billing Address Line 2',
      type: 'text',
      value: data.billing.complement ?? '',
    },
    {
      name: 'Billing Address City',
      type: 'text',
      value: data.billing.city ?? '',
    },
    {
      name: 'Billing Address State',
      type: 'text',
      value: data.billing.state ?? '',
    },
    {
      name: 'Billing Address Country',
      type: 'text',
      value: data.billing.country ?? '',
    },
    {
      name: 'Billing Address Phone',
      type: 'text',
      value: data.billing.phone ?? '',
    },

    {
      name: 'Billing Address Zip Code',
      type: 'text',
      value: data.billing.postalCode ?? '',
    },
  ]
}

function mapCostCenter(data: B2BSchema, person: Person) {
  return {
    name: data.billing.hasBilling ? data.billing.name : data.account.name ?? '',
    paymentTerms: paymentTermsSwitch(
      data.billing.hasBilling && data.billing.classification
        ? data.billing.classification
        : data.account.classification
    ),
    phoneNumber: data.account.phone ?? '',
    businessDocument: '',
    stateRegistration: data.address.state ?? '',
    address: {
      addressType: '',
      addressQuery: '',
      country: data.address.country ?? '',
      postalCode: data.address.postalCode ?? '',
      street: data.address.street ?? '',
      city: data.address.city ?? '',
      state: data.address.state ?? '',
      receiverName: data.account.attention ?? '',
      complement: data.address.complement ?? '',
      neighborhood: '',
      number: '',
      reference: '',
      geoCoordinates: [] as number[],
    },
    user: {
      email: person.email,
      firstName: person.givenName ?? '',
    },
    customFields: data.billing.hasBilling ? mapCustomFields(data) : [],
  }
}

function mapFormToOrganizationRequest(data: B2BSchema, person: Person) {
  return {
    name: data.account.name ?? '',
    tradeName: data.account.name ?? '',
    b2bCustomerAdmin: {
      email: person.email,
      firstName: person.givenName ?? '',
      lastName: person.familyName ?? '',
    },
    defaultCostCenter: mapCostCenter(data, person),
    paymentTerms: [
      { id: 999999, name: 'Credit card' },
      { id: 17, name: 'Promissory' },
    ],
  }
}

function mapFormToErpSHIPOrganizationRequest(data: B2BSchema) {
  const shippingCostCenter = data.address

  const shippingCostCenterAddress =
    shippingCostCenter?.street && shippingCostCenter?.complement
      ? `${shippingCostCenter.street} ${shippingCostCenter.complement}`
      : shippingCostCenter?.street

  return {
    ACCOUNT_NAME: data.account.name,
    ATTENTION: data.account.attention,
    ADDRESS: shippingCostCenterAddress ?? '',
    CITY: shippingCostCenter.city,
    COUNTRY: shippingCostCenter.country,
    POSTAL_CODE: shippingCostCenter.postalCode,
    STATE_PROVINCE: shippingCostCenter.state,
    CUSTOMER_CLASSIFICATION: data.account.classification,
    ORGANIZATION_DETAIL: data.account.detail,
    CUSTOMER_ROLE: `${data.account.interest ?? ''} ${data.account.role ?? ''}`,
    PHONE_NUMBER: data.account.phone,
  }
}

function mapFormToErpBILLOrganizationRequest(data: B2BSchema) {
  const billingCostCenter = data.billing

  const billingCostCenterAddress =
    billingCostCenter?.street && billingCostCenter?.complement
      ? `${billingCostCenter.street} ${billingCostCenter.complement}`
      : billingCostCenter?.street

  return {
    ACCOUNT_NAME: billingCostCenter.name ?? '',
    ATTENTION: billingCostCenter.attention ?? '',
    ADDRESS: billingCostCenterAddress ?? '',
    CITY: billingCostCenter.city ?? '',
    COUNTRY: billingCostCenter.country ?? '',
    POSTAL_CODE: billingCostCenter.postalCode ?? '',
    STATE_PROVINCE: billingCostCenter.state ?? '',
    CUSTOMER_CLASSIFICATION: billingCostCenter.classification ?? '',
    ORGANIZATION_DETAIL: data.account.detail,
    CUSTOMER_ROLE: `${data.account.interest ?? ''} ${data.account.role ?? ''}`,
    PHONE_NUMBER: billingCostCenter.phone ?? '',
  }
}

export function useB2BForm() {
  const { pushToast } = useUI()
  const { push, query } = useRouter()
  const { setCurrentOrganization } = useB2BOrganizations()
  const { returnUrl } = query

  const person = useIsAuth(
    (_person) => {
      if (!_person) {
        void push('/login')
      }
    },
    [push]
  )

  const createOrganization = async (
    data: B2BSchema,
    setLoading: React.Dispatch<
      React.SetStateAction<{
        isLoading: boolean
        message: undefined | string
      }>
    >
  ) => {
    try {
      if (!person) {
        setLoading({ isLoading: false, message: 'You must be logged' })

        return
      }

      const billingCostCenter = data.billing

      const { createOrganization: createOrganizationVtex } =
        await request<CreateOrganizationMutation>(createOrganizationMutation, {
          input: mapFormToOrganizationRequest(data, person),
          notifyUsers: false,
        })

      const organizationId = createOrganizationVtex?.id

      if (!organizationId || !createOrganizationVtex.costCenterId) {
        setLoading({
          isLoading: false,
          message: 'Unable to find your organization!',
        })

        return
      }

      const { createUserWithEmail } =
        await request<CreateUserWithEmailMutation>(
          createUserWithEmailMutation,
          {
            orgId: organizationId,
            costId: createOrganizationVtex.costCenterId,
            roleId: 'store-admin',
            name: person.givenName ?? '',
            email: person.email,
          }
        )

      if (!createUserWithEmail || createUserWithEmail.status !== 'success') {
        setLoading({
          isLoading: false,
          message: 'Unable to add use to organization!',
        })

        return
      }

      const payload = mapFormToErpSHIPOrganizationRequest(data)

      const { createOrganizationERP } = await request<
        CreateOrganizationErpMutation,
        CreateOrganizationErpMutationVariables
      >(createOrganizationERPMutation, {
        input: {
          PARENT_ID: '0',
          ACCOUNT_TYPE: 'SHIP',
          VTEX_ID: organizationId,
          ...payload,
        },
      })

      if (!createOrganizationERP) {
        setLoading({
          isLoading: false,
          message: 'Failed to create organization in ERP!',
        })

        return
      }

      const billPayload = billingCostCenter.hasBilling
        ? mapFormToErpBILLOrganizationRequest(data)
        : payload

      await request<
        CreateOrganizationErpMutation,
        CreateOrganizationErpMutationVariables
      >(createOrganizationERPMutation, {
        input: {
          PARENT_ID: createOrganizationERP.requestId,
          ACCOUNT_TYPE: 'BILL',
          VTEX_ID: createOrganizationVtex.costCenterId,
          ...billPayload,
        },
      })

      await setCurrentOrganization({
        orgId: organizationId,
        costId: createOrganizationVtex.costCenterId,
      })

      pushToast({
        message: 'Your request has been sent.',
        status: 'INFO',
      })

      window.location.href =
        typeof returnUrl === 'string' ? returnUrl.trim() : '/'
    } catch (error) {
      setLoading({
        isLoading: false,
        message: 'Failed to submit data, please try again later!',
      })
    }
  }

  return { createOrganization }
}
