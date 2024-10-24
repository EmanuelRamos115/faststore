import { gql } from '@generated/gql'
import { useSearch } from '@faststore/sdk'
import { useQuery_unstable as useQuery } from '@faststore/core/experimental'

import { useFacetsUrl } from '../../hooks/useFacetsUrl'
import styles from './DepartmentBanner.module.scss'

type DepartmentBannerIOProps = {
  departmentBanner?: { banners: BannerProps[] } | null
}

type BannerProps = {
  id: string
  html: string
}

const DEPARTMENT_BANNER = gql(`
  query departmentBanner($department: String!) {
    departmentBanner(department: $department) {
      banners {
        id
        name
        html
      }
    }
  }
`)

const DepartmentBannerIO = () => {
  const { state: searchState } = useSearch()

  if (!searchState?.selectedFacets) {
    return null
  }

  const department = useFacetsUrl(searchState.selectedFacets)
  const { data } = useQuery<DepartmentBannerIOProps>(DEPARTMENT_BANNER, {
    department,
  })

  return (
    <div className={styles.links}>
      {data?.departmentBanner?.banners?.map((banner: BannerProps) => {
        return (
          <div
            key={banner.id} // Adicionando uma chave única para cada banner
            id={banner.id}
            className={styles.departmentBanner}
            dangerouslySetInnerHTML={{ __html: banner.html }}
          />
        )
      })}
    </div>
  )
}

export default DepartmentBannerIO
