import type { Composer } from './types'

export async function fetchComposer(
  endpoint: string,
  slug: string
): Promise<ComposerResponse> {
  const url = endpoint.replace('{slug}', slug)

  const response = await fetch(url)

  if (!response.ok) {
    console.error('Failed to fetch composer', response)

    return {
      status: response.status,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      message: (await response.json()).message,
      composer: undefined,
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return response.json()
}

export type ComposerResponse =
  | {
      composer: Composer
    }
  | {
      status: number
      message?: string
      composer: undefined
    }
