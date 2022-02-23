import logger from '../utils/logger'
import { envOrLog, processEnv } from './env'

jest.mock('../utils/logger', () => ({
  error: jest.fn(),
}))

describe('env.ts', () => {
  describe('envConfig', () => {
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
      ['PROTOCOL', 'http', { PROTOCOL: 'http' }],
      ['DOMAIN', 'gousto.co.uk', { DOMAIN: 'gousto.co.uk' }],
      ['ENVIRONMENT', 'local', { ENVIRONMENT: 'local' }],
    ])('envConfig contains the correct values', (key, value, expected) => {
      process.env[key] = value

      const { envConfig } = require('./env')

      expect(envConfig).toEqual(expected)
    })

    test('logger is called when property is undefined', () => {
      envOrLog(processEnv, 'PROTOCOL')
      expect(logger.error).toHaveBeenCalledWith({ message: 'No environment variable with key PROTOCOL' })
    })

    test('logger is NOT called when property is defined', () => {
      envOrLog({ ...processEnv, PROTOCOL: 'http' }, 'PROTOCOL')
      expect(logger.error).not.toHaveBeenCalled()
    })
  })
})
