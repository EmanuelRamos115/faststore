import type { Resolver } from '@faststore/api'

import { vtexApiRequest } from './vtexApiRequest'
import { envConfig } from '../../../faststore.config'

const env = envConfig as { account: string }

type ValidateUserReponse = {
  authStatus: string
  id: string
  user: string
  account: string
  audience: string
  tokenType: string
}

export type Context = Parameters<Resolver>[2]

export const parseCookie = (str: string) =>
  str
    .split(';')
    .map((v) => v.split('='))
    .reduce((acc: { [key: string]: string | undefined }, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim())

      return acc
    }, {})

export const getAuthUser = async (context: Context) => {
  const cookies = parseCookie(context.headers.cookie)
  const token = cookies[`VtexIdclientAutCookie_${env.account}`]

  if (!token) {
    throw new Error('User not authenticated')
  }

  const url = `/api/vtexid/credential/validate`

  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ token }),
  }

  const response = await vtexApiRequest<ValidateUserReponse>(
    url,
    false,
    options
  )

  if (response.authStatus !== 'Success' || response.account !== env.account) {
    throw new Error('User not authenticated')
  }

  return response
}
