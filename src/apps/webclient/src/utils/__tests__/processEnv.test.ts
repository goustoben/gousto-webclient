import { getFromProcessEnv, parseStringToNumber, ProcessEnv } from '../processEnv'

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
        process.env = {
          ENVIRONMENT: 'local',
          API_TOKEN: 'mock-api-token',
        }

        // eslint-disable-next-line
        const { getEnvConfig } = require('../processEnv')

        expect(getEnvConfig()).toEqual({
          ENVIRONMENT: 'local',
          API_TOKEN: 'mock-api-token',
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
      test('throws if key is missing from process.env', () => {
        const expectedError = new Error('No environment variable with key API_TOKEN')

        process.env = {
          ENVIRONMENT: 'local',
          // Missing: API_TOKEN
        }

        // eslint-disable-next-line
        const { validateProcessEnv } = require('../processEnv')

        expect(() => validateProcessEnv()).toThrow(expectedError)
      })

      test('does not throw if process.env contains required keys', () => {
        process.env = {
          ENVIRONMENT: 'local',
          API_TOKEN: 'mock-api-token',
        }

        // eslint-disable-next-line
        const { validateProcessEnv } = require('../processEnv')

        expect(() => validateProcessEnv()).not.toThrow()
      })
    })
  })
})
