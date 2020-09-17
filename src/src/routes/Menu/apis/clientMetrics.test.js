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
      const reqData = {
        name: 'menu-load-complete',
        detail: {
          timeToUsable: 123
        }
      }
      const expectedReqData = {
        client: 'webclient',
        time: (new Date()).toISOString(),
        name: 'menu-load-complete',
        detail: {
          timeToUsable: 123
        },
      }

      const headers = {
        'Content-Type': 'application/json',
      }

      await sendClientMetric(reqData)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(null, 'endpoint-clientmetrics/v1/event', expectedReqData, 'POST', 'default', headers)
    })
  })
})
