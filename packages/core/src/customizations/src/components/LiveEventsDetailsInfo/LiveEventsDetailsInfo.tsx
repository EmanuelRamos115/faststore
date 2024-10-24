'use client'

import { useEffect, useState } from 'react'

import Heading from '../Heading/Heading'
import ShareButton from '../ShareButton/ShareButton'
import richTextToHtml from '../../utils/richTextToHtml'
import styles from './LiveEventsDetailsInfo.module.scss'
import type { LiveEventsDetailsInfo as LiveEventsDetailsInfoProps } from '../../@generated/cms/LiveEventsDetailsInfo'

const LiveEventsDetailsInfo = ({
  about,
  contact,
  directions,
}: LiveEventsDetailsInfoProps) => {
  const [url, setUrl] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUrl(new URL(window.location.href).href)
    }
  }, [])

  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.infoWrapper}>
        {/* ABOUT THE EVENT */}
        <div className={styles.infoContentWrapper}>
          <Heading level={3} uiStyle={6} className={styles.infoHeading}>
            About the Event
          </Heading>

          <div className={styles.infoColumn}>
            <p>
              <strong>Location:</strong> {about.location}
            </p>

            <p>
              <strong>Date:</strong> {about.date}
            </p>

            <div
              className={styles.descriptionWrapper}
              dangerouslySetInnerHTML={{
                __html: richTextToHtml(about.description),
              }}
            />
          </div>
        </div>

        {/* DIRECTIONS */}
        <div className={styles.infoContentWrapper}>
          <Heading level={3} uiStyle={6} className={styles.infoHeading}>
            Directions
          </Heading>

          <div className={styles.infoColumn}>
            <div
              dangerouslySetInnerHTML={{
                __html: richTextToHtml(directions.address),
              }}
            />

            <div
              className={styles.mapWrapper}
              dangerouslySetInnerHTML={{
                __html: richTextToHtml(directions.mapIframeCode),
              }}
            />
          </div>
        </div>

        {/* CONTACT US */}
        <div className={styles.infoContentWrapper}>
          <Heading level={3} uiStyle={6} className={styles.infoHeading}>
            Contact Us
          </Heading>

          <div className={styles.infoColumn}>
            <div>
              <p>{contact.host}</p>
              <p>
                Email:{' '}
                <a
                  href={`mailto:${contact.email}`}
                  className={styles.contactLink}
                >
                  {contact.email}
                </a>
              </p>

              <p>
                Phone:{' '}
                <a href={`tel:${contact.phone}`} className={styles.contactLink}>
                  {contact.phone}
                </a>
              </p>
            </div>

            <div className={styles.websiteWrapper}>
              <p>For more information visit:</p>

              <a href={contact.website} target="_blank" rel="noreferrer">
                <strong>{contact.website}</strong>
              </a>
            </div>

            <div className={styles.shareWrapper}>
              <p>
                <strong>Share this event</strong>
              </p>

              <ShareButton
                buttonText={contact.eventName}
                toastMessage="Event link copied to your clipboard."
                url={url}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LiveEventsDetailsInfo
