declare global {
  interface Window {
    Trustpilot: any
  }
}

// mega menu
export type MenuItemProps = {
  id: string
  parentId: string | null
  type: string
  position: number
  title: string
  children?: MenuItemProps[] | null
  blocks?: MenuItemProps[] | null
  url?: string | null
  imageUrl?: string | null
  altText?: string | null
  ctaText?: string | null
}

// icons
export type IconProps = {
  className?: string
  title?: string
}

export type Reading = {
  calendar: string
  date: string
  dateText: string
  season: string
  title: string
  year: string
}

export type SearchResult = {
  date: string
  dateTitle?: string
  readings?: string[]
  altReadings?: string[]
  holyDays?: string[]
}

export type PartsNames =
  | 'part1'
  | 'part2'
  | 'part3'
  | 'part4'
  | 'part5'
  | 'scoreParts'

export type FormData = {
  [key: string]: {
    quantity: number
    error?: boolean
  }
}
