export const getMockedSharedConfig = ({ env }) => ({
  clientToken: 'CLIENT_TOKEN',
  site: 'datadoghq.eu',
  sampleRate: 1,
  service: 'gousto-webclient',
  env,
})

export const getMockedDatadogImport = ({ mockedInit }) => ({
  DD_LOGS: {
    init: mockedInit
  },
})
