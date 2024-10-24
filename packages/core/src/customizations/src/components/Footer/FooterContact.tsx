import Heading from '../Heading/Heading'
import styles from './FooterContact.module.scss'

const EMAIL_ADDRESS = 'satisfaction@jwpepper.com'
const PHONE_NUMBER = '1-800-345-6296'

const FooterContact = () => {
  return (
    <div className={styles.contact}>
      <Heading level={3} uiStyle={6}>
        Need help? We're Here
      </Heading>

      <a className={styles.contactPhoneNumber} href={`tel:${PHONE_NUMBER}`}>
        {PHONE_NUMBER}
      </a>

      <a className={styles.contactEmail} href={`mailto:${EMAIL_ADDRESS}`}>
        {EMAIL_ADDRESS}
      </a>

      <p className={styles.contactTimes}>Mon-Fri 9:00am - 6:00pm ET</p>
    </div>
  )
}

export default FooterContact
