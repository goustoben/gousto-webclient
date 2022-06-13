import { withMockEnvironmentAndDomain } from '_testing/isomorphic-environment-test-utils'
import { safeJestMock } from '_testing/mocks'
import isomorphicFetch from 'isomorphic-fetch'

import * as optimizelyRollouts from 'containers/OptimizelyRollouts'
import * as authSelectors from 'selectors/auth'
import * as userSelectors from 'selectors/user'
import * as cookieHelper2 from 'utils/cookieHelper2'
import { fetch } from 'utils/fetch'

import * as orderSelectors from '../../selectors/order'
import * as menuFetch from '../fetch'
import { mockFetchResponse } from '../fetch.mock'
import { UserOrdersMockV2, OrderMockV2 } from '../mock/ordersV2.mock'
import {
  updateOrder,
  createOrder,
  getOrderPrice,
  fetchOrder,
  fetchUserOrders,
  cancelPendingOrders,
  patchOrderProducts,
} from '../orderV2'

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
const getProductsV2 = safeJestMock(orderSelectors, 'getProductsV2')
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
  const userId = '123456789'
  const orderId = '1'
  const accessToken = 'tRztonUdUUl6ATWUaCfNEbpI3Aed9TJRlKHiy9gQ'

  // mock the environment and domain config used by these tests to generate endpoints
  withMockEnvironmentAndDomain('production', 'gousto.co.uk')

  beforeEach(() => {
    jest.spyOn(menuFetch, 'post').mockResolvedValue(mockFetchResponse({}) as [any, any, number])
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('createOrder', () => {
    const order = {
      type: 'order',
      id: orderId,
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
      ;(fetch as jest.Mock).mockReturnValue(fetchResponse)
    })

    test('should fetch the correct url', async () => {
      await createOrder(accessToken, { order: 'body' }, userId)

      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(
        accessToken,
        'https://production-api.gousto.co.uk/order/v2/orders',
        { data: { order: 'body' } },
        'POST',
        'default',
        {
          'Content-Type': 'application/json',
          'x-gousto-device-id': 'session-id',
          'x-gousto-user-id': userId,
        },
      )
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await createOrder(accessToken, { order: 'body' }, userId)

      expect(result).toEqual(order)
    })
  })

  describe('updateOrder', () => {
    beforeEach(() => {
      getUserId.mockReturnValue(userId)
      getAccessToken.mockReturnValue(accessToken)
    })
    describe('when using the V1 implementation', () => {
      beforeEach(() => {
        isOptimizelyFeatureEnabledFactory.mockReturnValue(() => false)
        getOrderForUpdateOrderV1.mockReturnValue({ order: 'v1 body' })
        getUpdateOrderProductItemsOrderV1.mockReturnValue({ products: 'v2 body' })
      })

      test('should fetch the correct url', async () => {
        await updateOrder(dispatch, getState, orderId, { order: 'v1 body' })

        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith(
          accessToken,
          `https://production-api.gousto.co.uk/order/${orderId}`,
          { order: 'v1 body' },
          'PUT',
          undefined,
          { 'Content-Type': 'application/json' },
        )
      })

      test('should return the results of the fetch unchanged', async () => {
        const apiResponse = { data: [1, 2, 3] }
        ;(fetch as jest.Mock).mockResolvedValue(apiResponse)

        const result = await updateOrder(dispatch, getState, orderId, { order: 'body' })

        expect(result).toEqual(apiResponse)
      })

      test('should update market place items', async () => {
        const apiResponse = { data: [1, 2, 3] }
        ;(fetch as jest.Mock).mockResolvedValue(apiResponse)

        const result = await updateOrder(dispatch, getState, orderId, { order: 'body' }, true)

        expect(result).toEqual(apiResponse)
      })
    })

    describe('when using the V2 implementation', () => {
      beforeEach(() => {
        isOptimizelyFeatureEnabledFactory.mockReturnValue(() => true)
        getOrderV2.mockReturnValue({ order: 'v2 body' })
        ;(isomorphicFetch as jest.Mock).mockResolvedValue({
          json: () => Promise.resolve(OrderMockV2),
        })
      })

      test('should fetch the correct url', async () => {
        await updateOrder(dispatch, getState, orderId)

        expect(isomorphicFetch).toHaveBeenCalledTimes(1)
        expect(isomorphicFetch).toHaveBeenCalledWith(
          `https://production-api.gousto.co.uk/order/v2/orders/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
              'x-gousto-device-id': 'session-id',
              'x-gousto-user-id': userId,
            },
            body: JSON.stringify({ data: { order: 'v2 body', id: orderId } }),
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
        await updateOrder(dispatch, getState, orderId, additionalData)

        expect(isomorphicFetch).toHaveBeenCalledTimes(1)
        expect(isomorphicFetch).toHaveBeenCalledWith(
          `https://production-api.gousto.co.uk/order/v2/orders/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
              'x-gousto-device-id': 'session-id',
              'x-gousto-user-id': userId,
            },
            body: JSON.stringify({
              data: {
                order: 'v2 body',
                relationships: {
                  delivery_slot: { data: { id: 'test delivery_slot_id' } },
                  delivery_day: { data: { id: 'test delivery_day_id' } },
                  delivery_slot_lead_time: { data: { id: 'test day_slot_lead_time_id' } },
                },
                id: orderId,
              },
            }),
            method: 'PUT',
          },
        )
      })

      test('should handle error returned from core', async () => {
        ;(isomorphicFetch as jest.Mock).mockResolvedValue({
          json: () => Promise.resolve({ errors: { message: 'error' } }),
        })
        try {
          await updateOrder(dispatch, getState, orderId)
        } catch (e) {
          expect(e).toEqual(new Error('error'))
        }
      })

      test('should handle system error', async () => {
        ;(isomorphicFetch as jest.Mock).mockResolvedValue({
          json: () => Promise.resolve({ errors: { message: 'error' } }),
        })
        try {
          await updateOrder(dispatch, getState, orderId)
        } catch (e) {
          expect(e).toEqual(new Error('error'))
        }
      })
    })
  })

  describe('PatchOrderProducts', () => {
    beforeEach(() => {
      getUserId.mockReturnValue(userId)
      getAccessToken.mockReturnValue(accessToken)
    })
    describe('when using the V1 implementation', () => {
      beforeEach(() => {
        isOptimizelyFeatureEnabledFactory.mockReturnValue(() => false)
        getOrderForUpdateOrderV1.mockReturnValue({ order: 'v1 body' })
        getUpdateOrderProductItemsOrderV1.mockReturnValue({ products: 'v2 body' })
      })

      test('should fetch the correct url', async () => {
        await patchOrderProducts(dispatch, getState, orderId)

        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith(
          accessToken,
          `https://production-api.gousto.co.uk/order/${orderId}/update-items`,
          { products: 'v2 body' },
          'PUT',
          undefined,
          { 'Content-Type': 'application/json' },
        )
      })

      test('should return the results of the fetch unchanged', async () => {
        const apiResponse = { data: [1, 2, 3] }
        ;(fetch as jest.Mock).mockResolvedValue(apiResponse)

        const result = await patchOrderProducts(dispatch, getState, orderId)

        expect(result).toEqual(apiResponse)
      })

      test('should update market place items', async () => {
        const apiResponse = { data: [1, 2, 3] }
        ;(fetch as jest.Mock).mockResolvedValue(apiResponse)

        const result = await patchOrderProducts(dispatch, getState, orderId)

        expect(result).toEqual(apiResponse)
      })
    })

    describe('when using the V2 implementation', () => {
      beforeEach(() => {
        isOptimizelyFeatureEnabledFactory.mockReturnValue(() => true)
        getProductsV2.mockReturnValue([{ id: 1, type: 'product', meta: { quanity: 1 } }])
        getOrderV2.mockReturnValue({ order: 'v2 body' })
        ;(isomorphicFetch as jest.Mock).mockResolvedValue({
          json: () => Promise.resolve({ data: [{ id: 1, type: 'product', meta: { quanity: 1 } }] }),
        })
      })

      test('should fetch the correct url', async () => {
        await patchOrderProducts(dispatch, getState, orderId)

        expect(isomorphicFetch).toHaveBeenCalledTimes(1)
        expect(isomorphicFetch).toHaveBeenCalledWith(
          `https://production-api.gousto.co.uk/order/v2/orders/${orderId}/relationships/product`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
              'x-gousto-device-id': 'session-id',
              'x-gousto-user-id': userId,
            },
            body: JSON.stringify({ data: [{ id: 1, type: 'product', meta: { quanity: 1 } }] }),
            method: 'PATCH',
          },
        )
      })

      test('should handle error returned from core', async () => {
        ;(isomorphicFetch as jest.Mock).mockResolvedValue({
          json: () => Promise.resolve({ errors: { message: 'error' } }),
        })
        try {
          await patchOrderProducts(dispatch, getState, orderId)
        } catch (e) {
          expect(e).toEqual(new Error('error'))
        }
      })

      test('should handle system error', async () => {
        ;(isomorphicFetch as jest.Mock).mockResolvedValue({
          json: () => Promise.resolve({ errors: { message: 'error' } }),
        })
        try {
          await patchOrderProducts(dispatch, getState, orderId)
        } catch (e) {
          expect(e).toEqual(new Error('error'))
        }
      })
    })
  })

  describe('getOrderPrice', () => {
    test('should fetch the correct url', async () => {
      const data = { some: 'thing' }
      const apiResponse = mockFetchResponse({ data: [1, 2, 3] })

      jest.spyOn(menuFetch, 'post').mockResolvedValue(apiResponse as [any, any, number])

      const response = await getOrderPrice(accessToken, data, userId)

      expect(menuFetch.post).toHaveBeenCalledTimes(1)
      expect(menuFetch.post).toHaveBeenCalledWith(
        { accessToken, userId },
        'https://production-api.gousto.co.uk/order/v2/prices',
        { data },
        {
          'Content-Type': 'application/json',
          'x-gousto-device-id': 'session-id',
          'x-gousto-user-id': userId,
        },
      )
      expect(response).toEqual(apiResponse)
    })
  })

  describe('fetchOrder', () => {
    beforeEach(() => {
      getUserId.mockReturnValue(userId)
      getAccessToken.mockReturnValue(accessToken)
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
        const include = 'data'

        await fetchOrder(dispatch, getState, orderId, include)
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith(
          accessToken,
          `https://production-api.gousto.co.uk/order/${orderId}`,
          expectedReqData,
          'GET',
          undefined,
          expectedHeaders,
        )
      })

      test('should return the results of the fetch unchanged', async () => {
        const apiResponse = { data: [1, 2, 3] }
        ;(fetch as jest.Mock).mockResolvedValue(apiResponse)

        const result = await fetchOrder(dispatch, getState, '123')

        expect(result).toEqual(apiResponse)
      })

      describe('when reqData not provided', () => {
        test('should fetch the correct url', async () => {
          const expectedHeaders = {
            'Content-Type': 'application/json',
          }

          await fetchOrder(dispatch, getState, orderId)
          expect(fetch).toHaveBeenCalledTimes(1)
          expect(fetch).toHaveBeenCalledWith(
            accessToken,
            `https://production-api.gousto.co.uk/order/${orderId}`,
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
        ;(isomorphicFetch as jest.Mock).mockResolvedValue({
          json: () => Promise.resolve(OrderMockV2),
        })
      })

      test('should fetch the correct url', async () => {
        await fetchOrder(dispatch, getState, orderId)
        expect(isomorphicFetch).toHaveBeenCalledTimes(1)
        expect(isomorphicFetch).toHaveBeenCalledWith(
          `https://production-api.gousto.co.uk/order/v2/orders/${orderId}?include[]=shipping_address`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
              'x-gousto-device-id': 'session-id',
              'x-gousto-user-id': userId,
            },
            method: 'GET',
          },
        )
      })
    })
  })

  describe('fetchUserOrders', () => {
    beforeEach(() => {
      getUserId.mockReturnValue(userId)
      getAccessToken.mockReturnValue(accessToken)
    })

    describe('when using the V2 implementation', () => {
      beforeEach(() => {
        isOptimizelyFeatureEnabledFactory.mockReturnValue(() => true)
        ;(isomorphicFetch as jest.Mock).mockResolvedValue({
          json: () => Promise.resolve(UserOrdersMockV2),
        })
      })

      test('should fetch the correct url', async () => {
        const expectedReqData = {
          state: 'delivery',
          includes: ['data'],
          limit: 15,
          sort_order: 'deliveryDate',
        }

        await fetchUserOrders(dispatch, getState, expectedReqData)
        expect(isomorphicFetch).toHaveBeenCalledTimes(1)
        expect(isomorphicFetch).toHaveBeenCalledWith(
          `https://production-api.gousto.co.uk/order/v2/users/${userId}/orders?page%5Blimit%5D=15&filter%5Bstate%5D=delivery&sort=deliveryDate&include%5B%5D=data`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
              'x-gousto-device-id': 'session-id',
              'x-gousto-user-id': userId,
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
            `https://production-api.gousto.co.uk/order/v2/users/${userId}/orders`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'x-gousto-device-id': 'session-id',
                'x-gousto-user-id': userId,
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
          accessToken,
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
            accessToken,
            'https://production-api.gousto.co.uk/user/current/orders',
            {},
            'GET',
          )
        })
      })
    })
  })

  describe('cancelPendingOrders', () => {
    describe('when using the V1 implementation', () => {
      beforeEach(() => {
        isOptimizelyFeatureEnabledFactory.mockReturnValue(() => false)
      })

      test('should make a POST request to the correct URL', async () => {
        await cancelPendingOrders(dispatch, getState, accessToken, userId)

        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith(
          accessToken,
          `https://production-api.gousto.co.uk/user/current/cancel-pending-orders`,
          {},
          'POST',
        )
      })
    })

    describe('when using the V2 implementation', () => {
      beforeEach(() => {
        isOptimizelyFeatureEnabledFactory.mockReturnValue(() => true)
      })

      test('should make a DELETE request to the correct URL', async () => {
        await cancelPendingOrders(dispatch, getState, accessToken, userId)

        expect(isomorphicFetch).toHaveBeenCalledTimes(1)
        expect(isomorphicFetch).toHaveBeenCalledWith(
          `https://production-api.gousto.co.uk/order/v2/users/${userId}/orders?filter[state]=pending`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
              'x-gousto-device-id': 'session-id',
              'x-gousto-user-id': userId,
            },
            method: 'DELETE',
          },
        )
      })
    })
  })
})
