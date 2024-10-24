import { colors } from '../../../../constants/colors'

const LargePrintEditionSimple = () => {
  return (
    <svg
      width="46"
      height="46"
      viewBox="0 0 46 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          d="M22.75 45.51C10.21 45.51 0 35.3 0 22.75C0 10.2 10.21 0 22.75 0C35.29 0 45.51 10.21 45.51 22.75C45.51 35.29 35.3 45.5 22.75 45.5V45.51ZM22.75 3.5C12.14 3.5 3.5 12.14 3.5 22.75C3.5 33.36 12.14 42 22.75 42C33.36 42 42.01 33.36 42.01 22.75C42.01 12.14 33.37 3.5 22.75 3.5Z"
          fill={`var(${colors.badgeBlack.token})`}
        />
        <path
          d="M22.52 10.33V31.63H29.83V35.21H18.71V10.33H22.52Z"
          fill={`var(${colors.badgeBlack.token})`}
        />
      </g>
    </svg>
  )
}

export default LargePrintEditionSimple
