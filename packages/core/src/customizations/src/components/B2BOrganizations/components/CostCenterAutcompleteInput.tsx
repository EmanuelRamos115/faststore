import type { ChangeEvent } from 'react'

import type { OrganizationsState } from '../utils/types'
import AutcompleteInput from './AutcompleteInput'

type CostCenterAutcompleteInputProps = {
  organizationsState: OrganizationsState
  setOrganizationsState: (
    value: React.SetStateAction<OrganizationsState>
  ) => void
}

const CostCenterAutcompleteInput = ({
  organizationsState,
  setOrganizationsState,
}: CostCenterAutcompleteInputProps) => {
  const costCenterOptions =
    organizationsState.costCenterOptions?.map((option) => ({
      suggestion: option.label ?? '',
      term: option.label ?? '',
      linkProps: {
        onClick: () => {
          setOrganizationsState({
            ...organizationsState,
            costCenterInput: option.label,
            currentCostCenter: option.value,
          })
        },
      },
    })) ?? []

  const costCenterInputConfig = {
    placeholder: 'Search cost center...',
    value: organizationsState.costCenterInput ?? '',
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      setOrganizationsState({
        ...organizationsState,
        costCenterInput: event.currentTarget.value,
      })
    },
    onSubmit: () => {},
  }

  return (
    <AutcompleteInput
      options={costCenterOptions}
      input={costCenterInputConfig}
    />
  )
}

export default CostCenterAutcompleteInput
