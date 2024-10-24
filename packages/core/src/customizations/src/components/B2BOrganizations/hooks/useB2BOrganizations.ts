import { useEffect, useState } from 'react'
import { useSession, validateSession } from 'src/sdk/session'
import { request } from 'src/sdk/graphql/request'
import { useQuery } from 'src/sdk/graphql/useQuery'
import { useCart } from 'src/sdk/cart'
import type {
  GetB2BSettingsQuery,
  GetOrganizationsByEmailQuery,
  MutationSetCurrentOrganizationArgs,
  CheckUserPermissionQuery,
  SetCurrentOrganizationMutation,
  SetCurrentOrganizationMutationVariables,
  GetOrderFormOrgsQuery,
} from '@generated/graphql'

import {
  CheckUserPermission,
  GetB2BSettings,
  GetOrganizationsByEmail,
  SetCurrentOrganization,
  defaultOrganization,
  GET_ORGS_FROM_ORDER_FORM,
} from '../utils/constants'
import { sortOrganizations } from '../utils/sortOrganizations'
import type { OrganizationsState } from '../utils/types'

export default function useB2BOrganizations() {
  const { isValidating: _, ...session } = useSession()

  const { person } = session
  const { id: cartId } = useCart()
  const isAuthenticated = !!person?.id
  const email = person?.email ?? null
  const id: string | null = null

  const { data: organizationsByEmail, mutate: mutateOrganizationsByEmail } =
    useQuery<GetOrganizationsByEmailQuery>(GetOrganizationsByEmail, {
      email,
      session,
    })

  const { data: checkUserPermission } = useQuery<CheckUserPermissionQuery>(
    CheckUserPermission,
    { session }
  )

  const { data: orderForm } = useQuery<GetOrderFormOrgsQuery>(
    GET_ORGS_FROM_ORDER_FORM,
    {
      id: cartId,
    }
  )

  const { data: b2BSettings } = useQuery<GetB2BSettingsQuery>(GetB2BSettings, {
    session,
  })

  const setCurrentOrganization = async (
    args?: MutationSetCurrentOrganizationArgs
  ) => {
    await request<
      SetCurrentOrganizationMutation,
      SetCurrentOrganizationMutationVariables | undefined
    >(SetCurrentOrganization, args)

    await validateSession(session)

    await Promise.all([mutateOrganizationsByEmail()])
    window.location.reload()
  }

  const [organizationsState, setOrganizationsState] =
    useState<OrganizationsState>(defaultOrganization)

  useEffect(() => {
    if (!orderForm?.orderForm.orderFormId) {
      return
    }

    const currentOrganization =
      organizationsByEmail?.getOrganizationsByEmail?.find(
        (org) => org?.orgId === orderForm?.orderForm.marketingData?.utmCampaign
      )

    const currentCostCenter = orderForm?.orderForm.marketingData?.utmMedium

    setOrganizationsState({
      ...organizationsState,
      costCenterInput: currentOrganization?.costCenterName,
      organizationInput: currentOrganization?.organizationName,
      organizationOptions: organizationsByEmail?.getOrganizationsByEmail
        ?.slice(0, 15)
        .map((organization) => ({
          value: organization?.orgId,
          label: organization?.organizationName,
          status: organization?.organizationStatus,
        })),
      currentRoleName: organizationsByEmail?.getOrganizationsByEmail?.find(
        (organizations) => organizations?.costId === currentCostCenter
      )?.role?.name,
      costCenterOptions: organizationsByEmail?.getOrganizationsByEmail
        ?.filter((organization) => organization?.orgId === id)
        .map((organization) => ({
          value: organization?.costId,
          label: organization?.costCenterName,
        })),
      currentOrganization: currentOrganization?.orgId,
      currentCostCenter,
      dataList:
        organizationsByEmail?.getOrganizationsByEmail?.sort(sortOrganizations),
      totalDataList: organizationsByEmail?.getOrganizationsByEmail?.length,
      currentOrganizationStatus: currentOrganization?.organizationStatus,
    })
  }, [orderForm?.orderForm?.orderFormId, organizationsByEmail])

  return {
    isAuthenticated,
    organizationsByEmail: organizationsByEmail?.getOrganizationsByEmail,
    checkUserPermission: checkUserPermission?.checkUserPermission,
    b2BSettings: b2BSettings?.getB2BSettings,
    setCurrentOrganization,
    organizationsState,
    setOrganizationsState,
  }
}
