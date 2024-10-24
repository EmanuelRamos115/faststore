import type { Maybe } from '@generated/graphql'

import {
  vtexApiRequest,
  vtexGenericApiRequest,
} from '../../utils/vtexApiRequest'

export async function masterDataSearch<Response>(
  entity: string,
  schema: string,
  query: Record<string, string | number>
): Promise<Response> {
  const params = new URLSearchParams({
    _schema: schema,
    ...query,
  })

  const url = `/api/dataentities/${entity}/search?${params.toString()}`

  return vtexApiRequest(url, true)
}

// eslint-disable-next-line max-params
export async function createOrUpdateMasterDataDocument<Response>(
  entity: string,
  schema: string,
  payload: Record<string, any>,
  query?: Record<string, string | number>,
  id?: string
): Promise<Maybe<Response>> {
  const params = new URLSearchParams({
    _schema: schema,
    ...query,
  })

  let url = `/api/dataentities/${entity}/documents?${params.toString()}`
  let method = 'post'

  if (id) {
    url = `/api/dataentities/${entity}/documents/${id}?${params.toString()}`
    method = 'put'
  }

  return vtexGenericApiRequest(url, method, true, payload)
}
