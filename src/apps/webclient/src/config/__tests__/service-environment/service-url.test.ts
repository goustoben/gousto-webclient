import {
  PROTOCOL_PREFIX,
  SERVICE_DOMAINS,
  ServiceUrlProperties
} from "config/service-environment/service-environment.types";
import * as ServiceUrlNS from 'config/service-environment/service-url'
import * as browserEnv from 'utils/browserEnvironment'

const { serviceUrl } = ServiceUrlNS

type ServiceDefinitionTestExpectation = ServiceUrlProperties & {
  expectedUrl: string;
};

describe('serviceUrl', () => {
  let canUseWindowSpy: jest.SpyInstance
  beforeAll(() => {
    canUseWindowSpy = jest.spyOn(browserEnv, 'canUseWindow')
  })
  beforeEach(() => {
    jest.resetAllMocks()
    canUseWindowSpy.mockReturnValue(false)
  })
  it('should return the correct url for a service definition without a basePath', () => {
    const serviceDefinition: ServiceUrlProperties = {
      environmentName: 'jalapenos',
      protocol: PROTOCOL_PREFIX.HTTP,
      serviceName: 'auth',
      serviceDomain: SERVICE_DOMAINS.default
    }

    const url = serviceUrl(serviceDefinition)

    expect(url).toEqual('http://jalapenos-auth.gousto.info')
  })

  it('should return the correct url for a service definition with a basePath', () => {
    const serviceDefinition: ServiceUrlProperties = {
      environmentName: 'jalapenos',
      protocol: PROTOCOL_PREFIX.HTTPS,
      serviceName: 'auth',
      serviceDomain: SERVICE_DOMAINS.default,
      basePath: '/auth/v1'
    }

    const url = serviceUrl(serviceDefinition)

    expect(url).toEqual('https://jalapenos-api.gousto.info/auth/v1')
  })

  it('should throw when basePath is not defined for an HTTPS service', () => {
    const serviceDefinition: ServiceUrlProperties = {
      environmentName: 'jalapenos',
      protocol: PROTOCOL_PREFIX.HTTPS,
      serviceName: 'auth',
      serviceDomain: SERVICE_DOMAINS.default
    }

    expect(() => serviceUrl(serviceDefinition)).toThrow('basePath must be defined for HTTPS services')
  })

  const testCases: ServiceDefinitionTestExpectation[] = [
    {
      environmentName: 'production',
      protocol: PROTOCOL_PREFIX.HTTPS,
      serviceName: 'orders',
      serviceDomain: SERVICE_DOMAINS.production,
      basePath: '/orders/v2.0.0',
      expectedUrl: 'https://production-api.gousto.co.uk/orders/v2.0.0'
    },
    {
      environmentName: 'jalapenos',
      protocol: PROTOCOL_PREFIX.HTTP,
      serviceName: 'orders',
      serviceDomain: SERVICE_DOMAINS.default,
      expectedUrl: 'http://jalapenos-orders.gousto.info'
    },
    {
      environmentName: 'staging',
      protocol: PROTOCOL_PREFIX.HTTPS,
      serviceName: 'orders',
      serviceDomain: SERVICE_DOMAINS.default,
      basePath: '/orders/v2.0.0',
      expectedUrl: 'https://staging-api.gousto.info/orders/v2.0.0'
    },
    {
      serviceName: 'orders',
      environmentName: 'production',
      protocol: PROTOCOL_PREFIX.HTTP,
      serviceDomain: SERVICE_DOMAINS.default,
      expectedUrl: 'http://production-orders.gousto.info'
    }
  ]

  testCases.forEach((serviceDefinitionTest: ServiceDefinitionTestExpectation, i: number) => {
    it(`should return the correct url for a service definition [test variation: ${i + 1}]`, () => {
      const url = serviceUrl(serviceDefinitionTest)

      expect(url).toEqual(serviceDefinitionTest.expectedUrl)
    })
  })

  it('should apply the provided overrides function if its result is defined', () => {
    const overrides = () => 'foobar'
    expect(serviceUrl({
      environmentName: 'jalapenos',
      protocol: PROTOCOL_PREFIX.HTTP,
      serviceName: 'orders',
      serviceDomain: SERVICE_DOMAINS.default,
      basePath: '/boxprices/v2.0.0'
    }, overrides)).toEqual('foobar')
  })

  it('should not apply the provided overrides function if its result is undefined', () => {
    const overrides = () => undefined
    expect(serviceUrl({
      environmentName: 'jalapenos',
      protocol: PROTOCOL_PREFIX.HTTP,
      serviceName: 'orders',
      serviceDomain: SERVICE_DOMAINS.default,
      basePath: '/orders/v2.0.0'
    }, overrides)).toEqual('http://jalapenos-api.gousto.info/orders/v2.0.0')
  })

  it('should return the correct url, using the default override for webclient', () => {
    const serviceDefinition: ServiceUrlProperties = {
      environmentName: 'staging',
      protocol: PROTOCOL_PREFIX.HTTPS,
      serviceName: 'webclient',
      serviceDomain: SERVICE_DOMAINS.default,
      basePath: ''
    }

    jest.spyOn(ServiceUrlNS, 'serviceOverrides')
    const url = serviceUrl(serviceDefinition, ServiceUrlNS.serviceOverrides)

    expect(ServiceUrlNS.serviceOverrides).toHaveBeenCalledTimes(1)
    expect(url).toEqual('https://staging-api.gousto.info')
  })
})
