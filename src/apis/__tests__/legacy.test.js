import fetch from 'utils/fetch'
import { legacyVerifyAge } from '../legacy'

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
    collections: 'v1'
  },
  collections: {
    recipes: '/recipes'
  }
}))

describe('legacy api', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  describe('legacyVerifyAge', () => {
    test('should fetch the correct url', async () => {
      await legacyVerifyAge()
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(null, 'endpoint-webclient/user/public-age-verified', {}, 'POST', 'default', {}, null, true)
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await legacyVerifyAge()
      expect(result).toEqual(mockFetchResult)
    })
  })
})
