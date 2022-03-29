import * as browserLogsSDK from '@datadog/browser-logs'
import * as RUMSDK from '@datadog/browser-rum'

import { canUseWindow } from 'utils/browserEnvironment'
import { getEnvironment } from 'utils/isomorphicEnvironment'

import * as dd from '../initialize'
import {
  DATADOG_ENABLED_ENVS,
  BROWSER_LOGS_CLIENT_TOKEN,
  RUM_SDK_APP_ID,
  RUM_SDK_CLIENT_TOKEN,
  DATADOG_CLIENT_SAMPLE_RATE,
} from '../config'

jest.mock('@datadog/browser-logs', () => ({
  datadogLogs: {
    init: jest.fn(),
  },
}))

jest.mock('@datadog/browser-rum', () => ({
  datadogRum: {
    init: jest.fn(),
  },
}))

jest.mock('utils/isomorphicEnvironment', () => ({
  getEnvironment: jest.fn(),
}))

jest.mock('utils/browserEnvironment')

const getIsDatadogEnabledSpy = jest.spyOn(dd, 'getIsDatadogEnabled')

describe('datadog', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  describe('getIsDatadogEnabled', () => {
    test('returns false if window is not available', () => {
      (canUseWindow as jest.Mock).mockReturnValue(false)

      expect(dd.getIsDatadogEnabled()).toEqual(false)
    })

    test('returns false if dd is not enabled in current environment', () => {
      (canUseWindow as jest.Mock).mockReturnValue(true);
      (getEnvironment as jest.Mock).mockReturnValue('some-other-environment')

      expect(dd.getIsDatadogEnabled()).toEqual(false)
    })

    test('returns true if dd is enabled in current environment', () => {
      (canUseWindow as jest.Mock).mockReturnValue(true);
      (getEnvironment as jest.Mock).mockReturnValue(DATADOG_ENABLED_ENVS[0])

      expect(dd.getIsDatadogEnabled()).toEqual(true)
    })
  })

  describe('initializeDataDog', () => {
    describe('Given datadog is enabled', () => {
      beforeEach(() => {
        getIsDatadogEnabledSpy.mockReturnValue(true)

        dd.initializeDatadog()
      })

      test('Then it should initialize datadogLogs SDK with the expected config', () => {
        expect(browserLogsSDK.datadogLogs.init).toHaveBeenCalledWith({
          clientToken: BROWSER_LOGS_CLIENT_TOKEN,
          env: 'production',
          forwardErrorsToLogs: true,
          sampleRate: DATADOG_CLIENT_SAMPLE_RATE,
          service: 'gousto-webclient',
          site: 'datadoghq.eu',
          version: 'MOCK_CIRCLE_BUILD_NUM',
        })
      })

      test('Then it should initialize datadogRum SDK with the expected config', () => {
        expect(RUMSDK.datadogRum.init).toHaveBeenCalledWith({
          applicationId: RUM_SDK_APP_ID,
          clientToken: RUM_SDK_CLIENT_TOKEN,
          defaultPrivacyLevel: 'mask-user-input',
          env: 'production',
          sampleRate: DATADOG_CLIENT_SAMPLE_RATE,
          service: 'gousto-webclient',
          site: 'datadoghq.eu',
          trackInteractions: false,
          version: 'MOCK_CIRCLE_BUILD_NUM',
        })
      })
    })

    describe('Given datadog is not enabled', () => {
      beforeEach(() => {
        getIsDatadogEnabledSpy.mockReturnValue(false)
      })

      test('Then it should NOT initialize datadogLogs SDK', () => {
        dd.initializeDatadog()

        expect(browserLogsSDK.datadogLogs.init).not.toHaveBeenCalled()
      })

      test('Then it should NOT initialize datadogRum SDK', () => {
        dd.initializeDatadog()

        expect(RUMSDK.datadogRum.init).not.toHaveBeenCalled()
      })
    })
  })
})
