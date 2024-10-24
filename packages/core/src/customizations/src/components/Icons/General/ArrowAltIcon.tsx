import type { IconProps } from '../../../typings/props'

const ArrowAltIcon = ({ className, title }: IconProps) => {
  return (
    <svg
      className={className}
      width="18"
      height="12"
      viewBox="0 0 18 12"
      fill="currentColor"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {title ? <title>{title}</title> : null}
      <path d="M11.5214 10.5679L11.9572 11L17 6L11.9572 1L11.5214 1.4321L15.8171 5.69136H1V6.30864H15.8171L11.5214 10.5679Z" />
    </svg>
  )
}

export default ArrowAltIcon
