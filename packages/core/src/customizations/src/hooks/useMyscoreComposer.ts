import { createContext, useContext } from 'react'

import type { Composer } from '../api/jwp/myScore/types'

const ComposerDataContext = createContext<Composer | null>(null)

export const useMyscoreComposerData = (): Composer => {
  const data = useContext(ComposerDataContext)

  if (!data) {
    throw new Error('Composer data not found - is this on a composer page?')
  }

  return data
}

export const MyscoreComposerDataProvider = ComposerDataContext.Provider
