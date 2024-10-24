import styles from './HeaderContactMessage.module.scss'
import richTextToHtml from '../../utils/richTextToHtml'

export type HeaderContactMessageProps = {
  message: string
}

export default function HeaderContactMessage({
  message,
}: HeaderContactMessageProps) {
  return (
    <div
      className={styles.contactMessage}
      dangerouslySetInnerHTML={{ __html: richTextToHtml(message) }}
    />
  )
}
