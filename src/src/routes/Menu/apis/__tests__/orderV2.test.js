import * as fetch from 'utils/fetch'
import * as cookieHelper2 from 'utils/cookieHelper2'
import { updateOrder, createOrder, getOrder, getUserOrders } from '../orderV2'

jest.spyOn(cookieHelper2, 'get').mockImplementation((cookies, key, withVersionPrefix, shouldDecode) => {
  if (key === 'gousto_session_id' && !withVersionPrefix && !shouldDecode) {
    return 'session-id'
  }

  return null
})

describe('orderApi', () => {
  let fetchSpy

  beforeEach(() => {
    fetchSpy = jest.spyOn(fetch, 'default').mockImplementation(jest.fn)
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
        'https://production-api.gousto.co.uk/order/v2/orders',
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
      const result = await createOrder('token', { order: 'body' }, 'user-id')

      expect(result).toEqual(order)
    })
  })

  describe('updateOrder', () => {
    test('should fetch the correct url', async () => {
      await updateOrder('token', 'order-id', { order: 'body' }, 'user-id')

      expect(fetchSpy).toHaveBeenCalledTimes(1)
      expect(fetchSpy).toHaveBeenCalledWith(
        'token',
        'https://production-api.gousto.co.uk/order/v2/orders/order-id',
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

      const result = await updateOrder('token', 'order-id', { order: 'body' }, 'user-id')

      expect(result).toEqual(apiResponse)
    })
  })

  describe('getOrder', () => {
    const userId = 'my-cool-user'

    test('should fetch the correct url', async () => {
      const expectedHeaders = {
        'Content-Type': 'application/json',
        'x-gousto-device-id': 'session-id',
        'x-gousto-user-id': userId
      }

      const expectedReqData = {
        include: ['data']
      }
      const orderId = 123
      const include = ['data']

      await getOrder('token', orderId, userId, include)
      expect(fetchSpy).toHaveBeenCalledTimes(1)
      expect(fetchSpy).toHaveBeenCalledWith(
        'token',
        `https://production-api.gousto.co.uk/order/v2/orders/${orderId}`,
        expectedReqData,
        'GET',
        'default',
        expectedHeaders
      )
    })

    test('should return the results of the fetch unchanged', async () => {
      const apiResponse = { data: [1, 2, 3] }
      fetchSpy.mockResolvedValue(apiResponse)

      const result = await getOrder('token', '123', userId, {})

      expect(result).toEqual(apiResponse)
    })

    describe('when reqData not provided', () => {
      test('should fetch the correct url', async () => {
        const expectedHeaders = {
          'Content-Type': 'application/json',
          'x-gousto-device-id': 'session-id',
          'x-gousto-user-id': userId
        }
        const orderId = '123'
        await getOrder('token', orderId, userId)
        expect(fetchSpy).toHaveBeenCalledTimes(1)
        expect(fetchSpy).toHaveBeenCalledWith(
          'token',
          `https://production-api.gousto.co.uk/order/v2/orders/${orderId}`,
          {},
          'GET',
          'default',
          expectedHeaders)
      })
    })
  })

  describe('getUserOrders', () => {
    describe('when given phase', () => {
      const phase = 'delivery'

      describe('when given include', () => {
        const include = ['data']

        test('should fetch the correct url', async () => {
          const expectedReqData = {
            'filter[phase]': phase,
            include,
            'page[limit]': 15,
            sort: 'deliveryDate'
          }

          const userId = '1234'
          const expectedHeaders = {
            'Content-Type': 'application/json',
            'x-gousto-device-id': 'session-id',
            'x-gousto-user-id': userId
          }

          await getUserOrders('token', userId, phase, include)
          expect(fetchSpy).toHaveBeenCalledTimes(1)
          expect(fetchSpy).toHaveBeenCalledWith(
            'token',
            `https://production-api.gousto.co.uk/order/v2/users/${userId}/orders`,
            expectedReqData,
            'GET',
            'default',
            expectedHeaders
          )
        })
      })

      describe('when not given include', () => {
        const include = null

        test('should fetch the correct url', async () => {
          const expectedReqData = {
            'filter[phase]': phase,
            'page[limit]': 15,
            sort: 'deliveryDate'
          }

          const userId = '1234'
          const expectedHeaders = {
            'Content-Type': 'application/json',
            'x-gousto-device-id': 'session-id',
            'x-gousto-user-id': userId
          }

          await getUserOrders('token', userId, phase, include)
          expect(fetchSpy).toHaveBeenCalledTimes(1)
          expect(fetchSpy).toHaveBeenCalledWith(
            'token',
            `https://production-api.gousto.co.uk/order/v2/users/${userId}/orders`,
            expectedReqData,
            'GET',
            'default',
            expectedHeaders
          )
        })
      })
    })

    describe('when not given phase', () => {
      const phase = null

      describe('when given include', () => {
        const include = ['data']

        test('should fetch the correct url', async () => {
          const expectedReqData = {
            include,
            'page[limit]': 15,
            sort: 'deliveryDate'
          }

          const userId = '1234'
          const expectedHeaders = {
            'Content-Type': 'application/json',
            'x-gousto-device-id': 'session-id',
            'x-gousto-user-id': userId
          }

          await getUserOrders('token', userId, phase, include)
          expect(fetchSpy).toHaveBeenCalledTimes(1)
          expect(fetchSpy).toHaveBeenCalledWith(
            'token',
            `https://production-api.gousto.co.uk/order/v2/users/${userId}/orders`,
            expectedReqData,
            'GET',
            'default',
            expectedHeaders
          )
        })
      })

      describe('when not given include', () => {
        const include = null

        test('should fetch the correct url', async () => {
          const expectedReqData = {
            'page[limit]': 15,
            sort: 'deliveryDate'
          }

          const userId = '1234'
          const expectedHeaders = {
            'Content-Type': 'application/json',
            'x-gousto-device-id': 'session-id',
            'x-gousto-user-id': userId
          }

          await getUserOrders('token', userId, phase, include)
          expect(fetchSpy).toHaveBeenCalledTimes(1)
          expect(fetchSpy).toHaveBeenCalledWith(
            'token',
            `https://production-api.gousto.co.uk/order/v2/users/${userId}/orders`,
            expectedReqData,
            'GET',
            'default',
            expectedHeaders
          )
        })
      })
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
          `https://production-api.gousto.co.uk/order/v2/users/${userId}/orders`,
          expectedReqData,
          'GET',
          'default',
          expectedHeaders
        )
      })
    })
  })
})
