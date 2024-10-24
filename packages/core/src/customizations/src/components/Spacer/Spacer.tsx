import styles from './Spacer.module.scss'
import type { Spacer as SpacerProps } from '../../@generated/cms/Spacer'

const BASE_FONT_SIZE = 16

const Spacer = ({ divider, height }: SpacerProps) => {
  return (
    <div className={styles.container}>
      {divider ? (
        <div
          style={{
            background: 'var(--jwp-color-grey)',
            margin: `${height / 2 / BASE_FONT_SIZE}rem 0`,
            height: '1px',
            width: '100%',
          }}
        />
      ) : (
        <div
          style={{ height: `${height / BASE_FONT_SIZE}rem`, width: '100%' }}
        />
      )}
    </div>
  )
}

export default Spacer
