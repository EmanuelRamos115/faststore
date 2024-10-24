import { colors } from '../../../../constants/colors'

const BasicLibrarySimple = () => {
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
          d="M22.67 8.17L26.8 18.81L37.2 18.71L28.87 24.39L33.33 35.69L22.78 28.52L12.32 35.69L16.56 24.36L8.31 18.71L18.63 18.81L22.67 8.17Z"
          fill={`var(${colors.badgeBlue.token})`}
        />
        <path
          d="M22.76 45.51C10.21 45.51 0 35.3 0 22.75C0 10.2 10.21 0 22.76 0C35.31 0 45.51 10.21 45.51 22.75C45.51 35.29 35.3 45.51 22.76 45.51ZM22.76 3.5C12.14 3.5 3.5 12.14 3.5 22.75C3.5 33.36 12.14 42.01 22.76 42.01C33.38 42.01 42.01 33.37 42.01 22.75C42.01 12.13 33.37 3.5 22.76 3.5Z"
          fill={`var(${colors.badgeBlue.token})`}
        />
      </g>
    </svg>
  )
}

export default BasicLibrarySimple
