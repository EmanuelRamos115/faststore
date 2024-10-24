import Image from '../Image/Image'
import Action from '../Action/Action'
import type { MyScoreBanner as MyScoreHeaderBannerProps } from '../../@generated/cms/MyScoreHeaderBanner'
import styles from './MyScoreHeaderBanner.module.scss'

const MyScoreHeaderBanner = ({
  logo,
  backgroundImage,
  linkOne = {
    text: 'Shop My Score',
    url: '/',
    color: 'neutralDark',
  },
  linkTwo = {
    text: 'FAQs',
    url: '/',
    color: 'neutralDark',
  },
  buttonOne = {
    text: 'Sign Up',
    url: '/',
    color: 'myScoreOrange',
  },
  buttonTwo = {
    text: 'My Score Login',
    url: '/',
    color: 'myScoreBlue',
  },
  imageLoadingStrategy,
}: MyScoreHeaderBannerProps) => {
  return (
    <div
      className={styles.header}
      style={{
        backgroundImage: backgroundImage?.src
          ? `url(${backgroundImage.src})`
          : 'none',
      }}
    >
      <div className={styles.contentWrapper}>
        <div className={styles.logo}>
          <Image
            src={logo.src}
            alt={logo.alt}
            height={40}
            width={179}
            loading={imageLoadingStrategy}
            sizes="179px"
          />
        </div>
        <div className={styles.buttons}>
          <div className={styles.linkButtons}>
            <Action
              className={styles.link}
              as="a"
              href={linkOne.url}
              color={linkOne.color}
              size="medium"
            >
              {linkOne.text}
            </Action>
            <Action
              className={styles.link}
              as="a"
              href={linkOne.url}
              color={linkTwo.color}
              size="medium"
            >
              {linkTwo.text}
            </Action>
          </div>
          <div className={styles.registrationButtons}>
            <Action
              className={styles.signUpButton}
              as="a"
              href={buttonOne.url}
              color={buttonOne.color}
              size="medium"
            >
              {buttonOne?.text}
            </Action>
            <Action
              className={styles.logInButton}
              as="a"
              href={buttonTwo.url}
              color={buttonTwo.color}
              size="medium"
            >
              {buttonTwo.text}
            </Action>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyScoreHeaderBanner
