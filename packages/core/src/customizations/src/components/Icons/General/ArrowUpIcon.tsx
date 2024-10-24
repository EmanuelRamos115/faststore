import type { IconProps } from '../../../typings/props'

const ArrowUpIcon = ({ className, title }: IconProps) => {
  return (
    <svg
      className={className}
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {title ? <title>{title}</title> : null}
      <path d="m5.41421.2929l4,4-1.41421,1.41421-3.2929-3.29289-3.29289,3.29289-1.41421-1.41421L4,.2929c.39052-.39053,1.02369-.39053,1.41421,0Z" />
    </svg>
  )
}

export default ArrowUpIcon
