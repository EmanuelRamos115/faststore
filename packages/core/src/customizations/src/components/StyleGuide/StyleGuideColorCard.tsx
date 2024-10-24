import styles from './StyleGuideColorCard.module.scss'

type StyleGuideColorCardProps = {
  color: {
    hexCode: string
    token: string
  }
}

const StyleGuideColorCard = ({ color }: StyleGuideColorCardProps) => {
  return (
    <div className={styles.colorCard}>
      <div
        className={styles.colorSwatch}
        style={{ backgroundColor: `${color.hexCode}` }}
      />

      <div className={styles.colorInfo}>
        {color.token}
        <br />
        {color.hexCode}
      </div>
    </div>
  )
}

export default StyleGuideColorCard
