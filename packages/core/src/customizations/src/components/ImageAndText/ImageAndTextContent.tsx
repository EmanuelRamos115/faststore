import classNames from 'classnames'

import Action from '../Action/Action'
import Heading from '../Heading/Heading'
import styles from './ImageAndTextContent.module.scss'
import type { Content } from '../../@generated/cms/ImageAndText'
import type { LayoutProps } from './ImageAndText'

type ImageAndTextContentProps = LayoutProps & {
  content: Content
}

const ImageAndTextContent = ({ content, layout }: ImageAndTextContentProps) => {
  const { author, copy, date, heading, ctas } = content

  return (
    <div
      className={classNames(
        styles.wrapper,
        layout === 'contained' ? styles.contained : styles.fullBleed
      )}
    >
      <p className={styles.info}>
        {date} | by {author}
      </p>

      <Heading level={2} uiStyle={5}>
        {heading}
      </Heading>

      <div className={styles.divider} />

      <p>{copy}</p>

      <div className={styles.ctaRow}>
        {ctas.map((cta) => (
          <Action as="a" href={cta.url} color={cta.color} size={cta.size}>
            {cta.text}
          </Action>
        ))}
      </div>
    </div>
  )
}

export default ImageAndTextContent
