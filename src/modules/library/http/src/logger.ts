import { browserEnvironment } from '@library/environment'
import { datadogLogs } from '@datadog/browser-logs'

export function httpWarning (message: string) {
  const warning = '@library/http: ' + message
  if (browserEnvironment.canUseWindow()) {
    datadogLogs.logger.warn(warning)
  } else {
    console.warn(warning)
  }
}
