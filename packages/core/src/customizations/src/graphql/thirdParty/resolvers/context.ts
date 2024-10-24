import type { getContextFactory } from '@faststore/api'

export type Context = ReturnType<ReturnType<typeof getContextFactory>>
