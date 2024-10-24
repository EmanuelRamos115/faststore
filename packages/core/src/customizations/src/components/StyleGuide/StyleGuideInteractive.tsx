import CustomBreadcrumb from '../CustomBreadcrumb/CustomBreadcrumb'
import StyleGuideSubSection from './StyleGuideSubSection'
import Pagination from '../Pagination/Pagination'
import styles from './StyleGuide.module.scss'

const dummyBreadcrumbList = [
  { item: '/technology', name: 'Technology', position: 1 },
  { item: '/4k-philips-monitor', name: '4k Philips Monitor 27”', position: 2 },
  { item: '/aedle-vk1-headphone', name: 'Aedle VK-1 L Headphone', position: 3 },
]

const StyleGuideInteractive = () => {
  const handleChange = () => {
    window.console.log('Pagination click')
  }

  return (
    <>
      <StyleGuideSubSection heading="Modal">
        <div className={styles.card}>TODO</div>
      </StyleGuideSubSection>

      <StyleGuideSubSection heading="Pagination">
        <Pagination count={10} onChange={handleChange} page={1} />
      </StyleGuideSubSection>

      <StyleGuideSubSection heading="Breadcrumbs">
        <div className={styles.customBreadcrumbWrapper}>
          <CustomBreadcrumb breadcrumbList={dummyBreadcrumbList} />
        </div>
      </StyleGuideSubSection>
    </>
  )
}

export default StyleGuideInteractive
