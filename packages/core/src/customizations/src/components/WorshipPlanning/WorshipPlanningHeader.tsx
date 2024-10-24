import Image from '../Image/Image'
import Heading from '../Heading/Heading'
import styles from './WorshipPlanningHeader.module.scss'
import type { WorshipPlanningHeader as WorshipPlanningHeaderProps } from '../../@generated/cms/WorshipPlanningHeader'

const WorshipPlanningHeader = ({
  header,
  imageLoadingStrategy,
}: WorshipPlanningHeaderProps) => {
  const { bannerImage, headingText, copy } = header

  return (
    <>
      <div className={styles.bannerImageWrapper}>
        <Image
          src={bannerImage.src}
          alt={bannerImage.alt ?? ''}
          width={2000}
          height={320}
          sizes="100vw"
          loading={imageLoadingStrategy}
          priority={imageLoadingStrategy === 'eager'}
        />
      </div>

      <div className={styles.contentWrapper}>
        <Heading level={1} uiStyle={2}>
          {headingText}
        </Heading>

        <p>{copy}</p>
      </div>
    </>
  )
}

export default WorshipPlanningHeader
