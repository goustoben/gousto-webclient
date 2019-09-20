import fetch from 'utils/fetch'
import { fetchBoxPrices } from '../boxPrices'

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
  core: {
    boxPrices: '/boxPrices',
  }
}))

describe('boxPrices api', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  describe('fetchBoxPrices', () => {
    test('should fetch the correct url', async () => {
      const reqData = { a: 1, b: 2 }
      await fetchBoxPrices('token', reqData)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith('token', 'endpoint-core/boxPrices', reqData, 'GET')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchBoxPrices('token', {})
      expect(result).toEqual(mockFetchResult)
    })
  })
})
