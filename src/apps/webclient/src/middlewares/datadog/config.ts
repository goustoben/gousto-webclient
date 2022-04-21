import { LogsInitConfiguration } from '@datadog/browser-logs'
import { RumInitConfiguration } from '@datadog/browser-rum'
import {
  getEnvironment,
  getDatadogRumSdkAppID,
  getDatadogRumSdkClientToken,
  getDatadogBrowserLogsClientToken,
} from 'utils/isomorphicEnvironment'

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
  clientToken: getDatadogBrowserLogsClientToken(),
  forwardErrorsToLogs: true,
})

export const getRUMSDKConfig: () => RumInitConfiguration = () => ({
  ...getCommonConfig(),
  applicationId: getDatadogRumSdkAppID(),
  clientToken: getDatadogRumSdkClientToken(),
  trackInteractions: false,
  defaultPrivacyLevel: 'mask-user-input',
})
