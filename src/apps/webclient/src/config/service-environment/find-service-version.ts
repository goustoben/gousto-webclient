import { ServiceManifest, ServiceName, ServiceVersion } from 'config/service-environment/service-environment.types'

const throwIfServiceManifestIsUndefined = (serviceManifest?: ServiceManifest) => {
  if (!serviceManifest) {
    throw new Error('Service manifest is undefined. A service manifest is required to find a service majorVersion.')
  }
}

const throwIfServiceNotFoundInManifest = (serviceName: string, serviceVersions: ServiceVersion[] | undefined): void => {
  if (!serviceVersions || serviceVersions.length === 0) {
    throw new Error(`Service '${serviceName}' not found in manifest.`)
  }
}

const findServiceVersionInManifest = (serviceName: ServiceName,
  majorVersion: number,
  serviceManifest: ServiceManifest) => serviceManifest[serviceName].find(sv => sv.majorVersion === majorVersion)

const throwIfVersionNotFoundForService = (
  serviceName: ServiceName,
  majorVersion: number,
  serviceManifest: ServiceManifest
) => {
  if (findServiceVersionInManifest(serviceName, majorVersion, serviceManifest) === undefined) {
    throw new Error(`Service version ${majorVersion} for service '${serviceName}' not found in manifest`)
  }
}

export function findServiceVersion(
  serviceName: ServiceName,
  majorVersion: number,
  serviceManifest: ServiceManifest
): ServiceVersion {
  throwIfServiceManifestIsUndefined(serviceManifest)
  throwIfServiceNotFoundInManifest(serviceName, serviceManifest[serviceName])
  throwIfVersionNotFoundForService(
    serviceName,
    majorVersion,
    serviceManifest
  )

  const serviceVersion = findServiceVersionInManifest(serviceName, majorVersion, serviceManifest)

  return serviceVersion as ServiceVersion
}
