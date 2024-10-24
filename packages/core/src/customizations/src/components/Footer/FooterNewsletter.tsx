import { gql } from '@generated/gql'
import { useLazyQuery } from 'src/sdk/graphql/useLazyQuery'
import { Input, useUI } from '@faststore/ui'
import { useState, useRef, useEffect } from 'react'
import type { FormEvent } from 'react'

import Heading from '../Heading/Heading'
import FooterSocialMedia from './FooterSocialMedia'
import styles from './FooterNewsletter.module.scss'
import type { SocialMedia } from '../../@generated/cms/CustomFooter'
import Action from '../Action/Action'
import EnvelopeIcon from '../Icons/General/EnvelopeIcon'

const SUBSCRIBE_NEWSLETTER = gql(`
  mutation subscribeNewsletter($email: String, $fields: NewsletterFieldsInput) {
    subscribeNewsletter(email: $email, fields: $fields)
  }
`)

type SubscribeQueryResponse = {
  subscribeNewsletter: boolean
}

type FooterNewsletterProps = {
  socialLinks: SocialMedia
}

const FooterNewsletter = ({ socialLinks }: FooterNewsletterProps) => {
  const [loading, setLoading] = useState(false)
  const [subscribeNewsletter, { data }] = useLazyQuery<SubscribeQueryResponse>(
    SUBSCRIBE_NEWSLETTER,
    {}
  )

  const emailInputRef = useRef<HTMLInputElement>(null)

  const { pushToast } = useUI()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    void (async () => {
      await subscribeNewsletter({
        email: emailInputRef.current?.value ?? '',
      }).catch((error) => {
        console.error(error)
      })

      setLoading(false)
    })()

    event.currentTarget.reset()
  }

  useEffect(() => {
    if (!data) {
      return
    }

    if (data.subscribeNewsletter) {
      pushToast({
        message: 'Thank you for your signing up.',
        status: 'INFO',
      })

      return
    }

    pushToast({
      message: 'Something went wrong. Please Try again.',
      status: 'ERROR',
    })
  }, [data])

  return (
    <div className={styles.newsletter}>
      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.headerForm}>
            <Heading level={3} uiStyle={6}>
              Sign Up to the Newsletter
            </Heading>

            <p className={styles.newsDescription}>
              Sign up for our newsletters and be the first to hear about new
              music and our best-of's.
            </p>
          </div>

          <div className={styles.inputWrapper}>
            <label
              className={styles.inputLabel}
              htmlFor="newsletter-email-input"
            >
              Email Address
            </label>

            <Input
              className={styles.inputField}
              ref={emailInputRef}
              id="newsletter-email-input"
              placeholder="Email Address"
              type="email"
              required
            />

            <div className={styles.iconWrapper}>
              <EnvelopeIcon />
            </div>

            <div className={styles.actionWrapper}>
              <Action
                aria-label="submit"
                as="button"
                color="neutralDark"
                size="large"
                type="submit"
              >
                {loading ? 'Loading...' : 'Submit'}
              </Action>
            </div>
          </div>
        </form>

        <FooterSocialMedia socialLinks={socialLinks} />
      </div>
    </div>
  )
}

export default FooterNewsletter
