import fetch from 'utils/fetch'
import MockDate from 'mockdate'
import { sendClientMetric } from './clientMetrics'

jest.mock('utils/fetch', () =>
  jest.fn().mockImplementation(() => {
    const getData = async () => ({ data: [1, 2, 3] })

    return getData()
  })
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
  beforeEach(() => {
    const timestamp = 974851200000
    MockDate.set(timestamp)
    fetch.mockClear()
  })
  afterEach(() => {
    MockDate.reset()
  })

  describe('sendClientMetric', () => {
    test('should fetch the correct url', async () => {
      const expectedReqData = {
        client: 'webclient',
        time: (new Date()).toISOString(),
        name: 'menu-load-complete',
        detail: {
          timeToUsable: 123,
          _userId: null
        },
      }

      const headers = {
        'Content-Type': 'application/json',
      }

      await sendClientMetric('menu-load-complete', { timeToUsable: 123 })
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(null, 'endpoint-clientmetrics/v1/event', expectedReqData, 'POST', 'default', headers)
    })

    describe('when userId is not provided', () => {
      const userId = ''

      test('should add null userId to detail', async () => {
        const expectedReqData = expect.objectContaining({
          detail: expect.objectContaining({
            _userId: null
          })
        })

        await sendClientMetric('menu-load-complete', { timeToUsable: 123 }, userId)
        expect(fetch).toHaveBeenCalledWith(null, expect.any(String), expectedReqData, expect.any(String), expect.any(String), expect.any(Object))
      })
    })

    describe('when userId is provided', () => {
      const userId = 'aaaa-bbbb'

      test('should add to detail', async () => {
        const expectedReqData = expect.objectContaining({
          detail: expect.objectContaining({
            _userId: userId
          })
        })

        await sendClientMetric('menu-load-complete', { timeToUsable: 123 }, userId)
        expect(fetch).toHaveBeenCalledWith(null, expect.any(String), expectedReqData, expect.any(String), expect.any(String), expect.any(Object))
      })
    })
  })
})
