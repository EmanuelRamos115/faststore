import Heading from '../Heading/Heading'
import styles from './EditorsChoiceHeader.module.scss'
import type { EditorsChoiceHeader as EditorsChoiceHeaderProps } from '../../@generated/cms/EditorsChoiceHeader'
import Image from '../Image/Image'

const EditorsChoiceHeader = ({ heading, icon }: EditorsChoiceHeaderProps) => {
  return (
    <div className={styles.editorsChoiceHeaderWrapper}>
      <div className={styles.iconWrapper}>
        <Image
          src={icon.src}
          alt={icon.alt ?? ''}
          height={34}
          width={116}
          loading="eager"
        />
      </div>

      <Heading level={1} uiStyle={3}>
        {heading}
      </Heading>
    </div>
  )
}

export default EditorsChoiceHeader
