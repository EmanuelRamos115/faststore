import type { IconProps } from '../../../typings/props'

const MenuIcon = ({ className, title }: IconProps) => {
  return (
    <svg
      className={className}
      width="20"
      height="18"
      viewBox="0 0 20 18"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {title ? <title>{title}</title> : null}

      <rect width="20" height="2" rx="1" />
      <rect y="8" width="20" height="2" rx="1" />
      <rect y="16" width="20" height="2" rx="1" />
    </svg>
  )
}

export default MenuIcon
