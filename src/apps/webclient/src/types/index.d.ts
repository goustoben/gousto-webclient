import type { WindowEnvConfig } from 'server/utils/windowEnvironmentConfig'

import type { SnowplowWithCallback, SnowplowWithTracker } from './snowplow'

export type Nullable<T> = T | null

declare global {
  interface Window {
    hj?: <TParams = Record<string, unknown>>(action: string, name: string, params?: TParams) => void
    __config__: WindowEnvConfig
    snowplow?: SnowplowWithCallback
    snowplow?: SnowplowWithTracker
  }
}
