import { LogsInitConfiguration } from '@datadog/browser-logs'

declare global {
  const __DATADOG_BROWSER_LOGS_TOKEN__: string
}

export const sharedConfig: LogsInitConfiguration = {
  clientToken: __DATADOG_BROWSER_LOGS_TOKEN__,
  site: 'datadoghq.eu',
  sampleRate: 1,
  service: 'gousto-webclient',
  env: __ENV__,
}
