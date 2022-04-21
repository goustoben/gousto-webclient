import { getEnvConfig } from '../../../src/utils/processEnv'
import { createWindowEnvConfig, WindowEnvConfig } from '../envConfigForClient'

jest.mock('../../../src/utils/processEnv')

const mockGetEnvConfig = getEnvConfig as jest.Mock

describe('windowEnvConfig', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('createWindowEnvConfig', () => {
    it('returns a stringified config object as expected', () => {
      const mockConfig: WindowEnvConfig = {
        RECAPTCHA_PUBK: 'mock-recaptcha-public-key',
        RECAPTCHA_RAF_PUBK: 'mock-recaptcha-raf-public-key',
        CHECKOUT_COM_PUBK: 'mock-checkout-com-public-key',
        DATADOG_RUM_SDK_APP_ID: 'mock-datadog-rum-sdk-app-id',
        DATADOG_RUM_SDK_CLIENT_TOKEN: 'mock-datadog-rum-sdk-client-token',
        DATADOG_BROWSER_LOGS_CLIENT_TOKEN: 'mock-datadog-browser-logs-client-token',
        ENVIRONMENT: 'mock-environment',
        DOMAIN: 'mock-domain',
      }

      const expected = JSON.stringify(mockConfig)

      mockGetEnvConfig.mockReturnValue(mockConfig)

      expect(createWindowEnvConfig()).toEqual(expected)
    })
  })
})
