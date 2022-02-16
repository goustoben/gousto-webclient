import * as fs from 'fs'
import { resolve } from 'path'

/**
 * @type {EnvironmentConfig} old types for the service configuration
*/
export interface EnvironmentConfig {
  build:                          string;
  environment_name:               string;
  api_name:                       string;
  domain:                         string;
  client_dev_server_enabled:      boolean;
  client_protocol:                string;
  cloudfront_url:                 string;
  checkout_pk:                    string;
  recaptcha_referral_public_key:  string;
  recaptcha_referral_private_key: string;
  running_env:                    string;
  api_token:                      string;
  auth_client_id:                 string;
  auth_client_secret:             string;
  endpoints:                      EnvironmentConfigEndpoints;
}

export type EnvironmentConfigEndpoints = {
  [key: string]: EnvironmentConfigServices;
}

export type EnvironmentConfigServices ={
  envDomain: string;
  services:  EnvironmentConfigServiceList;
}

export type EnvironmentConfigServiceList = {
  auth:                EnvironmentConfigServiceVersions;
  brand:               EnvironmentConfigServiceVersions;
  clientmetrics:       EnvironmentConfigServiceVersions;
  collections:         EnvironmentConfigServiceVersions;
  complaints:          EnvironmentConfigServiceVersions;
  content:             EnvironmentConfigServiceVersions;
  core:                EnvironmentConfigServiceVersions;
  customers:           EnvironmentConfigServiceVersions;
  deliveries:          EnvironmentConfigServiceVersions;
  felogging:           EnvironmentConfigServiceVersions;
  loggingmanager:      EnvironmentConfigServiceVersions;
  menu:                EnvironmentConfigServiceVersions;
  order:               EnvironmentConfigServiceVersions;
  orders:              EnvironmentConfigServiceVersions;
  orderskiprecovery:   EnvironmentConfigServiceVersions;
  payments:            EnvironmentConfigServiceVersions;
  products:            EnvironmentConfigServiceVersions;
  recipes:             EnvironmentConfigServiceVersions;
  ssr:                 EnvironmentConfigServiceVersions;
  ssrdeliveries:       EnvironmentConfigServiceVersions;
  ssrrecipecards:      EnvironmentConfigServiceVersions;
  subpauseosr:         EnvironmentConfigServiceVersions;
  subscriptioncommand: EnvironmentConfigServiceVersions;
  subscriptionquery:   EnvironmentConfigServiceVersions;
  tastepreferences:    EnvironmentConfigServiceVersions;
  userbucketing:       EnvironmentConfigServiceVersions;
  userfeedback:        EnvironmentConfigServiceVersions;
  webclient:           EnvironmentConfigServiceVersions;
  workable:            EnvironmentConfigServiceVersions;
}

export type EnvironmentConfigServiceUrlGroup = {
  versionString: VersionString;
  clientSide:    EnvironmentConfigServiceUrls;
  serverSide:    EnvironmentConfigServiceUrls;
}

export type EnvironmentConfigServiceUrls ={
  live:  string;
  local: string;
}

export enum VersionString {
  Empty = "",
  V1 = "v1",
  V10 = "v1.0",
  V100 = "v1.0.0",
  V2 = "v2",
  V20 = "v2.0",
}

export type EnvironmentConfigServiceVersions = {
  [version: string]: EnvironmentConfigServiceUrlGroup
}

/*
 * @type {ServiceVersion} - type for describing the service and its version in the service manifest
 */
export type ServiceVersion = {
  version: number,
  basePath: string
}

/*
 * @type {ServiceManifest} - type for describing the service manifest
 */
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

const getEndpointsForEnvironment = (environment: string) => (json: EnvironmentConfig): EnvironmentConfigServiceList => json.endpoints[environment].services

const transformServiceVersions = (serviceVersions: EnvironmentConfigServiceVersions): ServiceVersion[] => {
  return Object.keys(serviceVersions).map(version => ({
    version: Number(version),
    basePath: serviceVersions[version].clientSide.live.replace(URL_PREFIX, "")
  }))
}

const transformEndpointsToManifest = (endpoints: EnvironmentConfigServiceList): ServiceManifest => {
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
