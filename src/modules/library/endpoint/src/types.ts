type Nullable<T> = T | null

type RootDomain = 'gousto' | `${string}.gousto`

type TopLevelDomain = `.local:${number}` | `.local` | '.info' | '.co.uk'

export type Domain = `${RootDomain}${TopLevelDomain}`

export type ServiceVersion = {
  version: string
  majorVersion: number
  basePath: string
}

export enum PROTOCOL_PREFIX {
  HTTP = 'http:',
  HTTPS = 'https:',
}

export enum OVERRIDDEN_SERVICE_PATTERNS {
  loggingmanager = 'loggingmanager',
  webclient = 'webclient',
}

export type ServiceName =
  | 'auth'
  | 'brand'
  | 'clientmetrics'
  | 'collections'
  | 'complaints'
  | 'content'
  | 'core'
  | 'customers'
  | 'deliveries'
  | 'felogging'
  | 'loggingmanager'
  | 'menu'
  | 'order'
  | 'orders'
  | 'orderskiprecovery'
  | 'payments'
  | 'products'
  | 'recipes'
  | 'ssr'
  | 'ssrdeliveries'
  | 'ssrrecipecards'
  | 'subpauseosr'
  | 'subscriptioncommand'
  | 'subscriptionquery'
  | 'tastepreferences'
  | 'userbucketing'
  | 'userfeedback'
  | 'webclient'
  | 'workable'

export type ServiceManifest = {
  [key in ServiceName]: ServiceVersion[]
}

export enum ENVIRONMENT_NAMES {
  production = 'production',
  staging = 'staging',
  local = 'local',
}

export enum SERVICE_DOMAINS {
  local = 'gousto.local',
  production = 'gousto.co.uk',
  default = 'gousto.info',
}

export type ServiceUrlProperties = {
  basePath?: Nullable<string>
  majorVersion?: number
  environmentName: string
  port?: number
  protocol: PROTOCOL_PREFIX
  serviceName: ServiceName
  serviceDomain: Domain
}

export type ServiceEnvironment = {
  environmentName: string
  protocol: PROTOCOL_PREFIX
  serviceDomain: Domain
}
