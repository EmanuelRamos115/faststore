'use-server'

import Head from 'next/head'

const CookieScript = ({ id }: { id: string }) => {
  return (
    <Head>
      <script
        type="text/javascript"
        src={`//cdn.cookie-script.com/s/${id}.js`}
      ></script>
    </Head>
  )
}

export default CookieScript
