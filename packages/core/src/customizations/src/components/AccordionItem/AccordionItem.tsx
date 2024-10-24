import type { ReactNode } from 'react'
import { AccordionItem, AccordionButton, AccordionPanel } from '@faststore/ui'

import ArrowDownIcon from '../Icons/General/ArrowDownIcon'
import ArrowUpIcon from '../Icons/General/ArrowUpIcon'
import styles from './AccordionItem.module.scss'

type AccordionProps = {
  title: string
  details: ReactNode
  index: number
}

const Accordion = ({ title, details, index }: AccordionProps) => {
  return (
    <AccordionItem className={styles.accordionItem} index={index}>
      <AccordionButton
        className={styles.accordionButton}
        expandedIcon={<ArrowUpIcon />}
        collapsedIcon={<ArrowDownIcon />}
      >
        {title}
      </AccordionButton>
      <AccordionPanel className={styles.accordionPanel}>
        {details}
      </AccordionPanel>
    </AccordionItem>
  )
}

export default Accordion
