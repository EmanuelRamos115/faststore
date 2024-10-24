import type { PageTags as PageTagsProps } from '../../@generated/cms/PageTags'
import styles from './PageTags.module.scss'
import Action from '../Action/Action'
import Heading from '../Heading/Heading'

const PageTags = ({ heading, tags }: PageTagsProps) => {
  return (
    <section className={styles.section}>
      <Heading level={2} uiStyle={8} allCaps bold divider>
        {heading}
      </Heading>

      <ul className={`list-reset ${styles.tagList}`}>
        {tags.map((tag) => (
          <li key={tag.text}>
            <Action
              as="a"
              href={tag.url}
              color="neutralLight"
              size="medium"
              className={styles.tag}
            >
              {tag.text}
            </Action>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default PageTags
