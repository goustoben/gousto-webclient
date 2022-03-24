import isomorphicFetch from 'isomorphic-fetch'
import { fetch } from 'utils/fetch'
import * as cookieHelper2 from 'utils/cookieHelper2'
import {
  withMockEnvironmentAndDomain
} from '_testing/isomorphic-environment-test-utils'
import { safeJestMock } from '_testing/mocks'
import * as optimizelyRollouts from 'containers/OptimizelyRollouts'
import * as userSelectors from 'selectors/user'
import * as authSelectors from 'selectors/auth'
import { updateOrder, createOrder, getOrderPrice, getOrder, fetchUserOrders } from '../orderV2'
import * as menuFetch from '../fetch'
import { mockFetchResponse } from '../fetch.mock'
import { OrdersMockV2 } from '../mock/ordersV2.mock'

jest.mock('utils/fetch')
jest.mock('isomorphic-fetch')
const isOptimizelyFeatureEnabledFactory = safeJestMock(optimizelyRollouts, 'isOptimizelyFeatureEnabledFactory')
const getUserId = safeJestMock(userSelectors, 'getUserId')
const getAccessToken = safeJestMock(authSelectors, 'getAccessToken')
const dispatch = jest.fn()
const getState = jest.fn()

jest.spyOn(cookieHelper2, 'get').mockImplementation((cookies, key, withVersionPrefix, shouldDecode) => {
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
    isomorphicFetch.mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(OrdersMockV2),
    }))
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

      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(
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
      fetch.mockResolvedValue(apiResponse)

      const result = await updateOrder('token', 'order-id', { order: 'body' }, 'user-id')

      expect(result).toEqual(apiResponse)
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
        {'Content-Type': 'application/json', 'x-gousto-device-id': 'session-id', 'x-gousto-user-id': 'my-cool-user'}
      )
      expect(response).toEqual(apiResponse)
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
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(
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
      fetch.mockResolvedValue(apiResponse)

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
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith(
          'token',
          `https://production-api.gousto.co.uk/order/v2/orders/${orderId}`,
          {},
          'GET',
          'default',
          expectedHeaders)
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
      })

      test('should fetch the correct url', async () => {
        const expectedReqData = {
          'filter[phase]': 'delivery',
          include: ['data'],
          'page[limit]': 15,
          sort: 'deliveryDate'
        }

        await fetchUserOrders(dispatch, getState, expectedReqData )
        expect(isomorphicFetch).toHaveBeenCalledTimes(1)
        expect(isomorphicFetch).toHaveBeenCalledWith(
          'https://production-api.gousto.co.uk/order/v2/users/test-user-id/orders?filter%5Bphase%5D=delivery&include=data&page%5Blimit%5D=15&sort=deliveryDate',
          {
            headers: {Authorization: 'Bearer token', 'Content-Type': 'application/json', 'x-gousto-device-id': 'session-id', 'x-gousto-user-id': 'test-user-id'},
            method: 'GET'
          }
        )
      })

      describe('when reqData is not proviced', () => {
        test('should fetch the correct url', async () => {
          await fetchUserOrders(dispatch, getState)

          expect(isomorphicFetch).toHaveBeenCalledTimes(1)
          expect(isomorphicFetch).toHaveBeenCalledWith(
            'https://production-api.gousto.co.uk/order/v2/users/test-user-id/orders',
            {
              headers: {Authorization: 'Bearer token', 'Content-Type': 'application/json', 'x-gousto-device-id': 'session-id', 'x-gousto-user-id': 'test-user-id'},
              method: 'GET'
            }

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
          sort: 'deliveryDate'
        }

        await fetchUserOrders(dispatch, getState, expectedReqData )
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith(
          'token',
          'https://production-api.gousto.co.uk/user/current/orders',
          {'filter[phase]': 'delivery', include: ['data'], 'page[limit]': 15, sort: 'deliveryDate'},
          'GET'
        )
      })

      describe('when reqData is not proviced', () => {
        test('should fetch the correct url', async () => {
          await fetchUserOrders(dispatch, getState)

          expect(fetch).toHaveBeenCalledTimes(1)
          expect(fetch).toHaveBeenCalledWith(
            'token',
            'https://production-api.gousto.co.uk/user/current/orders',
            undefined,
            'GET'
          )
        })
      })
    })
  })
})
