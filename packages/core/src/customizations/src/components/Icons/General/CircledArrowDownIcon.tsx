import type { IconProps } from '../../../typings/props'

const CircledArrowDownIcon = ({ className, title }: IconProps) => {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M21 11C21 5.477 16.523 1 11 1C5.477 1 1 5.477 1 11C1 16.523 5.477 21 11 21C16.523 21 21 16.523 21 11Z"
        stroke="currentColor"
        stroke-width="1.66667"
        stroke-linejoin="round"
      />
      <path
        d="M15.4999 9.5L10.9999 14L6.49988 9.5"
        stroke="currentColor"
        stroke-width="1.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default CircledArrowDownIcon
