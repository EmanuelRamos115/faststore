import styles from './ContentBlocks.module.scss'
import type { MenuItemProps } from '../../typings/props'
import ImageBlock from './ImageBlock'
import IconBlock from './IconBlock'

type ContentBlocksProps = {
  contentBlocks: MenuItemProps[]
}

const ContentBlocks = ({ contentBlocks }: ContentBlocksProps) => {
  const [{ type }] = contentBlocks

  return (
    <div>
      {type === 'image-block' ? (
        <ul className={`list-reset ${styles.imageBlocks}`}>
          {contentBlocks.map((cb) => (
            <li key={cb.id} className={styles.imageBlock}>
              <ImageBlock block={cb} />
            </li>
          ))}
        </ul>
      ) : (
        <ul className={`list-reset ${styles.iconBlocks}`}>
          {contentBlocks.map((cb) => (
            <li key={cb.id} className={styles.iconBlock}>
              <IconBlock block={cb} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ContentBlocks
