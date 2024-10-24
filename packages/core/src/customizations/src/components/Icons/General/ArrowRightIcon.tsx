import type { IconProps } from '../../../typings/props'

const ArrowRightIcon = ({ className, title }: IconProps) => {
  return (
    <svg
      className={className}
      width="6"
      height="9"
      viewBox="0 0 6 9"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {title ? <title>{title}</title> : null}
      <path d="m5.41421,5.41421L1.41421,9.41421l-1.41421-1.41421,3.29289-3.2929L0,1.41421,1.41421,0l4,4c.39053.39052.39053,1.02369,0,1.41421Z" />
    </svg>
  )
}

export default ArrowRightIcon
