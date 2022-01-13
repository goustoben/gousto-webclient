import fetch from 'utils/fetch'
import { fetchPauseReasons, customerSignup, newsletterSubscribe, fetchReference } from '../customers'

const mockFetchResult = { data: [1, 2, 3] }
jest.mock('utils/fetch', () =>
  jest.fn().mockImplementation(() => {
    const getData = async () => ({ data: [1, 2, 3] })

    return getData()
  })
)

jest.mock('config/routes', () => ({
  customers: {
    signup: '/signup',
    newsletterSubscribers: '/newsletterSubscribers',
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
        'https://production-api.gousto.co.uk/customers/v1/customers/user-id/subscription/pause-reasons',
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
        'https://production-api.gousto.co.uk/customers/v2/signup',
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
        'https://production-api.gousto.co.uk/customers/v1/newsletterSubscribers',
        { email: 'foo@example.com' },
        'POST'
      )
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await newsletterSubscribe('foo@example.com')
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('fetchReference', () => {
    test('should fetch the correct url', async () => {
      await fetchReference()

      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(
        null,
        'https://production-api.gousto.co.uk/customers/v1/reference',
        {},
        'GET'
      )
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchReference()

      expect(result).toEqual(mockFetchResult)
    })
  })
})
