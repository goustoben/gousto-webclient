export type Protocol = 'http:' | 'https:'

/**
 * Caters for the edge-case of directly accessing webclient/frontend via the ALB
 */
export type HostNames = 'webclient' | 'frontend'

export type SubDomain = 'www' | `${string}-www` | `${string}-${HostNames}` | 'frontend'

export type RootDomain = 'gousto' | `${string}.gousto`

export type TopLevelDomain = `.local:${number}` | `.local` | '.info' | '.co.uk'

export type WindowLocation = {
  host: `${SubDomain}.${RootDomain}${TopLevelDomain}`
  protocol: Protocol
}

export type ParsedProcessEnv = {
  ENVIRONMENT: string
  DOMAIN: string
  API_TOKEN: string
  AUTH_CLIENT_ID: number
  AUTH_CLIENT_SECRET: string
  RECAPTCHA_RAF_PUBK: string
  RECAPTCHA_RAF_PVTK: string
  RECAPTCHA_PUBK: string
  RECAPTCHA_PVTK: string
  CHECKOUT_COM_PUBK: string
  DATADOG_BROWSER_LOGS_CLIENT_TOKEN: string
  DATADOG_RUM_SDK_CLIENT_TOKEN: string
  DATADOG_RUM_SDK_APP_ID: string
}

export type WindowEnvConfig = Pick<
  ParsedProcessEnv,
  | 'RECAPTCHA_PUBK'
  | 'RECAPTCHA_RAF_PUBK'
  | 'CHECKOUT_COM_PUBK'
  | 'DATADOG_RUM_SDK_APP_ID'
  | 'DATADOG_RUM_SDK_CLIENT_TOKEN'
  | 'DATADOG_BROWSER_LOGS_CLIENT_TOKEN'
  | 'ENVIRONMENT'
  | 'DOMAIN'
>

export enum PROTOCOL_PREFIX {
  HTTP = 'http:',
  HTTPS = 'https:',
}

export enum ENVIRONMENT_NAMES {
  production = 'production',
  staging = 'staging',
  local = 'local',
}
