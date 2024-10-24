import type { IconProps } from '../../../typings/props'

const ExclamationIconSolid = ({ className, title }: IconProps) => {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {title ? <title>{title}</title> : null}

      <circle cx="9" cy="9" r="9" fill="currentColor" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.94287 10.122C7.94287 10.6538 8.37208 11.083 8.90379 11.083C9.4355 11.083 9.86472 10.6538 9.86472 10.122V4.72166C9.86472 4.18995 9.4355 3.76074 8.90379 3.76074C8.37208 3.76074 7.94287 4.18995 7.94287 4.72166V10.122ZM9.9612 13.0571C9.9612 13.6409 9.48796 14.1141 8.90418 14.1141C8.32041 14.1141 7.84717 13.6409 7.84717 13.0571C7.84717 12.4734 8.32041 12.0001 8.90418 12.0001C9.48796 12.0001 9.9612 12.4734 9.9612 13.0571Z"
        fill="#fff"
      />
    </svg>
  )
}

export default ExclamationIconSolid
