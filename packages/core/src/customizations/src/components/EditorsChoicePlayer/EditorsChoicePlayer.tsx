import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

import { mediaUrl } from '../../../faststore.config'
import styles from './EditorsChoicePlayer.module.scss'

declare global {
  interface Window {
    IS_CUSTOM_SMC_MOUNT: boolean
    SMC_MOUNT_POINT: string
    SMC_SHADOW_ROOT: ShadowRoot
    SMC_STOP_AUDIO?: () => void
  }
}

// --- For local development of SMC-Viewer ---
// const SMC_SCRIPTS = [
//   `http://localhost:3060/print.min.js`,
//   `http://localhost:3060/js/chunk-vendors.js`,
//   `http://localhost:3060/js/app.js`,
// ]

// const SMC_STYLES = [
//   'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900',
//   'https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css',
//   `http://localhost:3060/css/chunk-vendors.css`,
//   `http://localhost:3060/css/app.css`,
// ]

// --- For dev/prod ---
const SMC_SCRIPTS = [
  `${mediaUrl}webviews/faststore/print.min.js`,
  `${mediaUrl}webviews/faststore/js/chunk-vendors.js`,
  `${mediaUrl}webviews/faststore/js/app.js`,
]

const SMC_STYLES = [
  'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900',
  'https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css',
  `${mediaUrl}webviews/faststore/css/chunk-vendors.css`,
  `${mediaUrl}webviews/faststore/css/app.css`,
]

const EditorsChoicePlayer = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const collectionId = searchParams.get('collectionId')
  const shadowContainerRef = useRef<HTMLDivElement>(null)
  const [shadowDomCreated, setShadowDomCreated] = useState(false)

  useEffect(() => {
    const handleRouteChange = () => {
      if (window.SMC_STOP_AUDIO) {
        window.SMC_STOP_AUDIO()
      }
    }

    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [router])

  useEffect(() => {
    if (!shadowContainerRef.current || shadowDomCreated || !collectionId) {
      return
    }

    const shadowRoot = shadowContainerRef.current.attachShadow({ mode: 'open' })

    window.IS_CUSTOM_SMC_MOUNT = true
    window.SMC_MOUNT_POINT = '#smcApp'
    window.SMC_SHADOW_ROOT = shadowRoot

    // Inject hidden input with parameters into Shadow DOM
    const inputEl = document.createElement('input')

    inputEl.type = 'hidden'
    inputEl.name = 'smc_params'
    inputEl.value = `?collectionId=${collectionId}&vtexCollectionPlayer=true`
    shadowRoot.appendChild(inputEl)

    // Inject styles into Shadow DOM
    SMC_STYLES.forEach((styleHref) => {
      const linkEl = document.createElement('link')

      linkEl.rel = 'stylesheet'
      linkEl.href = styleHref
      shadowRoot.appendChild(linkEl)
    })

    // Inject SMC App container
    const smcAppContainer = document.createElement('div')

    smcAppContainer.id = 'smcApp'
    shadowRoot.appendChild(smcAppContainer)

    // Inject Scripts into Shadow DOM
    if (collectionId) {
      SMC_SCRIPTS.forEach((script) => {
        const scriptEl = document.createElement('script')

        scriptEl.src = script
        scriptEl.async = true
        shadowRoot.appendChild(scriptEl)
      })
    }

    setShadowDomCreated(true)
  }, [collectionId, shadowContainerRef])

  return (
    <div className={styles.editorsChoicePlayerWrapper}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css"
      />
      <div className={styles.ecWrapper} ref={shadowContainerRef}></div>
    </div>
  )
}

export default EditorsChoicePlayer
