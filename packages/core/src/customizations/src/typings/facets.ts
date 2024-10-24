export type FacetValue = {
  label: string
  value: string
  selected: boolean
  quantity: number
}

export type OnFacetChangeItem = {
  key: string
  value: string
}

export type OnFacetChangeType = 'BOOLEAN' | 'RANGE'

export type OnFacetChange = (
  item: OnFacetChangeItem,
  type: OnFacetChangeType
) => void

export type AppliedFacet = {
  key: string
  value: string
  label: string
}
