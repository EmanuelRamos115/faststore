import type { StoreProductRoot } from '@faststore/core/api'

import type { Context as FSContext } from './context'

type SearchResultItem = {
  itemId: string
}

// Intelligent search result type
// NOTE: Only a partial implementation
type Product = Record<string, unknown>

type EnhancedSku = SearchResultItem & {
  isVariantOf: Product
  referenceId: Array<{
    Value: string
  }>
}

type Context = {
  loaders: {
    simulationLoader: {
      load: (args: SimulationArgs) => Promise<Simulation>
    }
    skuLoader: {
      load: (skuId: string) => Promise<EnhancedSku>
    }
  }
}

type SimulationArgs = {
  items: ShippingItem[]
}

type ShippingItem = {
  id: string
  quantity: number
  seller: string
  parentItemIndex?: number | null
  parentAssemblyBinding?: string | null
}

type FSSimulation = Awaited<
  ReturnType<FSContext['loaders']['simulationLoader']['load']>
>

type Simulation = Omit<FSSimulation, 'itemMetadata'> & {
  itemMetadata: { items: Item[] } | null
}

type Item = {
  id: string
  seller: string
  assemblyOptions: Array<{
    id: string
    name: string
    required: boolean
    inputValues: Record<string, unknown>
    composition: Composition | null
  }>
}

type Composition = {
  minQuantity: number
  maxQuantity: number
  items: Array<{
    id: string
    gtin: string
    minQuantity: number
    maxQuantity: number
    initialQuantity: number
    priceTable: string
    seller: string
  }>
}

export async function assemblyOptions(
  root: StoreProductRoot,
  _variables: unknown,
  context: Context
): Promise<Item['assemblyOptions']> {
  const simulation = await context.loaders.simulationLoader.load({
    items: [
      {
        id: root.itemId,
        quantity: 1,
        seller: '1',
      },
    ],
  })

  const currentItem = simulation.itemMetadata?.items.find(
    (item) => item.id === root.itemId
  )

  if (!currentItem?.assemblyOptions) {
    return []
  }

  const resolveItems = (
    items: Composition['items']
  ): Promise<Composition['items']> =>
    Promise.all(
      items.map(async (item): Promise<Composition['items'][0]> => {
        const sku = await context.loaders.skuLoader.load(item.id)

        item.gtin = sku?.referenceId[0].Value

        return item
      })
    )

  const assemblyOptionsWithSku = await Promise.all(
    currentItem?.assemblyOptions.map(async (option) => {
      if (!option.composition?.items) {
        return option
      }

      const items = await resolveItems(option.composition?.items)

      return {
        ...option,
        composition: {
          ...option.composition,
          items,
        },
      }
    })
  )

  return assemblyOptionsWithSku ?? []
}
