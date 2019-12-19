import fetch from 'utils/fetch'
import { deactivateSubscription, fetchSubscription } from '../subscription'

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
    recipes: 'v2',
  },
  core: {
    deactivateSub: '/deactivateSub',
    currentSubscription: '/currentSubscription'
  }
}))

describe('subscription api', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  describe('deactivateSubscription', () => {
    test('should fetch the correct url', async () => {
      const reqData = { a: 1, b: 2 }
      await deactivateSubscription('token', reqData)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith('token', 'endpoint-core/deactivateSub', reqData, 'PUT')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await deactivateSubscription('token', {})
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('fetchSubscription', () => {
    test('should fetch the correct url', async () => {
      const reqData = { c: 3, d: 4 }
      await fetchSubscription('token', reqData)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith('token', 'endpoint-core/currentSubscription', reqData, 'GET')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchSubscription('token', {})
      expect(result).toEqual(mockFetchResult)
    })
  })
})
