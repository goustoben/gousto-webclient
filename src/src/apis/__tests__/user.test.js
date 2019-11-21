import { fetch } from 'utils/fetch'
import { applyPromo, fetchReferralOffer, fetchPromo, fetchUser, fetchShippingAddresses, fetchUserOrders, fetchUserOrdersNew, fetchUserProjectedDeliveries, saveUserOrder, updateUserOrder, skipDelivery, restoreDelivery, reactivate, userRateCount, checkDuplicateUser, verifyAge, referralDetails, referAFriend, addPaymentMethod, fetchUserAddresses, deleteMarketingSubscription } from '../user'

const mockFetchResult = { data: [1, 2, 3] }
jest.mock('utils/fetch', () => ({
  fetch: jest.fn().mockImplementation(() => {
    const getData = async () => ({ data: [1, 2, 3] })

    return getData()
  })
}))

jest.mock('config/endpoint', () =>
  jest.fn().mockImplementation((service, version = '') => `endpoint-${service}${version}`)
)

jest.mock('config/routes', () => ({
  version: {
    orders: 'v2',
    customers: 'v2'
  },
  core: {
    userPromo: '/userPromo',
    currentUser: '/currentUser',
    userAddress: '/userAddress',
    userOrders: '/userOrders',
    userProjectedDeliveries: '/userProjectedDeliveries',
    userOrder: '/userOrder',
    userDelivery: '/userDelivery',
    user: '/user',
    rateCount: '/rateCount'
  }
}))

