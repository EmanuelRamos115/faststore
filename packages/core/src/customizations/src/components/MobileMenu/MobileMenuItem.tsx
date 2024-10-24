import type { MouseEvent } from 'react'
import React from 'react'
import Link from 'next/link'

export type MobileMenuItemProps = {
  title: string
  url?: string | null
  toggleIcon?: JSX.Element
  hasChildren?: boolean
  className: string
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

const MobileMenuItem = ({
  title,
  url,
  toggleIcon,
  hasChildren,
  className,
  onClick,
}: MobileMenuItemProps) => {
  return (
    <>
      {!hasChildren && url ? (
        <Link href={url} className={className}>
          {title}
        </Link>
      ) : (
        <button className={className} onClick={onClick}>
          {title}
          {hasChildren && toggleIcon}
        </button>
      )}
    </>
  )
}

export default MobileMenuItem
