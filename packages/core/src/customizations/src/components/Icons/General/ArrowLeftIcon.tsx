import type { IconProps } from '../../../typings/props'

const ArrowLeftIcon = ({ className, title }: IconProps) => {
  return (
    <svg
      className={className}
      width="6"
      height="10"
      viewBox="0 0 6 10"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {title ? <title>{title}</title> : null}

      <path d="m.2929,4L4.2929,0l1.41421,1.41421-3.29289,3.2929,3.29289,3.29289-1.41421,1.41421L.2929,5.41421c-.39053-.39052-.39053-1.02369,0-1.41421Z" />
    </svg>
  )
}

export default ArrowLeftIcon
