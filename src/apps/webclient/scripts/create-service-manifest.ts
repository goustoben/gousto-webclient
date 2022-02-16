import * as fs from 'fs'
import { resolve } from 'path'

/**
 * @deprecated
 * old types for the service configuration
*/
export type ConfigEndpoints = {
  [serviceName: string]: ConfigEndpointServiceVersions
}

export type ServiceDetails = {
  versionString: EndpointVersionString;
  clientSide: ServiceUrls;
  serverSide: ServiceUrls;
}

export type ServiceUrls = {
  live: string;
  local: string;
}

export type EndpointVersionString = '' | `v${number}` | `v${number}.${number}` | `v${number}.${number}.${number}`

export type ConfigEndpointServiceVersions = {
  [version: string]: ServiceDetails;
}

// new types for the new service manifest
export type ServiceVersion = {
  version: number,
  basePath: string
}

export type ServiceManifest = {
  [key: string]: ServiceVersion[]
}

const JSON5_FILEPATH = '../config/default.json5'
const ENCODING = 'utf8'
const URL_PREFIX = 'https://production-api.gousto.co.uk'
const OUTPUT_FILEPATH = '../src/config/service-environment/service-manifest.json'
const ENV_PRODUCTION = 'production'

const pipe = (...fns: any[]) => (init: unknown) => fns.reduce((acc, fn) => fn(acc), init)

const readFile = (filePath: string = JSON5_FILEPATH) => fs.readFileSync(resolve(__dirname, filePath), ENCODING)

const stripComments = (str: string) => str.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, "")

const parseJson = (jsonString: string) => JSON.parse(jsonString)

const getEndpointsForEnvironment = (environment: string) => (json: any): ConfigEndpoints => json.endpoints[environment].services

const transformServiceVersions = (serviceVersions: ConfigEndpointServiceVersions): ServiceVersion[] => {
  return Object.keys(serviceVersions).map(version => ({
    version: Number(version),
    basePath: serviceVersions[version].clientSide.live.replace(URL_PREFIX, "")
  }))
}

const transformEndpointsToManifest = (endpoints: ConfigEndpoints): ServiceManifest => {
  return Object.entries(endpoints).reduce((acc: ServiceManifest, [serviceName, serviceVersion]) => {
    return {
      ...acc,
      [serviceName]: transformServiceVersions(serviceVersion)
    }
  }, {})
}

const writeManifestFile = (serviceManifest: ServiceManifest) => {
  const filePath = resolve(__dirname, OUTPUT_FILEPATH)

  return fs.writeFileSync(
    filePath,
    JSON.stringify(serviceManifest, null, 2)+"\n",ENCODING
  )
}

const createManifestFromConfig = pipe(
  readFile,
  stripComments,
  parseJson,
  getEndpointsForEnvironment(ENV_PRODUCTION),
  transformEndpointsToManifest,
  writeManifestFile
)

createManifestFromConfig(JSON5_FILEPATH)
