import styles from './StyleGuideIconCard.module.scss'

type StyleGuideIconCardProps = {
  icon: {
    icon: JSX.Element
    text: string
  }
}

const StyleGuideIconCard = ({ icon }: StyleGuideIconCardProps) => {
  return (
    <div key={icon.text} className={styles.iconCard}>
      {icon.icon}
      <p>{icon.text}</p>
    </div>
  )
}

export default StyleGuideIconCard
