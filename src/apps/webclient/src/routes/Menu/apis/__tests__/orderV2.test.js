import isomorphicFetch from 'isomorphic-fetch'
import { fetch } from 'utils/fetch'
import * as cookieHelper2 from 'utils/cookieHelper2'
import { withMockEnvironmentAndDomain } from '_testing/isomorphic-environment-test-utils'
import { safeJestMock } from '_testing/mocks'
import * as optimizelyRollouts from 'containers/OptimizelyRollouts'
import * as userSelectors from 'selectors/user'
import * as authSelectors from 'selectors/auth'
import * as orderSelectors from '../../selectors/order'
import { updateOrder, createOrder, getOrderPrice, fetchOrder, fetchUserOrders } from '../orderV2'
import * as menuFetch from '../fetch'
import { mockFetchResponse } from '../fetch.mock'
import { UserOrdersMockV2, OrderMockV2, OrderErrorMockV2 } from '../mock/ordersV2.mock'

jest.mock('utils/fetch')
jest.mock('isomorphic-fetch')
const isOptimizelyFeatureEnabledFactory = safeJestMock(
  optimizelyRollouts,
  'isOptimizelyFeatureEnabledFactory',
)
const getUserId = safeJestMock(userSelectors, 'getUserId')
const getAccessToken = safeJestMock(authSelectors, 'getAccessToken')
const getOrderV2 = safeJestMock(orderSelectors, 'getOrderV2')
const getOrderForUpdateOrderV1 = safeJestMock(orderSelectors, 'getOrderForUpdateOrderV1')
const getUpdateOrderProductItemsOrderV1 = safeJestMock(
  orderSelectors,
  'getUpdateOrderProductItemsOrderV1',
)
const dispatch = jest.fn()
const getState = jest.fn()

jest
  .spyOn(cookieHelper2, 'get')
  .mockImplementation((cookies, key, withVersionPrefix, shouldDecode) => {
    if (key === 'gousto_session_id' && !withVersionPrefix && !shouldDecode) {
      return 'session-id'
    }

    return null
  })

