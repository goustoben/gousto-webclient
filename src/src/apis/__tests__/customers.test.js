import fetch from 'utils/fetch'
import { fetchPauseReasons, customerSignup, newsletterSubscribe, fetchIntervals, fetchReference, fetchPromoCodeValidity } from '../customers'

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
  version: {
    customers: 'v1',
    customersV2: 'v2'
  },
  customers: {
    signup: '/signup',
    newsletterSubscribers: '/newsletterSubscribers',
    intervals: '/intervals',
    reference: '/reference',
    promocode: '/promocode',
  }
}))

describe('customers api', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  describe('fetchPauseReasons', () => {
    test('should fetch the correct url', async () => {
      await fetchPauseReasons('token', 'user-id')
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(
        'token',
        'endpoint-customersv1/customers/user-id/subscription/pause-reasons',
        { includes: ['steps'] },
        'GET'
      )
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchPauseReasons('token', 'user-id')
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('customerSignup', () => {
    test('should fetch the correct url', async () => {
      const reqData = { a: 1, b: 2 }
      const timeout = 50000
      await customerSignup('token', reqData)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(
        'token',
        'endpoint-customersv2/signup',
        reqData,
        'POST',
        'default',
        {},
        timeout
      )
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await customerSignup('token', {})
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('newsletterSubscribe', () => {
    test('should fetch the correct url', async () => {
      await newsletterSubscribe('foo@example.com')
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(
        null,
        'endpoint-customersv1/newsletterSubscribers',
        { email: 'foo@example.com' },
        'POST'
      )
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await newsletterSubscribe('foo@example.com')
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('fetchIntervals', () => {
    test('should fetch the correct url', async () => {
      await fetchIntervals()
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(
        null,
        'endpoint-customersv1/intervals',
        {},
        'GET'
      )
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchIntervals()
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('fetchReference', () => {
    test('should fetch the correct url', async () => {
      await fetchReference()

      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(
        null,
        'endpoint-customersv1/reference',
        {},
        'GET'
      )
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchReference()

      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('fetchPromoCodeValidity', () => {
    const params = {
      promo_code: 'DTI-SB-P30M',
      phone_number: '07503075906',
      postcode: 'W3 7UP',
      line1: 'FLAT 12, MORRIS HOUSE'
    }

    test('should fetch the correct url', async () => {
      await fetchPromoCodeValidity(params)

      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(
        null,
        'endpoint-customersv1/promocode',
        params,
        'GET'
      )
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchPromoCodeValidity(params)

      expect(result).toEqual(mockFetchResult)
    })
  })
})
