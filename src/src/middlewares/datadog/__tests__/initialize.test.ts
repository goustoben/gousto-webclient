import * as browserLogsSDK from '@datadog/browser-logs'
import * as RUMSDK from '@datadog/browser-rum'

import { initializeDatadog } from '../initialize'
import { getMockedCommonConfig } from '../mocks'

// Overriding const declaration so we can reassign it for testing
declare let __DATADOG_ENABLED__: boolean

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

afterAll(() => {
  jest.restoreAllMocks()
})

afterEach(() => {
  jest.clearAllMocks()
})

const mockedSharedConfig = getMockedCommonConfig({ env: 'production' })

describe('Given datadog is enabled', () => {
  beforeEach(() => {
    // eslint-disable-next-line no-underscore-dangle
    __DATADOG_ENABLED__ = true

    initializeDatadog()
  })

  test('Then it should initialize datadogLogs SDK with the expected config', () => {
    expect(browserLogsSDK.datadogLogs.init).toHaveBeenCalledWith({
      ...mockedSharedConfig,
      clientToken: 'BROWSER_LOGS_TOKEN',
      forwardErrorsToLogs: true,
    })
  })

  test('Then it should initialize datadogRum SDK with the expected config', () => {
    expect(RUMSDK.datadogRum.init).toHaveBeenCalledWith({
      ...mockedSharedConfig,
      applicationId: '3ee48ed0-491a-462a-a38e-ca65cffe159e',
      clientToken: 'RUM_SDK_TOKEN',
      trackInteractions: false,
      defaultPrivacyLevel: 'mask-user-input',
    })
  })
})

describe('Given datadog is not enabled', () => {
  beforeEach(() => {
    // eslint-disable-next-line no-underscore-dangle
    __DATADOG_ENABLED__ = false
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