describe('orderApi', () => {
  // mock the environment and domain config used by these tests to generate endpoints
  withMockEnvironmentAndDomain('production', 'gousto.co.uk')

  beforeEach(() => {
    jest.spyOn(menuFetch, 'post').mockResolvedValue(mockFetchResponse({}))
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
          { type: 'recipe', id: 'guid-guid-guid' },
        ],
      },
      attributes: { state: 'pending' },
    }

    const fetchResponse = {
      data: {
        data: order,
        included: [],
      },
      meta: null,
    }

    beforeEach(() => {
      fetch.mockReturnValue(fetchResponse)
    })

    test('should fetch the correct url', async () => {
      await createOrder('token', { order: 'body' }, 'user-id')

      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(
        'token',
        'https://production-api.gousto.co.uk/order/v2/orders',
        { data: { order: 'body' } },
        'POST',
        'default',
        {
          'Content-Type': 'application/json',
          'x-gousto-device-id': 'session-id',
          'x-gousto-user-id': 'user-id',
        },
      )
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await createOrder('token', { order: 'body' }, 'user-id')

      expect(result).toEqual(order)
    })
  })

  describe('updateOrder', () => {
    const userId = 'test-user-id'
    beforeEach(() => {
      getUserId.mockReturnValue(userId)
      getAccessToken.mockReturnValue('token')
    })
    describe('when using the V1 implementation', () => {
      beforeEach(() => {
        isOptimizelyFeatureEnabledFactory.mockReturnValue(() => false)
        getOrderForUpdateOrderV1.mockReturnValue({ order: 'v1 body' })
        getUpdateOrderProductItemsOrderV1.mockReturnValue({ products: 'v2 body' })
      })

      test('should fetch the correct url', async () => {
        await updateOrder(dispatch, getState, 'order-id', { order: 'v1 body' })

        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith(
          'token',
          'https://production-api.gousto.co.uk/order/order-id',
          { order: 'v1 body' },
          'PUT',
          undefined,
          { 'Content-Type': 'application/json' },
        )
      })

      test('should return the results of the fetch unchanged', async () => {
        const apiResponse = { data: [1, 2, 3] }
        fetch.mockResolvedValue(apiResponse)

        const result = await updateOrder(dispatch, getState, 'order-id', { order: 'body' })

        expect(result).toEqual(apiResponse)
      })

      test('should update market place items', async () => {
        const apiResponse = { data: [1, 2, 3] }
        fetch.mockResolvedValue(apiResponse)

        const result = await updateOrder(dispatch, getState, 'order-id', { order: 'body' }, true)

        expect(result).toEqual(apiResponse)
      })
    })

    describe('when using the V2 implementation', () => {
      beforeEach(() => {
        isOptimizelyFeatureEnabledFactory.mockReturnValue(() => true)
        getOrderV2.mockReturnValue({ order: 'v2 body' })
        isomorphicFetch.mockImplementation(() =>
          Promise.resolve({
            json: () => Promise.resolve(OrderMockV2),
          }),
        )
      })

      test('should fetch the correct url', async () => {
        await updateOrder(dispatch, getState, 'order-id')

        expect(isomorphicFetch).toHaveBeenCalledTimes(1)
        expect(isomorphicFetch).toHaveBeenCalledWith(
          'https://production-api.gousto.co.uk/order/v2/orders/order-id',
          {
            headers: {
              Authorization: 'Bearer token',
              'Content-Type': 'application/json',
              'x-gousto-device-id': 'session-id',
              'x-gousto-user-id': 'test-user-id',
            },
            body: JSON.stringify({ data: { order: 'v2 body', id: 'order-id' } }),
            method: 'PUT',
          },
        )
      })

      test('should add the additional data in the body', async () => {
        getOrderV2.mockReturnValue({
          order: 'v2 body',
          relationships: {
            delivery_slot: { data: {} },
            delivery_day: { data: {} },
            delivery_slot_lead_time: { data: {} },
          },
        })
        const additionalData = {
          delivery_day_id: 'test delivery_day_id',
          delivery_slot_id: 'test delivery_slot_id',
          day_slot_lead_time_id: 'test day_slot_lead_time_id',
        }
        await updateOrder(dispatch, getState, 'order-id', additionalData)

        expect(isomorphicFetch).toHaveBeenCalledTimes(1)
        expect(isomorphicFetch).toHaveBeenCalledWith(
          'https://production-api.gousto.co.uk/order/v2/orders/order-id',
          {
            headers: {
              Authorization: 'Bearer token',
              'Content-Type': 'application/json',
              'x-gousto-device-id': 'session-id',
              'x-gousto-user-id': 'test-user-id',
            },
            body: JSON.stringify({
              data: {
                order: 'v2 body',
                relationships: {
                  delivery_slot: { data: { id: 'test delivery_slot_id' } },
                  delivery_day: { data: { id: 'test delivery_day_id' } },
                  delivery_slot_lead_time: { data: { id: 'test day_slot_lead_time_id' } },
                },
                id: 'order-id',
              },
            }),
            method: 'PUT',
          },
        )
      })

      test('should handle error returned from core', async () => {
        isomorphicFetch.mockImplementation(() =>
          Promise.resolve({
            json: () => Promise.resolve(OrderErrorMockV2),
          }),
        )
        try {
          await updateOrder(dispatch, getState, 'order-id')
        } catch (e) {
          expect(e).toEqual(new Error('error'))
        }
      })

      test('should handle system error', async () => {
        isomorphicFetch.mockImplementation(() =>
          Promise.resolve({
            json: () => Promise.resolve({ errors: { message: 'error' } }),
          }),
        )
        try {
          await updateOrder(dispatch, getState, 'order-id')
        } catch (e) {
          expect(e).toEqual(new Error('error'))
        }
      })
    })
  })

  describe('getOrderPrice', () => {
    test('should fetch the correct url', async () => {
      const userId = 'my-cool-user'
      const data = { some: 'thing' }
      const apiResponse = { data: [1, 2, 3] }

      menuFetch.post.mockResolvedValue(apiResponse)

      const response = await getOrderPrice('token', data, userId)

      expect(menuFetch.post).toHaveBeenCalledTimes(1)
      expect(menuFetch.post).toHaveBeenCalledWith(
        'token',
        'https://production-api.gousto.co.uk/order/v2/prices',
        { data },
        {
          'Content-Type': 'application/json',
          'x-gousto-device-id': 'session-id',
          'x-gousto-user-id': 'my-cool-user',
        },
      )
      expect(response).toEqual(apiResponse)
    })
  })

  describe('fetchOrder', () => {
    const userId = 'test-user-id'
    beforeEach(() => {
      getUserId.mockReturnValue(userId)
      getAccessToken.mockReturnValue('token')
    })

    describe('when using the V1 implementation', () => {
      beforeEach(() => {
        isOptimizelyFeatureEnabledFactory.mockReturnValue(() => false)
      })

      test('should fetch the correct url', async () => {
        const expectedHeaders = {
          'Content-Type': 'application/json',
        }

        const expectedReqData = {
          include: 'data',
        }
        const orderId = 123
        const include = 'data'

        await fetchOrder(dispatch, getState, orderId, include)
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith(
          'token',
          'https://production-api.gousto.co.uk/order/123',
          expectedReqData,
          'GET',
          undefined,
          expectedHeaders,
        )
      })

      test('should return the results of the fetch unchanged', async () => {
        const apiResponse = { data: [1, 2, 3] }
        fetch.mockResolvedValue(apiResponse)

        const result = await fetchOrder(dispatch, getState, '123')

        expect(result).toEqual(apiResponse)
      })

      describe('when reqData not provided', () => {
        test('should fetch the correct url', async () => {
          const expectedHeaders = {
            'Content-Type': 'application/json',
          }
          const orderId = '123'
          await fetchOrder(dispatch, getState, orderId)
          expect(fetch).toHaveBeenCalledTimes(1)
          expect(fetch).toHaveBeenCalledWith(
            'token',
            'https://production-api.gousto.co.uk/order/123',
            {},
            'GET',
            undefined,
            expectedHeaders,
          )
        })
      })
    })

    describe('when using the V2 implementation', () => {
      beforeEach(() => {
        isOptimizelyFeatureEnabledFactory.mockReturnValue(() => true)
        isomorphicFetch.mockImplementation(() =>
          Promise.resolve({
            json: () => Promise.resolve(OrderMockV2),
          }),
        )
      })

      test('should fetch the correct url', async () => {
        const orderId = 123

        await fetchOrder(dispatch, getState, orderId)
        expect(isomorphicFetch).toHaveBeenCalledTimes(1)
        expect(isomorphicFetch).toHaveBeenCalledWith(
          'https://production-api.gousto.co.uk/order/v2/orders/123?include[]=shipping_address',
          {
            headers: {
              Authorization: 'Bearer token',
              'Content-Type': 'application/json',
              'x-gousto-device-id': 'session-id',
              'x-gousto-user-id': 'test-user-id',
            },
            method: 'GET',
          },
        )
      })
    })
  })

  describe('fetchUserOrders', () => {
    beforeEach(() => {
      getUserId.mockReturnValue('test-user-id')
      getAccessToken.mockReturnValue('token')
    })

    describe('when using the V2 implementation', () => {
      beforeEach(() => {
        isOptimizelyFeatureEnabledFactory.mockReturnValue(() => true)
        isomorphicFetch.mockImplementation(() =>
          Promise.resolve({
            json: () => Promise.resolve(UserOrdersMockV2),
          }),
        )
      })

      test('should fetch the correct url', async () => {
        const expectedReqData = {
          'filter[phase]': 'delivery',
          include: ['data'],
          'page[limit]': 15,
          sort: 'deliveryDate',
        }

        await fetchUserOrders(dispatch, getState, expectedReqData)
        expect(isomorphicFetch).toHaveBeenCalledTimes(1)
        expect(isomorphicFetch).toHaveBeenCalledWith(
          'https://production-api.gousto.co.uk/order/v2/users/test-user-id/orders?filter%5Bphase%5D=delivery&include=data&page%5Blimit%5D=15&sort=deliveryDate',
          {
            headers: {
              Authorization: 'Bearer token',
              'Content-Type': 'application/json',
              'x-gousto-device-id': 'session-id',
              'x-gousto-user-id': 'test-user-id',
            },
            method: 'GET',
          },
        )
      })

      describe('when reqData is not provided', () => {
        test('should fetch the correct url', async () => {
          await fetchUserOrders(dispatch, getState)

          expect(isomorphicFetch).toHaveBeenCalledTimes(1)
          expect(isomorphicFetch).toHaveBeenCalledWith(
            'https://production-api.gousto.co.uk/order/v2/users/test-user-id/orders',
            {
              headers: {
                Authorization: 'Bearer token',
                'Content-Type': 'application/json',
                'x-gousto-device-id': 'session-id',
                'x-gousto-user-id': 'test-user-id',
              },
              method: 'GET',
            },
          )
        })
      })
    })
    describe('when using the V1 implementation', () => {
      beforeEach(() => {
        isOptimizelyFeatureEnabledFactory.mockReturnValue(() => false)
      })
      test('should fetch the correct url', async () => {
        const expectedReqData = {
          'filter[phase]': 'delivery',
          include: ['data'],
          'page[limit]': 15,
          sort: 'deliveryDate',
        }

        await fetchUserOrders(dispatch, getState, expectedReqData)
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith(
          'token',
          'https://production-api.gousto.co.uk/user/current/orders',
          {
            'filter[phase]': 'delivery',
            include: ['data'],
            'page[limit]': 15,
            sort: 'deliveryDate',
          },
          'GET',
        )
      })

      describe('when reqData is not provided', () => {
        test('should fetch the correct url', async () => {
          await fetchUserOrders(dispatch, getState)

          expect(fetch).toHaveBeenCalledTimes(1)
          expect(fetch).toHaveBeenCalledWith(
            'token',
            'https://production-api.gousto.co.uk/user/current/orders',
            undefined,
            'GET',
          )
        })
      })
    })
  })
})
