import AccordionItem from '../AccordionItem/AccordionItem'
import type { TrustPilotWidgetProps } from '../TrustPilot/TrustPilotWidget'
import TrustPilotWidget from '../TrustPilot/TrustPilotWidget'
import styles from './ProductAccordion.module.scss'

const dummyReviews = [
  {
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas arcu ipsum, vestibulum a diam ut, dapibus convallis libero.',
  },
  {
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas arcu ipsum, vestibulum a diam ut, dapibus convallis libero.',
  },
]

type ReviewsProps = {
  skuId: string
  index: number
  trustPilotAccordionConfig: TrustPilotWidgetProps
}

const Reviews = ({ index, skuId, trustPilotAccordionConfig }: ReviewsProps) => {
  if (dummyReviews.length <= 0) {
    return null
  }

  return (
    <>
      <div className={styles.reviewListAnchor}>
        <TrustPilotWidget
          templateId={trustPilotAccordionConfig?.templateId}
          businessId={trustPilotAccordionConfig?.businessId}
          stars={trustPilotAccordionConfig?.stars}
          reviewLanguages={trustPilotAccordionConfig?.reviewLanguages}
          theme={trustPilotAccordionConfig?.theme}
          width={trustPilotAccordionConfig?.width}
          height={trustPilotAccordionConfig?.height}
          locale={trustPilotAccordionConfig?.locale}
          skuId={skuId}
        />
      </div>
      <AccordionItem
        title="Reviews"
        details={
          <div className={styles.reviewList}>
            <TrustPilotWidget
              templateId={trustPilotAccordionConfig?.templateId}
              businessId={trustPilotAccordionConfig?.businessId}
              stars={trustPilotAccordionConfig?.stars}
              reviewLanguages={trustPilotAccordionConfig?.reviewLanguages}
              theme={trustPilotAccordionConfig?.theme}
              width={trustPilotAccordionConfig?.width}
              height={trustPilotAccordionConfig?.height}
              locale={trustPilotAccordionConfig?.locale}
              skuId={skuId}
            />
          </div>
        }
        index={index}
      />
    </>
  )
}

export default Reviews
