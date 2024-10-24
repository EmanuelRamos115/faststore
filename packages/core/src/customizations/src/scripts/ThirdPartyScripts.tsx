export default function ThirdPartyScripts() {
  return (
    <>
      <script
        src="https://www.datadoghq-browser-agent.com/us1/v5/datadog-rum.js"
        type="text/partytown"
      />
      <script
        type="text/partytown"
        dangerouslySetInnerHTML={{
          __html: `
        window.DD_RUM && window.DD_RUM.init({
          clientToken: 'pub311d923465215539daf0607417cf6669',
          applicationId: '2c89bbf4-b736-4ccb-8c9a-4f84a2077c28',
          site: 'datadoghq.com',
          service: 'vtex',
          env: 'development',
          sessionSampleRate: 100,
          sessionReplaySampleRate: 20,
          trackUserInteractions: true,
          trackResources: true,
          trackLongTasks: true,
          defaultPrivacyLevel: 'mask-user-input',
        });
        `,
        }}
      />
    </>
  )
}
