import { browserEnvironment, isomorphicEnvironment } from '@library/environment'

import { findServiceVersion } from './find-service-version'
import {
  PROTOCOL_PREFIX,
  ServiceEnvironment,
  ServiceName,
  ServiceUrlProperties,
  Domain,
} from './types'
import { getServiceManifest } from './service-manifest'
import { serviceUrl } from './service-url'

export const buildServiceUrlProperties = (
  serviceName: ServiceName,
  majorVersion: number,
  serviceEnvironment: ServiceEnvironment,
  basePath?: string,
): ServiceUrlProperties => ({
  ...serviceEnvironment,
  serviceName,
  majorVersion,
  basePath,
})

function getServiceUrl(
  serviceName: ServiceName,
  version: number,
  serviceEnvironment: ServiceEnvironment,
) {
  const { basePath } = findServiceVersion(serviceName, version, getServiceManifest())
  const isPublic = browserEnvironment.canUseWindow() || isomorphicEnvironment.isDev()

  return serviceUrl(
    buildServiceUrlProperties(
      serviceName,
      version,
      serviceEnvironment,
      isPublic ? basePath : undefined,
    ),
  )
}

function endpointAdapter(getServiceEnvironment: () => ServiceEnvironment) {
  const cache = new Map<string, string>()

  // signature as per previous implementation
  return function endpoint(serviceName: ServiceName, version = 1) {
    const serviceEnvironment = getServiceEnvironment()
    const serviceKey = `${serviceEnvironment.protocol}//${serviceEnvironment.environmentName}.${serviceEnvironment.serviceDomain}/${serviceName}/${version}`

    if (cache.has(serviceKey)) {
      return cache.get(serviceKey)
    }

    cache.set(serviceKey, getServiceUrl(serviceName, version, serviceEnvironment))

    return cache.get(serviceKey)
  }
}

const getServiceEnvironment = (): ServiceEnvironment => ({
  environmentName: isomorphicEnvironment.getEnvironment(),
  protocol: browserEnvironment.canUseWindow() ? PROTOCOL_PREFIX.HTTPS : PROTOCOL_PREFIX.HTTP,
  serviceDomain: isomorphicEnvironment.getDomain() as Domain,
})

const endpoint = endpointAdapter(getServiceEnvironment)

// eslint-disable-next-line import/no-default-export
export default endpoint
