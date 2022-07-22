import type { ParsedProcessEnv } from './types'

type ProcessEnvKeys = [
  'ENVIRONMENT',
  'DOMAIN',
  'API_TOKEN',
  'AUTH_CLIENT_ID',
  'AUTH_CLIENT_SECRET',
  'RECAPTCHA_RAF_PUBK',
  'RECAPTCHA_RAF_PVTK',
  'RECAPTCHA_PUBK',
  'RECAPTCHA_PVTK',
  'CHECKOUT_COM_PUBK',
  'DATADOG_BROWSER_LOGS_CLIENT_TOKEN',
  'DATADOG_RUM_SDK_CLIENT_TOKEN',
  'DATADOG_RUM_SDK_APP_ID',
]

/**
 * process.env as set by service.yml and parameter store
 */
export type ProcessEnv = Record<ProcessEnvKeys[number], string>

const REQUIRED_KEYS: ProcessEnvKeys = [
  'ENVIRONMENT',
  'DOMAIN',
  'API_TOKEN',
  'AUTH_CLIENT_ID',
  'AUTH_CLIENT_SECRET',
  'RECAPTCHA_RAF_PUBK',
  'RECAPTCHA_RAF_PVTK',
  'RECAPTCHA_PUBK',
  'RECAPTCHA_PVTK',
  'CHECKOUT_COM_PUBK',
  'DATADOG_BROWSER_LOGS_CLIENT_TOKEN',
  'DATADOG_RUM_SDK_CLIENT_TOKEN',
  'DATADOG_RUM_SDK_APP_ID',
]

export const envOrThrow = (obj: Record<string, unknown>, key: keyof ProcessEnv) => {
  const val = obj[key]

  if (val === undefined) {
    throw new Error(`No environment variable with key ${key}`)
  }

  return val
}

export const parseStringToNumber = (val: ProcessEnv[keyof ProcessEnv]) => parseInt(val, 10)

export const validateProcessEnv = () => {
  REQUIRED_KEYS.forEach((key) => envOrThrow(process.env, key as keyof ProcessEnv))
}

/**
 * Only for use by getEnvConfig, which also provides transformation
 */
export const getFromProcessEnv = (env: ProcessEnv) => {
  const memo = new Map<string, string | number>()

  return <K extends ProcessEnvKeys[number]>(
    key: K,
    transformFn?: (val: ProcessEnv[K]) => ParsedProcessEnv[K],
  ) => {
    const valueFromMemo = memo.get(key)

    if (valueFromMemo) {
      return valueFromMemo as ParsedProcessEnv[K]
    }

    const value = transformFn ? transformFn(env[key]) : env[key]

    memo.set(key, value)

    return value as ParsedProcessEnv[K]
  }
}

export const getEnvConfig = (): ParsedProcessEnv => {
  const processEnv = process.env as ProcessEnv

  return {
    ENVIRONMENT: getFromProcessEnv(processEnv)('ENVIRONMENT'),
    DOMAIN: getFromProcessEnv(processEnv)('DOMAIN'),
    API_TOKEN: getFromProcessEnv(processEnv)('API_TOKEN'),
    AUTH_CLIENT_ID: getFromProcessEnv(processEnv)('AUTH_CLIENT_ID', parseStringToNumber),
    AUTH_CLIENT_SECRET: getFromProcessEnv(processEnv)('AUTH_CLIENT_SECRET'),
    RECAPTCHA_RAF_PUBK: getFromProcessEnv(processEnv)('RECAPTCHA_RAF_PUBK'),
    RECAPTCHA_RAF_PVTK: getFromProcessEnv(processEnv)('RECAPTCHA_RAF_PVTK'),
    RECAPTCHA_PUBK: getFromProcessEnv(processEnv)('RECAPTCHA_PUBK'),
    RECAPTCHA_PVTK: getFromProcessEnv(processEnv)('RECAPTCHA_PVTK'),
    CHECKOUT_COM_PUBK: getFromProcessEnv(processEnv)('CHECKOUT_COM_PUBK'),
    DATADOG_BROWSER_LOGS_CLIENT_TOKEN: getFromProcessEnv(processEnv)(
      'DATADOG_BROWSER_LOGS_CLIENT_TOKEN',
    ),
    DATADOG_RUM_SDK_CLIENT_TOKEN: getFromProcessEnv(processEnv)('DATADOG_RUM_SDK_CLIENT_TOKEN'),
    DATADOG_RUM_SDK_APP_ID: getFromProcessEnv(processEnv)('DATADOG_RUM_SDK_APP_ID'),
  }
}
