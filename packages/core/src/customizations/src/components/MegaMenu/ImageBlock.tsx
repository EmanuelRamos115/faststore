import Link from 'next/link'

import Image from '../Image/Image'
import FullArrowRightIcon from '../Icons/General/FullArrowRightIcon'
import type { MenuItemProps } from '../../typings/props'
import styles from './ImageBlock.module.scss'

type ImageContentBlockProps = {
  block: MenuItemProps
}

const BlockContent = ({ block }: ImageContentBlockProps) => {
  return (
    <>
      {block.imageUrl && (
        <div className={styles.image}>
          <Image
            src={block.imageUrl}
            width={265}
            height={175}
            alt={block.altText ?? ''}
            sizes="265px"
          />
        </div>
      )}
      <div className={styles.copy}>
        <div className={styles.title}>{block.title}</div>
        <div className={styles.cta}>
          <span>{block.ctaText}</span>
          <FullArrowRightIcon />
        </div>
      </div>
    </>
  )
}

const ImageContentBlock = ({ block }: ImageContentBlockProps) => {
  return (
    <div className={styles.imageBlock}>
      {block.url ? (
        <Link href={block.url} className={styles.linkWrapper}>
          <BlockContent block={block} />
        </Link>
      ) : (
        <BlockContent block={block} />
      )}
    </div>
  )
}

export default ImageContentBlock
