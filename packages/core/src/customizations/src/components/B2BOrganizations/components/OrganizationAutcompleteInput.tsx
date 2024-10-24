import type { ChangeEvent } from 'react'
import type { GetOrganizationsByEmailQuery } from '@generated/graphql'

import type { OrganizationsState } from '../utils/types'
import AutcompleteInput from './AutcompleteInput'

type OrganizationAutcompleteInputProps = {
  organizationsState: OrganizationsState
  setOrganizationsState: (
    value: React.SetStateAction<OrganizationsState>
  ) => void
  organizationsByEmail: GetOrganizationsByEmailQuery['getOrganizationsByEmail']
}

const OrganizationAutcompleteInput = ({
  organizationsState,
  setOrganizationsState,
  organizationsByEmail,
}: OrganizationAutcompleteInputProps) => {
  const organizationOptions =
    organizationsState.organizationOptions?.map((option) => ({
      suggestion: option.label ?? '',
      term: option.label ?? '',
      linkProps: {
        onClick: () => {
          setOrganizationsState({
            ...organizationsState,
            costCenterInput: '',
            organizationInput: option.label,
            currentOrganization: option.value,
            costCenterOptions: organizationsByEmail
              ?.filter((organization) => organization?.orgId === option.value)
              .map((organization) => ({
                value: organization?.costId,
                label: organization?.costCenterName,
              })) as [],
          })
        },
      },
    })) ?? []

  const organizationInputConfig = {
    placeholder: 'Search organization...',
    value: organizationsState.organizationInput ?? '',
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      setOrganizationsState({
        ...organizationsState,
        organizationInput: event.currentTarget.value,
      })
    },
    onSubmit: () => {},
  }

  return (
    <AutcompleteInput
      options={organizationOptions}
      input={organizationInputConfig}
    />
  )
}

export default OrganizationAutcompleteInput
