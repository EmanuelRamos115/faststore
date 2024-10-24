import type { IconProps } from '../../../typings/props'

const ArrowDownIcon = ({ className, title }: IconProps) => {
  return (
    <svg
      className={className}
      fill="currentColor"
      height="7"
      viewBox="0 0 10 7"
      width="10"
      xmlns="http://www.w3.org/2000/svg"
    >
      {title ? <title>{title}</title> : null}
      <path d="m4.29297 6.20718-4.000001-4 1.414211-1.414211 3.2929 3.292891 3.29289-3.292891 1.41421 1.414211-4 4c-.39052.39053-1.02369.39053-1.41421 0z" />
    </svg>
  )
}

export default ArrowDownIcon
