import { fetch } from 'utils/fetch'
import config from 'config/products'
import {
  withMockEnvironmentAndDomain
} from '_testing/isomorphic-environment-test-utils'
import { fetchProduct, fetchProductCategories, fetchProducts, fetchRandomProducts, fetchProductStock, fetchRecipePairingsProducts } from '../products'

const mockFetchResult = { data: [1, 2, 3] }

jest.mock('utils/fetch', () => ({
  fetch: jest.fn().mockImplementation(() => {
    const getData = async () => ({ data: [1, 2, 3] })

    return getData()
  })
}))

jest.mock('config/routes', () => ({
  products: {
    categories: '/categories',
    getProducts: '/getProducts',
    recipePairings: '/recipe_pairings'
  },
  core: {
    productStock: '/productStock'
  }
}))

const mockReqData = {
  image_sizes: config.fetchImageSizes,
  includes: config.fetchIncludes
}

describe('products api', () => {
  // mock the environment and domain config used by these tests to generate endpoints
  withMockEnvironmentAndDomain('production', 'gousto.co.uk')

  beforeEach(() => {
    fetch.mockClear()
  })
  const userId = 'mock-user-id'
  const menuId = 'mock-menu-id'

  describe('fetchProduct', () => {
    const expectedReqData = {
      ...mockReqData,
      userId,
      menuId
    }
    test('should fetch the correct url', async () => {
      await fetchProduct('token', 'product-id', userId, menuId)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith('token', 'https://production-api.gousto.co.uk/products/v2.0/products/product-id', expectedReqData, 'GET')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchProduct('token', 'product-id')
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('fetchProductCategories', () => {
    test('should fetch the correct url', async () => {
      await fetchProductCategories('token')
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith('token', 'https://production-api.gousto.co.uk/products/v2.0/categories', { includes: config.categoryFetchIncludes }, 'GET')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchProductCategories('token')
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('fetchProducts', () => {
    describe('when cutoff date is provided', () => {
      test('should fetch the correct url', async () => {
        const productData = { a: 1, b: 2 }
        const cutoffDate = '2019-09-17T00:00:00'

        const expectedReqData = {
          ...mockReqData,
          ...productData,
          date: cutoffDate,
          userId,
          menuId
        }

        await fetchProducts('token', cutoffDate, productData, userId, menuId)
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith('token', 'https://production-api.gousto.co.uk/products/v2.0/getProducts', expectedReqData, 'GET')
      })
    })

    describe('when cutoff date is not provided', () => {
      test('should fetch the correct url', async () => {
        const productData = { a: 1, b: 2 }
        const cutoffDate = null

        const expectedReqData = {
          ...mockReqData,
          ...productData,
          userId,
          menuId
        }

        await fetchProducts('token', cutoffDate, productData, userId, menuId)
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith('token', 'https://production-api.gousto.co.uk/products/v2.0/getProducts', expectedReqData, 'GET')
      })
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchProducts('token', '2019-09-17T00:00:00', {})
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('fetchRandomProducts', () => {
    test('should fetch the correct url', async () => {
      const limit = 987
      const imageSizes = 15
      const expectedReqData = {
        sort: 'shuffle',
        limit,
        image_sizes: imageSizes,
        userId,
        menuId
      }

      await fetchRandomProducts('token', limit, imageSizes, userId, menuId)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith('token', 'https://production-api.gousto.co.uk/products/v2.0/getProducts', expectedReqData, 'GET')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchRandomProducts('token', 987, 15, userId, menuId)
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('fetchProductStock', () => {
    test('should fetch the correct url', async () => {
      await fetchProductStock('token')
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith('token', 'https://production-api.gousto.co.uk/productStock', {}, 'GET')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchProductStock('token')
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('fetchRecipePairingsProducts', () => {
    test('should fetch the correct url', async () => {
      await fetchRecipePairingsProducts('token', ['1234', '5678'])
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith('token', 'https://production-api.gousto.co.uk/products/v2.0/recipe_pairings?recipeIds[]=1234&recipeIds[]=5678', {}, 'GET')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchRecipePairingsProducts('token', ['1234', '5678'])
      expect(result).toEqual(mockFetchResult)
    })
  })
})
