import {
  PROTOCOL_PREFIX,
  ServiceEnvironment,
  ServiceName,
  ServiceUrlProperties
} from "config/service-environment/service-environment.types";
import { serviceUrl } from 'config/service-environment/service-url'
import { getServiceManifest } from 'config/service-environment/service-manifest'
import { findServiceVersion } from 'config/service-environment/find-service-version'
import { canUseWindow } from 'utils/browserEnvironment'
import { getEnvironment, getDomain, isDev } from 'utils/isomorphicEnvironment'

export const buildServiceUrlProperties = (
  serviceName: ServiceName,
  majorVersion: number,
  serviceEnvironment: ServiceEnvironment,
  basePath?: string ,
): ServiceUrlProperties => ({
  ...serviceEnvironment,
  serviceName,
  majorVersion,
  basePath
})

function getServiceUrl(serviceName: ServiceName, version: number, serviceEnvironment: ServiceEnvironment) {
  const { basePath } = findServiceVersion(serviceName, version, getServiceManifest())
  const isPublic = canUseWindow() || isDev()

  return serviceUrl(
    buildServiceUrlProperties(
      serviceName,
      version,
      serviceEnvironment,
      isPublic ? basePath : undefined
    )
  )
}

function endpointAdapter(getServiceEnvironment: () => ServiceEnvironment) {
  // signature as per previous implementation
  return function endpoint(serviceName: ServiceName, version = 1) {
    return getServiceUrl(serviceName, version, getServiceEnvironment())
  }
}

const getServiceEnvironment = (): ServiceEnvironment => ({
  environmentName: getEnvironment(),
  protocol: canUseWindow() ? PROTOCOL_PREFIX.HTTPS : PROTOCOL_PREFIX.HTTP,
  serviceDomain: getDomain()
})

const endpoint = endpointAdapter(getServiceEnvironment)

// eslint-disable-next-line import/no-default-export
export default endpoint
