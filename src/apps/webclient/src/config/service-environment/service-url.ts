import {
  ENVIRONMENT_NAMES,
  PROTOCOL_PREFIX,
  SERVICE_DOMAINS,
  OVERRIDDEN_SERVICE_PATTERNS,
  ServiceUrlProperties
} from 'config/service-environment/service-environment.types'

const DEFAULT_API_SUFFIX = 'api'
const PRODUCTION_URL = 'https://www.gousto.co.uk'

// TODO: this is potentially a security risk / leaking information.
// Ideally we would not want this to be exposed in the public bundle.
const LOCAL_SERVICE_HOSTNAME = 'staging-api.gousto.info'

const isWebclientProductionService = ({
  serviceName,
  environmentName,
  protocol
}: ServiceUrlProperties) => (serviceName === OVERRIDDEN_SERVICE_PATTERNS.webclient
  && environmentName === ENVIRONMENT_NAMES.production
  && protocol === PROTOCOL_PREFIX.HTTPS)

const isLoggingManagerService = ({ serviceName }: ServiceUrlProperties) =>
  (serviceName === OVERRIDDEN_SERVICE_PATTERNS.loggingmanager)

const isDev = ({ serviceDomain }: ServiceUrlProperties) => (serviceDomain.startsWith(SERVICE_DOMAINS.local))

const webClientHost = ({ environmentName, serviceDomain }: ServiceUrlProperties) =>
  (environmentName === ENVIRONMENT_NAMES.production
    ? PRODUCTION_URL
    : `${PROTOCOL_PREFIX.HTTPS}//${environmentName}-webclient.${serviceDomain}`)

const overrideForLoggingManager = ({
  environmentName,
  serviceDomain,
}: ServiceUrlProperties) => `${PROTOCOL_PREFIX.HTTPS}//${environmentName}-${DEFAULT_API_SUFFIX}.${serviceDomain}/${OVERRIDDEN_SERVICE_PATTERNS.loggingmanager}`

const overrideForLocalDev = ({
  basePath,
}: ServiceUrlProperties) => `${PROTOCOL_PREFIX.HTTPS}//${LOCAL_SERVICE_HOSTNAME}${basePath}`

export function serviceOverrides(serviceUrlProperties: ServiceUrlProperties): string | undefined {
  switch (true) {
  case isWebclientProductionService(serviceUrlProperties):
    return webClientHost(serviceUrlProperties)

  case isLoggingManagerService(serviceUrlProperties):
    return overrideForLoggingManager(serviceUrlProperties)

  case isDev(serviceUrlProperties):
    return overrideForLocalDev(serviceUrlProperties)
  default:
    return undefined
  }
}

/**
 * Builds a service URL for the given service url properties.
 *
 * Service url takes all the parts required to generate a service url and creates the service url string.
 * It accepts overrides functions to override the default functionality
 *
 * @param serviceUrlProperties - The service url properties.
 * @param getOverriddenUrl
 * @returns {string}
 *
 * @example
 * const myServiceUrl = serviceUrl({
 *  serviceName: 'orders',
 *  environmentName: 'fef',
 *  serviceDomain: 'gousto.info',
 *  protocol: PROTOCOL_PREFIX.HTTPS,
 *  basePath: '/orders/v1.0.0'
 *  }) // => https://fef-orders.gousto.info/orders/v1.0.0
 *
 */
export function serviceUrl(
  serviceUrlProperties: ServiceUrlProperties,
  // eslint-disable-next-line no-shadow,no-unused-vars
  getOverriddenUrl: (serviceUrlProperties: ServiceUrlProperties) => string | undefined = serviceOverrides
) {
  const {
    protocol,
    environmentName,
    serviceName,
    serviceDomain,
    basePath,
    port
  } = serviceUrlProperties

  if (protocol === PROTOCOL_PREFIX.HTTPS && basePath === undefined) {
    throw new Error('basePath must be defined for HTTPS services')
  }

  const override = typeof getOverriddenUrl === 'function' && getOverriddenUrl(serviceUrlProperties)

  if (override) {
    return override
  }

  const subDomainSuffix = typeof basePath === 'undefined' ? serviceName : DEFAULT_API_SUFFIX

  /* this is the service pattern for the majority of services */
  const hostname = `${environmentName}-${subDomainSuffix}.${serviceDomain}`
  const serviceOrigin = `${protocol}//${hostname}${port ? `:${port}` : ''}`

  const url = new URL(`${serviceOrigin}${basePath || ''}`).toString()

  // HACK: The original implementation of endpoint function did not include a trailing slash.
  // Adding this for compatibility
  if (url.endsWith('/')) {
    return url.slice(0, -1)
  }

  return url
}
