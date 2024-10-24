import { useQuery_unstable } from '@faststore/core/experimental'
import { gql } from '@generated/gql'
import type { GetSessionTokenQuery } from '@generated/graphql'

const QUERY = gql(`
  query getSessionToken {
    sessionToken
  }
`)

export function useSessionToken() {
  return useQuery_unstable<GetSessionTokenQuery>(QUERY, {})
}
