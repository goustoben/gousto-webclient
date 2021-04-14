import * as fetch from 'utils/fetch'
import * as endpoint from 'config/endpoint'
import * as cookieHelper2 from 'utils/cookieHelper2'
import { updateOrder, createOrder, getOrder, getUserOrders } from '../orderV2'

describe('orderApi', () => {
  let fetchSpy

  beforeEach(() => {
    fetchSpy = jest.spyOn(fetch, 'default').mockImplementation(jest.fn)
    jest.spyOn(endpoint, 'default').mockImplementation((service, version) => `endpoint-${service}/${version}`)

    jest.spyOn(cookieHelper2, 'get').mockImplementation((cookies, key, withVersionPrefix, shouldDecode) => {
      if (key === 'gousto_session_id' && !withVersionPrefix && !shouldDecode) {
        return 'session-id'
      }

      return null
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('createOrder', () => {
    const order = {
      type: 'order',
      id: 'order-id-1',
      relationships: {
        components: [
          { type: 'recipe', id: 'some-cool-recipe-guid-1' },
          { type: 'recipe', id: 'another-cool-recipe-guid' },
          { type: 'recipe', id: 'guid-guid-guid' }
        ]
      },
      attributes: { state: 'pending' }
    }

    const fetchResponse = {
      data: {
        data: order,
        included: []
      },
      meta: null
    }

    beforeEach(() => {
      fetchSpy.mockReturnValue(fetchResponse)
    })

    test('should fetch the correct url', async () => {
      await createOrder('token', { order: 'body' }, 'user-id')

      expect(fetchSpy).toHaveBeenCalledTimes(1)
      expect(fetchSpy).toHaveBeenCalledWith(
        'token',
        'endpoint-order/v2/orders',
        { data: { order: 'body' } },
        'POST',
        'default',
        {
          'Content-Type': 'application/json',
          'x-gousto-device-id': 'session-id',
          'x-gousto-user-id': 'user-id'
        }
      )
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await createOrder('token', { order: 'body' })

      expect(result).toEqual(order)
    })
  })

  describe('updateOrder', () => {
    test('should fetch the correct url', async () => {
      await updateOrder('token', 'order-id', { order: 'body' }, 'user-id')

      expect(fetchSpy).toHaveBeenCalledTimes(1)
      expect(fetchSpy).toHaveBeenCalledWith(
        'token',
        'endpoint-order/v2/orders/order-id',
        { data: { order: 'body' } },
        'PUT',
        'default',
        {
          'Content-Type': 'application/json',
          'x-gousto-device-id': 'session-id',
          'x-gousto-user-id': 'user-id'
        },
        null,
        false,
        false,
        false
      )
    })

    test('should return the results of the fetch unchanged', async () => {
      const apiResponse = { data: [1, 2, 3] }
      fetchSpy.mockResolvedValue(apiResponse)

      const result = await updateOrder('token', 'order-id', { order: 'body' })

      expect(result).toEqual(apiResponse)
    })
  })

  describe('getOrder', () => {
    test('should fetch the correct url', async () => {
      const expectedHeaders = {
        'Content-Type': 'application/json',
        'x-gousto-device-id': 'session-id',
        'x-gousto-user-id': undefined
      }

      const expectedReqData = {
        include: ['data']
      }
      const orderId = 123
      const include = ['data']

      await getOrder('token', orderId, include)
      expect(fetchSpy).toHaveBeenCalledTimes(1)
      expect(fetchSpy).toHaveBeenCalledWith(
        'token',
        `endpoint-order/v2/orders/${orderId}`,
        expectedReqData,
        'GET',
        'default',
        expectedHeaders
      )
    })

    test('should return the results of the fetch unchanged', async () => {
      const apiResponse = { data: [1, 2, 3] }
      fetchSpy.mockResolvedValue(apiResponse)

      const result = await getOrder('token', '123', {})

      expect(result).toEqual(apiResponse)
    })

    describe('when reqData not provided', () => {
      test('should fetch the correct url', async () => {
        const expectedHeaders = {
          'Content-Type': 'application/json',
          'x-gousto-device-id': 'session-id',
          'x-gousto-user-id': undefined
        }
        const orderId = '123'
        await getOrder('token', orderId)
        expect(fetchSpy).toHaveBeenCalledTimes(1)
        expect(fetchSpy).toHaveBeenCalledWith(
          'token',
          `endpoint-order/v2/orders/${orderId}`,
          {},
          'GET',
          'default',
          expectedHeaders)
      })
    })
  })

  describe('getUserOrders', () => {
    test('should fetch the correct url', async () => {
      const expectedReqData = {
        'filter[phase]': 'delivery',
        include: ['data'],
        'page[limit]': 15,
        sort: 'deliveryDate'
      }

      const userId = '1234'
      const expectedHeaders = {
        'Content-Type': 'application/json',
        'x-gousto-device-id': 'session-id',
        'x-gousto-user-id': userId
      }

      await getUserOrders('token', userId, 'delivery', ['data'])
      expect(fetchSpy).toHaveBeenCalledTimes(1)
      expect(fetchSpy).toHaveBeenCalledWith(
        'token',
        `endpoint-order/v2/users/${userId}/orders`,
        expectedReqData,
        'GET',
        'default',
        expectedHeaders
      )
    })

    test('should return the results of the fetch unchanged', async () => {
      const apiResponse = { data: [1, 2, 3] }
      fetchSpy.mockResolvedValue(apiResponse)

      const result = await getUserOrders('token', 'user-id', {})

      expect(result).toEqual(apiResponse)
    })

    describe('when reqData is not proviced', () => {
      test('should fetch the correct url', async () => {
        const expectedReqData = {
          'filter[phase]': undefined,
          include: undefined,
          'page[limit]': 15,
          sort: 'deliveryDate'
        }

        const userId = '1234'
        const expectedHeaders = {
          'Content-Type': 'application/json',
          'x-gousto-device-id': 'session-id',
          'x-gousto-user-id': userId
        }

        await getUserOrders('token', userId)

        expect(fetchSpy).toHaveBeenCalledTimes(1)
        expect(fetchSpy).toHaveBeenCalledWith(
          'token',
          `endpoint-order/v2/users/${userId}/orders`,
          expectedReqData,
          'GET',
          'default',
          expectedHeaders
        )
      })
    })
  })
})
