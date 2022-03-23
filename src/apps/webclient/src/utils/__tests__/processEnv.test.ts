import { Env, envOrCallback } from '../processEnv'

const mockCallback = jest.fn()

describe('env.ts', () => {
  describe('getEnvConfig', () => {
    const originalProcessEnv = process.env

    beforeEach(() => {
      jest.resetModules()
      process.env = { ...originalProcessEnv }
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    afterAll(() => {
      process.env = originalProcessEnv
    })

    test.each([
      ['ENVIRONMENT', 'local', { ENVIRONMENT: 'local' }],
    ])('getEnvConfig contains the correct values', (key, value, expected) => {
      process.env[key] = value

      // eslint-disable-next-line
      const { getEnvConfig } = require('../processEnv')

      expect(getEnvConfig(mockCallback)).toEqual(expected)
    })

    test('callback is invoked as expected when property is undefined', () => {
      envOrCallback(mockCallback)({} as Env, 'PROTOCOL')
      expect(mockCallback).toHaveBeenCalledWith('No environment variable with key PROTOCOL')
    })

    test('logger is NOT called when property is defined', () => {
      envOrCallback(mockCallback)({ PROTOCOL: 'http' }, 'PROTOCOL')
      expect(mockCallback).not.toHaveBeenCalled()
    })
  })
})
