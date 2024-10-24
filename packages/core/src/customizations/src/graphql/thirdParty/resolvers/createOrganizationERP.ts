import { type Resolver } from '@faststore/api'

function parseCookies(cookies: string) {
  return cookies
    .split('; ')
    .reduce((acc: { [key: string]: string }, cookie) => {
      const [key, value] = cookie.split('=')

      return { ...acc, [key]: value }
    }, {})
}

type CreateOrganizationERPArgs = {
  input: {
    PARENT_ID: string
    ACCOUNT_TYPE: string
    ACCOUNT_NAME: string
    ATTENTION: string
    ADDRESS: string
    CITY: string

    COUNTRY: string
    POSTAL_CODE: string
    STATE_PROVINCE: string
    CUSTOMER_CLASSIFICATION: string
    ORGANIZATION_DETAIL: string
    CUSTOMER_ROLE: string
    PHONE_NUMBER: string
    VTEX_ID: string
  }
}

const createOrganizationERP: Resolver<
  unknown,
  CreateOrganizationERPArgs
> = async (root, variables, context) => {
  const cookies = parseCookies(context.headers.cookie)

  const data = await fetch(
    'https://dev-vtex-apim.azure-api.net/accounts/account',
    {
      method: 'POST',
      headers: {
        'X-VTEX-Session': cookies.vtex_session,
      },
      body: JSON.stringify(variables.input),
    }
  )

  try {
    return (await data.json()) as Promise<{
      message: string
      requestId: string
    }>
  } catch {
    return { message: '', requestId: '' }
  }
}

export const createOrganizationERPResolver = {
  mutations: {
    createOrganizationERP,
  },
}
