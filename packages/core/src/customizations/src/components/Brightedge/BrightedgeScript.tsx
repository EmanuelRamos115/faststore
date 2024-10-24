'use-server'

import Head from 'next/head'

import type { BrightedgeScriptRender as BrightedgeScriptScriptProps } from '../../@generated/cms/BrightedgeScript'

const BrightedgeScript = ({ id }: BrightedgeScriptScriptProps) => {
  return (
    <Head>
      <script
        type="text/javascript"
        src={`//cdn.bc0a.com/autopilot/${id}/autopilot_sdk.js`}
      ></script>
    </Head>
  )
}

export default BrightedgeScript
