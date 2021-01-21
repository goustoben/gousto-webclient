import fetch from 'utils/fetch'
import { createOrder, deleteOrder, getOrder, getUserOrders } from '../orderV2'

const mockFetchResult = { data: [1, 2, 3] }
const reqData = { a: 1, b: 2}

jest.mock('utils/fetch', () =>
  jest.fn().mockImplementation(() => {
    const getData = async () => ({ data: [1, 2, 3] })

    return getData()
  })
)

jest.mock('config/endpoint', () =>
  jest.fn().mockImplementation((service, version = '') => `endpoint-${service}/${version}`)
)

describe('orderApi', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  describe('getOrder', () => {
    test('should fetch the correct url', async () => {
      const expectedHeaders = {
        'Content-Type': 'application/json',
        'x-gousto-device-id': undefined,
        'x-gousto-user-id': undefined
      }

      const expectedReqData = {
        include: ['data']
      }
      const orderId = 123
      const include = ['data']

      await getOrder('token', orderId, include)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith('token', `endpoint-order/v2/orders/${orderId}`, expectedReqData, 'GET', expectedHeaders)
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await getOrder('token', '123', reqData)
      expect(result).toEqual(mockFetchResult)
    })

    describe('when reqData not provided', () => {
      test('should fetch the correct url', async () => {
        const expectedHeaders = {
          'Content-Type': 'application/json',
          'x-gousto-device-id': undefined,
          'x-gousto-user-id': undefined
        }
        const orderId = '123'
        await getOrder('token', orderId)
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith('token', `endpoint-order/v2/orders/${orderId}`, {}, 'GET', expectedHeaders)
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

      const expectedHeaders = {
        'Content-Type': 'application/json',
        'x-gousto-device-id': '5678',
        'x-gousto-user-id': '1234'
      }
      const userId = '1234'
      const deviceId = '5678'

      await getUserOrders('token', userId, deviceId, 'delivery', ['data'])
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith('token', `endpoint-order/v2/users/${userId}/orders`, expectedReqData, 'GET', expectedHeaders)
    })

    test('should return the results of the fetch unchanged', async () => {
      const userId = '1234'
      const result = await getUserOrders('token', userId, reqData)
      expect(result).toEqual(mockFetchResult)
    })

    describe('when reqData is not proviced', () => {
      test('should fetch the correct url', async () => {
        const expectedReqData = {
          'filter[phase]': undefined,
          include: undefined,
          'page[limit]': 15,
          sort: 'deliveryDate'
        }

        const expectedHeaders = {
          'Content-Type': 'application/json',
          'x-gousto-device-id': '5678',
          'x-gousto-user-id': '1234'
        }
        const userId = '1234'
        const sessionId = '5678'

        await getUserOrders('token', userId, sessionId)
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith('token', `endpoint-order/v2/users/${userId}/orders`, expectedReqData, 'GET', expectedHeaders)
      })
    })
  })

  describe('createOrder', () => {
    test('should fetch the correct url', async () => {
      const expectedHeaders = {
        'Content-Type': 'application/json',
        'x-gousto-device-id': '5678',
        'x-gousto-user-id': '1234'
      }

      const expectedOrder = {
        data: {
          attributes: {
            delivery_day_id: '2302'
          },
          relationships: {
            shipping_address: {
              data: {
                type: 'shipping-address',
                id: '1233'
              }
            },
            delivery_slot: {
              data: {
                type: 'delivery-slot',
                id: '11'
              }
            },
            delivery_slot_lead_time: {
              data: {
                type: 'delivery-slot-lead-time',
                id: '10'
              }
            },
            components: {
              data: [
                {
                  id: '212',
                  type: 'recipe'},
                {
                  id: '145',
                  type: 'recipe'}]
            },
          }
        }
      }

      const orderDetails = {
        accessToken: 'token',
        sessionId: '5678',
        userId: '1234',
        deliveryDayId: '2302',
        deliverySlotId: '11',
        components: [{id: '212', type: 'recipe'}, {id: '145', type: 'recipe'}],
        shippingAddressId: '1233',
        deliverySlotLeadTimeId: '10',
      }

      await createOrder(orderDetails)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith('token', 'endpoint-order/v2/orders', expectedOrder, 'POST', expectedHeaders)
    })

    test('should return the results of the fetch unchanged', async () => {
      const orderDetails = {
        accessToken: 'token',
        sessionId: '5678',
        userId: '1234',
        deliveryDayId: '2302',
        deliverySlotId: '11',
        components: [{id: '212', type: 'recipe'}, {id: '145', type: 'recipe'}],
        shippingAddressId: '1233',
        deliverySlotLeadTimeId: '10',
      }

      const result = await createOrder(orderDetails)
      expect(result).toEqual(mockFetchResult)
    })

    describe('when optional parameters shippingAddress and deliverySlotLeadtime are not defined', () => {
      test('should fetch the correct url with an order object that does not have shippingAddress or deliverySlotLeadTime', async () => {
        const expectedHeaders = {
          'Content-Type': 'application/json',
          'x-gousto-device-id': '5678',
          'x-gousto-user-id': '1234'
        }

        const expectedOrder = {
          data: {
            attributes: {
              delivery_day_id: '2302'
            },
            relationships: {
              delivery_slot: {
                data: {
                  type: 'delivery-slot',
                  id: '11'
                }
              },
              components: {
                data: [
                  {
                    id: '212',
                    type: 'recipe'},
                  {
                    id: '145',
                    type: 'recipe'}]
              }
            }
          }
        }

        const orderDetails = {
          accessToken: 'token',
          sessionId: '5678',
          userId: '1234',
          deliveryDayId: '2302',
          deliverySlotId: '11',
          components: [{id: '212', type: 'recipe'}, {id: '145', type: 'recipe'}],
        }

        await createOrder(orderDetails)
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith('token', 'endpoint-order/v2/orders', expectedOrder, 'POST', expectedHeaders)
      })
    })

    describe('when order data is not provided', () => {
      test('should fetch the correct url', async () => {
        const expectedHeaders = {
          'Content-Type': 'application/json',
          'x-gousto-device-id': undefined,
          'x-gousto-user-id': undefined
        }

        const expectedOrder = {
          data: {
            attributes: {
              delivery_day_id: undefined,
            },
            relationships: {
              delivery_slot: {
                data: {
                  type: 'delivery-slot',
                  id: undefined
                }
              },
              components: {
                data: undefined
              }
            }
          }
        }

        const orderDetails = {
          accessToken: 'token'
        }
        await createOrder(orderDetails)
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith('token', 'endpoint-order/v2/orders', expectedOrder, 'POST', expectedHeaders)
      })
    })
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
      expect(fetch).toHaveBeenCalledWith('token', `endpoint-order/v2/orders/${orderId}`, 'DELETE', expectedHeaders)
    })

    test('should return the results of the fetch unchanged', async () => {
      const orderId = '123'
      const result = await deleteOrder('token', orderId)
      expect(result).toEqual(mockFetchResult)
    })
  })
})
