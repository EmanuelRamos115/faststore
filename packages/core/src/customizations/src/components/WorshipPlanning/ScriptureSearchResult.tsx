import { useSearchParams } from 'next/navigation'

import CustomProductGalleryWithRules from '../CustomProductGalleryWithRules/CustomProductGalleryWithRules'
import type { TrustPilotStarsConfig } from '../../@generated/cms/CustomProductDetails'

const capitalizeFirstLetter = (string: string) =>
  string.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())

const reformatScriptureValueString = (str: string) => {
  const isNumber = (val: string) => !Number.isNaN(Number(val))
  const strArr = str.split('-')
  let numbersCount = strArr.filter(isNumber).length

  return strArr
    .map((strItem: string, index: number) => {
      if (index === 0 && isNumber(strItem)) {
        numbersCount -= 1
      }

      if (index === strArr.length - 1) {
        if (numbersCount === 3) {
          return `-${strItem}`
        }

        if (numbersCount === 2) {
          return `:${strItem}`
        }
      }

      if (index === strArr.length - 2 && numbersCount === 3) {
        return `:${strItem}`
      }

      if (isNumber(strItem)) {
        return strItem
      }

      return ` ${strItem} `
    })
    .join('')
}

const ScriptureSearchResult = ({
  trustPilotPlpConfig,
}: {
  trustPilotPlpConfig: TrustPilotStarsConfig
}) => {
  const searchParams = useSearchParams()

  const verseRange = searchParams.get('verse-range')
  const chapter = searchParams.get('chapter')

  const keyString = verseRange ? 'verse-range' : 'chapter'
  const valueString = verseRange ?? chapter

  const formattedSelectedFacets = [
    {
      key: keyString,
      value: valueString,
    },
  ]

  const searchResultHeading =
    keyString && valueString
      ? capitalizeFirstLetter(
          `${keyString.replace(/-/g, ' ')} ${reformatScriptureValueString(valueString)}`
        )
      : ''

  const productQuery = {
    selectedFacets: formattedSelectedFacets,
  }

  return (
    <CustomProductGalleryWithRules
      trustPilotPlpConfig={trustPilotPlpConfig}
      heading={searchResultHeading || ''}
      productQuery={productQuery}
      hideAppliedFacets
    />
  )
}

export default ScriptureSearchResult
