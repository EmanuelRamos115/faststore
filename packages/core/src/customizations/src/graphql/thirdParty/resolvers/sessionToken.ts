import type { Context } from './context'

export function getSessionFromContext(context: Context): string | undefined {
  const [, token] =
    context.headers.cookie
      ?.split(';')
      .map((c) => c.trim().split('='))
      .find(([key]) => key === 'vtex_session') ?? []

  return token
}

export function sessionToken(
  _root: unknown,
  _variables: unknown,
  context: Context
): string | undefined {
  return getSessionFromContext(context)
}
