// We need mutable exports to only expose values on the server
/* eslint-disable import/no-mutable-exports */

let STORE_URL: string
let APP_KEY: string
let APP_TOKEN: string

// Ensure this is on the server
if (typeof window === 'undefined') {
  STORE_URL = `https://jwpepperdev.vtexcommercestable.com.br`

  APP_KEY = 'vtexappkey-jwpepperdev-XVNJXR'
  APP_TOKEN =
    'FJJLRJPNKCMFGDSOVRZUPGTJFOWUGGTCHFWQYLRQVKSONPIGQLQPZTGACVXKYNKOXLYSZWSWZJQHWBYCXCBYYCRDQDNHBNVIGICATMQQALLBFKPGTPMGGLDQCCDHPHOK'
} else {
  throw new Error('This file must only be used on the server')
}

export { APP_KEY, APP_TOKEN, STORE_URL }
