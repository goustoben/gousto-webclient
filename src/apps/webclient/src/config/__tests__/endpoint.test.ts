import * as browserEnv from 'utils/browserEnvironment'
import {
  GeneratedEndpointTestCase,
  generateEndpointTestCases,
} from '_testing/generate-endpoint-test-cases'
import { ServiceName } from 'config/service-environment/service-environment.types'
import { getEnvConfig } from 'utils/processEnv'
import { getClientEnvironment } from 'utils/configFromWindow'
import * as serviceUtils from '../service-environment/service-manifest'
import endpoint from '../endpoint'

jest.mock('utils/processEnv', () => ({
  ...jest.requireActual('utils/processEnv'),
  getEnvConfig: jest.fn(),
}))

jest.mock('utils/configFromWindow')

const endpointTestCases: GeneratedEndpointTestCase[] = generateEndpointTestCases()

describe('endpoint()', () => {
  let serviceManifestSpy: jest.SpyInstance
  let getWindowSpy: jest.SpyInstance
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
    getWindowSpy = jest.spyOn(browserEnv, 'getWindow')
    canUseWindowSpy = jest.spyOn(browserEnv, 'canUseWindow')
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
      [
        'production',
        'https://www.gousto.co.uk/',
        'auth',
        1,
        'https://production-api.gousto.co.uk/auth/v1.0.0',
      ],
      [
        'production',
        'https://www.gousto.co.uk/',
        'customers',
        1,
        'https://production-api.gousto.co.uk/customers/v1',
      ],
      [
        'production',
        'https://www.gousto.co.uk/',
        'customers',
        2,
        'https://production-api.gousto.co.uk/customers/v2',
      ],
      ['production', 'https://www.gousto.co.uk/', 'webclient', 1, 'https://www.gousto.co.uk'],
      /* lower environments */
      [
        'staging',
        'https://staging.gousto.info/',
        'auth',
        1,
        'https://staging-api.gousto.info/auth/v1.0.0',
      ],
      [
        'staging',
        'https://staging.gousto.info/',
        'customers',
        1,
        'https://staging-api.gousto.info/customers/v1',
      ],
      [
        'staging',
        'https://staging.gousto.info/',
        'customers',
        2,
        'https://staging-api.gousto.info/customers/v2',
      ],
      [
        'staging',
        'https://staging.gousto.info/',
        'webclient',
        1,
        'https://staging-api.gousto.info',
      ],
      ['fef', 'https://fef-www.gousto.info/', 'auth', 1, 'https://fef-api.gousto.info/auth/v1.0.0'],
      [
        'fef',
        'https://fef-www.gousto.info/',
        'customers',
        1,
        'https://fef-api.gousto.info/customers/v1',
      ],
      [
        'fef',
        'https://fef-www.gousto.info/',
        'customers',
        2,
        'https://fef-api.gousto.info/customers/v2',
      ],
      /* local development */
      [
        'local',
        'http://frontend.gousto.local:8080/menu',
        'auth',
        1,
        'https://staging-api.gousto.info/auth/v1.0.0',
      ],
      [
        'local',
        'http://frontend.gousto.local:8080/food-boxes',
        'customers',
        1,
        'https://staging-api.gousto.info/customers/v1',
      ],
      [
        'local',
        'http://frontend.gousto.local:8080',
        'customers',
        2,
        'https://staging-api.gousto.info/customers/v2',
      ],
    ])(
      'should return the correct endpoint for the client, %s, %s, %i = %s',
      (env: string, location: string, serviceName: string, version, expectation) => {
        ;(getClientEnvironment as jest.Mock).mockReturnValue(env)
        getWindowSpy.mockReturnValue({
          location: new URL(location),
        })
        expect(endpoint(serviceName as ServiceName, version)).toEqual(expectation)
      }
    )

    it('should throw if it cannot find the service', () => {
      expect(() => endpoint('foo' as ServiceName)).toThrow("Service 'foo' not found in manifest.")
    })

    it('should throw if it cannot find the service majorVersion', () => {
      expect(() => endpoint('auth', 999)).toThrow(
        "Service version 999 for service 'auth' not found in manifest"
      )
    })

    const clientTestCases = () => endpointTestCases.filter((v) => v[3] === 'live' && !v[4])
    it.each(clientTestCases())(
      'should respond the same as the old implementation for %s %s %i %s',
      (
        environment: string,
        service: string,
        majorVersion: number,
        appInstanceEnvironment: string,
        isServerCall: boolean,
        resultOfOldEndpointInvocation: string
      ) => {
        ;(getClientEnvironment as jest.Mock).mockReturnValue(environment)
        serviceManifestSpy.mockRestore()
        getWindowSpy.mockReturnValue({
          location: new URL(
            environment === 'production'
              ? 'https://www.gousto.co.uk/'
              : 'https://staging-www.gousto.info/'
          ),
        })

        expect(endpoint(service as ServiceName, majorVersion)).toEqual(
          resultOfOldEndpointInvocation
        )
      }
    )
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
      ;(getEnvConfig as jest.Mock).mockReturnValue({
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
      /* local development */
      ['local', 'gousto.local', 'auth', 1, 'https://staging-api.gousto.info/auth/v1.0.0'],
    ])(
      'should return the correct endpoint for %s, %s, %s, %i = %s',
      (environment, serviceDomain, serviceName, version, expectation) => {
        ;(getEnvConfig as jest.Mock).mockReturnValue({
          ENVIRONMENT: environment,
          DOMAIN: serviceDomain,
        })

        expect(endpoint(serviceName as ServiceName, version)).toEqual(expectation)
      }
    )

    it('should throw if it cannot find the service', () => {
      ;(getEnvConfig as jest.Mock).mockReturnValue({
        ENVIRONMENT: 'staging',
        DOMAIN: 'gousto.info',
      })

      expect(() => endpoint('foo' as ServiceName)).toThrow("Service 'foo' not found in manifest.")
    })

    it('should throw if it cannot find the service majorVersion', () => {
      ;(getEnvConfig as jest.Mock).mockReturnValue({
        ENVIRONMENT: 'staging',
      })
      expect(() => endpoint('auth', 999)).toThrow(
        "Service version 999 for service 'auth' not found in manifest"
      )
    })

    const serverTestCases = () =>
      endpointTestCases.filter((testCaseArray) => testCaseArray[3] === 'live' && testCaseArray[4])
    it.each(serverTestCases())(
      'should respond the same as the old implementation for %s %s %i %s',
      (
        environment: string,
        service: string,
        version: number,
        appInstanceEnvironment: string,
        isServerCall: boolean,
        resultOfOldEndpointInvocation: string
      ) => {
        const domain = environment === 'production' ? 'gousto.co.uk' : 'gousto.info'
        ;(getEnvConfig as jest.Mock).mockReturnValue({
          ENVIRONMENT: environment,
          DOMAIN: domain,
        })

        expect(endpoint(service as ServiceName, version)).toEqual(resultOfOldEndpointInvocation)
      }
    )
  })
})
