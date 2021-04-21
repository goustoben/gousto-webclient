import fetch from 'utils/fetch'
import { fetchJobs } from '../workable'

const mockFetchResult = { data: [1, 2, 3] }
jest.mock('utils/fetch', () =>
  jest.fn().mockImplementation(() => {
    const getData = async () => ({ data: [1, 2, 3] })

    return getData()
  })
)

describe('workable api', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  describe('fetchJobs', () => {
    test('should fetch the correct url', async () => {
      await fetchJobs()
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(null, 'https://production-api.gousto.co.uk/workable/v1/workable/jobs', null, 'GET')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchJobs()
      expect(result).toEqual(mockFetchResult)
    })
  })
})
