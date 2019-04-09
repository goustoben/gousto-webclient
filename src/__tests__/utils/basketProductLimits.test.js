import Immutable from 'immutable' /* eslint-disable new-cap */
import { getProductItemLimitReached, productsOverallLimitReached, getFirstProductCategoryAtLimit, productCanBeAdded } from 'utils/basketProductLimits'
import * as basketUtils from 'utils/basket'

jest.mock('utils/basket', () => ({
  getProductsQtyInCategory: jest.fn(),
  getProductLimitReached: jest.fn()
}))

describe('basketProductLimits utils', function() {
  describe('productsOverallLimitReached', function() {
    it('should return true if overall box limit has been reached', function() {

      let basket = Immutable.fromJS({
        products: { 'product-1': 5, 'product-2': 5 },
        gifts: {},
      })
      expect(productsOverallLimitReached(basket)).toBe(true)

      basket = Immutable.fromJS({
        products: { 'product-1': 5, 'product-2': 6 },
        gifts: {},
      })
      expect(productsOverallLimitReached(basket)).toBe(true)
    })

    it('should account for gift products by default', function() {
      const basket = Immutable.fromJS({
        products: { 'product-1': 5, 'product-2': 3 },
        gifts: { 'product-1': 2 },
      })

      expect(productsOverallLimitReached(basket)).toBe(true)
    })

    it('should return false if overall box limit has NOT been reached', function() {
      const basket = Immutable.fromJS({
        products: { 'product-1': 5, 'product-2': 3 },
        gifts: { 'product-1': 1 },
      })

      expect(productsOverallLimitReached(basket)).toBe(false)
    })

    it('should NOT account for gift products if includeGiftProducts is false', function() {
      const basket = Immutable.fromJS({
        products: { 'product-1': 5, 'product-2': 3 },
        gifts: { 'product-1': 2 },
      })

      expect(productsOverallLimitReached(basket, false)).toBe(false)
    })
  })

  describe('getFirstProductCategoryAtLimit', function() {
    let basket
    beforeEach(() => {
      basket = Immutable.fromJS({
        products: { 'product-1': 5, 'product-2': 6 },
        gifts: {},
      })
    })
    it('should return name of first category found to have reached its category limit for any given product', function() {
      const products = Immutable.fromJS({
        'product-1': {
          id: 'product-1',
          categories: [
            { id: 'cat-1' },
            { id: 'cat-2' },
            { id: 'cat-3' },
          ],
        },
        'product-2': {
          id: 'product-2',
          categories: [
            { id: 'cat-1' },
            { id: 'cat-3' },
            { id: 'cat-4' },
          ],
        },
      })

      const productsCategories = Immutable.fromJS({
        'cat-1': {
          id: 'cat-1',
          boxLimit: 6,
          title: 'Category 1',
        },
        'cat-2': {
          id: 'cat-2',
          boxLimit: 5,
          title: 'Category 2',
        },
        'cat-3': {
          id: 'cat-3',
          boxLimit: 7,
          title: 'Category 3',
        },
        'cat-4': {
          id: 'cat-4',
          boxLimit: 4,
          title: 'Category 4',
        },
      })

      basketUtils.getProductsQtyInCategory.mockReturnValue(5)

      let result = getFirstProductCategoryAtLimit('product-1', basket, products, productsCategories, false)
      expect(result).toEqual('Category 2')

      result = getFirstProductCategoryAtLimit('product-2', basket, products, productsCategories, false)
      expect(result).toEqual('Category 4')
    })

    it('should return false if none of the product\'s categories are at their limit', function() {
      const products = Immutable.fromJS({
        'product-1': {
          id: 'product-1',
          categories: [
            { id: 'cat-1' },
            { id: 'cat-2' },
            { id: 'cat-3' },
          ],
        },
        'product-2': {
          id: 'product-2',
        },
      })

      const productsCategories = Immutable.fromJS({
        'cat-1': {
          id: 'cat-1',
          boxLimit: 6,
          title: 'Category 1',
        },
        'cat-2': {
          id: 'cat-2',
          boxLimit: 5,
          title: 'Category 2',
        },
        'cat-3': {
          id: 'cat-3',
          boxLimit: 4,
          title: 'Category 3',
        },
        'cat-4': {
          id: 'cat-4',
          boxLimit: 7,
          title: 'Category 4',
        },
      })

      basketUtils.getProductsQtyInCategory.mockReturnValue(3)
      
      const result = getFirstProductCategoryAtLimit('product-1', basket, products, productsCategories)
      expect(result).toBe(false)
    })
  })

  describe('getProductItemLimitReached', function() {
    it('should return item limit of given product if item limit has been reached', function() {
      const basket = Immutable.fromJS({
        products: { 'product-1': 5, 'product-2': 3 },
        gifts: {},
      })

      const products = Immutable.fromJS({
        'product-1': {
          id: 'product-1',
          boxLimit: 4,
        },
        'product-2': {
          id: 'product-2',
          boxLimit: 4,
        },
      })

      expect(getProductItemLimitReached('product-1', basket, products)).toEqual(4)
      expect(getProductItemLimitReached('product-2', basket, products)).toBe(false)
    })

    it('should account for gift products by default', function() {
      const basket = Immutable.fromJS({
        products: { 'product-1': 3, 'product-2': 3 },
        gifts: { 'product-1': 2 },
      })

      const products = Immutable.fromJS({
        'product-1': {
          id: 'product-1',
          boxLimit: 4,
        },
      })

      expect(getProductItemLimitReached('product-1', basket, products)).toEqual(4)
    })

    it('should return false if product is not at item limit', function() {
      const basket = Immutable.fromJS({
        products: { 'product-1': 3 },
      })

      const products = Immutable.fromJS({
        'product-1': {
          id: 'product-1',
          boxLimit: 4,
        },
      })

      expect(getProductItemLimitReached('product-1', basket, products)).toBe(false)
    })

    it('should NOT account for gift products if includeGiftProducts is false', function() {
      const basket = Immutable.fromJS({
        products: { 'product-1': 3, 'product-2': 3 },
        gifts: { 'product-1': 2 },
      })

      const products = Immutable.fromJS({
        'product-1': {
          id: 'product-1',
          boxLimit: 4,
        },
      })

      expect(getProductItemLimitReached('product-1', basket, products, false)).toBe(false)
    })
  })

  describe('productCanBeAdded', function() {
    it('should return true if product is in stock & has not hit any limits', function() {
      const productsStock = Immutable.fromJS({
        'product-1': 999,
        'product-2': 1,
      })

      expect(productCanBeAdded('product-1', 'basket', 'products', productsStock, 'productsCategories')).toBe(true)
      expect(productCanBeAdded('product-2', 'basket', 'products', productsStock, 'productsCategories')).toBe(true)
    })

    it('should return false if product is not in stock', function() {
      const productsStock = Immutable.fromJS({
        'product-1': 0,
      })

      expect(productCanBeAdded('product-1', 'basket', 'products', productsStock, 'productsCategories')).toBe(false)
      expect(productCanBeAdded('product-2', 'basket', 'products', productsStock, 'productsCategories')).toBe(false)
    })

    it('should return false if product has hit any of its limits', function() {
      basketUtils.getProductLimitReached.mockReturnValue(true)

      const productsStock = Immutable.fromJS({
        'product-1': 999,
      })
      
      expect(productCanBeAdded('product-1', 'basket', 'products', productsStock, 'productsCategories')).toBe(false)
    })
  })
})
