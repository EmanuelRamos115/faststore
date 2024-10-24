import { useState, useEffect } from 'react'
import { gql } from '@generated/gql'
import { useQuery } from 'src/sdk/graphql/useQuery'
import type {
  ServerProductQueryQuery,
  GetCustomDataQuery,
} from '@generated/graphql'

import FolderImprintingForm from './FolderImprintingForm'
import { parseJson } from '../../utils/parseJson'
import {
  CUSTOM_DATA_APP_ID,
  CUSTOM_DATA_FIELD,
} from '../../constants/folderImprinting'

const GET_CUSTOM_DATA = gql(`
  query getCustomData($appId: String!, $field: String!) {
    customData(appId: $appId, field: $field)
  }
`)

export type FolderImprintingIds = {
  middleSection?: string
  upperSection?: string
  lowerSection?: string
}

export type ImprintingType = 'repeat' | 'diff'
export type LineType = 'repeat' | 'diff' | 'numbers' | 'notext'

export type FolderImprintingFormStates = {
  quantity: number
  imprintingEnabled: boolean
  imprintingType: ImprintingType | ''
  middleSectionEnabled: boolean
  middleLine1Type: LineType
  middleLine1Text: string
  middleLine2Type: LineType
  middleLine2Text: string
  upperSectionEnabled: boolean
  upperLineType: LineType
  upperLineText: string
  lowerSectionEnabled: boolean
  lowerLineType: LineType
  lowerLineText: string
  middleLine1Table: string[]
  middleLine2Table: string[]
  upperLineTable: string[]
  lowerLineTable: string[]
}

export type Customizations = {
  type: ImprintingType | ''
  quantity: number
  text: Array<{
    middleLine1?: string
    middleLine2?: string
    upperLine?: string
    lowerLine?: string
  }>
}

export type LineKeys = 'middleLine1' | 'middleLine2' | 'upperLine' | 'lowerLine'

export type FolderImprintingCustomData = Record<string, Customizations>

type FolderImprintingProps = {
  product: ServerProductQueryQuery['product']
}

const allSame = (lineText: string[]) => {
  return lineText.every((lt) => lt === lineText[0])
}

const inNumericalOrder = (lineText: string[]) => {
  return lineText.every(
    (lt, i) =>
      i === lineText.length - 1 || Number(lt) + 1 === Number(lineText[i + 1])
  )
}

const isSectionEnabled = (
  customizations: Customizations,
  line: LineKeys
): boolean => {
  const { text } = customizations

  return text.some((t) => line in t)
}

const getLineType = (
  customizations: Customizations,
  line: LineKeys
): LineType => {
  const { type, text } = customizations
  const lineText = text.map((t) => t[line]) as string[]

  if (!lineText || type === 'repeat' || allSame(lineText)) {
    return 'repeat'
  }

  if (inNumericalOrder(lineText)) {
    return 'numbers'
  }

  return 'diff'
}

const getLineText = (
  customizations: Customizations,
  line: LineKeys
): string => {
  const { text } = customizations
  const lineText = text.map((t) => t[line])

  if (
    !isSectionEnabled(customizations, line) ||
    getLineType(customizations, line) === 'diff'
  ) {
    return ''
  }

  return lineText[0] ?? ''
}

const getLineTable = (
  customizations: Customizations,
  line: LineKeys
): string[] => {
  const { type, text } = customizations
  const lineText = text.map((t) => t[line]) as string[]

  if (!isSectionEnabled(customizations, line) || type === 'repeat') {
    return []
  }

  return lineText ?? []
}

const getFormData = (
  customizations: Customizations
): FolderImprintingFormStates => {
  return {
    imprintingEnabled: true,
    imprintingType: customizations.type,
    quantity: customizations.quantity,
    middleSectionEnabled:
      isSectionEnabled(customizations, 'middleLine1') ||
      isSectionEnabled(customizations, 'middleLine2'),
    middleLine1Type: getLineType(customizations, 'middleLine1'),
    middleLine1Text: getLineText(customizations, 'middleLine1'),
    middleLine2Type: getLineType(customizations, 'middleLine2'),
    middleLine2Text: getLineText(customizations, 'middleLine2'),
    upperSectionEnabled: isSectionEnabled(customizations, 'upperLine'),
    upperLineType: getLineType(customizations, 'upperLine'),
    upperLineText: getLineText(customizations, 'upperLine'),
    lowerSectionEnabled: isSectionEnabled(customizations, 'lowerLine'),
    lowerLineType: getLineType(customizations, 'lowerLine'),
    lowerLineText: getLineText(customizations, 'lowerLine'),
    middleLine1Table: getLineTable(customizations, 'middleLine1'),
    middleLine2Table: getLineTable(customizations, 'middleLine2'),
    upperLineTable: getLineTable(customizations, 'upperLine'),
    lowerLineTable: getLineTable(customizations, 'lowerLine'),
  }
}

const FolderImprinting = ({ product }: FolderImprintingProps) => {
  const [orderFormData, setOrderFormData] =
    useState<FolderImprintingFormStates | null>()

  const { data } = useQuery<GetCustomDataQuery>(GET_CUSTOM_DATA, {
    appId: CUSTOM_DATA_APP_ID,
    field: CUSTOM_DATA_FIELD,
  })

  useEffect(() => {
    if (!data) {
      return
    }

    const customizations = data?.customData
      ? parseJson<FolderImprintingCustomData>(data.customData)?.[product.gtin]
      : null

    if (!customizations) {
      setOrderFormData(null)

      return
    }

    setOrderFormData(getFormData(customizations))
  }, [data])

  if (orderFormData === undefined) {
    return null
  }

  return (
    <FolderImprintingForm product={product} orderFormData={orderFormData} />
  )
}

export default FolderImprinting
