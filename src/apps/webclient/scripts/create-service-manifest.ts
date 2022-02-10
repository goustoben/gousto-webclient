import * as fs from 'fs'
import { resolve } from 'path'

const JSON5_FILEPATH = '../config/default.json5'
const ENCODING = 'utf8'
const URL_PREFIX = 'https://production-api.gousto.co.uk'
const OUTPUT_FILEPATH = '../src/config/service-environment/service-manifest.json'

const stripComments = (str: string) => {
  return str.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, "");
};

const configJson = JSON.parse(
  stripComments(fs.readFileSync(resolve(__dirname, JSON5_FILEPATH), ENCODING))
);

const endpoints = (configJson: any) => configJson.endpoints;
const servicesForEnvironment = (environment: string) => Object.keys(endpoints(configJson)[environment].services);
const serviceVersionsForService = (environment: string) => (serviceName: string) => Object.keys(endpoints(configJson)[environment].services[serviceName]);

const getUrl = (environment: string, serviceName, version: string) =>
  endpoints(configJson)[environment].services[serviceName][version].clientSide.live.replace(URL_PREFIX, "")

const addServiceToManifest = (environment: string) => (serviceManifest, serviceName) => {
  return {
    ...serviceManifest,
    [serviceName]: serviceVersionsForService(environment)(serviceName).map(version => {
      return {
        version: Number(version),
        basePath: getUrl(environment, serviceName, version)
      }
    })
  }
}

const buildManifestForEnvironmentServices = (environment: string) => (services: string[]) => services.reduce(addServiceToManifest(environment), {})

const serviceManifest = (environment: string) =>
  buildManifestForEnvironmentServices(environment)(servicesForEnvironment(environment));

fs.writeFileSync(resolve(__dirname, OUTPUT_FILEPATH), JSON.stringify(serviceManifest('production'), null, 2)+"\n",ENCODING)
