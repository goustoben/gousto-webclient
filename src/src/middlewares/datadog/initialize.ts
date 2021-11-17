import '@datadog/browser-logs/bundle/datadog-logs'
import { LogsInitConfiguration } from '@datadog/browser-logs'

import { sharedConfig } from './config'

declare global {
  interface Window {
    DD_LOGS: any
  }
  const __ENV__: string
  const __DATADOG_ENABLED__: boolean
}

const initializeDatadogLoggingSDK = (sharedConfig: LogsInitConfiguration) => {
  window.DD_LOGS.init({
    ...sharedConfig,
    forwardErrorsToLogs: true,
  })
}

export const initializeDatadog = () => {
  if (__DATADOG_ENABLED__) {
    initializeDatadogLoggingSDK(sharedConfig)
  }
}
