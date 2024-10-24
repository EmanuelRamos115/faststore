import { createStore } from '@faststore/sdk'
import { useStore } from 'src/sdk/useStore'

export const persistedCartStore = createStore(
  { localRevision: 0 },
  `fs::persistedCart`
)

export interface Revision {
  localRevision: number
}

export default function usePersistedCart() {
  const cartRevision = useStore(persistedCartStore)

  function setCartRevision(revision: number) {
    const newRevision: Revision = { localRevision: revision }

    persistedCartStore.set(newRevision)
  }

  function clearCartRevision() {
    persistedCartStore.set({ localRevision: 0 })
  }

  return {
    cartRevision,
    setCartRevision,
    clearCartRevision,
  }
}
