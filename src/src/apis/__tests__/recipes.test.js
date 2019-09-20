import fetch from 'utils/fetch'
import { fetchAvailableDates, fetchRecipeStock, fetchRecipesStockByPeriod, fetchRecipes, fetchRecipesStockByDate, fetchRecommendations } from '../recipes'

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
    orders: 'v2'
  },
  recipes: {
    availableDates: '/dates/available',
    recommendations: '/recommendations'
  },
  core: {
    recipesStock: '/recipe-stock'
  },
  orders: {
    recipesStock: '/recipe-stock'
  }
}))

describe('recipes', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  describe('fetchRecipes', () => {
    test('should fetch the correct url', async () => {
      const reqData = { a: 1, b: 2 }
      await fetchRecipes('token', 'path', reqData)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith('token', 'endpoint-recipesv2/recipes/path', reqData, 'GET')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchRecipes('token', 'path', {})
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('fetchAvailableDates', () => {
    test('should fetch the correct url', async () => {
      await fetchAvailableDates('token')
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith('token', 'endpoint-recipesv2/dates/available', {}, 'GET')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchAvailableDates('token')
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('fetchRecipeStock', function () {
    test('should fetch the correct url', async () => {
      await fetchRecipeStock('token', 'day-id')
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith('token', 'endpoint-core/delivery_day/day-id/stock', {}, 'GET')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchRecipeStock('token', 'day-id')
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('fetchRecipesStockByPeriod', function () {
    test('should fetch the correct url', async () => {
      await fetchRecipesStockByPeriod('period-id')
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(null, 'endpoint-core/recipe-stock', { period_id: 'period-id' }, 'GET')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchRecipesStockByPeriod('period-id')
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('fetchRecipesStockByDate', function () {
    test('should fetch the correct url', async () => {
      const reqData = { a: 1, b: 2 }
      await fetchRecipesStockByDate(reqData)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(null, 'endpoint-ordersv2/recipe-stock', reqData, 'GET')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchRecipesStockByDate({})
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('fetchRecommendations', function () {
    test('should fetch the correct url', async () => {
      await fetchRecommendations('token')
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith('token', 'endpoint-recipesv2/recommendations', {}, 'GET')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchRecommendations('token')
      expect(result).toEqual(mockFetchResult)
    })
  })
})
