import StyleGuideSection from './StyleGuideSection'
import StyleGuideActions from './StyleGuideActions'
import StyleGuideColors from './StyleGuideColors'
import StyleGuideElements from './StyleGuideElements'
import StyleGuideForms from './StyleGuideForms'
import StyleGuideIcons from './StyleGuideIcons'
import StyleGuideInteractive from './StyleGuideInteractive'
import StyleGuideTypography from './StyleGuideTypography'
import ProductList from '../ProductList/ProductList'
import { dummyCta, dummyProductQuery } from '../../data/styleguide'
import styles from './StyleGuide.module.scss'

const StyleGuide = () => {
  return (
    <div className={styles.contentWrapper}>
      <h1>Style Guide</h1>

      <StyleGuideSection heading="Colors">
        <StyleGuideColors />
      </StyleGuideSection>

      <StyleGuideSection heading="Elements">
        <StyleGuideElements />
      </StyleGuideSection>

      <StyleGuideSection heading="Typography">
        <StyleGuideTypography />
      </StyleGuideSection>

      <StyleGuideSection heading="Icons">
        <StyleGuideIcons />
      </StyleGuideSection>

      <StyleGuideSection heading="Actions">
        <StyleGuideActions />
      </StyleGuideSection>

      <StyleGuideSection heading="Forms">
        <StyleGuideForms />
      </StyleGuideSection>

      <StyleGuideSection heading="Interactive Components">
        <StyleGuideInteractive />
      </StyleGuideSection>

      <StyleGuideSection heading="ProductList Demo">
        <ProductList
          cta={dummyCta}
          heading="Test Heading"
          productQuery={dummyProductQuery}
        />
      </StyleGuideSection>

      {/* Do not place content below this section because content sections
       added from the Headless CMS will appear there */}
      {/* <StyleGuideSection heading="Content Sections"></StyleGuideSection> */}
    </div>
  )
}

export default StyleGuide
