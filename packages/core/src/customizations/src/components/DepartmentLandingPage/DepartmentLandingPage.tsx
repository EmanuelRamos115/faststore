/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { gql } from '@generated/gql'
import { useQuery } from 'src/sdk/graphql/useQuery'
import type { GetCategoryTreeQuery } from '@generated/graphql'

import type {
  DepartmentLandingPage as DepartmentLandingPageProps,
  Section as SectionProps,
  ProductList as ProductListProps,
  TwoCards as TwoCardsProps,
  ImageAndText as ImageAndTextProps,
} from '../../@generated/cms/DepartmentLandingPage'
import styles from './DepartmentLandingPage.module.scss'
import CategoryNav from './CategoryNav'
import MobileNav from './MobileNav'
import ProductListSection from './ProductListSection'
import TwoCardsSection from './TwoCardsSection'
import ImageAndText from '../ImageAndText/ImageAndText'

const GET_CATEGORY_TREE = gql(`
  query getCategoryTree($id: Int!, $excludeIds: [Int!]) {
    categoryTree(id: $id, excludeIds: $excludeIds) {
      id
      name
      url
      hasChildren
      children {
        id
        name
        url
      }
    }
  }
`)

const isProductListSection = (
  section: SectionProps
): section is ProductListProps => {
  return 'productQuery' in section && !section.content
}

const isTwoCardsSection = (section: SectionProps): section is TwoCardsProps => {
  return Array.isArray(section)
}

const isImageAndTextSection = (
  section: SectionProps
): section is ImageAndTextProps => {
  return 'content' in section
}

const DepartmentLandingPage = ({
  sidebarNav,
  contentSections,
}: DepartmentLandingPageProps) => {
  const { data, isLoading } = useQuery<GetCategoryTreeQuery>(
    GET_CATEGORY_TREE,
    {
      id: Number(sidebarNav.departmentId),
      excludeIds: sidebarNav.excludeIds?.map((id) => Number(id)),
    }
  )

  const categoryTree = data?.categoryTree

  return (
    <section data-testid="product-gallery" className={styles.section}>
      {!isLoading && categoryTree && <MobileNav categoryTree={categoryTree} />}

      <div className={styles.main}>
        <div className={styles.layout}>
          <aside className={styles.leftColumn}>
            {!isLoading && categoryTree && (
              <CategoryNav categoryTree={categoryTree} placement="desktop" />
            )}
          </aside>

          <div className={styles.rightColumn}>
            {contentSections?.map((section) => (
              <section className={styles.contentSection}>
                {isProductListSection(section) && (
                  <ProductListSection
                    heading={section.heading}
                    cta={section.cta}
                    productQuery={section.productQuery}
                  />
                )}

                {isTwoCardsSection(section) && (
                  <TwoCardsSection section={section} />
                )}

                {isImageAndTextSection(section) && (
                  <ImageAndText
                    layout="contained"
                    content={section.content}
                    image={section.image}
                    imageLoadingStrategy="lazy"
                  />
                )}
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default DepartmentLandingPage
