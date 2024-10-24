import { useUI } from '@faststore/ui'

import ShareIcon from '../Icons/General/ShareIcon'
import styles from './ShareButton.module.scss'

type ProductLinkProps = {
  buttonText: string
  toastMessage: string
  url: string
}

const ShareButton = ({ buttonText, toastMessage, url }: ProductLinkProps) => {
  const { pushToast } = useUI()

  const copyLinkToClipboard = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}${url}`)
      .then(() => {
        pushToast({ message: toastMessage, status: 'INFO' })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <button
      className={styles.shareButton}
      onClick={copyLinkToClipboard}
      type="button"
    >
      <span className="visually-hidden">{`Share URL for ${buttonText}`}</span>

      <ShareIcon className={styles.shareIcon} />
    </button>
  )
}

export default ShareButton
