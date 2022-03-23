import { fetch, fetchRaw } from 'utils/fetch'
import {
  withMockEnvironmentAndDomain
} from '_testing/isomorphic-environment-test-utils'
import {
  applyPromo,
  fetchReferralOffer,
  fetchPromo,
  fetchUser,
  fetchShippingAddresses,
  fetchUserCredit,
  fetchUserOrders,
  reactivate,
  checkDuplicateUser,
  verifyAge,
  referralDetails,
  serverReferAFriend,
  addPaymentMethod,
  fetchUserAddresses,
  deleteMarketingSubscription,
  referAFriend
} from '../user'

const mockFetchResult = { data: [1, 2, 3] }
jest.mock('utils/fetch', () => ({
  fetch: jest.fn().mockImplementation(() => {
    const getData = async () => ({ data: [1, 2, 3] })

    return getData()
  }),
  fetchRaw: jest.fn().mockImplementation(() => {
    const getData = async () => ({ data: [1, 2, 3] })

    return getData()
  })
}))

jest.mock('config/routes', () => ({
  core: {
    userPromo: '/userPromo',
    currentUser: '/currentUser',
    userAddress: '/userAddress',
    userOrders: '/userOrders',
    userOrder: '/userOrder',
    user: '/user',
  },
  user: {
    referAFriend: '/user/refer-a-friend'
  },
}))

describe('user api', () => {
  // mock the environment and domain config used by these tests to generate endpoints
  withMockEnvironmentAndDomain('production', 'gousto.co.uk')

  beforeEach(() => {
    fetch.mockClear()
  })

  describe('fetchUserCredit', () => {
    test('should fetch the correct url', async () => {
      const accessToken = 'token'

      await fetchUserCredit(accessToken)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(accessToken, 'https://production-api.gousto.co.uk/user/current/balance', {}, 'GET')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchUserCredit('token')
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('applyPromo', () => {
    test('should fetch the correct url', async () => {
      const accessToken = 'token'
      const promoCode = 'FREEFOODPLS'
      await applyPromo(accessToken, promoCode)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(accessToken, `https://production-api.gousto.co.uk/user/current/applyPromotionCode/${promoCode}`, {}, 'POST')
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
      expect(fetch).toHaveBeenCalledWith(accessToken, 'https://production-api.gousto.co.uk/user/current/raf-campaign-details', {}, 'GET')
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
      expect(fetch).toHaveBeenCalledWith(accessToken, 'https://production-api.gousto.co.uk/userPromo', {}, 'GET')
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
      expect(fetch).toHaveBeenCalledWith(accessToken, 'https://production-api.gousto.co.uk/currentUser', {}, 'GET')
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
      expect(fetch).toHaveBeenCalledWith(accessToken, 'https://production-api.gousto.co.uk/userAddress', { type: 'shipping' }, 'GET')
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
      expect(fetch).toHaveBeenCalledWith(accessToken, 'https://production-api.gousto.co.uk/userOrders', reqData, 'GET')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchUserOrders('token', {})
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
      expect(fetch).toHaveBeenCalledWith(accessToken, `https://production-api.gousto.co.uk/user/${userId}/restore`, { }, 'PUT')
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
      expect(fetch).toHaveBeenCalledWith(accessToken, `https://production-api.gousto.co.uk/user/${userId}`, { age_verified: 1 }, 'PUT')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await verifyAge('token', '123')
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('checkDuplicateUser', () => {
    test('should fetch the correct url', async () => {
      const reqData = { a: 1, b: 2 }
      await checkDuplicateUser(reqData)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(null, 'https://production-api.gousto.co.uk/user/check-duplicate', reqData, 'POST')
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
      expect(fetch).toHaveBeenCalledWith(accessToken, 'https://production-api.gousto.co.uk/user/current/referralDetails', reqData, 'GET')
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
      expect(fetch).toHaveBeenCalledWith(accessToken, 'https://production-api.gousto.co.uk/user/current/referral', { emails: [ email ] }, 'POST')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await referAFriend('token', 'foo@example.com')
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('serverReferAFriend', () => {
    test('should fetch the correct url', async () => {
      const email = 'foo@example.com'
      const recaptchaToken = 'recaptcha-token'
      await serverReferAFriend(email, recaptchaToken)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(null, '/user/refer-a-friend', { email, recaptchaToken }, 'POST')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await serverReferAFriend('foo@example.com', 'token')
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
      expect(fetch).toHaveBeenCalledWith(accessToken, `https://production-api.gousto.co.uk/user/${userId}/paymentMethod`, reqData, 'PUT')
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
      expect(fetch).toHaveBeenCalledWith(accessToken, `https://production-api.gousto.co.uk/customers/v1/customers/${userId}/addresses`, {}, 'GET')
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
      expect(fetchRaw).toHaveBeenCalledTimes(1)
      expect(fetchRaw).toHaveBeenCalledWith(
        `https://production-api.gousto.co.uk/user/${userId}/marketing/${marketingType}`,
        { marketing_unsubscribe_token: marketingUnsubscribeToken },
        {method: 'PUT', useOverwriteRequestMethod: false}
      )
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await deleteMarketingSubscription('123', 'marketingType', 'token')
      expect(result).toEqual(mockFetchResult)
    })
  })
})
