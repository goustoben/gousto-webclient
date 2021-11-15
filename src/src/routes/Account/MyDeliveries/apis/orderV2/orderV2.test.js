import { fetch } from 'utils/fetch'
import * as cookieHelper2 from 'utils/cookieHelper2'
import { deleteOrder } from "routes/Account/MyDeliveries/apis/orderV2/deleteOrder"

const mockFetchResult = { data: [1, 2, 3] }

jest.mock('utils/fetch', () => ({
  fetch: jest.fn().mockImplementation(() => {
    const getData = async () => ({ data: [1, 2, 3] })

    return getData()
  })
}))

jest.spyOn(cookieHelper2, 'get').mockImplementation((cookies, key, withVersionPrefix, shouldDecode) => {
  if (key === 'gousto_session_id' && !withVersionPrefix && !shouldDecode) {
    return 'session-id'
  }

  return null
})

describe('rockets order api', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  describe('deleteOrder', () => {
    const userId = 'user-id'

    test('should fetch the correct url', async () => {
      const expectedHeaders = {
        'Content-Type': 'application/json',
        'x-gousto-device-id': 'session-id',
        'x-gousto-user-id': userId
      }
      const orderId = '123'
      await deleteOrder('token', orderId, userId)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith('token', `https://production-api.gousto.co.uk/order/v2/orders/${orderId}`, {}, 'DELETE', undefined, expectedHeaders)
    })

    test('should return the results of the fetch unchanged', async () => {
      const orderId = '123'
      const result = await deleteOrder('token', orderId, userId)
      expect(result).toEqual(mockFetchResult)
    })
  })
})
