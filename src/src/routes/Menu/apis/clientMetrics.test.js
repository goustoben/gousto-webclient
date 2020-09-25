import { safeJestMock } from '_testing/mocks'
import fetch from 'utils/fetch'
import logger from 'utils/logger'
import MockDate from 'mockdate'
import { sendClientMetric } from './clientMetrics'

jest.mock('utils/fetch', () =>
  jest.fn().mockResolvedValue({ data: [1, 2, 3] })
)

jest.mock('config/endpoint', () =>
  jest.fn().mockImplementation((service, version = '') => `endpoint-${service}/${version}`)
)

jest.mock('config/routes', () => ({
  version: {
    clientMetrics: 'v1',
  },
}))

describe('clientMetrics', () => {
  const mockLoggerWarning = safeJestMock(logger, 'warning')

  beforeEach(() => {
    const timestamp = 974851200000
    MockDate.set(timestamp)
    fetch.mockClear()
    mockLoggerWarning.mockClear()
  })

  afterEach(() => {
    MockDate.reset()
  })

  describe('sendClientMetric', () => {
    test('should POST the correct data to the correct endpoint', async () => {
      const expectedReqData = {
        client: 'web',
        name: 'menu-load-complete',
        value: 1.0,
        unit: 'Count'
      }

      const headers = {
        'Content-Type': 'application/json',
      }

      await sendClientMetric('menu-load-complete', 1.0, 'Count')

      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(null, 'endpoint-clientmetrics/v1/metric', expectedReqData, 'POST', 'default', headers)
    })

    describe('when fetch errors', () => {
      beforeEach(() => {
        fetch.mockRejectedValue(new Error('mock error'))
      })

      test('should call logger.warning', async () => {
        await sendClientMetric('menu-load-complete', 1.0, 'Count')

        expect(mockLoggerWarning).toHaveBeenCalledWith({
          message: 'Failed to send client metric',
          extra: {
            name: 'menu-load-complete',
            value: 1.0,
            unit: 'Count'
          },
          error: new Error('mock error')
        })
      })
    })
  })
})
