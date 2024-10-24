import type { Composer } from './types'

export type ComposersListParams = {
  offset?: number
  limit?: number
  search?: string
  lastNameFirstLetter?: string
}

export async function fetchComposers(
  endpoint: string,
  params: ComposersListParams
): Promise<AllComposersResponse> {
  const stringifiedParams = Object.entries(params)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => [key, value.toString()])

  const response = await fetch(
    `${endpoint}?${new URLSearchParams(stringifiedParams).toString().replace(/\+/g, '%20')}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch composers')
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return response.json()
}

export type AllComposersResponse = {
  composers: Composer[]
  moreResults: boolean
  nextOffset: number
}
