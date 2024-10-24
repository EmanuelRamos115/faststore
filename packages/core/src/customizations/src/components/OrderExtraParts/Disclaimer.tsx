import Action from '../Action/Action'
import styles from './OrderExtraParts.module.scss'

type DisclaimerProps = {
  setShowDisclaimer: (arg: boolean) => void
}

const Disclaimer = ({ setShowDisclaimer }: DisclaimerProps) => {
  return (
    <div className={styles.disclaimerContainer}>
      <p>
        Pepper® has inventory of additional scores for a large selection of
        titles, however it is not practical to stock extra scores for all titles
        published. For those titles that we do not have score stock, the actual
        price of the score is unknown until received by us from the publisher.
      </p>

      <p>
        The price shown is an estimate based on our experience with the
        publisher, and this price is subject to change. If you require an exact
        amount prior to placing your order, please send an email inquiry to{' '}
        <a href="mailto:satisfaction@jwpepper.com"></a> and indicate that you
        would like an exact quote of price.
      </p>
      <Action
        as="button"
        color="naked"
        size="large"
        type="button"
        onClick={() => setShowDisclaimer(false)}
      >
        Go back to form
      </Action>
    </div>
  )
}

export default Disclaimer
