import Link from 'next/link'
import { useState, useEffect } from 'react'
import classNames from 'classnames'
import { useQuery } from 'src/sdk/graphql/useQuery'
import { gql } from '@generated/gql'
import type { GetBrandListQuery } from '@generated/graphql'

import Heading from '../Heading/Heading'
import styles from './BrandList.module.scss'
import { slugify } from '../../utils/slugify'
import type { BrandList as BrandListProps } from '../../@generated/cms/BrandList'

const GET_BRAND_LIST = gql(`
  query getBrandList {
    brandList {
      name
    }
  }
`)

type BrandListState = Record<string, string[]>

const BrandList = ({ heading }: BrandListProps) => {
  const { data } = useQuery<GetBrandListQuery>(GET_BRAND_LIST, {})
  const [brandList, setBrandList] = useState<BrandListState>()

  const groupAlphabetically = (
    brands: NonNullable<GetBrandListQuery['brandList']>
  ): BrandListState => {
    return brands.reduce((acc: BrandListState, { name }) => {
      let firstChar = name[0].toUpperCase()

      if (/\d+/.test(firstChar)) {
        firstChar = '#'
      }

      if (acc[firstChar]) {
        acc[firstChar].push(name)
      } else {
        acc[firstChar] = [name]
      }

      return acc
    }, {})
  }

  useEffect(() => {
    if (!data?.brandList) {
      return
    }

    setBrandList(groupAlphabetically(data.brandList))
  }, [data])

  return (
    <>
      <section className={styles.jumpToSection}>
        <Heading uiStyle={2} level={1}>
          {heading}
        </Heading>

        <nav>
          <ul className={`list-reset ${styles.letterNav}`}>
            {brandList &&
              Object.keys(brandList).map((letter) => (
                <li>
                  <Link
                    className={classNames(styles.letterLink)}
                    key={letter}
                    href={`#${letter}`}
                    scroll={false}
                  >
                    {letter}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      </section>

      <section className={styles.brandsSection}>
        <div className={styles.brandsWrapper}>
          {brandList &&
            Object.keys(brandList).map((letter) => (
              <div className={styles.alphaSection} id={letter}>
                <Heading uiStyle={4} level={2} className={styles.alphaHeading}>
                  {letter}
                </Heading>
                <ul className={styles.brandsList}>
                  {brandList[letter].map((brandName) => (
                    <li className={styles.brandsListItem}>
                      <Link
                        className={styles.brandLink}
                        href={`/${slugify(brandName)}`}
                        title={brandName}
                      >
                        {brandName}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </section>
    </>
  )
}

export default BrandList
