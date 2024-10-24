import { useState } from 'react'
import clip from 'text-clipper'

import styles from './TruncatedText.module.scss'
import ArrowAltIcon from '../Icons/General/ArrowAltIcon'

type TruncatedTextProps = {
  copy: string
  charCount: number
  expandable?: boolean
  maxLines?: number
}

const TruncatedText = ({
  copy,
  charCount,
  expandable,
  maxLines = 5,
}: TruncatedTextProps) => {
  const [isTruncated, setIsTruncated] = useState(true)
  const toggleTruncate = () => {
    setIsTruncated((prev) => !prev)
  }

  const clippedHtml = clip(copy, charCount, { html: true, maxLines })

  return (
    <>
      {!expandable ? (
        <span dangerouslySetInnerHTML={{ __html: clippedHtml }} />
      ) : (
        <>
          {expandable && isTruncated ? (
            <span dangerouslySetInnerHTML={{ __html: clippedHtml }} />
          ) : (
            <span dangerouslySetInnerHTML={{ __html: copy }} />
          )}
          {expandable && clippedHtml !== copy && (
            <span onClick={toggleTruncate} className="read-or-hide">
              <span className={styles.readMore}>
                {isTruncated ? 'Read More' : 'Read Less'}{' '}
                <ArrowAltIcon className={styles.readMoreArrow} />
              </span>
            </span>
          )}
        </>
      )}
    </>
  )
}

export default TruncatedText
