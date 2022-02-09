import { LogsInitConfiguration } from '@datadog/browser-logs'
import { RumInitConfiguration } from '@datadog/browser-rum'

export const BROWSER_LOGS_CLIENT_TOKEN = 'pub317260bf93610224cda1575e5bb24f2a'
export const RUM_SDK_CLIENT_TOKEN = 'pub5434f4d0f23379cbe71d4b5693ae81a5'
export const RUM_SDK_APP_ID = '3fc47a59-383f-4906-a976-581959ba13b1'

export const DATADOG_ENABLED_ENVS = ['production']

export const commonConfig: Partial<LogsInitConfiguration & RumInitConfiguration> = {
  site: 'datadoghq.eu',
  sampleRate: 1,
  service: 'gousto-webclient',
  env: __ENV__,
  version: __CIRCLE_BUILD_NUM__,
}

export const browserLogsConfig: LogsInitConfiguration = {
  ...commonConfig,
  clientToken: BROWSER_LOGS_CLIENT_TOKEN,
  forwardErrorsToLogs: true,
}

export const RUMSDKConfig: RumInitConfiguration = {
  ...commonConfig,
  applicationId: RUM_SDK_APP_ID,
  clientToken: RUM_SDK_CLIENT_TOKEN,
  trackInteractions: false,
  defaultPrivacyLevel: 'mask-user-input',
}
