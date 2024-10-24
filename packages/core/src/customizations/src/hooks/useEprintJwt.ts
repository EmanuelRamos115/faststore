import useSWR from 'swr'
import { useSession } from 'src/sdk/session'

import { envConfig } from '../../faststore.config'
import { useSessionToken } from './useSessionToken'

const PATH = 'customer-auth/eprint-jwt'
const SESSION_CACHE_KEY = 'eprintJwt'

type JwtResponse = {
  isLoading: boolean
  data?: ParsedToken | null
  error?: Error
}

type ParsedToken = {
  token: string
  exp: number
  personId?: string
}

export function useEprintJwt(): JwtResponse {
  const baseUrl = envConfig.apimBaseUrl
  const sessionToken = useSessionToken().data?.sessionToken
  const { person } = useSession()

  const cached =
    typeof window !== 'undefined' &&
    window.sessionStorage.getItem(SESSION_CACHE_KEY)

  const swrResponse = useSWR(
    (sessionToken && baseUrl) || cached
      ? [sessionToken, baseUrl, cached, person?.id]
      : null,
    async ([token, url, sessionValue, personId]): Promise<
      ParsedToken | undefined
    > => {
      if (sessionValue) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const existing: ParsedToken = JSON.parse(sessionValue)

        if (
          existing.exp < Date.now() / 1000 ||
          personId !== existing.personId
        ) {
          window.sessionStorage.removeItem(SESSION_CACHE_KEY)
        } else {
          return existing
        }
      }

      if (!token) {
        return
      }

      const json = await fetchToken(url, token)
      const parsed = parseJwt(json.token)

      const result: ParsedToken = {
        token: json.token,
        exp: parsed.exp,
        personId,
      }

      window.sessionStorage.setItem(SESSION_CACHE_KEY, JSON.stringify(result))

      return result
    }
  )

  return swrResponse
}

function parseJwt(token: string): { exp: number } {
  const [, base64] = token.split('.')

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return JSON.parse(atob(base64))
}

async function fetchToken(
  baseUrl: string,
  session: string
): Promise<{ token: string }> {
  const response = await fetch(`${baseUrl}${PATH}`, {
    method: 'GET',
    headers: {
      'X-Vtex-Session': session,
    },
  })

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return response.json()
}
