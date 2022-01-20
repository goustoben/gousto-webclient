declare var __SERVER__: boolean;
declare var __API_ENV__: string;
declare var __RUNNING_ENV__: ApiTarget;
declare var __ENDPOINTS__: { [key: string]: any };

type EndpointUris = {
  live: string,
  local: string,
}
type EndpointRequestOrigin = "serverSide" | "clientSide";
type ApiTarget = "local" | "live";
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
  if (service === undefined) throw new Error("Please specify a valid service.");
  if (isCallFromServer === undefined) throw new Error("Please specify whether this call is coming from the server or client browser for routing purposes.");
  if (apiEnvironmentToPointTo === undefined) throw new Error("Please specify which environment to point this call to.");
  if (appInstanceEnvironment === undefined) throw new Error("Please specify whether this app is hosted 'locally' or 'live' on AWS.");
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
  } = __ENDPOINTS__;

  return serviceVersions;
}

function getEndpointFromServiceVersions(
  version: number,
  serviceVersions: ServiceLocations,
  appInstanceEnvironment: ApiTarget,
  clientOrServer: EndpointRequestOrigin
): string {
  let checkedVersion = serviceVersions[version] ? version : 1;

  const {
    [checkedVersion]: {
      [clientOrServer]: {
        [appInstanceEnvironment]: endpoint
      }
    }
  } = serviceVersions;

  return endpoint;
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
  version: number = 1,
  {
    isCallFromServer = __SERVER__,
    apiEnvironmentToPointTo = __API_ENV__,
    appInstanceEnvironment = __RUNNING_ENV__
  } = {}
): string {
  validateEndpointParams(service, isCallFromServer, apiEnvironmentToPointTo, appInstanceEnvironment);

  const serviceVersions = getServiceVersionsFromEndpointsConfig(apiEnvironmentToPointTo, service);
  return getEndpointFromServiceVersions(version, serviceVersions, appInstanceEnvironment, isCallFromServer ? "serverSide" : "clientSide");
}

export default endpoint;
