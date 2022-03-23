import { fetch } from 'utils/fetch'
import {
  withMockEnvironmentAndDomain
} from '_testing/isomorphic-environment-test-utils'
import { fetchContentBySlug } from '../content'

const mockFetchResult = { data: [1, 2, 3] }

jest.mock('utils/fetch', () => ({
  fetch: jest.fn().mockImplementation(() => {
    const getData = async () => ({ data: [1, 2, 3] })

    return getData()
  })
}))

describe('content api', () => {
  // mock the environment and domain config used by these tests to generate endpoints
  withMockEnvironmentAndDomain('production', 'gousto.co.uk')

  beforeEach(() => {
    fetch.mockClear()
  })

  describe('fetchContentBySlug', () => {
    test('should fetch the correct url', async () => {
      const reqData = { a: 1, b: 2 }
      await fetchContentBySlug('token', 'pageSlug', reqData)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(null, 'https://production-api.gousto.co.uk/content/v1/pages/slug/pageSlug', reqData, 'GET', 'default', {}, 150)
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchContentBySlug('token', 'pageSlug', {})
      expect(result).toEqual(mockFetchResult)
    })
  })
})
