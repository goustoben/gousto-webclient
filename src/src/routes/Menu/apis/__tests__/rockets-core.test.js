import { fetch } from 'utils/fetch'
import { cancelOrder } from '../rockets-core'

const mockFetchResult = { data: [1, 2, 3] }
jest.mock('utils/fetch', () => ({
  fetch: jest.fn().mockImplementation(() => {
    const getData = async () => ({ data: [1, 2, 3] })

    return getData()
  })
}))

jest.mock('config/endpoint', () =>
  jest.fn().mockImplementation((service, version = '') => `endpoint-${service}${version}`)
)

jest.mock('config/routes', () => ({
  core: {
    userOrder: '/userOrder',
  }
}))

describe('rockets core api', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  describe('cancelOrder', () => {
    const expectedHeaders = { 'Content-Type': 'application/json'}

    test('should fetch the correct url', async () => {
      const orderId = '123'
      const reqData = { a: 1, b: 2 }
      await cancelOrder('token', orderId, reqData)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith('token', `endpoint-core/order/${orderId}`, reqData, 'DELETE', undefined, expectedHeaders)
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await cancelOrder('token', '123', {})
      expect(result).toEqual(mockFetchResult)
    })

    describe('when reqData not provided', () => {
      test('should fetch the correct url', async () => {
        const orderId = '123'
        await cancelOrder('token', orderId)
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith('token', `endpoint-core/order/${orderId}`, {}, 'DELETE', undefined, expectedHeaders)
      })
    })
  })
})
