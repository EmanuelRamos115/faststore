import { colors } from '../../../../constants/colors'
import type { IconProps } from '../../../../typings/props'

const EPrintFoldersSimple = ({ className, title }: IconProps) => {
  return (
    <svg
      className={className}
      width="46"
      height="46"
      viewBox="0 0 46 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {title ? <title>{title}</title> : null}

      <path
        d="M22.76 45.51C10.21 45.51 0 35.3 0 22.75C0 10.2 10.21 0 22.76 0C35.31 0 45.51 10.21 45.51 22.75C45.51 35.29 35.3 45.5 22.76 45.5V45.51ZM22.76 3.5C12.14 3.5 3.5 12.14 3.5 22.75C3.5 33.36 12.14 42 22.76 42C33.38 42 42.01 33.36 42.01 22.75C42.01 12.14 33.37 3.5 22.76 3.5Z"
        fill={`var(${colors.badgeTurquoiseLight.token})`}
      />
      <path
        d="M22.75 17.36L11.04 12.44V31.24L22.75 36.15V36.17L34.46 31.25V12.44L22.75 17.35V17.36ZM22.08 33.78L12.89 30V15.23L22.08 19.01V33.79V33.78ZM32.6 30.01L23.56 33.79V19.01L32.6 15.23V30V30.01Z"
        fill={`var(${colors.badgeTurquoiseLight.token})`}
      />
    </svg>
  )
}

export default EPrintFoldersSimple
