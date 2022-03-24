import { Env, envOrCallback } from '../processEnv'

const mockCallback = jest.fn()

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

    test.each([
      ['ENVIRONMENT', 'local', { ENVIRONMENT: 'local' }],
      ['API_TOKEN', 'mock-api-token', { API_TOKEN: 'mock-api-token' }],
    ])('getEnvConfig contains the correct values', (key, value, expected) => {
      process.env[key] = value

      // eslint-disable-next-line
      const { getEnvConfig } = require('../processEnv')

      expect(getEnvConfig(mockCallback)).toEqual(expected)
    })

    test('callback is invoked as expected when property is undefined', () => {
      envOrCallback(mockCallback)({} as Env, 'ENVIRONMENT')
      expect(mockCallback).toHaveBeenCalledWith('No environment variable with key ENVIRONMENT')
    })

    test('logger is NOT called when property is defined', () => {
      envOrCallback(mockCallback)({ ENVIRONMENT: 'local' }, 'ENVIRONMENT')
      expect(mockCallback).not.toHaveBeenCalled()
    })
  })
})
