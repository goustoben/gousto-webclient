import fetch from 'utils/fetch'
import { fetchDeliveryDays, fetchDeliveryConsignment } from '../deliveries'

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
    deliveries: 'v2',
  },
  deliveries: {
    days: '/days',
    consignments: '/consignments',
  }
}))

describe('deliveries api', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  describe('fetchDeliveryDays', () => {
    test('should fetch the correct url', async () => {
      const accessToken = 'token'
      const reqData = { a: 1, b: 2 }
      await fetchDeliveryDays(accessToken, reqData)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(accessToken, 'endpoint-deliveriesv2/days', reqData, 'GET')
    })

    describe('when postcode is provided', () => {
      describe('when postcode is 5 chars or longer', () => {
        test('should shorten postcode', async () => {
          const accessToken = 'token'
          const postcode = 'HP10 6LZ'
          const reqData = { a: 1, b: 2, postcode }

          const shortenedPostcode = 'hp10'
          const expectedReqData = { ...reqData, postcode: shortenedPostcode }

          await fetchDeliveryDays(accessToken, reqData)
          expect(fetch).toHaveBeenCalledTimes(1)
          expect(fetch).toHaveBeenCalledWith(accessToken, 'endpoint-deliveriesv2/days', expectedReqData, 'GET')
        })
      })

      describe('when postcode is less than 4 chars', () => {
        test('should not shorten postcode', async () => {
          const accessToken = 'token'
          const postcode = 'HP10'
          const reqData = { a: 1, b: 2, postcode }

          await fetchDeliveryDays(accessToken, reqData)
          expect(fetch).toHaveBeenCalledTimes(1)
          expect(fetch).toHaveBeenCalledWith(accessToken, 'endpoint-deliveriesv2/days', reqData, 'GET')
        })
      })
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchDeliveryDays('token', {})
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('fetchDeliveryConsignment', () => {
    test('should fetch from the correct URL', async () => {
      const accessToken = 'token'
      const orderId = '12345'
      await fetchDeliveryConsignment(accessToken, orderId)

      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(
        accessToken, 'endpoint-deliveriesv2/consignments', {'filters[order_id]': '12345'}, 'GET'
      )
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchDeliveryConsignment('token', {})
      expect(result).toEqual(mockFetchResult)
    })
  })
})
