import fetch from 'utils/fetch'
import { fetchRecipes } from "apis/recipes/fetchRecipes"
import { fetchRecipesFromMenu } from "apis/recipes/fetchRecipesFromMenu"
import { fetchRecipeStock } from "apis/recipes/fetchRecipeStock"
import { fetchRecipesStockByDate } from "apis/recipes/fetchRecipesStockByDate"

const mockFetchResult = { data: [1, 2, 3] }
jest.mock('utils/fetch', () =>
  jest.fn().mockImplementation(() => {
    const getData = async () => ({ data: [1, 2, 3] })

    return getData()
  })
)

jest.mock('config/routes', () => ({
  recipes: {
    availableDates: '/dates/available',
    recommendations: '/recommendations',
    recipes: '/recipes',
    steps: '/steps'
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

  describe('fetchRecipesFromMenu', () => {
    test('should fetch the correct url', async () => {
      const reqData = { a: 1, b: 2, c: 'x,y,z' }
      await fetchRecipesFromMenu('token', reqData)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith('token', 'https://production-api.gousto.co.uk/menu/v1/recipes?a=1&b=2&c=x,y,z', {}, 'GET', 'default', {}, null, false, true)
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchRecipes('token', 'path', {})
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('fetchRecipes', () => {
    test('should fetch the correct url', async () => {
      const reqData = { a: 1, b: 2 }
      await fetchRecipes('token', 'path', reqData)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith('token', 'https://production-api.gousto.co.uk/recipes/v2/recipes/path', reqData, 'GET')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchRecipes('token', 'path', {})
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('fetchRecipeStock', () => {
    test('should fetch the correct url', async () => {
      await fetchRecipeStock('token', 'day-id')
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith('token', 'https://production-api.gousto.co.uk/delivery_day/day-id/stock', {}, 'GET')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchRecipeStock('token', 'day-id')
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('fetchRecipesStockByDate', () => {
    test('should fetch the correct url', async () => {
      const reqData = { a: 1, b: 2 }
      await fetchRecipesStockByDate(reqData)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(null, 'https://production-api.gousto.co.uk/orders/v1/recipe-stock', reqData, 'GET')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchRecipesStockByDate({})
      expect(result).toEqual(mockFetchResult)
    })
  })
})
