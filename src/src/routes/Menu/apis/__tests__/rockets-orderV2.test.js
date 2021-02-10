import { fetch } from 'utils/fetch'
import { deleteOrder } from '../rockets-orderV2'

const mockFetchResult = { data: [1, 2, 3] }

jest.mock('utils/fetch', () => ({
  fetch: jest.fn().mockImplementation(() => {
    const getData = async () => ({ data: [1, 2, 3] })

    return getData()
  })
}))

jest.mock('config/endpoint', () =>
  jest.fn().mockImplementation((service, version = '') => `endpoint-${service}/${version}`)
)

describe('rockets order api', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  describe('deleteOrder', () => {
    test('should fetch the correct url', async () => {
      const expectedHeaders = {
        'Content-Type': 'application/json',
        'x-gousto-device-id': undefined,
        'x-gousto-user-id': undefined
      }
      const orderId = '123'
      await deleteOrder('token', orderId)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith('token', `endpoint-order/v2/orders/${orderId}`, {}, 'DELETE', undefined, expectedHeaders)
    })

    test('should return the results of the fetch unchanged', async () => {
      const orderId = '123'
      const result = await deleteOrder('token', orderId)
      expect(result).toEqual(mockFetchResult)
    })
  })
})
