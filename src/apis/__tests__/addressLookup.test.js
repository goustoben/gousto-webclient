import fetch from 'utils/fetch'
import { fetchAddressByPostcode } from '../addressLookup'

const mockFetchResult = { data: [1, 2, 3] }
jest.mock('utils/fetch', () =>
  jest.fn().mockImplementation(() => {
    const getData = async () => ({ data: [1, 2, 3] })

    return getData()
  })
)

jest.mock('config/routes', () => ({
  version: {
    recipes: 'v2',
  },
  address: {
    postcodeLookup: '/postcodeLookup'
  }
}))

describe('addressLookup api', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  describe('fetchAddressByPostcode', () => {
    test('should fetch the correct url', async () => {
      await fetchAddressByPostcode('W2 3LX')
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(null, '/postcodeLookup', { postcode: 'W2 3LX' }, 'GET')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchAddressByPostcode('W2 3LX')
      expect(result).toEqual(mockFetchResult)
    })
  })
})
