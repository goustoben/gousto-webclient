import type { FirstOfTuple, LastOfTuple } from './types/array'
import type { Split } from './types/string'

export type Protocol = 'http:' | 'https:'
/**
 * Caters for the edge-case of directly accessing webclient/frontend via the ALB
 */
type HostNames = 'webclient' | 'frontend'
type SubDomain = 'www' | `${string}-www` | `${string}-${HostNames}` | 'frontend'
type RootDomain = 'gousto'
type TopLevelDomain = `.local:${number}` | '.info' | '.co.uk'
type Domain = `${RootDomain}${TopLevelDomain}`

type WindowLocation = {
  host: `${SubDomain}.${RootDomain}${TopLevelDomain}`
  protocol: Protocol
}

/**
 * Utility to enable easier testing of these utilities
 */
export const getWindow = () => window

export const canUseWindow = () =>
  !!(typeof window !== 'undefined' && window.document && window.document.createElement)

export const canUseWindowOrThrow = () => {
  if (!canUseWindow()) {
    throw new Error('Window does not exist')
  }
}

export const getClientProtocol = () => {
  canUseWindowOrThrow()

  // eslint-disable-next-line no-underscore-dangle
  const _window = getWindow()

  return (_window.location as WindowLocation).protocol
}

export const isHTTPS = () => getClientProtocol() === 'https:'

export const getSubdomain = () => {
  canUseWindowOrThrow()

  // eslint-disable-next-line no-underscore-dangle
  const _window = getWindow()

  const [subDomain] = _window.location.host.split('.') as Split<WindowLocation['host'], '.'>

  return subDomain
}

export const getRootDomain = () => {
  // eslint-disable-next-line no-underscore-dangle
  const _window = getWindow()

  // eslint-disable-next-line
  const [_subdomain, rootDomain] = _window.location.host.split('.') as Split<
    WindowLocation['host'],
    '.'
  >

  return rootDomain
}

export const getTopLevelDomain = () => {
  canUseWindowOrThrow()

  // eslint-disable-next-line no-underscore-dangle
  const _window = getWindow()
  const rootDomain = getRootDomain()

  const splitHost = _window.location.host.split(rootDomain) as Split<
    WindowLocation['host'],
    typeof rootDomain
  >

  return splitHost[splitHost.length - 1] as LastOfTuple<typeof splitHost>
}

export const getDomain = (): Domain => {
  canUseWindowOrThrow()

  return `${getRootDomain()}${getTopLevelDomain()}`
}

export const getLowerEnvironmentName = () => {
  const subdomain = getSubdomain()

  const splitSubdomain = subdomain.split('-') as Split<typeof subdomain, '-'>
  const lowerEnvironmentName = splitSubdomain[0] as FirstOfTuple<typeof splitSubdomain>

  return ['www', 'frontend', 'production'].some((str) => lowerEnvironmentName.includes(str))
    ? null
    : lowerEnvironmentName
}

export const getClientEnvironment = () => {
  canUseWindowOrThrow()

  const subdomain = getSubdomain()
  const topLevelDomain = getTopLevelDomain()

  switch (true) {
  // Production -> https://www.gousto.co.uk OR https://production-webclient.gousto.co.uk OR https://production-frontend.gousto.co.uk
  case isHTTPS() && (subdomain === 'www' || subdomain.includes('production')):
    return 'production'

  // Staging -> https://staging-www.gousto.info OR https://staging-webclient.gousto.info OR https://staging-frontend.gousto.info
  // Lower environment -> https://fef-www.gousto.info OR https://fef-webclient.gousto.info OR https://fef-frontend.gousto.info
  case isHTTPS() && topLevelDomain === '.info':
    return getLowerEnvironmentName()

  // Local -> http://frontend.gousto.local:8080 OR http://localhost:8080
  default:
    return 'local'
  }
}

export const isProd = () => getClientEnvironment() === 'production'
export const isDev = () => getClientEnvironment() === 'local'
