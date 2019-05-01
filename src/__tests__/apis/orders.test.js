import { updateOrderItems } from 'apis/orders'
import fetch from 'utils/fetch'

jest.mock('utils/fetch')

describe('orders api', () => {
  beforeEach(() => {
    fetch.mockResolvedValue('fetch response')
  })

  describe('updateOrderItems', () => {
    it('should call the correct url with specific data', async function() {
      const reqData = 'req-data-object'

      await updateOrderItems('access-token', '123', reqData, 'PUT')

      expect(fetch.mock.calls[0][0]).toBe('access-token')
      expect(fetch.mock.calls[0][1]).toContain('/order/123/update-items')
      expect(fetch.mock.calls[0][2]).toBe(reqData)
      expect(fetch.mock.calls[0][3]).toBe('PUT')
    })

    it('should return the results unchanged', async function() {
      const returnVal = await updateOrderItems()

      expect(returnVal).toBe('fetch response')
    })
  })
})
