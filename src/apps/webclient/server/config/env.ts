import { Protocol, Domain } from '../../src/utils/browserEnvironment'
import logger from '../utils/logger'

type Env = {
  DOMAIN: Domain,
  PROTOCOL: Protocol,
  ENVIRONMENT: string,
}

export function envOrLog<T, K extends keyof T>(env: T, key: K): T[K] {
  const lookup = env[key]

  if (lookup === undefined) {
    logger.error({ message: `No environment variable with key ${key}` })
  }

  return lookup as T[K]
}

export const processEnv = process.env as Env

export const envConfig = {
  DOMAIN: envOrLog(processEnv, 'DOMAIN'),
  PROTOCOL: envOrLog(processEnv, 'PROTOCOL'),
  ENVIRONMENT: envOrLog(processEnv, 'ENVIRONMENT'),
}

