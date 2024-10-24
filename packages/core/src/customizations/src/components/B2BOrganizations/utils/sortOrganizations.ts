import type { OrganizationItem } from './types'

export const sortOrganizations = (a: OrganizationItem, b: OrganizationItem) =>
  a?.organizationName &&
  b?.organizationName &&
  a.organizationName < b.organizationName
    ? -1
    : 1
