export const getMockedCommonConfig = ({ env }) => ({
  site: 'datadoghq.eu',
  sampleRate: 1,
  service: 'gousto-webclient',
  env,
  version: 'MOCK_CIRCLE_BUILD_NUM',
})
