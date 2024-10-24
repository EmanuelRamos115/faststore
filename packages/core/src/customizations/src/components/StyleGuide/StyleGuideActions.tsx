import Action from '../Action/Action'
import StyleGuideSubSection from './StyleGuideSubSection'
import styles from './StyleGuideActions.module.scss'

const colors = ['default', 'neutralDark', 'neutralLight', 'naked', 'important']

const StyleGuideActions = () => {
  return (
    <>
      <StyleGuideSubSection heading="Small">
        <div className={styles.buttonRow}>
          {colors.map((color) => {
            return (
              <div key={color} className={styles.buttonCard}>
                <Action as="button" color={color} size="small" type="button">
                  Text
                </Action>
                <p>{color}</p>
              </div>
            )
          })}
        </div>
      </StyleGuideSubSection>

      <StyleGuideSubSection heading="Medium">
        <div className={styles.buttonRow}>
          {colors.map((color) => {
            return (
              <div key={color} className={styles.buttonCard}>
                <Action as="a" href="/style-guide" color={color} size="medium">
                  Text
                </Action>
                <p>{color}</p>
              </div>
            )
          })}
        </div>
      </StyleGuideSubSection>

      <StyleGuideSubSection heading="Large">
        <div className={styles.buttonRow}>
          {colors.map((color) => {
            return (
              <div key={color} className={styles.buttonCard}>
                <Action as="button" color={color} size="large" type="button">
                  Text
                </Action>
                <p>{color}</p>
              </div>
            )
          })}
        </div>
      </StyleGuideSubSection>
    </>
  )
}

export default StyleGuideActions
