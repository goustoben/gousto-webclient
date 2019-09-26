import fetch from 'utils/fetch'
import { fetchOrderSkipContent, fetchSubscriptionPauseContent } from '../onScreenRecovery'

const mockFetchResult = { data: [1, 2, 3] }
jest.mock('utils/fetch', () =>
  jest.fn().mockImplementation(() => {
    const getData = async () => ({ data: [1, 2, 3] })

    return getData()
  })
)

jest.mock('config/endpoint', () =>
  jest.fn().mockImplementation((service, version = '') => `endpoint-${service}${version}`)
)

describe('onScreenRecovery api', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  describe('fetchOrderSkipContent', () => {
    describe('order id is provided', () => {
      test('should fetch the correct url', async () => {
        const token = 'token'
        const orderId = '123'
        const orderDate = '2019-09-10T00:00:00'
        await fetchOrderSkipContent(token, orderId, orderDate)
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith(
          'token',
          'endpoint-orderskiprecoveryv1/orderskiprecovery',
          { order_id: orderId, order_date: orderDate },
          'GET'
        )
      })
    })

    describe('order id is null', () => {
      test('should fetch the correct url', async () => {
        const token = 'token'
        const orderDate = '2019-09-10T00:00:00'
        await fetchOrderSkipContent(token, null, orderDate)
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith(
          'token',
          'endpoint-orderskiprecoveryv1/orderskiprecovery',
          { order_date: orderDate },
          'GET'
        )
      })
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchOrderSkipContent('token', '123', '2019-09-10T00:00:00')
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('fetchSubscriptionPauseContent', () => {
    test('should fetch the correct url', async () => {
      const token = 'token'
      await fetchSubscriptionPauseContent(token)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith('token', 'endpoint-subpauseosrv1/subscriptionpauserecovery/1', null, 'GET')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchSubscriptionPauseContent('token')
      expect(result).toEqual(mockFetchResult)
    })
  })
})