describe('user api', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  describe('applyPromo', () => {
    test('should fetch the correct url', async () => {
      const accessToken = 'token'
      const promoCode = 'FREEFOODPLS'
      await applyPromo(accessToken, promoCode)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(accessToken, `endpoint-core/user/current/applyPromotionCode/${promoCode}`, {}, 'POST')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await applyPromo('token', 'promo')
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('fetchReferralOffer', () => {
    test('should fetch the correct url', async () => {
      const accessToken = 'token'
      await fetchReferralOffer(accessToken)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(accessToken, 'endpoint-core/user/current/raf-campaign-details', {}, 'GET')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchReferralOffer('token')
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('fetchPromo', () => {
    test('should fetch the correct url', async () => {
      const accessToken = 'token'
      await fetchPromo(accessToken)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(accessToken, 'endpoint-core/userPromo', {}, 'GET')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchPromo('token')
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('fetchUser', () => {
    test('should fetch the correct url', async () => {
      const accessToken = 'token'
      await fetchUser(accessToken)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(accessToken, 'endpoint-core/currentUser', {}, 'GET')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchUser('token')
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('fetchShippingAddresses', () => {
    test('should fetch the correct url', async () => {
      const accessToken = 'token'
      await fetchShippingAddresses(accessToken)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(accessToken, 'endpoint-core/userAddress', { type: 'shipping' }, 'GET')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchShippingAddresses('token')
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('fetchUserOrders', () => {
    test('should fetch the correct url', async () => {
      const accessToken = 'token'
      const reqData = { a: 1, b: 2 }
      await fetchUserOrders(accessToken, reqData)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(accessToken, 'endpoint-core/userOrders', reqData, 'GET')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchUserOrders('token', {})
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('fetchUserOrdersNew', () => {
    test('should fetch the correct url', async () => {
      const accessToken = 'token'
      const userId = 123
      const reqData = { userId, a: 1, b: 2 }
      await fetchUserOrdersNew(accessToken, reqData)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(accessToken, `endpoint-ordersv2/customers/${userId}/orders/`, reqData, 'GET')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchUserOrdersNew('token', { userId: 123 })
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('fetchUserProjectedDeliveries', () => {
    test('should fetch the correct url', async () => {
      const accessToken = 'token'
      await fetchUserProjectedDeliveries(accessToken)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(accessToken, 'endpoint-core/userProjectedDeliveries', {}, 'GET')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchUserProjectedDeliveries('token')
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('saveUserOrder', () => {
    test('should fetch the correct url', async () => {
      const accessToken = 'token'
      const reqData = { a: 1 }
      await saveUserOrder(accessToken, reqData)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(accessToken, 'endpoint-core/userOrder', reqData, 'POST')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await saveUserOrder('token', {})
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('updateUserOrder', () => {
    test('should fetch the correct url', async () => {
      const accessToken = 'token'
      const reqData = { a: 1 }
      await updateUserOrder(accessToken, reqData)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(accessToken, 'endpoint-core/userOrder', reqData, 'PUT')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await updateUserOrder('token', {})
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('skipDelivery', () => {
    test('should fetch the correct url', async () => {
      const accessToken = 'token'
      const deliveryDayId = '1'
      await skipDelivery(accessToken, deliveryDayId)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(accessToken, 'endpoint-core/userDelivery/disable', { delivery_day_id: deliveryDayId }, 'PUT')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await skipDelivery('token', '1')
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('restoreDelivery', () => {
    test('should fetch the correct url', async () => {
      const accessToken = 'token'
      const userId = '2'
      const deliveryDayId = '1'
      await restoreDelivery(accessToken, userId, deliveryDayId)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(accessToken, `endpoint-core/user/${userId}/subscription/delivery/enable`, { delivery_day_id: deliveryDayId }, 'PUT')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await restoreDelivery('token', '2', '1')
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('reactivate', () => {
    test('should fetch the correct url', async () => {
      const accessToken = 'token'
      const userId = '123'
      const reqData = { userId, a: 1, b: 2 }
      await reactivate(accessToken, reqData)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(accessToken, `endpoint-core/user/${userId}/restore`, { }, 'PUT')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await reactivate('token', { userId: '123' })
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('verifyAge', () => {
    test('should fetch the correct url', async () => {
      const accessToken = 'token'
      const userId = '123'
      await verifyAge(accessToken, userId)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(accessToken, `endpoint-core/user/${userId}`, { age_verified: 1 }, 'PUT')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await verifyAge('token', '123')
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('userRateCount', () => {
    test('should fetch the correct url', async () => {
      const accessToken = 'token'
      const reqData = { a: 1, b: 2 }
      await userRateCount(accessToken, reqData)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(accessToken, 'endpoint-core/rateCount', reqData, 'GET')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await userRateCount('token', {})
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('checkDuplicateUser', () => {
    test('should fetch the correct url', async () => {
      const reqData = { a: 1, b: 2 }
      await checkDuplicateUser(reqData)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(null, 'endpoint-core/user/check-duplicate', reqData, 'POST')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await checkDuplicateUser({})
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('referralDetails', () => {
    test('should fetch the correct url', async () => {
      const accessToken = 'token'
      const reqData = { a: 1, b: 2 }
      await referralDetails(accessToken, reqData)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(accessToken, 'endpoint-core/user/current/referralDetails', reqData, 'GET')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await referralDetails('token', { })
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('referAFriend', () => {
    test('should fetch the correct url', async () => {
      const accessToken = 'token'
      const email = 'foo@example.com'
      await referAFriend(accessToken, email)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(accessToken, 'endpoint-core/user/current/referral', { emails: [ email ] }, 'POST')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await referAFriend('token', 'foo@example.com')
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('addPaymentMethod', () => {
    test('should fetch the correct url', async () => {
      const accessToken = 'token'
      const reqData = { a: 1, b: 2 }
      const userId = '123'
      await addPaymentMethod(accessToken, reqData, userId)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(accessToken, `endpoint-core/user/${userId}/paymentMethod`, reqData, 'PUT')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await addPaymentMethod('token', {}, '123')
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('fetchUserAddresses', () => {
    test('should fetch the correct url', async () => {
      const accessToken = 'token'
      const userId = '123'
      await fetchUserAddresses(accessToken, userId)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(accessToken, `endpoint-customersv2/customers/${userId}/addresses`, {}, 'GET')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchUserAddresses('token', '123')
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('deleteMarketingSubscription', () => {
    test('should fetch the correct url', async () => {
      const userId = '123'
      const marketingType = 'test_marketing_type'
      const marketingUnsubscribeToken = 'token'
      await deleteMarketingSubscription(userId, marketingType, marketingUnsubscribeToken)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(
        null,
        `endpoint-core/user/${userId}/marketing/${marketingType}`,
        { marketing_unsubscribe_token: marketingUnsubscribeToken },
        'DELETE'
      )
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await deleteMarketingSubscription('123', 'marketingType', 'token')
      expect(result).toEqual(mockFetchResult)
    })
  })
})
