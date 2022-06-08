import { LogsInitConfiguration } from '@datadog/browser-logs'
import { RumInitConfiguration } from '@datadog/browser-rum'

import {
  getClientDatadogRumSdkAppID,
  getClientDatadogRumSdkClientToken,
  getClientDatadogBrowserLogsClientToken,
} from 'utils/configFromWindow'
import { getEnvironment } from 'utils/isomorphicEnvironment'

export const DATADOG_ENABLED_ENVS = ['production']
export const DATADOG_CLIENT_SAMPLE_RATE = 50

export const getCommonConfig: () => Partial<LogsInitConfiguration & RumInitConfiguration> = () => ({
  site: 'datadoghq.eu',
  sampleRate: DATADOG_CLIENT_SAMPLE_RATE,
  service: 'gousto-webclient',
  env: getEnvironment(),
  version: __CIRCLE_BUILD_NUM__,
})

export const getBrowserLogsConfig: () => LogsInitConfiguration = () => ({
  ...getCommonConfig(),
  clientToken: getClientDatadogBrowserLogsClientToken(),
  forwardErrorsToLogs: true,
})

export const getRUMSDKConfig: () => RumInitConfiguration = () => ({
  ...getCommonConfig(),
  applicationId: getClientDatadogRumSdkAppID(),
  clientToken: getClientDatadogRumSdkClientToken(),
  trackInteractions: false,
  defaultPrivacyLevel: 'mask-user-input',
  allowedTracingOrigins: [/https:\/\/.*-api\.gousto\.(info|co\.uk)/],
})
