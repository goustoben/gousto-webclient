import { $getConfigFromWindow, getConfigFromWindow } from 'utils/configFromWindow'

import { WindowEnvConfig } from '../../../server/utils/envConfigForClient'

const windowSpy = jest.spyOn(global, 'window', 'get')

const mockWindowEnvConfig: WindowEnvConfig = {
  RECAPTCHA_PUBK: 'mock-recaptcha-public-key',
  RECAPTCHA_RAF_PUBK: 'mock-recaptcha-raf-public-key',
  CHECKOUT_COM_PUBK: 'mock-checkout-com-public-key',
  DATADOG_RUM_SDK_APP_ID: 'mock-datadog-rum-sdk-app-id',
  DATADOG_RUM_SDK_CLIENT_TOKEN: 'mock-datadog-rum-sdk-client-token',
  DATADOG_BROWSER_LOGS_CLIENT_TOKEN: 'mock-datadog-browser-logs-client-token',
  ENVIRONMENT: 'local',
  DOMAIN: 'gousto.local',
  APPLE_PAY_MERCHANT_ID: 'merchant.uk.co.gousto.beetroots',
}

describe('windowEnvConfig', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('$getConfigFromWindow', () => {
    it('throws expected error if there is a problem retrieving value', () => {
      const expectedError = new Error(
        "Error getting client config from window: TypeError: Cannot read property 'CHECKOUT_COM_PUBK' of undefined",
      )
      // eslint-disable-next-line
      // @ts-expect-error
      windowSpy.mockImplementation(() => ({}))

      const testgetConfigFromWindow = $getConfigFromWindow()

      expect(() => testgetConfigFromWindow('CHECKOUT_COM_PUBK')).toThrowError(expectedError)
    })

    it('throws expected error if value is undefined', () => {
      const expectedError = new Error(
        'Error getting client config from window: Error: config with key CHECKOUT_COM_PUBK is not defined',
      )
      // eslint-disable-next-line
      // @ts-expect-error
      windowSpy.mockImplementation(() => ({
        __config__: {},
      }))

      const testgetConfigFromWindow = $getConfigFromWindow()

      expect(() => testgetConfigFromWindow('CHECKOUT_COM_PUBK')).toThrowError(expectedError)
    })
  })

  describe('getConfigFromWindow', () => {
    beforeEach(() => {
      // eslint-disable-next-line
      // @ts-expect-error
      windowSpy.mockImplementation(() => ({
        __config__: mockWindowEnvConfig,
      }))
    })

    it.each(Object.entries(mockWindowEnvConfig).map(([key, val]) => [key, val]))(
      'returns expected value when passed parameter %s',
      (key, val) => {
        expect(getConfigFromWindow(key as keyof WindowEnvConfig)).toEqual(val)
      },
    )
  })
})
