import type { IconProps } from '../../../typings/props'

const AudioBarsIcon = ({ className, title }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width="18"
      height="17"
      viewBox="0 0 18 17"
      fill="currentColor"
    >
      {title ? <title>{title}</title> : null}

      <rect y="1.88892" width="1.91342" height="15.1111" />
      <rect x="3.8269" y="7.55554" width="1.91342" height="9.44444" />
      <rect x="7.65381" y="3.77734" width="1.91342" height="13.2222" />
      <rect x="11.4807" y="11.333" width="1.91342" height="5.66667" />
      <rect x="15.3074" width="1.91342" height="17" />
    </svg>
  )
}

export default AudioBarsIcon
