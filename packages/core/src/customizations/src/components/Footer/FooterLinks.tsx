import React, { useState } from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Icon,
  Link,
  List as UIList,
} from '@faststore/ui'

import styles from './FooterLinks.module.scss'
import type {
  FooterLinksSection as LinksListProps,
  CustomFooter as FooterLinksProps,
} from '../../@generated/cms/CustomFooter'

const LinksList = ({ items }: LinksListProps) => {
  return (
    <UIList className="list-reset">
      {items.map((item) => {
        return (
          <li key={item.text}>
            <Link href={item.url} variant="footer">
              {item.text}
            </Link>
          </li>
        )
      })}
    </UIList>
  )
}

const FooterLinks = ({
  footerLinks,
}: Pick<FooterLinksProps, 'footerLinks'>) => {
  const [indexExpanded, setIndexExpanded] = useState<number | null>(null)

  const onChange = (index: number) => {
    if (indexExpanded === index) {
      setIndexExpanded(null)
    } else {
      setIndexExpanded(index)
    }
  }

  return (
    <section className={styles.fsFooter}>
      <div className={styles.mobile}>
        <Accordion
          className={styles.accordion}
          indices={
            indexExpanded !== null ? new Set([indexExpanded]) : new Set()
          }
          onChange={onChange}
        >
          {footerLinks.map((section) => {
            return (
              <AccordionItem key={section.sectionTitle}>
                <AccordionButton
                  className={styles.accordionButton}
                  expandedIcon={<Icon name="CaretUp" data-icon="expanded" />}
                  collapsedIcon={
                    <Icon name="CaretDown" data-icon="collapsed" />
                  }
                >
                  {section.sectionTitle}
                </AccordionButton>

                <AccordionPanel>
                  <LinksList items={section.items} />
                </AccordionPanel>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>

      <div className={styles.desktop}>
        <nav className={styles.desktopNav}>
          {footerLinks.map((section) => {
            return (
              <div key={section.sectionTitle}>
                <p className={styles.title}>{section.sectionTitle}</p>

                <LinksList items={section.items} />
              </div>
            )
          })}
        </nav>
      </div>
    </section>
  )
}

export default FooterLinks
