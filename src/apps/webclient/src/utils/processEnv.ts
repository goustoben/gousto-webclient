/**
 * process.env as set by service.yml and parameter store
 */
export type ProcessEnv = {
  ENVIRONMENT: string
  API_TOKEN: string
  AUTH_CLIENT_ID: string
  AUTH_CLIENT_SECRET: string
}

/**
 * Transformed process.env - this is needed
 * as parameter store only supports string values
 */
export type ParsedProcessEnv = {
  ENVIRONMENT: string
  API_TOKEN: string
  AUTH_CLIENT_ID: number
  AUTH_CLIENT_SECRET: string
}

export const envOrThrow = (obj: Record<string, unknown>, key: keyof ProcessEnv) => {
  const val = obj[key]

  if (val === undefined) {
    throw new Error(`No environment variable with key ${key}`)
  }

  return val
}

export const parseStringToNumber = (val: ProcessEnv[keyof ProcessEnv]) => parseInt(val, 10)

export const validateProcessEnv = () => {
  ;['ENVIRONMENT', 'API_TOKEN'].forEach((key) => envOrThrow(process.env, key as keyof ProcessEnv))
}

/**
 * Only for use by getEnvConfig, which also provides transformation
 */
export const getFromProcessEnv = (env: ProcessEnv) => {
  const memo = new Map<string, string | number>()

  return <K extends keyof ProcessEnv>(
    key: K,
    transformFn?: (val: ProcessEnv[K]) => ParsedProcessEnv[K]
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
    API_TOKEN: getFromProcessEnv(processEnv)('API_TOKEN'),
    AUTH_CLIENT_ID: getFromProcessEnv(processEnv)('AUTH_CLIENT_ID', parseStringToNumber),
    AUTH_CLIENT_SECRET: getFromProcessEnv(processEnv)('AUTH_CLIENT_SECRET'),
  }
}
