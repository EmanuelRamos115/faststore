import { colors } from '../../../../constants/colors'

const EditorsChoiceSimple = () => {
  return (
    <svg
      width="46"
      height="63"
      viewBox="0 0 46 63"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          d="M22.76 45.51C10.21 45.51 0 35.3 0 22.76C0 10.22 10.21 0 22.76 0C35.31 0 45.51 10.21 45.51 22.76C45.51 35.31 35.3 45.51 22.76 45.51ZM22.76 3.5C12.14 3.5 3.5 12.14 3.5 22.76C3.5 33.38 12.14 42.01 22.76 42.01C33.38 42.01 42.01 33.37 42.01 22.76C42.01 12.15 33.37 3.5 22.76 3.5Z"
          fill={`var(${colors.badgeRed.token})`}
        />
        <path
          d="M20.41 36.01L8.78998 26.76L12.05 22.67L19.53 28.63L32.21 12.4L36.33 15.61L20.41 36.01Z"
          fill={`var(${colors.badgeRed.token})`}
        />
        <path
          d="M36.74 62.54L22.84 54.45L8.78003 62.54V44.13C8.78003 44.13 14.42 49.11 22.68 49.11C31.6 49.11 36.75 44.13 36.75 44.13V62.54H36.74Z"
          fill={`var(${colors.badgeRed.token})`}
        />
      </g>
    </svg>
  )
}

export default EditorsChoiceSimple
