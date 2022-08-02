import { ParsedProcessEnv } from './processEnv'

/**
 * *************************************************************************************
 * * ⚠️ This file is being migrated from webclient. Sync with:                         *
 * * ↔️️ webclient/src/apps/webclient/src/utils/types/windowLocation.ts                 *
 * * ↔️️ webclient/src/apps/webclient/src/utils/envConfigForClient.ts                   *
 * * ↔️️ webclient/src/config/service-environment/service-environment.types.ts          *
 * *************************************************************************************
 */

/**
 * Window location
 * ============================================================================
 */

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

/**
 * Browser config
 * ============================================================================
 */

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
  | 'APPLE_PAY_MERCHANT_ID'
>

/**
 * Service environment
 * ============================================================================
 */

export enum PROTOCOL_PREFIX {
  HTTP = 'http:',
  HTTPS = 'https:',
}

export enum ENVIRONMENT_NAMES {
  production = 'production',
  staging = 'staging',
  local = 'local',
}

declare global {
  // eslint-disable-next-line
  interface Window {
    __config__: WindowEnvConfig
  }
}
