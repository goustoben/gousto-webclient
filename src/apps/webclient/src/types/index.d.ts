import type { WindowEnvConfig } from 'server/utils/windowEnvironmentConfig'

export type Nullable<T> = T | null

declare global {
  interface Window {
    hj?: (action: string, name: string) => void
    __config__: WindowEnvConfig
  }
}
