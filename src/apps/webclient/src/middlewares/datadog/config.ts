import { LogsInitConfiguration } from '@datadog/browser-logs'
import { RumInitConfiguration } from '@datadog/browser-rum'
import { getEnvironment } from 'utils/isomorphicEnvironment'

export const BROWSER_LOGS_CLIENT_TOKEN = 'pub317260bf93610224cda1575e5bb24f2a'
export const RUM_SDK_CLIENT_TOKEN = 'pub5434f4d0f23379cbe71d4b5693ae81a5'
export const RUM_SDK_APP_ID = '3fc47a59-383f-4906-a976-581959ba13b1'

export const DATADOG_ENABLED_ENVS = ['production']
export const DATADOG_CLIENT_SAMPLE_RATE = 25

export const getCommonConfig: () => Partial<LogsInitConfiguration & RumInitConfiguration> = () => ({
  site: 'datadoghq.eu',
  sampleRate: DATADOG_CLIENT_SAMPLE_RATE,
  service: 'gousto-webclient',
  env: getEnvironment(),
  version: __CIRCLE_BUILD_NUM__,
})

export const getBrowserLogsConfig: () => LogsInitConfiguration = () => ({
  ...getCommonConfig(),
  clientToken: BROWSER_LOGS_CLIENT_TOKEN,
  forwardErrorsToLogs: true,
})

export const getRUMSDKConfig: () => RumInitConfiguration = () => ({
  ...getCommonConfig(),
  applicationId: RUM_SDK_APP_ID,
  clientToken: RUM_SDK_CLIENT_TOKEN,
  trackInteractions: false,
  defaultPrivacyLevel: 'mask-user-input',
})
