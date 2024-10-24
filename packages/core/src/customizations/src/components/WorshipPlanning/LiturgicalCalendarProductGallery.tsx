import { useSearchParams } from 'next/navigation'

import CustomProductGalleryWithRules from '../CustomProductGalleryWithRules/CustomProductGalleryWithRules'
import type { TrustPilotStarsConfig } from '../../@generated/cms/CustomProductDetails'

const capitalizeFirstLetter = (string: string) =>
  string.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())

const reformatValueString = (str: string) => str.replace('-', ' ')

const LiturgicalCalendarProductGallery = ({
  trustPilotPlpConfig,
}: {
  trustPilotPlpConfig: TrustPilotStarsConfig
}) => {
  const searchParams = useSearchParams()

  const chapter = searchParams.get('chapter')

  const formattedSelectedFacets = [
    {
      key: 'chapter',
      value: chapter,
    },
  ]

  const searchResultHeading = chapter
    ? capitalizeFirstLetter(`Chapter ${reformatValueString(chapter)}`)
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

export default LiturgicalCalendarProductGallery
