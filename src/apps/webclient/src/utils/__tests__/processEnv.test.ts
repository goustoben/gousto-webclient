import { getFromProcessEnv, parseStringToNumber, ProcessEnv } from '../processEnv'

const validProcessEnv: ProcessEnv = {
  ENVIRONMENT: 'local',
  API_TOKEN: 'mock-api-token',
  AUTH_CLIENT_ID: '10',
  AUTH_CLIENT_SECRET: 'mock-auth-client-secret',
  RECAPTCHA_RAF_PVTK: 'mock-recaptcha-raf-private-key',
  RECAPTCHA_PVTK: 'mock-recaptcha-private-key',
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
          API_TOKEN: 'mock-api-token',
          AUTH_CLIENT_ID: 10,
          AUTH_CLIENT_SECRET: 'mock-auth-client-secret',
          RECAPTCHA_RAF_PVTK: 'mock-recaptcha-raf-private-key',
          RECAPTCHA_PVTK: 'mock-recaptcha-private-key',
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
        process.env = {
          ENVIRONMENT: 'local',
          API_TOKEN: 'mock-api-token',
          AUTH_CLIENT_ID: '10',
          AUTH_CLIENT_SECRET: 'mock-auth-client-secret',
          RECAPTCHA_RAF_PVTK: 'mock-recaptcha-raf-private-key',
          RECAPTCHA_PVTK: 'mock-recaptcha-private-key',
        }

        // eslint-disable-next-line
        const { validateProcessEnv } = require('../processEnv')

        expect(() => validateProcessEnv()).not.toThrow()
      })
    })
  })
})
