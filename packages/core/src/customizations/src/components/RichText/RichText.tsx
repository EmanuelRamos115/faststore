import classNames from 'classnames'

import richTextToHtml from '../../utils/richTextToHtml'
import styles from './RichText.module.scss'
import type { RichText as Props } from '../../@generated/cms/RichText'

const RichText = ({
  font,
  text,
  textAlignment,
  textColor,
  hasLine = false,
  backgroundColor,
}: Props) => {
  if (text) {
    return (
      <section
        className={classNames(hasLine ? styles.line : '', styles.container)}
        style={{
          backgroundColor,
          color: textColor,
          textAlign: textAlignment,
          fontFamily: font,
        }}
        dangerouslySetInnerHTML={{ __html: richTextToHtml(text) }}
      ></section>
    )
  }

  return null
}

export default RichText
