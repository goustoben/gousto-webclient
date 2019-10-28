import Immutable from 'immutable' /* eslint-disable new-cap */
import { basketSum, okRecipes, getProductsQtyInCategory, limitReached, getProductLimitReached, shortlistLimitReached, getOrderDetails } from 'utils/basket'
import * as basketProductLimits from 'utils/basketProductLimits'
import { getSlot } from 'utils/deliveries'

jest.mock('utils/basketProductLimits', () => ({
  getAllBasketProducts: jest.fn(),
  getFirstProductCategoryAtLimit: jest.fn(),
  getProductItemLimitReached: jest.fn(),
  productsOverallLimitReached: jest.fn(),
}))

jest.mock('utils/deliveries', () => ({
  getSlot: jest.fn()
}))

describe('basket utils', function () {
  describe('basketSum', function () {
    test('sum up the number of recipes', function () {
      const basket = Immutable.fromJS({ '1': 1, '22': 1, '23': 2 })

      expect(basketSum(basket)).toEqual(4)
    })
  })

  describe('getOrderDetails', () => {
    test('returns a object containing the delivery_day, slot_id day_slot_lead_time_id and chosen recipes', () => {
      const basket = Immutable.fromJS({
        date: '2019-10-10',
        slotId: '4',
        recipes: { 160: 1, 161: 1 },
        numPortions: 2
      })

      const deliveryDays = Immutable.fromJS({
        '2019-10-10': { coreDayId: '5' }
      })

      getSlot.mockReturnValue(Immutable.fromJS({
        coreSlotId: '4',
        id: 'deliveries-uuid',
        daySlotLeadTimeId: 'day-slot-lead-time-uuid'
      }))

      const actualResult = getOrderDetails(basket, deliveryDays)

      const expectedResult = {
        delivery_day_id: '5',
        delivery_slot_id: '4',
        recipe_choices: [
          { id: '160', quantity: 2, type: 'Recipe'},
          { id: '161', quantity: 2, type: 'Recipe'}
        ],
        day_slot_lead_time_id: 'day-slot-lead-time-uuid'
      }

      expect(actualResult).toEqual(expectedResult)
    })
  })

  describe('okRecipes', function () {
    test('should only return recipes that are in stock', function () {
      const recipes = Immutable.Map({ 456: 3, 567: 3, 678: 3 })
      const menuRecipes = Immutable.List(['456'])
      const menuRecipeStock = Immutable.fromJS({
        456: { 2: 3000, 3: 1750 },
        567: { 2: 0, 3: 0 },
        678: { 2: 0, 3: 0 },
      })
      const numPortions = 2

      const result = okRecipes(recipes, menuRecipes, menuRecipeStock, numPortions)
      expect(Immutable.is(result, Immutable.Map({ 456: 3 }))).toBe(true)
    })

    test('should only return recipes that are in the current menu', function () {
      const recipes = Immutable.Map({ 456: 3, 567: 3, 678: 3 })
      const menuRecipes = Immutable.List(['678'])
      const menuRecipeStock = Immutable.fromJS({
        456: { 2: 3000, 3: 1750 },
        567: { 2: 3000, 3: 1750 },
        678: { 2: 3000, 3: 1750 },
      })
      const numPortions = 2

      const result = okRecipes(recipes, menuRecipes, menuRecipeStock, numPortions)
      expect(Immutable.is(result, Immutable.Map({ 678: 3 }))).toBe(true)
    })

    test('should only return recipes that are in stock and in the current menu', function () {
      const recipes = Immutable.Map({ 456: 3, 567: 3, 678: 3 })
      const menuRecipes = Immutable.List(['456'])
      const menuRecipeStock = Immutable.fromJS({
        456: { 2: 3000, 3: 1750 },
        567: { 2: 0, 3: 0 },
        678: { 2: 0, 3: 0 },
      })
      const numPortions = 2

      const result = okRecipes(recipes, menuRecipes, menuRecipeStock, numPortions)
      expect(Immutable.is(result, Immutable.Map({ 456: 3 }))).toBe(true)
    })

    test('should handle no stock', function () {
      const recipes = Immutable.Map({ 456: 3, 567: 3, 678: 3 })
      const menuRecipes = Immutable.List(['456'])
      const menuRecipeStock = Immutable.fromJS({
      })
      const numPortions = 2

      const result = okRecipes(recipes, menuRecipes, menuRecipeStock, numPortions)

      expect(Immutable.is(result, Immutable.Map({}))).toBe(true)
    })

    test('should account for recipes that I have taken the last stock for', function () {
      const recipes = Immutable.Map({ 456: 3, 567: 3, 678: 3 })
      const menuRecipes = Immutable.List(['456'])
      const menuRecipeStock = Immutable.fromJS({
        456: { 2: 0, 3: 0 },
        567: { 2: 0, 3: 0 },
        678: { 2: 0, 3: 0 },
      })
      const numPortions = 2

      const result = okRecipes(recipes, menuRecipes, menuRecipeStock, numPortions)
      expect(Immutable.is(result, Immutable.Map({ 456: 3 }))).toBe(true)
    })
  })

  describe('limitReached', function () {
    function defaultLimitReached(maxRecipesNum) {
      const recipes = Immutable.Map({ 456: 3, 567: 3, 678: 3 })
      const numPortions = 2

      const basket = Immutable.fromJS({
        recipes,
        numPortions,
      })
      const menuRecipes = Immutable.List(['456', '567', '678'])
      const menuRecipeStock = Immutable.fromJS({
        456: { 2: 3000, 3: 1750 },
        567: { 2: 3000, 3: 1750 },
        678: { 2: 3000, 3: 1750 },
      })

      return limitReached(basket, menuRecipes, menuRecipeStock, false, maxRecipesNum)
    }

    test('should return true if the number of recipes in the basket is greater than config.basket.maxRecipesNum', function () {
      expect(defaultLimitReached()).toBe(true)
    })

    test('should return false if the number of recipes in the basket is less than config.basket.maxRecipesNum', function () {
      const recipes = Immutable.Map({ 456: 3 })
      const numPortions = 2

      const basket = Immutable.fromJS({
        recipes,
        numPortions,
      })
      const menuRecipes = Immutable.List(['456'])
      const menuRecipeStock = Immutable.fromJS({
        456: { 2: 3000, 3: 1750 },
        567: { 2: 3000, 3: 1750 },
        678: { 2: 3000, 3: 1750 },
      })
      const result = limitReached(basket, menuRecipes, menuRecipeStock)
      expect(result).toBe(false)
    })

    test('should disregard stock and the menu if the naive argument is true', function () {
      expect(defaultLimitReached(12)).toBe(false)
    })

    test('should use new maximum recipe count if maxRecipesNum defined', function () {
      const recipes = Immutable.Map({ 456: 3, 567: 3, 678: 3 })
      const numPortions = 2

      const basket = Immutable.fromJS({
        recipes,
        numPortions,
      })
      const menuRecipes = Immutable.List(['456', '567', '678'])
      const menuRecipeStock = Immutable.fromJS({
        456: { 2: 3000, 3: 1750 },
        567: { 2: 3000, 3: 1750 },
        678: { 2: 3000, 3: 1750 },
      })
      const result = limitReached(basket, menuRecipes, menuRecipeStock, false, 12)
      expect(result).toBe(false)
    })

  })

  describe('getProductsQtyInCategory', function () {
    let basket
    let products

    beforeEach(() => {
      basket = Immutable.fromJS({
        products: { 'product-2': 1, 'product-3': 2 },
        gifts: { 'product-3': 1 },
      })

      products = Immutable.fromJS({
        'product-2': { categories: [{ id: 'cat-2' }, { id: 'cat-3' }] },
        'product-3': { categories: [{ id: 'cat-3' }, { id: 'cat-4' }] },
      })
    })
    test('should return number of products in the given category', function () {
      let result = getProductsQtyInCategory('cat-2', basket, products, false)
      expect(result).toEqual(1)

      result = getProductsQtyInCategory('cat-3', basket, products, false)
      expect(result).toEqual(3)
    })

    test('should include gift products by default', function () {
      basketProductLimits.getAllBasketProducts.mockReturnValueOnce(Immutable.fromJS({
        'product-3': 3,
        'product-2': 1,
      }))
      let result = getProductsQtyInCategory('cat-2', basket, products, false)
      expect(result).toEqual(1)

      result = getProductsQtyInCategory('cat-3', basket, products)
      expect(result).toEqual(4)
    })

    test('should NOT include gift products if includeGiftProducts is set to false', function () {
      let result = getProductsQtyInCategory('cat-2', basket, products, false)
      expect(result).toEqual(1)

      result = getProductsQtyInCategory('cat-3', basket, products, false)
      expect(result).toEqual(3)
    })
  })

  describe('getProductLimitReached', function () {
    let basket
    let products
    let productsCategories

    beforeEach(() => {
      basket = Immutable.fromJS({
        products: { 'product-2': 1, 'product-3': 2 },
        gifts: { 'product-3': 1 },
      })

      products = Immutable.fromJS({
        'product-2': { categories: [{ id: 'cat-2' }, { id: 'cat-3' }] },
        'product-3': { categories: [{ id: 'cat-3' }, { id: 'cat-4' }] },
      })

      productsCategories = Immutable.fromJS({
        'cat-2': {
          id: 'cat-2',
          boxLimit: 2,
        },
        'cat-3': {
          id: 'cat-3',
          boxLimit: 3,
        }
      })
    })
    test('should return object containing type "box" & value of max products allowed when total products limit reached', function () {
      basketProductLimits.productsOverallLimitReached.mockReturnValueOnce(true)
      const productsOverallLimitReachedSpy = jest.spyOn(basketProductLimits, 'productsOverallLimitReached')

      const result = getProductLimitReached('product-3', basket, products, productsCategories)

      expect(productsOverallLimitReachedSpy).toHaveBeenCalledTimes(1)
      expect(productsOverallLimitReachedSpy.mock.calls[0][0]).toEqual(basket)
      expect(result).toEqual({ type: 'box', value: 10 })
    })

    test('should return object containing type "item" & value equal to max of the specific item allowed when total products limit reached', function () {
      basketProductLimits.productsOverallLimitReached.mockReturnValueOnce(false)
      basketProductLimits.getProductItemLimitReached.mockReturnValueOnce(3)
      const getProductItemLimitReachedSpy = jest.spyOn(basketProductLimits, 'getProductItemLimitReached')

      const result = getProductLimitReached('product-3', basket, products, productsCategories)

      expect(getProductItemLimitReachedSpy.mock.calls.length).toEqual(1)
      expect(getProductItemLimitReachedSpy.mock.calls[0]).toEqual([
        'product-3', basket, products
      ])
      expect(result).toEqual({ type: 'item', value: 3 })
    })

    test('should return object containing type "category" & value equal to title of the first category which has reached its limit', function () {
      basketProductLimits.productsOverallLimitReached.mockReturnValueOnce(false)
      basketProductLimits.getProductItemLimitReached.mockReturnValueOnce(false)
      basketProductLimits.getFirstProductCategoryAtLimit.mockReturnValueOnce('category name')
      const getFirstProductCategoryAtLimitSpy = jest.spyOn(basketProductLimits, 'getFirstProductCategoryAtLimit')

      const result = getProductLimitReached('product-3', basket, products, productsCategories)

      expect(getFirstProductCategoryAtLimitSpy).toHaveBeenCalledTimes(1)
      expect(getFirstProductCategoryAtLimitSpy.mock.calls[0]).toEqual(['product-3', basket, products, productsCategories])
      expect(result).toEqual({ type: 'category', value: 'category name' })
    })
  })

  describe('shortlistLimitReached', () => {
    let shortlist
    let shortlistRecipes
    let menuRecipes
    let menuRecipeStock
    const numPortions = 2
    beforeEach(() => {
      shortlistRecipes = Immutable.Map({ 456: 1, 567: 2, 678: 1 })
      shortlist = Immutable.fromJS({
        shortlistRecipes,
      })
      menuRecipes = Immutable.List(['456', '567', '678'])
      menuRecipeStock = Immutable.fromJS({
        456: { 2: 3000, 3: 1750 },
        567: { 2: 3000, 3: 1750 },
        678: { 2: 3000, 3: 1750 },
      })
    })

    test('should return shortlistLimitReached false if we have less than 5 recipes', () => {
      const limit = shortlistLimitReached(shortlist, menuRecipes, menuRecipeStock, numPortions)
      expect(limit).toEqual(false)
    })

    test('should return shortlistLimitReached true if we have five or more recipes', () => {
      shortlistRecipes = Immutable.Map({ 456: 20, 567: 5, 678: 25 })
      shortlist = Immutable.fromJS({
        shortlistRecipes,
      })
      const limit = shortlistLimitReached(shortlist, menuRecipes, menuRecipeStock, numPortions)
      expect(limit).toEqual(true)
    })
  })
})
