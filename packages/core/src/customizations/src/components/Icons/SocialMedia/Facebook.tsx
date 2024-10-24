import styles from '../../Footer/FooterSocialMedia.module.scss'

const Facebook = () => {
  return (
    <svg
      width="30"
      height="28"
      viewBox="0 0 30 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          className={styles.background}
          d="M25.6076 23.9002C31.4656 18.4327 31.4656 9.56823 25.6076 4.10077C19.7496 -1.36669 10.2519 -1.36669 4.39389 4.10077C-1.46411 9.56823 -1.46411 18.4327 4.39389 23.9002C10.2519 29.3677 19.7496 29.3677 25.6076 23.9002Z"
        />
        <path
          className={styles.icon}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.1877 24.5641H16.2799V15.7536H19.3026L19.9071 12.1945H16.2799V9.50341C16.2799 8.5053 17.3033 7.94118 18.2793 7.94118H20.0465V4.98981L16.8843 4.85968C13.8616 4.68596 12.1877 6.89948 12.1877 9.54699V12.1945H8.7467V15.7536H12.1877V24.5641Z"
        />
      </g>
    </svg>
  )
}

export default Facebook
