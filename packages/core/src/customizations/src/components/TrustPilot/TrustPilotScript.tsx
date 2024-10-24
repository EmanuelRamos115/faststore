import Head from 'next/head'

const TrustPilotScript = () => {
  return (
    <Head>
      <script>
        {`(function(w,d,s,r,n){w.TrustpilotObject=n;w[n]=w[n]||function(){(w[n].q=w[n].q||[]).push(arguments)}; a=d.createElement(s);a.async=1;a.src=r;a.type='text/java'+s;f=d.getElementsByTagName(s)[0]; f.parentNode.insertBefore(a,f)})(window,document,'script', 'https://invitejs.trustpilot.com/tp.min.js', 'tp');
  tp("register", "JqLJOJfrqT8TkERX")`}
        ;
      </script>
      <script
        type="text/javascript"
        src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
        async
      ></script>
    </Head>
  )
}

export default TrustPilotScript
