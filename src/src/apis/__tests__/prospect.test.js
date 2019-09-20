import fetch from 'utils/fetch'
import { storeProspect } from '../prospect'

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
  }
}))

describe('prospect api', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  describe('storeProspect', () => {
    test('should fetch the correct url', async () => {
      const reqData = { a: 1, b: 2 }
      await storeProspect(reqData)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(null, 'endpoint-core/prospect', reqData, 'POST')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await storeProspect({})
      expect(result).toEqual(mockFetchResult)
    })
  })
})
