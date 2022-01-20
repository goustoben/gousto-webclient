/* eslint-disable no-underscore-dangle */
declare let __SERVER__: boolean
declare let __API_ENV__: string
declare let __RUNNING_ENV__: ApiTarget
declare let __ENDPOINTS__: { [key: string]: never }

type EndpointUris = {
  live: string,
  local: string,
}
type EndpointRequestOrigin = 'serverSide' | 'clientSide';
type ApiTarget = 'local' | 'live';
type ServiceLocations = {
  [version: string]: {
    versionString: string,
    clientSide: EndpointUris,
    serverSide: EndpointUris
  }
}

function validateEndpointParams(
  service: string,
  isCallFromServer: boolean,
  apiEnvironmentToPointTo: string,
  appInstanceEnvironment: string
): void {
  if (service === undefined) throw new Error('Please specify a valid service.')
  if (isCallFromServer === undefined) throw new Error('Please specify whether this call is coming from the server or client browser for routing purposes.')
  if (apiEnvironmentToPointTo === undefined) throw new Error('Please specify which environment to point this call to.')
  if (appInstanceEnvironment === undefined) throw new Error("Please specify whether this app is hosted 'locally' or 'live' on AWS.")
}

function getServiceVersionsFromEndpointsConfig(
  apiEnvironmentToPointTo: string,
  service: string
): ServiceLocations {
  const {
    [apiEnvironmentToPointTo]: {
      services: {
        [service]: serviceVersions
      }
    }
  } = __ENDPOINTS__

  return serviceVersions
}

function getEndpointFromServiceVersions(
  version: number,
  serviceVersions: ServiceLocations,
  appInstanceEnvironment: ApiTarget,
  clientOrServer: EndpointRequestOrigin
): string {
  const checkedVersion = serviceVersions[version] ? version : 1

  const {
    [checkedVersion]: {
      [clientOrServer]: {
        [appInstanceEnvironment]: serviceEndpoint
      }
    }
  } = serviceVersions

  return serviceEndpoint
}

/**
 * Returns the endpoint for the specified service.
 * @param service The service to get the endpoint for. i.e. 'user', 'auth', 'content', 'search', 'analytics'
 * @param version The version of the service to get the endpoint for.
 * @param isCallFromServer Whether this call is coming from the server or client browser for routing purposes.
 * @param apiEnvironmentToPointTo The environment to point this call to.
 * @param appInstanceEnvironment The environment this app is hosted on.
 */
function endpoint(
  service: string,
  version = 1,
  {
    isCallFromServer = __SERVER__,
    apiEnvironmentToPointTo = __API_ENV__,
    appInstanceEnvironment = __RUNNING_ENV__
  } = {}
): string {
  validateEndpointParams(service, isCallFromServer, apiEnvironmentToPointTo, appInstanceEnvironment)

  const serviceVersions = getServiceVersionsFromEndpointsConfig(apiEnvironmentToPointTo, service)

  return getEndpointFromServiceVersions(version, serviceVersions, appInstanceEnvironment, isCallFromServer ? 'serverSide' : 'clientSide')
}

// eslint-disable-next-line import/no-default-export
export default endpoint
