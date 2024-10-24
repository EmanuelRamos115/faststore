import classNames from 'classnames'
import { Link } from '@faststore/ui'
import NextLink from 'next/link'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'

import styles from './Action.module.scss'

type BaseProps = {
  color: string
  size: 'small' | 'medium' | 'large'
  fullWidth?: boolean
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  as: 'button'
  type: ButtonHTMLAttributes<HTMLButtonElement>['type']
}

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  as: 'a'
  href: string
}

type ActionProps = BaseProps & (ButtonProps | AnchorProps)

const Action = ({
  color,
  size,
  fullWidth,
  className,
  ...domProps
}: ActionProps) => {
  const classes = classNames(
    styles.action,
    styles[color],
    styles[size],
    { [styles.fullWidth]: fullWidth },
    className
  )

  return domProps.as === 'a' ? (
    <Link
      {...domProps}
      className={classes}
      href={domProps.href}
      as={NextLink}
    />
  ) : (
    <button {...domProps} className={classes} type={domProps.type} />
  )
}

export default Action
