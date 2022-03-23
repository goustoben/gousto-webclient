import { Protocol, Domain } from './types/windowLocation'

export type Env = {
  DOMAIN: Domain
  PROTOCOL: Protocol
  ENVIRONMENT: string
}

export const envOrCallback = (cb: (_msg: string) => void) =>
  <T, K extends keyof T>(env: T, key: K): T[K] => {
    const lookup = env[key]

    if (lookup === undefined) {
      cb(`No environment variable with key ${key}`)
    }

    return lookup as T[K]
  }

// eslint-disable-next-line no-console
export const getEnvConfig = (cb = (msg: string) => console.warn(msg)) => {
  const processEnv = process.env as Env

  return {
    ENVIRONMENT: envOrCallback(cb)(processEnv, 'ENVIRONMENT')
  }
}
