import Immutable from 'immutable'
import { basketSum, okRecipes, getProductsQtyInCategory, limitReached, getProductLimitReached, basketResetPersistent , naiveLimitReached } from 'utils/basket'
import * as basketProductLimits from 'utils/basketProductLimits'
import * as cookieHelper2 from '../cookieHelper2'

jest.mock('utils/basketProductLimits', () => ({
  getAllBasketProducts: jest.fn(),
  getFirstProductCategoryAtLimit: jest.fn(),
  getProductItemLimitReached: jest.fn(),
  productsOverallLimitReached: jest.fn(),
}))

jest.mock('utils/deliveries', () => ({
  getSlot: jest.fn()
}))

describe('basket utils', () => {
  describe('basketSum', () => {
    test('sum up the number of recipes', () => {
      const basket = Immutable.fromJS({ 1: 1, 22: 1, 23: 2 })

      expect(basketSum(basket)).toEqual(4)
    })
  })

  describe('okRecipes', () => {
    test('should only return recipes that are in stock', () => {
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

    test('should only return recipes that are in the current menu', () => {
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

    test('should only return recipes that are in stock and in the current menu', () => {
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

    test('should handle no stock', () => {
      const recipes = Immutable.Map({ 456: 3, 567: 3, 678: 3 })
      const menuRecipes = Immutable.List(['456'])
      const menuRecipeStock = Immutable.fromJS({
      })
      const numPortions = 2

      const result = okRecipes(recipes, menuRecipes, menuRecipeStock, numPortions)

      expect(Immutable.is(result, Immutable.Map({}))).toBe(true)
    })

    test('should account for recipes that I have taken the last stock for', () => {
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

  describe('naiveLimitReached', () => {
    describe('given an empty basket of recipes', () => {
      let basket

      beforeEach(() => {
        basket = Immutable.fromJS({
          recipes: Immutable.Map({ }),
          numPortions: 2,
        })
      })

      describe('when check if limit reached', () => {
        let result

        beforeEach(() => {
          result = naiveLimitReached(basket)
        })

        test('should equal false', () => {
          expect(result).toBeFalsy()
        })
      })
    })

    describe('given a basket of less than the default maximum recipes', () => {
      let basket

      beforeEach(() => {
        basket = Immutable.fromJS({
          recipes: Immutable.Map({ 456: 2 }),
          numPortions: 2,
        })
      })

      describe('when check if limit reached', () => {
        let result

        beforeEach(() => {
          result = naiveLimitReached(basket)
        })

        test('should equal false', () => {
          expect(result).toBeFalsy()
        })
      })
    })

    describe('given a basket of greater than the default maximum recipes', () => {
      let basket

      beforeEach(() => {
        basket = Immutable.fromJS({
          recipes: Immutable.Map({ 456: 5 }),
          numPortions: 4,
        })
      })

      describe('when check if limit reached', () => {
        let result

        beforeEach(() => {
          result = naiveLimitReached(basket)
        })

        test('should equal false', () => {
          expect(result).toBeTruthy()
        })
      })
    })

    describe('given a basket of 6 recipes', () => {
      let basket
      let result

      beforeEach(() => {
        basket = Immutable.fromJS({
          recipes: Immutable.Map({ 456: 4, 567: 2 }),
          numPortions: 2,
        })
      })

      describe('when check limit of 7 recipes', () => {
        beforeEach(() => {
          result = naiveLimitReached(basket, 7)
        })

        test('should equal false', () => {
          expect(result).toBeFalsy()
        })
      })

      describe('when check limit of 4 recipes', () => {
        beforeEach(() => {
          result = naiveLimitReached(basket, 4)
        })

        test('should equal true', () => {
          expect(result).toBeTruthy()
        })
      })
    })
  })

  describe('limitReached', () => {
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

    test('should return true if the number of recipes in the basket is greater than config.basket.maxRecipesNum', () => {
      expect(defaultLimitReached()).toBe(true)
    })

    test('should return false if the number of recipes in the basket is less than config.basket.maxRecipesNum', () => {
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

    test('should disregard stock and the menu if the naive argument is true', () => {
      expect(defaultLimitReached(12)).toBe(false)
    })

    test('should use new maximum recipe count if maxRecipesNum defined', () => {
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

  describe('getProductsQtyInCategory', () => {
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
    test('should return number of products in the given category', () => {
      let result = getProductsQtyInCategory('cat-2', basket, products, false)
      expect(result).toEqual(1)

      result = getProductsQtyInCategory('cat-3', basket, products, false)
      expect(result).toEqual(3)
    })

    test('should include gift products by default', () => {
      basketProductLimits.getAllBasketProducts.mockReturnValueOnce(Immutable.fromJS({
        'product-3': 3,
        'product-2': 1,
      }))
      let result = getProductsQtyInCategory('cat-2', basket, products, false)
      expect(result).toEqual(1)

      result = getProductsQtyInCategory('cat-3', basket, products)
      expect(result).toEqual(4)
    })

    test('should NOT include gift products if includeGiftProducts is set to false', () => {
      let result = getProductsQtyInCategory('cat-2', basket, products, false)
      expect(result).toEqual(1)

      result = getProductsQtyInCategory('cat-3', basket, products, false)
      expect(result).toEqual(3)
    })
  })

  describe('getProductLimitReached', () => {
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
    test('should return object containing type "box" & value of max products allowed when total products limit reached', () => {
      basketProductLimits.productsOverallLimitReached.mockReturnValueOnce(true)
      const productsOverallLimitReachedSpy = jest.spyOn(basketProductLimits, 'productsOverallLimitReached')

      const result = getProductLimitReached('product-3', basket, products, productsCategories)

      expect(productsOverallLimitReachedSpy).toHaveBeenCalledTimes(1)
      expect(productsOverallLimitReachedSpy.mock.calls[0][0]).toEqual(basket)
      expect(result).toEqual({ type: 'box', value: 10 })
    })

    test('should return object containing type "item" & value equal to max of the specific item allowed when total products limit reached', () => {
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

    test('should return object containing type "category" & value equal to title of the first category which has reached its limit', () => {
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

  describe('basketResetPersistent', () => {
    test('sum up the number of recipes', () => {
      const cookie = {}
      const unsetSpy = jest.spyOn(cookieHelper2, 'unset').mockImplementation()

      basketResetPersistent(cookie)

      expect(unsetSpy).toBeCalledTimes(8)
      expect(unsetSpy).toBeCalledWith(cookie, 'goustoStateStore_basket_slotId')
      expect(unsetSpy).toBeCalledWith(cookie, 'goustoStateStore_basket_recipes')
      expect(unsetSpy).toBeCalledWith(cookie, 'goustoStateStore_basket_previewOrderId')
      expect(unsetSpy).toBeCalledWith(cookie, 'goustoStateStore_basket_postcode')
      expect(unsetSpy).toBeCalledWith(cookie, 'goustoStateStore_basket_numPortions')
      expect(unsetSpy).toBeCalledWith(cookie, 'goustoStateStore_basket_numRecipes')
      expect(unsetSpy).toBeCalledWith(cookie, 'goustoStateStore_basket_date')
      expect(unsetSpy).toBeCalledWith(cookie, 'goustoStateStore_menu_selectedRecipeVariants')
    })
  })
})
