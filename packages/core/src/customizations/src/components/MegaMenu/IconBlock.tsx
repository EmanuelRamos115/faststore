import Link from 'next/link'

import Image from '../Image/Image'
import type { MenuItemProps } from '../../typings/props'
import styles from './IconBlock.module.scss'

type IconContentBlockProps = {
  block: MenuItemProps
}

const BlockContent = ({ block }: IconContentBlockProps) => {
  return (
    <>
      {block.imageUrl && (
        <div className={styles.image}>
          <Image
            src={block.imageUrl}
            width={80}
            height={80}
            alt={block.altText ?? ''}
            sizes="80px"
          />
        </div>
      )}
      <div className={styles.copy}>
        <div className={styles.title}>{block.title}</div>
      </div>
    </>
  )
}

const IconContentBlock = ({ block }: IconContentBlockProps) => {
  return (
    <div className={styles.iconBlock}>
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

export default IconContentBlock
