import type { Maybe } from '@generated/graphql'

import { STORE_URL, APP_KEY, APP_TOKEN } from '../constants'

type QueryParam = string | URLSearchParams | Record<string, string>

export async function vtexApiRequest<Response>(
  path: string,
  privateApi = false,
  requestInfo?: RequestInit
): Promise<Response> {
  let appKeysAndAppTokens: HeadersInit | undefined

  if (privateApi) {
    appKeysAndAppTokens = {
      'X-VTEX-API-AppKey': APP_KEY,
      'X-VTEX-API-AppToken': APP_TOKEN,
    }
  }

  const request = await fetch(`${STORE_URL}${path}`, {
    ...requestInfo,
    headers: {
      ...requestInfo?.headers,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...appKeysAndAppTokens,
    },
  })

  // API response is not typechecked
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return request.json()
}

// eslint-disable-next-line max-params
export async function vtexGenericApiRequest<Response>(
  path: string,
  method = 'get',
  privateApi = false,
  payload?: Record<string, any>,
  requestInfo?: RequestInit
): Promise<Maybe<Response>> {
  let appKeysAndAppTokens: HeadersInit | undefined

  if (privateApi) {
    appKeysAndAppTokens = {
      'X-VTEX-API-AppKey': APP_KEY,
      'X-VTEX-API-AppToken': APP_TOKEN,
    }
  }

  const request = await fetch(`${STORE_URL}${path}`, {
    ...requestInfo,
    method,
    headers: {
      ...requestInfo?.headers,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...appKeysAndAppTokens,
    },
    ...(payload ? { body: JSON.stringify(payload) } : {}),
  })

  if (!request.body) {
    return null
  }

  // API response is not typechecked
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return request.json()
}

export async function masterDataGetDocument<Response>(
  documentId: string,
  entity: string,
  query?: QueryParam
): Promise<Response> {
  const params = new URLSearchParams(query)

  const url = `/api/dataentities/${entity}/documents/${documentId}?${params.toString()}`

  return vtexApiRequest(url, true)
}

export async function masterDataUpdateDocument<Response>(
  documentId: string,
  payload: unknown,
  entity: string,
  query?: QueryParam
): Promise<Response> {
  const params = new URLSearchParams(query)

  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  }

  const url = `/api/dataentities/${entity}/documents/${documentId}?${params.toString()}`

  return vtexApiRequest(url, true, options)
}

export async function masterDataCreateDocument<Response>(
  payload: unknown,
  entity: string,
  query?: QueryParam
): Promise<Response> {
  const params = new URLSearchParams(query)

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  }

  const url = `/api/dataentities/${entity}/documents?${params.toString()}`

  return vtexApiRequest(url, true, options)
}

const isJSONError = (err: unknown): err is SyntaxError =>
  err instanceof SyntaxError

export async function masterDataDeleteDocument(
  documentId: string,
  entity: string,
  query?: QueryParam
) {
  const params = new URLSearchParams(query)

  const options = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({}),
  }

  const url = `/api/dataentities/${entity}/documents/${documentId}?${params.toString()}`

  try {
    await vtexApiRequest(url, true, options)
  } catch (err) {
    if (!isJSONError(err)) {
      throw err
    }
  }

  return true
}

type Collection = {
  Id: number
  Name: string
  Description?: string
  Searchable: boolean
  Highlight: boolean
  DateFrom: string
  DateTo: string
  TotalProducts: number
  Type: string
}

export async function getCollectionById(
  collectionId: number
): Promise<Collection> {
  return vtexApiRequest<Collection>(
    `/api/catalog/pvt/collection/${collectionId}`,
    true
  )
}
