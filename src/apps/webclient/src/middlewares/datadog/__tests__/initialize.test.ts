import * as browserLogsSDK from '@datadog/browser-logs'
import * as RUMSDK from '@datadog/browser-rum'

import { initializeDatadog } from '../initialize'
import {
  DATADOG_ENABLED_ENVS,
  BROWSER_LOGS_CLIENT_TOKEN,
  RUM_SDK_APP_ID,
  RUM_SDK_CLIENT_TOKEN,
} from '../config'
import { getClientEnvironment } from 'utils/browserEnvironment'

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

jest.mock('../../../utils/browserEnvironment', () => ({
  getClientEnvironment: jest.fn(),
}))

afterAll(() => {
  jest.restoreAllMocks()
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('Given datadog is enabled', () => {
  beforeEach(() => {
    ;(getClientEnvironment as jest.Mock).mockReturnValue(DATADOG_ENABLED_ENVS[0])

    initializeDatadog()
  })

  test('Then it should initialize datadogLogs SDK with the expected config', () => {
    expect(browserLogsSDK.datadogLogs.init).toHaveBeenCalledWith({
      clientToken: BROWSER_LOGS_CLIENT_TOKEN,
      env: 'production',
      forwardErrorsToLogs: true,
      sampleRate: 1,
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
      sampleRate: 1,
      service: 'gousto-webclient',
      site: 'datadoghq.eu',
      trackInteractions: false,
      version: 'MOCK_CIRCLE_BUILD_NUM',
    })
  })
})

describe('Given datadog is not enabled', () => {
  beforeEach(() => {
    // eslint-disable-next-line no-underscore-dangle
    ;(getClientEnvironment as jest.Mock).mockReturnValue('local')
  })

  test('Then it should NOT initialize datadogLogs SDK', () => {
    initializeDatadog()

    expect(browserLogsSDK.datadogLogs.init).not.toHaveBeenCalled()
  })

  test('Then it should NOT initialize datadogRum SDK', () => {
    initializeDatadog()

    expect(RUMSDK.datadogRum.init).not.toHaveBeenCalled()
  })
})
