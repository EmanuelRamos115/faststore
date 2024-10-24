import { colors } from '../../../../constants/colors'

const MyScoreSimple = () => {
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
          d="M22.76 45.51C10.21 45.51 0 35.3 0 22.75C0 10.2 10.21 0 22.76 0C35.31 0 45.51 10.21 45.51 22.75C45.51 35.29 35.3 45.5 22.76 45.5V45.51ZM22.76 3.5C12.14 3.5 3.5 12.14 3.5 22.75C3.5 33.36 12.14 42 22.76 42C33.38 42 42.01 33.36 42.01 22.75C42.01 12.14 33.37 3.5 22.76 3.5Z"
          fill={`var(${colors.badgeTurquoiseDark.token})`}
        />
        <path
          d="M23.46 34.82H21.84L16.63 13.03V34.86H15.19V10.22H17.51L22.68 32.01L27.82 10.22H30.14V34.86H28.59V12.96L23.45 34.82H23.46Z"
          fill={`var(${colors.badgeTurquoiseDark.token})`}
        />
      </g>
    </svg>
  )
}

export default MyScoreSimple
