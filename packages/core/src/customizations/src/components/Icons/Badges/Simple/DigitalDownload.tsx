import { colors } from '../../../../constants/colors'

const DigitalDownloadSimple = () => {
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
          d="M22.76 45.51C10.21 45.51 0 35.3 0 22.75C0 10.2 10.21 0 22.76 0C35.31 0 45.51 10.21 45.51 22.75C45.51 35.29 35.3 45.51 22.76 45.51ZM22.76 3.5C12.14 3.5 3.5 12.14 3.5 22.75C3.5 33.36 12.14 42.01 22.76 42.01C33.38 42.01 42.01 33.37 42.01 22.75C42.01 12.13 33.37 3.5 22.76 3.5Z"
          fill={`var(${colors.badgeTurquoiseLight.token})`}
        />
        <path
          d="M28.9 22.39V10.92H16.62V22.39H9.91998L22.76 36.59L35.59 22.39H28.9Z"
          fill={`var(${colors.badgeTurquoiseLight.token})`}
        />
      </g>
    </svg>
  )
}

export default DigitalDownloadSimple
