import fetch from 'utils/fetch'

import {
  saveOrder,
  fetchOrder,
  cancelOrder,
  checkoutOrder,
  updateOrderItems,
  createPreviewOrder,
  updateOrderAddress,
  cancelExistingOrders,
} from '../orders'

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

jest.mock('config/routes', () => ({
  client: {
    checkout: '/checkout'
  },
  core: {
    orderPreview: '/orderPreview',
    cancelPending: '/cancelPending'
  }
}))

describe('orders api', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  describe('checkoutOrder', () => {
    test('should fetch the correct url', async () => {
      const reqData = { a: 1, b: 2 }
      await checkoutOrder('token', reqData)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith('token', '/checkout', reqData, 'POST')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await checkoutOrder('token', {})
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('fetchOrder', () => {
    test('should fetch the correct url', async () => {
      const orderId = '123'
      const reqData = { a: 1, b: 2 }
      await fetchOrder('token', orderId, reqData)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith('token', 'endpoint-core/order/' + orderId, reqData, 'GET')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchOrder('token', '123', {})
      expect(result).toEqual(mockFetchResult)
    })

    describe('when reqData not provided', () => {
      test('should fetch the correct url', async () => {
        const orderId = '123'
        await fetchOrder('token', orderId)
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith('token', 'endpoint-core/order/' + orderId, {}, 'GET')
      })
    })
  })

  describe('createPreviewOrder', () => {
    test('should fetch the correct url', async () => {
      const reqData = { a: 1, b: 2 }
      await createPreviewOrder(reqData)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(null, 'endpoint-core/orderPreview', reqData, 'POST')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await createPreviewOrder({ a: 1, b: 2 })
      expect(result).toEqual(mockFetchResult)
    })

    describe('when reqData not provided', () => {
      test('should fetch the correct url', async () => {
        await createPreviewOrder()
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith(null, 'endpoint-core/orderPreview', {}, 'POST')
      })
    })
  })

  describe('updateOrderItems', () => {
    test('should fetch the correct url', async () => {
      const orderId = '123'
      const reqData = { a: 1, b: 2 }
      await updateOrderItems('token', orderId, reqData)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith('token', 'endpoint-core/order/' + orderId + '/update-items', reqData, 'PUT')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await updateOrderItems('token', '123', {})
      expect(result).toEqual(mockFetchResult)
    })

    describe('when reqData not provided', () => {
      test('should fetch the correct url', async () => {
        const orderId = '123'
        await updateOrderItems('token', orderId)
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith('token', 'endpoint-core/order/' + orderId + '/update-items', {}, 'PUT')
      })
    })
  })

  describe('saveOrder', () => {
    test('should fetch the correct url', async () => {
      const orderId = '123'
      const reqData = { a: 1, b: 2 }
      await saveOrder('token', orderId, reqData)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith('token', 'endpoint-core/order/' + orderId, reqData, 'PUT')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await saveOrder('token', '123', {})
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('cancelOrder', () => {
    test('should fetch the correct url', async () => {
      const orderId = '123'
      const reqData = { a: 1, b: 2 }
      await cancelOrder('token', orderId, reqData)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith('token', 'endpoint-core/order/' + orderId, reqData, 'DELETE')
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
        expect(fetch).toHaveBeenCalledWith('token', 'endpoint-core/order/' + orderId, {}, 'DELETE')
      })
    })
  })

  describe('cancelExistingOrders', () => {
    test('should fetch the correct url', async () => {
      const reqData = { a: 1, b: 2 }
      await cancelExistingOrders('token', reqData)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith('token', 'endpoint-core/cancelPending', reqData, 'POST')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await cancelExistingOrders('token', {})
      expect(result).toEqual(mockFetchResult)
    })

    describe('when reqData not provided', () => {
      test('should fetch the correct url', async () => {
        await cancelExistingOrders('token')
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith('token', 'endpoint-core/cancelPending', {}, 'POST')
      })
    })
  })

  describe('updateOrderAddress', () => {
    test('should fetch the correct url', async () => {
      const orderId = '123'
      const addressId = '456'
      await updateOrderAddress('token', orderId, addressId)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith('token', 'endpoint-core/order/' + orderId + '/change-address/', { address_id: addressId }, 'PUT')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await updateOrderAddress('token', '123', '456')
      expect(result).toEqual(mockFetchResult)
    })
  })
})
