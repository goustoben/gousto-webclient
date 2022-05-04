import type { WindowEnvConfig } from 'server/utils/windowEnvironmentConfig'

export type Nullable<T> = T | null

declare global {
  interface Window {
    hj?: <TParams = Record<string, unknown>>(action: string, name: string, params?: TParams) => void
    __config__: WindowEnvConfig
  }
}
