import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import Immutable from 'immutable' /* eslint-disable new-cap */
import { getProductItemLimitReached } from 'utils/basketProductLimits'

describe('basketProductLimits utils', function() {
  describe('productsOverallLimitReached', function() {
    it('should return true if overall box limit has been reached', function() {
      const productsOverallLimitReached = require('inject-loader?config!utils/basketProductLimits')({
        config: {
          basket: {
            maxProductsNum: 10,
          },
        },
      }).productsOverallLimitReached

      let basket = Immutable.fromJS({
        products: { 'product-1': 5, 'product-2': 5 },
        gifts: {},
      })
      expect(productsOverallLimitReached(basket)).to.be.true

      basket = Immutable.fromJS({
        products: { 'product-1': 5, 'product-2': 6 },
        gifts: {},
      })
      expect(productsOverallLimitReached(basket)).to.be.true
    })

    it('should account for gift products by default', function() {
      const productsOverallLimitReached = require('inject-loader?config!utils/basketProductLimits')({
        config: {
          basket: {
            maxProductsNum: 10,
          },
        },
      }).productsOverallLimitReached

      const basket = Immutable.fromJS({
        products: { 'product-1': 5, 'product-2': 3 },
        gifts: { 'product-1': 2 },
      })

      expect(productsOverallLimitReached(basket)).to.be.true
    })

    it('should return false if overall box limit has NOT been reached', function() {
      const productsOverallLimitReached = require('inject-loader?config!utils/basketProductLimits')({
        config: {
          basket: {
            maxProductsNum: 10,
          },
        },
      }).productsOverallLimitReached

      const basket = Immutable.fromJS({
        products: { 'product-1': 5, 'product-2': 3 },
        gifts: { 'product-1': 1 },
      })

      expect(productsOverallLimitReached(basket)).to.be.false
    })

    it('should NOT account for gift products if includeGiftProducts is false', function() {
      const productsOverallLimitReached = require('inject-loader?config!utils/basketProductLimits')({
        config: {
          basket: {
            maxProductsNum: 10,
          },
        },
      }).productsOverallLimitReached

      const basket = Immutable.fromJS({
        products: { 'product-1': 5, 'product-2': 3 },
        gifts: { 'product-1': 2 },
      })

      expect(productsOverallLimitReached(basket, false)).to.be.false
    })
  })

  describe('getFirstProductCategoryAtLimit', function() {
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

      const getProductsQtyInCategorySpy = sinon.stub().returns('5')

      const getFirstProductCategoryAtLimit = require('inject-loader?utils/basket!utils/basketProductLimits')({
        'utils/basket': { getProductsQtyInCategory: getProductsQtyInCategorySpy },
      }).getFirstProductCategoryAtLimit

      let result = getFirstProductCategoryAtLimit('product-1', 'basket', products, productsCategories)
      expect(result).to.equal('Category 2')

      result = getFirstProductCategoryAtLimit('product-2', 'basket', products, productsCategories)
      expect(result).to.equal('Category 4')
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

      const getProductsQtyInCategorySpy = sinon.stub().returns('3')

      const getFirstProductCategoryAtLimit = require('inject-loader?utils/basket!utils/basketProductLimits')({
        'utils/basket': { getProductsQtyInCategory: getProductsQtyInCategorySpy },
      }).getFirstProductCategoryAtLimit

      const result = getFirstProductCategoryAtLimit('product-1', 'basket', products, productsCategories)
      expect(result).to.be.false
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

      expect(getProductItemLimitReached('product-1', basket, products)).to.equal(4)
      expect(getProductItemLimitReached('product-2', basket, products)).to.be.false
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

      expect(getProductItemLimitReached('product-1', basket, products)).to.equal(4)
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

      expect(getProductItemLimitReached('product-1', basket, products)).to.be.false
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

      expect(getProductItemLimitReached('product-1', basket, products, false)).to.be.false
    })
  })

  describe('productCanBeAdded', function() {
    it('should return true if product is in stock & has not hit any limits', function() {
      const getProductLimitReachedSpy = sinon.stub().returns(false)

      const productsStock = Immutable.fromJS({
        'product-1': 999,
        'product-2': 1,
      })

      const productCanBeAdded = require('inject-loader?utils/basket!utils/basketProductLimits')({
        'utils/basket': { getProductLimitReached: getProductLimitReachedSpy },
      }).productCanBeAdded

      expect(productCanBeAdded('product-1', 'basket', 'products', productsStock, 'productsCategories')).to.be.true
      expect(productCanBeAdded('product-2', 'basket', 'products', productsStock, 'productsCategories')).to.be.true
    })

    it('should return false if product is not in stock', function() {
      const getProductLimitReachedSpy = sinon.stub().returns(false)

      const productCanBeAdded = require('inject-loader?utils/basket!utils/basketProductLimits')({
        'utils/basket': { getProductLimitReached: getProductLimitReachedSpy },
      }).productCanBeAdded

      const productsStock = Immutable.fromJS({
        'product-1': 0,
      })

      expect(productCanBeAdded('product-1', 'basket', 'products', productsStock, 'productsCategories')).to.be.false
      expect(productCanBeAdded('product-2', 'basket', 'products', productsStock, 'productsCategories')).to.be.false
    })

    it('should return false if product has hit any of its limits', function() {
      const getProductLimitReachedSpy = sinon.stub().returns(true)

      const productsStock = Immutable.fromJS({
        'product-1': 999,
      })

      const productCanBeAdded = require('inject-loader?utils/basket!utils/basketProductLimits')({
        'utils/basket': { getProductLimitReached: getProductLimitReachedSpy },
      }).productCanBeAdded

      expect(productCanBeAdded('product-1', 'basket', 'products', productsStock, 'productsCategories')).to.be.false
    })
  })
})
