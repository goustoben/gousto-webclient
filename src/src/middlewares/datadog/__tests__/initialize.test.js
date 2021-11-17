import { initializeDatadog } from '../initialize'
import { getMockedSharedConfig, getMockedDatadogImport } from '../mocks'

let windowSpy

const mockedInit = jest.fn()

beforeAll(() => {
  windowSpy = jest.spyOn(window, 'window', 'get')
  windowSpy.mockImplementation(() => getMockedDatadogImport({ mockedInit }))
})

afterAll(() => {
  windowSpy.mockRestore()
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('Given datadog is enabled', () => {
  beforeEach(() => {
    // eslint-disable-next-line no-underscore-dangle
    global.__DATADOG_ENABLED__ = true
  })

  test('Then it should initialize Datadog with the correct params', () => {
    initializeDatadog()

    const mockedSharedConfig = getMockedSharedConfig({ env: 'production' })

    expect(mockedInit).toHaveBeenCalledWith({
      ...mockedSharedConfig,
      forwardErrorsToLogs: true,
    })
  })
})

describe('Given datadog is not enabled', () => {
  beforeEach(() => {
    // eslint-disable-next-line no-underscore-dangle
    global.__DATADOG_ENABLED__ = false
  })

  test('Then it should NOT initialize Datadog', () => {
    initializeDatadog()

    expect(mockedInit).not.toHaveBeenCalled()
  })
})
