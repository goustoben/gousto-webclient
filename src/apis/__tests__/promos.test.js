import fetch from 'utils/fetch'
import { fetchPromo, fetchPromocodeFromCampaignUrl } from '../promos'

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

describe('promos api', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  describe('fetchPromo', () => {
    test('should fetch the correct url', async () => {
      await fetchPromo('token', 'my-promocode')
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith('token', 'endpoint-core/promocode/my-promocode', {}, 'GET', 'default', {}, null, false, false)
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchPromo('token', 'my-promocode')
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('fetchPromocodeFromCampaignUrl', () => {
    test('should fetch the correct url', async () => {
      await fetchPromocodeFromCampaignUrl('token', 'test-url')
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith('token', 'endpoint-core/campaign/test-url/promocode', {}, 'GET')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchPromo('token', 'test-url')
      expect(result).toEqual(mockFetchResult)
    })
  })
})
