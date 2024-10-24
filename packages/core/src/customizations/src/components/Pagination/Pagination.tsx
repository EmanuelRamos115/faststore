import { Pagination as MuiPagination } from '@mui/material'
import type { ChangeEvent } from 'react'

import { colors } from '../../constants/colors'

const styles = {
  '& .MuiPaginationItem-previousNext': {
    border: `2px solid ${colors.black.hexCode}`,
  },
  '& .MuiButtonBase-root': {
    fontSize: '1rem',
    fontFamily: 'futura-pt, sans-serif',
    fontWeight: '400',
  },
  '& .MuiButtonBase-root:hover': {
    backgroundColor: `${colors.grey.hexCode}`,
  },
  '& .MuiButtonBase-root.Mui-selected': {
    color: `${colors.white.hexCode}`,
    backgroundColor: `${colors.maroon.hexCode}`,
    fontWeight: '700',
  },
  '& .Mui-selected:hover': {
    backgroundColor: `${colors.maroon.hexCode}`,
  },
}

type PaginationProps = {
  count: number
  onChange: (event: ChangeEvent<unknown>, value: number) => void
  page: number
}

const Pagination = ({ count, onChange, page }: PaginationProps) => {
  return (
    <MuiPagination count={count} page={page} onChange={onChange} sx={styles} />
  )
}

export default Pagination
