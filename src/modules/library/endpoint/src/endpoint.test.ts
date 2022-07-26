import { browserEnvironment, configFromWindow, processEnv } from '@library/environment'

import { ServiceName } from './types'

import { endpoint } from './endpoint'
import * as serviceUtils from './service-manifest'

jest.mock('@library/environment', () => ({
  ...jest.requireActual('@library/environment'),
  processEnv: {
    getEnvConfig: jest.fn(),
  },
  configFromWindow: {
    getClientEnvironment: jest.fn(),
    getClientDomain: jest.fn(),
  }
}))

describe('endpoint()', () => {
  let serviceManifestSpy: jest.SpyInstance
  let canUseWindowSpy: jest.SpyInstance

  const stubServiceManifest = {
    auth: [
      {
        version: 'v1.0.0',
        majorVersion: 1,
        basePath: '/auth/v1.0.0',
      },
      {
        version: 'v2',
        majorVersion: 2,
        basePath: '/auth/v2',
      },
    ],
    customers: [
      {
        version: 'v1',
        majorVersion: 1,
        basePath: '/customers/v1',
      },
      {
        version: 'v2',
        majorVersion: 2,
        basePath: '/customers/v2',
      },
    ],
    orders: [
      {
        version: 'v1',
        majorVersion: 1,
        basePath: '/orders/v1',
      },
      {
        version: 'v2',
        majorVersion: 2,
        basePath: '/orders/v2',
      },
    ],
    webclient: [
      {
        version: 'v1',
        majorVersion: 1,
        basePath: null,
      },
    ],
  }

  beforeAll(() => {
    canUseWindowSpy = jest.spyOn(browserEnvironment, 'canUseWindow')
    serviceManifestSpy = jest.spyOn(serviceUtils, 'getServiceManifest')
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  describe('running on the client', () => {
    beforeAll(() => {
      canUseWindowSpy.mockReturnValue(true)
      serviceManifestSpy.mockReturnValue(stubServiceManifest)
    })

    it.each([
      ['production', 'gousto.co.uk', 'auth', 1, 'https://production-api.gousto.co.uk/auth/v1.0.0'],
      [
        'production',
        'gousto.co.uk',
        'customers',
        1,
        'https://production-api.gousto.co.uk/customers/v1',
      ],
      [
        'production',
        'gousto.co.uk',
        'customers',
        2,
        'https://production-api.gousto.co.uk/customers/v2',
      ],
      ['production', 'gousto.co.uk', 'webclient', 1, 'https://www.gousto.co.uk'],
      /* lower environments */
      ['staging', 'gousto.info', 'auth', 1, 'https://staging-api.gousto.info/auth/v1.0.0'],
      ['staging', 'gousto.info', 'customers', 1, 'https://staging-api.gousto.info/customers/v1'],
      ['staging', 'gousto.info', 'customers', 2, 'https://staging-api.gousto.info/customers/v2'],
      ['staging', 'gousto.info', 'webclient', 1, 'https://staging-api.gousto.info'],
      ['fef', 'gousto.info', 'auth', 1, 'https://fef-api.gousto.info/auth/v1.0.0'],
      ['fef', 'gousto.info', 'customers', 1, 'https://fef-api.gousto.info/customers/v1'],
      ['fef', 'gousto.info', 'customers', 2, 'https://fef-api.gousto.info/customers/v2'],
      [
        'marketplace',
        'squadmarketplace.gousto.info',
        'customers',
        2,
        'https://marketplace-api.squadmarketplace.gousto.info/customers/v2',
      ],
      /* local development */
      ['local', 'gousto.local', 'auth', 1, 'https://staging-api.gousto.info/auth/v1.0.0'],
      ['local', 'gousto.local', 'customers', 1, 'https://staging-api.gousto.info/customers/v1'],
      ['local', 'gousto.local', 'customers', 2, 'https://staging-api.gousto.info/customers/v2'],
    ])(
      'should return the correct endpoint for the client, %s, %s, %s, %i = %s',
      (env, domain, serviceName, version, expectation) => {
        (configFromWindow.getClientEnvironment as jest.Mock).mockReturnValue(env)
        (configFromWindow.getClientDomain as jest.Mock).mockReturnValue(domain)
        expect(endpoint(serviceName as ServiceName, version)).toEqual(expectation)
      },
    )

    it('should throw if it cannot find the service', () => {
      expect(() => endpoint('foo' as ServiceName)).toThrow("Service 'foo' not found in manifest.")
    })

    it('should throw if it cannot find the service majorVersion', () => {
      expect(() => endpoint('auth', 999)).toThrow(
        "Service version 999 for service 'auth' not found in manifest",
      )
    })
  })

  describe('running on the server', () => {
    const windowSpy = jest.spyOn(window, 'window', 'get')
    beforeEach(() => {
      canUseWindowSpy.mockReturnValue(false)
      serviceManifestSpy.mockReturnValue(stubServiceManifest)
      // intentionally mocking window as undefined to simulate server environment
      windowSpy.mockReturnValue(undefined as never)
    })

    it('should work', () => {
      const environment = 'production'
      const domain = 'gousto.co.uk'
      const serviceName = 'auth'
      const version = 1
      const expectation = 'http://production-auth.gousto.co.uk'
      ;(processEnv.getEnvConfig as jest.Mock).mockReturnValue({
        ENVIRONMENT: environment,
        DOMAIN: domain,
      })

      expect(endpoint(serviceName as ServiceName, version)).toEqual(expectation)
    })

    it.each([
      ['production', 'gousto.co.uk', 'auth', 1, 'http://production-auth.gousto.co.uk'],
      ['production', 'gousto.co.uk', 'customers', 1, 'http://production-customers.gousto.co.uk'],
      ['production', 'gousto.co.uk', 'orders', 1, 'http://production-orders.gousto.co.uk'],
      ['production', 'gousto.co.uk', 'webclient', 1, 'http://production-webclient.gousto.co.uk'],
      /* staging */
      ['staging', 'gousto.info', 'auth', 1, 'http://staging-auth.gousto.info'],
      ['staging', 'gousto.info', 'customers', 1, 'http://staging-customers.gousto.info'],
      ['staging', 'gousto.info', 'orders', 1, 'http://staging-orders.gousto.info'],
      ['staging', 'gousto.info', 'webclient', 1, 'http://staging-webclient.gousto.info'],
      /* lower environments */
      ['fef', 'gousto.info', 'auth', 1, 'http://fef-auth.gousto.info'],
      ['jalapenos', 'gousto.info', 'orders', 1, 'http://jalapenos-orders.gousto.info'],
      [
        'marketplace',
        'squadmarketplace.gousto.info',
        'orders',
        1,
        'http://marketplace-orders.squadmarketplace.gousto.info',
      ],
      /* local development */
      ['local', 'gousto.local', 'auth', 1, 'https://staging-api.gousto.info/auth/v1.0.0'],
    ])(
      'should return the correct endpoint for %s, %s, %s, %i = %s',
      (environment, serviceDomain, serviceName, version, expectation) => {
        (processEnv.getEnvConfig as jest.Mock).mockReturnValue({
          ENVIRONMENT: environment,
          DOMAIN: serviceDomain,
        })

        expect(endpoint(serviceName as ServiceName, version)).toEqual(expectation)
      },
    )

    it('should throw if it cannot find the service', () => {
      (processEnv.getEnvConfig as jest.Mock).mockReturnValue({
        ENVIRONMENT: 'staging',
        DOMAIN: 'gousto.info',
      })

      expect(() => endpoint('foo' as ServiceName)).toThrow("Service 'foo' not found in manifest.")
    })

    it('should throw if it cannot find the service majorVersion', () => {
      (processEnv.getEnvConfig as jest.Mock).mockReturnValue({
        ENVIRONMENT: 'staging',
      })
      expect(() => endpoint('auth', 999)).toThrow(
        "Service version 999 for service 'auth' not found in manifest",
      )
    })
  })
})
