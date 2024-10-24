import { Fragment } from 'react'
import { Table, TableRow, TableCell, TableBody } from '@faststore/ui'

import type { OrganizationsState } from './utils/types'
import styles from './B2BOrganizationsTable.module.scss'

type B2BOrganizationsTableProps = {
  organizations: OrganizationsState['dataList']
  value?: string
  onChange?: (newValue: string) => void
  filter?: string
}

function B2BOrganizationsTable({
  organizations,
  value,
  onChange,
  filter,
}: B2BOrganizationsTableProps) {
  return (
    <div className={styles.organizationsTable}>
      <Table variant="bordered">
        <TableBody>
          {organizations?.map((organization) => {
            const id = [organization?.orgId, organization?.costId].join(',')

            if (
              !filter ||
              filter.trim() === '' ||
              organization?.organizationName
                ?.trim()
                .toLowerCase()
                .includes(filter.trim().toLowerCase()) ||
              organization?.costCenterName
                ?.trim()
                .toLowerCase()
                .includes(filter.trim().toLowerCase())
            ) {
              return (
                <TableRow
                  key={id}
                  onClick={() => onChange?.(id)}
                  data-fs-table-row-clickable
                  data-fs-table-row-selected={value === id}
                >
                  <TableCell align="left">
                    <label htmlFor={id}>{organization?.organizationName}</label>
                  </TableCell>
                  <TableCell align="left">
                    <label htmlFor={id}>{organization?.costCenterName}</label>
                  </TableCell>
                </TableRow>
              )
            }

            return <Fragment key={id} />
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default B2BOrganizationsTable
