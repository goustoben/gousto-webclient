import { datadogLogs, LogsInitConfiguration } from '@datadog/browser-logs'
import { datadogRum, RumInitConfiguration } from '@datadog/browser-rum'

import { getClientEnvironment } from 'utils/browserEnvironment'
import { Nullable } from '../../types'
import { browserLogsConfig, RUMSDKConfig, DATADOG_ENABLED_ENVS } from './config'

export const getIsDatadogEnabled = () => {
  let environment: Nullable<string>

  try {
    // Need to narrow this type so it doesn't potentially return null for lower environment
    environment = getClientEnvironment()
  } catch (e) {
    // eslint-ignore-line no-empty
  }

  return DATADOG_ENABLED_ENVS.some((enabledEnv) => environment === enabledEnv)
}

const initializeDatadogLoggingSDK = (config: LogsInitConfiguration): void => {
  datadogLogs.init(config)
}

const initializeDatadogRUMSDK = (config: RumInitConfiguration): void => {
  datadogRum.init(config)
}

export const initializeDatadog = (): void => {
  if (getIsDatadogEnabled()) {
    initializeDatadogLoggingSDK(browserLogsConfig)
    initializeDatadogRUMSDK(RUMSDKConfig)
  }
}
