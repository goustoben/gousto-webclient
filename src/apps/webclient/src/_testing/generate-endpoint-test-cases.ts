import { OldEndpointConfig, oldEndpointConfig } from '_testing/old-endpoint-config'

export type GeneratedEndpointTestCase = [
  environment: string,
  service: string,
  majorVersion: number,
  appInstanceEnvironment: string,
  isServerCall: boolean,
  resultOfOldEndpointInvocation: string
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const pipe =
  (...fns: any[]) =>
  (init: unknown) =>
    fns.reduce((acc, fn) => fn(acc), init)

const listEnvironmentsForEndpoints = (endpoints: OldEndpointConfig.Endpoints) =>
  Object.keys(endpoints)

const listServicesForEnvironments =
  (endpoints: OldEndpointConfig.Endpoints) => (environmentList: string[]) =>
    environmentList
      .map((env) => Object.keys(endpoints[env].services).map((svc) => [env, svc]))
      .flat()

const listVersionsForServices =
  (cfg: OldEndpointConfig.Endpoints) => (environmentServicesList: [string, string][]) =>
    environmentServicesList
      .map(([env, serviceName]) =>
        Object.keys(cfg[env].services[serviceName]).map((ver) => [env, serviceName, Number(ver)])
      )
      .flat()

const forLocalAndLive = (environmentServicesVersionList: [string, string, number][]) =>
  environmentServicesVersionList
    .map((arr) => ['live', 'local'].map((liveOrLocal) => [...arr, liveOrLocal]))
    .flat()

const forIsServerTrueAndFalse = (
  environmentServicesVersionListApi: [string, string, number, string][]
) => environmentServicesVersionListApi.map((arr) => [true, false].map((b) => [...arr, b])).flat()

/**
 *
 * @deprecated
 * old endpoint function used to test for regressions
 * @param service
 * @param version
 * @param isCallFromServer
 * @param apiEnvironmentToPointTo
 * @param appInstanceEnvironment
 */
function oldEndpoint(
  service: string,
  version = 1,
  {
    isCallFromServer /* __SERVER__ */,
    apiEnvironmentToPointTo /* __API_ENV__ */,
    appInstanceEnvironment /* __RUNNING_ENV__ */,
  }: {
    isCallFromServer: boolean
    apiEnvironmentToPointTo: string
    appInstanceEnvironment: 'live' | 'local'
  } = {
    isCallFromServer: false,
    apiEnvironmentToPointTo: 'none',
    appInstanceEnvironment: 'live',
  }
) {
  if (service === undefined) throw new Error('Please specify a valid service.')
  if (isCallFromServer === undefined) {
    throw new Error(
      'Please specify whether this call is coming from the server or client browser for routing purposes.'
    )
  }
  if (apiEnvironmentToPointTo === undefined) {
    throw new Error('Please specify which environment to point this call to.')
  }
  if (appInstanceEnvironment === undefined) {
    throw new Error("Please specify whether this app is hosted 'locally' or 'live' on AWS.")
  }

  const clientOrServerSide = isCallFromServer ? 'serverSide' : 'clientSide'

  const {
    [apiEnvironmentToPointTo]: {
      services: { [service]: serviceVersions },
    },
  } = <OldEndpointConfig.Endpoints>oldEndpointConfig()

  const checkedVersion = serviceVersions[version] ? version : 1

  const {
    [checkedVersion]: {
      [clientOrServerSide]: { [appInstanceEnvironment]: endpoint },
    },
  } = serviceVersions

  return endpoint
}

const getExpectationFromEndpoint = (
  testCases: [string, string, number, 'live' | 'local', boolean][]
) =>
  testCases.map((ps: [string, string, number, 'live' | 'local', boolean]) => {
    const [
      apiEnvironmentToPointTo,
      serviceName,
      version,
      appInstanceEnvironment,
      isCallFromServer,
    ] = ps

    return [
      ...ps,
      oldEndpoint(serviceName, version, {
        isCallFromServer,
        apiEnvironmentToPointTo,
        appInstanceEnvironment,
      }),
    ]
  })

export const generateEndpointTestCases = () =>
  pipe(
    listEnvironmentsForEndpoints,
    listServicesForEnvironments(oldEndpointConfig()),
    listVersionsForServices(oldEndpointConfig()),
    forLocalAndLive,
    forIsServerTrueAndFalse,
    getExpectationFromEndpoint
  )(oldEndpointConfig())
