import styles from '../../Footer/FooterSocialMedia.module.scss'

const X = () => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 28C21.732 28 28 21.732 28 14C28 6.26801 21.732 0 14 0C6.26801 0 0 6.26801 0 14C0 21.732 6.26801 28 14 28Z"
        className={styles.background}
      />
      <path
        d="M5.37592 5.88867L12.0677 14.8361L5.33374 22.1108H6.84942L12.7452 15.7416L17.5086 22.1108H22.6661L15.5976 12.6602L21.8657 5.88867H20.35L14.9205 11.7545L10.5335 5.88867H5.37592ZM7.60478 7.005H9.97413L20.437 20.9945H18.0676L7.60478 7.005Z"
        className={styles.icon}
      />
    </svg>
  )
}

export default X
