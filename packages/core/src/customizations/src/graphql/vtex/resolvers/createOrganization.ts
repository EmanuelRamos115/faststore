import { print, type GraphQLResolveInfo } from 'graphql'
import { type Resolver } from '@faststore/api'

import { APP_KEY, APP_TOKEN } from '../../constants'

const ioGraphQLUrl = `https://master--jwpepperdev.myvtex.com/_v/private/graphql/v1`
const vtexIdApi = `https://api.myvtex.com.br/api/vtexid/apptoken/login?an=jwpepperdev`

const createOrganizationResolver: Resolver = async (
  root,
  args,
  ctx,
  info: GraphQLResolveInfo
) => {
  const createToken: Response = await fetch(vtexIdApi, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      appkey: APP_KEY,
      apptoken: APP_TOKEN,
    }),
  })

  const { token, errors: tokenCreationErrors } = (await createToken.json()) as {
    token?: string
    errors: Array<{
      message: string
      extensions: unknown
    }>
  }

  if (!token || (tokenCreationErrors && tokenCreationErrors.length > 0)) {
    throw new Error(tokenCreationErrors[0].message)
  }

  const options: RequestInit = {
    method: 'POST',
    headers: {
      VtexIdclientAutCookie: token,
      cookie: ctx.headers.cookie,
      accept: 'application/json',
      'content-type': 'application/json',
      'x-b2b-senderapp': 'vtex.b2b-organizations@1.x',
    },
    body: JSON.stringify({
      query: print(info.operation).replace(/(\r\n|\n|\r)/gm, ''),
      variables: args ?? {},
    }),
  }

  const response = await fetch(ioGraphQLUrl, options)

  const { data, errors } = (await response.json()) as {
    data?: Record<string, unknown>
    errors: Array<{
      message: string
      extensions: unknown
      operationId: string
      requestId: string
    }>
  }

  if (errors && errors.length > 0) {
    throw new Error(errors[0].message)
  }

  return data?.[info.fieldName]
}

export default {
  Mutation: {
    createOrganization: createOrganizationResolver,
    createUserWithEmail: createOrganizationResolver,
  },
}
