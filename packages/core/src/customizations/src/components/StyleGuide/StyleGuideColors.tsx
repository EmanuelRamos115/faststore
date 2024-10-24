import StyleGuideColorCard from './StyleGuideColorCard'
import StyleGuideSubSection from './StyleGuideSubSection'
import styles from './StyleGuideColors.module.scss'
import { colors } from '../../constants/colors'

const StyleGuideColors = () => {
  return (
    <StyleGuideSubSection heading="Main Color">
      <div className={styles.colors}>
        {Object.entries(colors).map(([key, value]) => (
          <StyleGuideColorCard key={key} color={value} />
        ))}
      </div>
    </StyleGuideSubSection>
  )
}

export default StyleGuideColors
