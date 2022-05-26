import { datadogLogs, LogsInitConfiguration } from '@datadog/browser-logs'
import { datadogRum, RumInitConfiguration } from '@datadog/browser-rum'

import { canUseWindow } from 'utils/browserEnvironment'
import { getEnvironment } from 'utils/isomorphicEnvironment'

import { Nullable } from '../../types'
import { getBrowserLogsConfig, getRUMSDKConfig, DATADOG_ENABLED_ENVS } from './config'

export const getIsDatadogEnabled = () => {
  let environment: Nullable<string>

  if (!canUseWindow()) return false

  try {
    // Need to narrow this type so it doesn't potentially return null for lower environment
    environment = getEnvironment()
    // eslint-disable-next-line no-empty
  } catch (e) {}

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
    initializeDatadogLoggingSDK(getBrowserLogsConfig())
    initializeDatadogRUMSDK(getRUMSDKConfig())
  }
}
