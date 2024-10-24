import { useMemo } from 'react'
import { usePriceFormatter } from 'src/sdk/product/useFormattedPrice'

export const useFormattedPrice = (price: number) => {
  const formatter = usePriceFormatter({ decimals: true })

  return useMemo(() => formatter(price), [formatter, price])
}
