import type { SectionOverride } from '@faststore/core'

import CustomBreadcrumb from '../CustomBreadcrumb/CustomBreadcrumb'

const SECTION = 'Breadcrumb' as const

const override: SectionOverride = {
  section: SECTION,
  components: {
    Breadcrumb: { Component: CustomBreadcrumb },
  },
}

export { override }
