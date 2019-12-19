import fetch from 'utils/fetch'
import config from 'config/products'
import { fetchProduct, fetchProductCategories, fetchProducts, fetchRandomProducts, fetchProductStock } from '../products'

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
    products: 'v2',
  },
  products: {
    categories: '/categories',
    getProducts: '/getProducts'
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
  beforeEach(() => {
    fetch.mockClear()
  })

  describe('fetchProduct', () => {
    test('should fetch the correct url', async () => {
      await fetchProduct('token', 'product-id')
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith('token', 'endpoint-productsv2/products/product-id', mockReqData, 'GET')
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
      expect(fetch).toHaveBeenCalledWith('token', 'endpoint-productsv2/categories', { includes: config.categoryFetchIncludes }, 'GET')
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
          date: cutoffDate
        }

        await fetchProducts('token', cutoffDate, productData)
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith('token', 'endpoint-productsv2/getProducts', expectedReqData, 'GET')
      })
    })

    describe('when cutoff date is not provided', () => {
      test('should fetch the correct url', async () => {
        const productData = { a: 1, b: 2 }
        const cutoffDate = null

        const expectedReqData = {
          ...mockReqData,
          ...productData
        }

        await fetchProducts('token', cutoffDate, productData)
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith('token', 'endpoint-productsv2/getProducts', expectedReqData, 'GET')
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
        image_sizes: imageSizes
      }
      
      await fetchRandomProducts('token', limit, imageSizes)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith('token', 'endpoint-productsv2/getProducts', expectedReqData, 'GET')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchRandomProducts('token', 987, 15)
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('fetchProductStock', () => {
    test('should fetch the correct url', async () => {
      await fetchProductStock('token')
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith('token', 'endpoint-core/productStock', {}, 'GET')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchProductStock('token')
      expect(result).toEqual(mockFetchResult)
    })
  })
})
