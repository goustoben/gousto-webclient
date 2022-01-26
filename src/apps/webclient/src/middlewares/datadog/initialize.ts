import { datadogLogs, LogsInitConfiguration } from '@datadog/browser-logs'
import { datadogRum, RumInitConfiguration } from '@datadog/browser-rum'

import { browserLogsConfig, RUMSDKConfig } from './config'

const initializeDatadogLoggingSDK = (config: LogsInitConfiguration): void => {
  datadogLogs.init(config)
}

const initializeDatadogRUMSDK = (config: RumInitConfiguration): void => {
  datadogRum.init(config)
}

export const initializeDatadog = (): void => {
  if (__DATADOG_ENABLED__) {
    initializeDatadogLoggingSDK(browserLogsConfig)
    initializeDatadogRUMSDK(RUMSDKConfig)
  }
}
