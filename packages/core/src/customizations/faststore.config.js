const { withSentryConfig } = require('@sentry/nextjs')

/**
 * This variable must be different between environments.
 * All other configuration branches based on this.
 */
const ENVIRONMENT = process.env.VTEX_ENV ?? 'development'
// End environment specific configuration

if (ENVIRONMENT !== 'development' && ENVIRONMENT !== 'production') {
  throw new Error(`Invalid environment: ${ENVIRONMENT}`)
}

const CONFIG = {
  development: {
    account: 'jwpepperdev',
    storeUrl: `https://dev-vtex.jwpepper.com`,
    secureSubdomain: `https://secure.dev-vtex.jwpepper.com`,
    checkoutUrl: `https://secure.dev-vtex.jwpepper.com/checkout/details`,
    overridedGtmContainerId: 'GTM-MRX9JXJN',
    loginUrl: `https://secure.dev-vtex.jwpepper.com/api/io/login`,
    accountUrl: `https://secure.dev-vtex.jwpepper.com/api/io/account`,
    apimBaseUrl: 'https://dev-vtex-apim.azure-api.net/',
    physicalWarehouses: ['1836bae', '134940c'],
    eprintWarehouses: ['1d1052a', '14faa48'],
    mediaUrl: 'https://dev-app.legatomedia.com/smc/',
    cartValidationBaseUrl:
      'https://secure.dev-vtex.jwpepper.com/_v/private/validate-cart',
  },
  production: {
    account: 'jwpepper',
    storeUrl: `https://jwpepper.vtex.app`,
    secureSubdomain: `https://jwpepper.myvtex.com`,
    checkoutUrl: `https://jwpepper.myvtex.com/checkout/details`,
    overridedGtmContainerId: 'GTM-N8X3NRTN',
    loginUrl: `https://jwpepper.myvtex.com/login`,
    accountUrl: `https://jwpepper.myvtex.com/api/io/account`,
    apimBaseUrl: 'https://TODO',
    physicalWarehouses: ['1836bae', '134940c'],
    eprintWarehouses: ['1d1052a', '14faa48'],
    mediaUrl: 'https://app.legatomedia.com/smc/',
    cartValidationBaseUrl:
      'https://jwpepper.myvtex.com/_v/private/validate-cart',
  },
}

const {
  account,
  storeUrl,
  secureSubdomain,
  checkoutUrl,
  loginUrl,
  accountUrl,
  overridedGtmContainerId,
  physicalWarehouses,
  eprintWarehouses,
  mediaUrl,
  cartValidationBaseUrl,
} = CONFIG[ENVIRONMENT]

module.exports = /** @type {const} */ ({
  environment: ENVIRONMENT,
  envConfig: CONFIG[ENVIRONMENT],
  seo: {
    title: 'J.W. Pepper Sheet Music',
    description:
      'Delivering music since 1876, J.W. Pepper carries the largest inventory of sheet music for band, orchestra, choir, vocal, and every instrument and ensemble group. All with our 100% Satisfaction Guarantee.',
    titleTemplate: '%s | J.W. Pepper',
    author: 'J.W. Pepper and Son',
  },
  theme: 'custom-theme',
  platform: 'vtex',
  api: {
    storeId: account,
    workspace: 'master',
    environment: 'vtexcommercestable',
    hideUnavailableItems: false,
    incrementAddress: false,
  },
  session: {
    currency: {
      code: 'USD',
      symbol: '$',
    },
    locale: 'en-US',
    channel: '{"salesChannel":1,"regionId":""}',
    country: 'USA',
    deliveryMode: null,
    addressType: null,
    postalCode: null,
    geoCoordinates: null,
    person: null,
  },
  cart: {
    id: '',
    items: [],
    messages: [],
    shouldSplitItem: false,
  },
  storeUrl,
  secureSubdomain,
  checkoutUrl,
  loginUrl,
  accountUrl,
  physicalWarehouses,
  eprintWarehouses,
  mediaUrl,
  cartValidationBaseUrl,
  previewRedirects: {
    home: '/',
    plp: '/jwp-test',
    search: '/s?q=sisi',
    pdp: '/sisi-ni-moja-1/p',
  },
  lighthouse: {
    server: 'http://localhost:3000',
    pages: {
      home: '/',
      pdp: '/11103463-841/p',
      collection: '/choral-music',
      pdpNonSheet: '/1000108/p',
    },
  },
  cypress: {
    pages: {
      home: '/',
      pdp: '/11103463-841/p',
      collection: '/choral-music',
      collection_2: '/general-music',
      collection_filtered:
        '/choral-music?category-1=choral-music&fuzzy=0&operator=and&brand=boosey---hawkes-inc&facets=category-1%2Cfuzzy%2Coperator%2Cbrand&sort=score_desc&page=0',
      search: '/s?q=wind',
      style_guide: '/style-guide',
    },
    browser: 'electron',
  },
  analytics: {
    gtmContainerId: undefined,
    overridedGtmContainerId,
  },
  experimental: {
    cypressVersion: 12,
    enableCypressExtension: true,
    nodeVersion: 18,
    noRobots: true,
  },
  account: account,
  vtexHeadlessCms: {
    webhookUrls: [
      `https://${account}.myvtex.com/cms-releases/webhook-releases`,
    ],
  },
  copyFiles: [
    'sentry.client.config.ts',
    'sentry.server.config.ts',
    'sentry.edge.config.ts',
    'src/pages/myscore',
  ],
  withNextConfig: (nextConfig) => {
    const sentryConfig = withSentryConfig(
      nextConfig,
      {
        org: 'syatt',
        project: 'jw-pepper-faststore',
        silent: true,
      },
      {
        // For all available options, see:
        // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

        // Upload a larger set of source maps for prettier stack traces (increases build time)
        widenClientFileUpload: true,

        // Transpiles SDK to be compatible with IE11 (increases bundle size)
        transpileClientSDK: false,

        // Automatically tree-shake Sentry logger statements to reduce bundle size
        disableLogger: true,

        hideSourceMaps: ENVIRONMENT === 'production',
      }
    )

    return {
      ...sentryConfig,
      eslint: {
        // Next doesn't support the ignoring issues via the todo file, so
        // disable linting completely
        ignoreDuringBuilds: true,
      },
    }
  },

  async rewrites() {
    return [
      {
        source: '/collection/:collectionId/:collectionName',
        destination: '/collection',
      },
    ]
  },
})
