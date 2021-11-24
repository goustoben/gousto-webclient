import { LogsInitConfiguration } from '@datadog/browser-logs'
import { RumInitConfiguration } from '@datadog/browser-rum'

export const commonConfig: Partial<LogsInitConfiguration & RumInitConfiguration> = {
  site: 'datadoghq.eu',
  sampleRate: 1,
  service: 'gousto-webclient',
  env: __ENV__,
}

export const browserLogsConfig: LogsInitConfiguration = {
  ...commonConfig,
  clientToken: __DATADOG_BROWSER_LOGS_TOKEN__,
  forwardErrorsToLogs: true,
}

export const RUMSDKConfig: RumInitConfiguration = {
  ...commonConfig,
  applicationId: '3ee48ed0-491a-462a-a38e-ca65cffe159e',
  clientToken: __DATADOG_RUM_SDK_TOKEN__,
  trackInteractions: false,
  defaultPrivacyLevel: 'mask-user-input',
}
