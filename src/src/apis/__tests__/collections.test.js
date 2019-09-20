import fetch from 'utils/fetch'
import { fetchCollections, fetchCollectionBySlug, fetchCollectionRecipes } from '../collections'

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

describe('collections api', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  describe('fetchCollections', () => {
    test('should fetch the correct url', async () => {
      const reqData = { a: 1, b: 2 }
      await fetchCollections('token', 'path', reqData)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith('token', 'endpoint-collectionsv1/collections/path', reqData, 'GET', 'default', {}, null, false, false)
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchCollections('token', 'path', {})
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('fetchCollectionRecipes', () => {
    test('should fetch the correct url', async () => {
      const reqData = { c: 3, d: 4 }
      await fetchCollectionRecipes('token', 'collection-id', reqData)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith('token', 'endpoint-collectionsv1/collections/collection-id/recipes', reqData, 'GET', 'default', {}, null, false, false)
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchCollectionRecipes('token')
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('fetchCollectionBySlug', function () {
    test('should fetch the correct url', async () => {
      await fetchCollectionBySlug('slug')
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(null, 'endpoint-collectionsv1/collections/slug', undefined, 'GET', 'default', {}, null, false, false)
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchCollectionBySlug('slug')
      expect(result).toEqual(mockFetchResult)
    })
  })
})
