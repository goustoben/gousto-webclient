import { getFromProcessEnv, parseStringToNumber, ProcessEnv } from '../processEnv'

const validProcessEnv: ProcessEnv = {
  ENVIRONMENT: 'local',
  DOMAIN: 'gousto.local',
  API_TOKEN: 'mock-api-token',
  AUTH_CLIENT_ID: '10',
  AUTH_CLIENT_SECRET: 'mock-auth-client-secret',
  CHECKOUT_COM_PUBK: 'mock-checkout-com-public-key',
  DATADOG_BROWSER_LOGS_CLIENT_TOKEN: 'mock-datadog_browser_logs_client_token',
  DATADOG_RUM_SDK_APP_ID: 'mock-datadog_rum_sdk_app_id',
  DATADOG_RUM_SDK_CLIENT_TOKEN: 'mock-datadog_rum_sdk_client_token',
  RECAPTCHA_PUBK: 'mock-recaptcha-public-key',
  RECAPTCHA_PVTK: 'mock-recaptcha-private-key',
  RECAPTCHA_RAF_PUBK: 'mock-recaptcha-raf-public-key',
  RECAPTCHA_RAF_PVTK: 'mock-recaptcha-raf-private-key',
}

describe('processEnv', () => {
  describe('getEnvConfig', () => {
    const originalProcessEnv = process.env

    beforeEach(() => {
      jest.resetModules()
      process.env = {}
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    afterAll(() => {
      process.env = originalProcessEnv
    })

    describe('getEnvConfig', () => {
      test('returns expected environment config object', () => {
        process.env = validProcessEnv

        // eslint-disable-next-line
        const { getEnvConfig } = require('../processEnv')

        expect(getEnvConfig()).toEqual({
          ENVIRONMENT: 'local',
          DOMAIN: 'gousto.local',
          API_TOKEN: 'mock-api-token',
          AUTH_CLIENT_ID: 10,
          AUTH_CLIENT_SECRET: 'mock-auth-client-secret',
          CHECKOUT_COM_PUBK: 'mock-checkout-com-public-key',
          DATADOG_BROWSER_LOGS_CLIENT_TOKEN: 'mock-datadog_browser_logs_client_token',
          DATADOG_RUM_SDK_APP_ID: 'mock-datadog_rum_sdk_app_id',
          DATADOG_RUM_SDK_CLIENT_TOKEN: 'mock-datadog_rum_sdk_client_token',
          RECAPTCHA_PUBK: 'mock-recaptcha-public-key',
          RECAPTCHA_PVTK: 'mock-recaptcha-private-key',
          RECAPTCHA_RAF_PUBK: 'mock-recaptcha-raf-public-key',
          RECAPTCHA_RAF_PVTK: 'mock-recaptcha-raf-private-key',
        })
      })
    })

    describe('getFromProcessEnv', () => {
      test('retrieves value from process.env', () => {
        const mockProcessEnv = {
          ENVIRONMENT: 'local',
        }

        const result = getFromProcessEnv(mockProcessEnv as ProcessEnv)('ENVIRONMENT')

        expect(result).toEqual(mockProcessEnv.ENVIRONMENT)
      })

      test('transforms value if transform fn is passed', () => {
        const mockProcessEnv = {
          MOCK_KEY: '10',
        }

        // eslint-disable-next-line
        // @ts-expect-error
        const result = getFromProcessEnv(mockProcessEnv)('MOCK_KEY', parseStringToNumber)

        expect(result).toEqual(10)
      })
    })

    describe('validateProcessEnv', () => {
      test.each(
        // Generate test case where each key is missing from process.env
        Object.keys(validProcessEnv).map((envKey) => {
          const duplicateProcessEnv = { ...validProcessEnv }
          delete duplicateProcessEnv[envKey as keyof typeof duplicateProcessEnv]

          return [envKey, duplicateProcessEnv]
        })
      )('throws if %s is missing from process.env', (missingKey, malformedProcessEnv) => {
        const expectedError = new Error(`No environment variable with key ${missingKey}`)
        process.env = malformedProcessEnv as ProcessEnv

        // eslint-disable-next-line
        const { validateProcessEnv } = require('../processEnv')

        expect(() => validateProcessEnv()).toThrow(expectedError)
      })

      test('does not throw if process.env contains required keys', () => {
        process.env = validProcessEnv

        // eslint-disable-next-line
        const { validateProcessEnv } = require('../processEnv')

        expect(() => validateProcessEnv()).not.toThrow()
      })
    })
  })
})
