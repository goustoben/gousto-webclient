import { fetch } from 'utils/fetch'
import { fetchCountByPostcode } from '../signup'

const mockFetchResult = {
  data: {
    postcode: 'AB167XR',
    district: 'Aberdeen City',
    count: 1169
  }
}

jest.mock('utils/fetch', () => ({
  fetch: jest.fn().mockImplementation(() => {
    const getData = async () => ({
      data: {
        postcode: 'AB167XR',
        district: 'Aberdeen City',
        count: 1169
      }
    })

    return getData()
  })
}))

jest.mock('config/endpoint', () =>
  jest.fn().mockImplementation((service, version = '') => `endpoint-${service}${version}`)
)

describe('signup apis', () => {
  let result

  beforeEach(async () => {
    fetch.mockClear()
    result = await fetchCountByPostcode('token', { postcode: 'AB167XR' })
  })

  describe('fetchCountByPostcode', () => {
    test('should fetch the correct url', () => {
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith('token', 'endpoint-customers1/customers/district/count-by-postcode', { postcode: 'AB167XR' }, 'GET')
    })

    test('should return the results of the fetch unchanged', () => {
      expect(result).toEqual(mockFetchResult)
    })
  })
})
