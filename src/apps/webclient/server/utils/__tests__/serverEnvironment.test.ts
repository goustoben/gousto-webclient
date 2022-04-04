import { getEnvConfig } from '../../../src/utils/processEnv'
import { getServerEnvironment, getServerDomain, getServerProtocol } from "../serverEnvironment";

jest.mock('../../../src/utils/processEnv')

describe('serverEnvironment', () => {
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

  describe('getServerEnvironment', () => {
    test('returns ENVIRONMENT from getEnvConfig', () => {
      (getEnvConfig as jest.Mock).mockReturnValue({ ENVIRONMENT: 'test-environment' })

      expect(getServerEnvironment()).toEqual('test-environment')
    })
  })

  describe('getServerDomain', () => {
    it('should use ENVIRONMENT to infer the specified domain for local', () => {
      (getEnvConfig as jest.Mock).mockReturnValue({ ENVIRONMENT: 'local' })

      expect(getServerDomain()).toEqual('gousto.local')
    })

    it('should use ENVIRONMENT to infer the specified domain for production', () => {
      (getEnvConfig as jest.Mock).mockReturnValue({ ENVIRONMENT: 'production' })
      expect(getServerDomain()).toEqual('gousto.co.uk')
    })

    it('should use ENVIRONMENT to infer the specified domain for lower envoironments', () => {
      (getEnvConfig as jest.Mock).mockReturnValue({ ENVIRONMENT: 'jalapenos' })
      expect(getServerDomain()).toEqual('gousto.info');
      (getEnvConfig as jest.Mock).mockReturnValue({ ENVIRONMENT: 'fef' })
      expect(getServerDomain()).toEqual('gousto.info')
    })
  })

  describe('getServerProtocol', () => {
    it('should use ENVIRONMENT to infer the specified protocol for local', () => {
      (getEnvConfig as jest.Mock).mockReturnValue({ ENVIRONMENT: 'local' })

      expect(getServerProtocol()).toEqual('http:')
    })

    it('should use ENVIRONMENT to infer the specified protocol for production', () => {
      (getEnvConfig as jest.Mock).mockReturnValue({ ENVIRONMENT: 'production' })
      expect(getServerProtocol()).toEqual('https:')
    })

    it('should use ENVIRONMENT to infer the specified protocol for staging', () => {
      (getEnvConfig as jest.Mock).mockReturnValue({ ENVIRONMENT: 'staging' })
      expect(getServerProtocol()).toEqual('https:')
    })

    it('should use ENVIRONMENT to infer the specified protocol for lower environments', () => {
      (getEnvConfig as jest.Mock).mockReturnValue({ ENVIRONMENT: 'jalapenos' })
      expect(getServerProtocol()).toEqual('https:')
    })
  })
})
