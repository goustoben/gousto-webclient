import { getEnvConfig } from '../../../src/utils/processEnv'
import {
  getServerEnvironment,
  getServerDomain,
  getServerProtocol,
  getServerRecaptchaPublicKey,
  getServerRecaptchaRAFPublicKey,
  getServerCheckoutComPublicKey,
  getServerDatadogRumSdkAppID,
  getServerDatadogRumSdkClientToken,
  getServerDatadogBrowserLogsClientToken,
} from '../serverEnvironment'

jest.mock('../../../src/utils/processEnv')

const mockGetEnvConfig = getEnvConfig as jest.Mock

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
      mockGetEnvConfig.mockReturnValue({ ENVIRONMENT: 'test-environment' })

      expect(getServerEnvironment()).toEqual('test-environment')
    })
  })

  describe('getServerDomain', () => {
    it('returns DOMAIN from getEnvConfig', () => {
      mockGetEnvConfig.mockReturnValue({ DOMAIN: 'gousto.local' })

      expect(getServerDomain()).toEqual('gousto.local')
    })
  })

  describe('getServerProtocol', () => {
    it('should use ENVIRONMENT to infer the specified protocol for local', () => {
      mockGetEnvConfig.mockReturnValue({ ENVIRONMENT: 'local' })

      expect(getServerProtocol()).toEqual('http:')
    })

    it('should use ENVIRONMENT to infer the specified protocol for production', () => {
      mockGetEnvConfig.mockReturnValue({ ENVIRONMENT: 'production' })
      expect(getServerProtocol()).toEqual('https:')
    })

    it('should use ENVIRONMENT to infer the specified protocol for staging', () => {
      mockGetEnvConfig.mockReturnValue({ ENVIRONMENT: 'staging' })
      expect(getServerProtocol()).toEqual('https:')
    })

    it('should use ENVIRONMENT to infer the specified protocol for lower environments', () => {
      mockGetEnvConfig.mockReturnValue({ ENVIRONMENT: 'jalapenos' })
      expect(getServerProtocol()).toEqual('https:')
    })
  })

  describe('getServerRecaptchaPublicKey', () => {
    it('returns the expected value from process.env', () => {
      const mockRecaptchaPublicKey = 'mock-recaptcha-public-key'

      mockGetEnvConfig.mockReturnValue({
        RECAPTCHA_PUBK: mockRecaptchaPublicKey,
      })

      expect(getServerRecaptchaPublicKey()).toEqual(mockRecaptchaPublicKey)
    })
  })

  describe('getServerRecaptchaRAFPublicKey', () => {
    it('returns the expected value from process.env', () => {
      const mockRecaptchaRAFPublicKey = 'mock-recaptcha-raf-public-key'

      mockGetEnvConfig.mockReturnValue({
        RECAPTCHA_RAF_PUBK: mockRecaptchaRAFPublicKey,
      })

      expect(getServerRecaptchaRAFPublicKey()).toEqual(mockRecaptchaRAFPublicKey)
    })
  })

  describe('getCheckoutComPublicKey', () => {
    it('returns the expected value from process.env', () => {
      const mockCheckoutComPublicKey = 'mock-checkout-com-public-key'

      mockGetEnvConfig.mockReturnValue({
        CHECKOUT_COM_PUBK: mockCheckoutComPublicKey,
      })

      expect(getServerCheckoutComPublicKey()).toEqual(mockCheckoutComPublicKey)
    })
  })

  describe('getServerDatadogRumSdkAppID', () => {
    it('returns the expected value from process.env', () => {
      const mockDatadogRumSdkAppID = 'mock-datadog-rum-sdk-app-id'

      mockGetEnvConfig.mockReturnValue({
        DATADOG_RUM_SDK_APP_ID: mockDatadogRumSdkAppID,
      })

      expect(getServerDatadogRumSdkAppID()).toEqual(mockDatadogRumSdkAppID)
    })
  })

  describe('getServerDatadogRumSdkClientToken', () => {
    it('returns the expected value from process.env', () => {
      const mockDatadogRumSdkClientToken = 'mock-datadog-rum-sdk-client-token'

      mockGetEnvConfig.mockReturnValue({
        DATADOG_RUM_SDK_CLIENT_TOKEN: mockDatadogRumSdkClientToken,
      })

      expect(getServerDatadogRumSdkClientToken()).toEqual(mockDatadogRumSdkClientToken)
    })
  })

  describe('getServerDatadogBrowserLogsClientToken', () => {
    it('returns the expected value from process.env', () => {
      const mockDatadogBrowserLogsClientToken = 'mock-datadog-browser-logs-client-token'

      mockGetEnvConfig.mockReturnValue({
        DATADOG_BROWSER_LOGS_CLIENT_TOKEN: mockDatadogBrowserLogsClientToken,
      })

      expect(getServerDatadogBrowserLogsClientToken()).toEqual(mockDatadogBrowserLogsClientToken)
    })
  })
})
