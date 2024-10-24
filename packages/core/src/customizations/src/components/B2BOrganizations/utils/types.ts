import type { GetOrganizationsByEmailQuery } from '@generated/graphql'

export type OrganizationItem = null | {
  id: string | null
  costCenterName: string | null
  costId: string | null
  organizationName: string | null
  organizationStatus: string | null
  orgId: string | null
  role: { id: string | null; name: string } | null
}

export type OrganizationsState = {
  costCenterInput?: string | null
  organizationInput?: string | null
  organizationOptions?: Array<{
    value?: string | null
    label?: string | null
    status?: string | null
  }>
  currentRoleName?: string | null
  costCenterOptions?: Array<{
    value?: string | null
    label?: string | null
  }>
  currentOrganization?: string | null
  currentCostCenter?: string | null
  dataList?: GetOrganizationsByEmailQuery['getOrganizationsByEmail'] | null
  totalDataList?: number | null
  currentOrganizationStatus?: string | null
}
