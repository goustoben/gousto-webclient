import { expect } from 'enzyme'
import Immutable from 'immutable' /* eslint-disable new-cap */
import { basketSum, okRecipes, getProductsQtyInCategory } from 'utils/basket'

describe('basket utils', function() {
  describe('basketSum', function() {
    it('sum up the number of recipes', function() {
      const basket = Immutable.fromJS({ '1': 1, '22': 1, '23': 2 })

      expect(basketSum(basket)).to.equal(4)
    })
  })

  describe('okRecipes', function() {
    it('should only return recipes that are in stock', function() {
      const recipes = Immutable.Map({ 456: 3, 567: 3, 678: 3 })
      const menuRecipes = Immutable.List(['456'])
      const menuRecipeStock = Immutable.fromJS({
        456: { 2: 3000, 3: 1750 },
        567: { 2: 0, 3: 0 },
        678: { 2: 0, 3: 0 },
      })
      const numPortions = 2

      const result = okRecipes(recipes, menuRecipes, menuRecipeStock, numPortions)
      expect(Immutable.is(result, Immutable.Map({ 456: 3 }))).to.be.true
    })

    it('should only return recipes that are in the current menu', function() {
      const recipes = Immutable.Map({ 456: 3, 567: 3, 678: 3 })
      const menuRecipes = Immutable.List(['678'])
      const menuRecipeStock = Immutable.fromJS({
        456: { 2: 3000, 3: 1750 },
        567: { 2: 3000, 3: 1750 },
        678: { 2: 3000, 3: 1750 },
      })
      const numPortions = 2

      const result = okRecipes(recipes, menuRecipes, menuRecipeStock, numPortions)
      expect(Immutable.is(result, Immutable.Map({ 678: 3 }))).to.be.true
    })

    it('should only return recipes that are in stock and in the current menu', function() {
      const recipes = Immutable.Map({ 456: 3, 567: 3, 678: 3 })
      const menuRecipes = Immutable.List(['456'])
      const menuRecipeStock = Immutable.fromJS({
        456: { 2: 3000, 3: 1750 },
        567: { 2: 0, 3: 0 },
        678: { 2: 0, 3: 0 },
      })
      const numPortions = 2

      const result = okRecipes(recipes, menuRecipes, menuRecipeStock, numPortions)
      expect(Immutable.is(result, Immutable.Map({ 456: 3 }))).to.be.true
    })

    it('should handle no stock', function() {
      const recipes = Immutable.Map({ 456: 3, 567: 3, 678: 3 })
      const menuRecipes = Immutable.List(['456'])
      const menuRecipeStock = Immutable.fromJS({
      })
      const numPortions = 2

      const result = okRecipes(recipes, menuRecipes, menuRecipeStock, numPortions)

      expect(Immutable.is(result, Immutable.Map({}))).to.be.true
    })

    it('should account for recipes that I have taken the last stock for', function() {
      const recipes = Immutable.Map({ 456: 3, 567: 3, 678: 3 })
      const menuRecipes = Immutable.List(['456'])
      const menuRecipeStock = Immutable.fromJS({
        456: { 2: 0, 3: 0 },
        567: { 2: 0, 3: 0 },
        678: { 2: 0, 3: 0 },
      })
      const numPortions = 2

      const result = okRecipes(recipes, menuRecipes, menuRecipeStock, numPortions)
      expect(Immutable.is(result, Immutable.Map({ 456: 3 }))).to.be.true
    })
  })

  describe('limitReached', function() {
    let limitReached

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

    beforeEach(function() {
      limitReached = require('inject-loader?config!utils/basket')({
        config: {
          basket: {
            maxRecipesNum: 5,
          },
          menu: {
            stockThreshold: 0,
          },
        },
      }).limitReached
    })

    it('should return true if the number of recipes in the basket is greater than config.basket.maxRecipesNum', function() {
      expect(defaultLimitReached()).to.be.true
    })

    it('should return false if the number of recipes in the basket is less than config.basket.maxRecipesNum', function() {
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
      expect(result).to.be.false
    })

    it('should disregard stock and the menu if the naive argument is true', function() {
      expect(defaultLimitReached(12)).to.be.false
    })

    it('should use new maximum recipe count if maxRecipesNum defined', function() {
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
      expect(result).to.be.false
    })

  })

  describe('getProductsQtyInCategory', function() {
    it('should return number of products in the given category', function() {
      const basket = Immutable.fromJS({
        products: { 'product-2': 1, 'product-3': 2 },
        gifts: {},
      })

      const products = Immutable.fromJS({
        'product-2': { categories: [{ id: 'cat-2' }, { id: 'cat-3' }] },
        'product-3': { categories: [{ id: 'cat-3' }, { id: 'cat-4' }] },
      })

      let result = getProductsQtyInCategory('cat-2', basket, products)
      expect(result).to.equal(1)

      result = getProductsQtyInCategory('cat-3', basket, products)
      expect(result).to.equal(3)
    })

    it('should include gift products by default', function() {
      const basket = Immutable.fromJS({
        products: { 'product-2': 1, 'product-3': 2 },
        gifts: { 'product-3': 1 },
      })

      const products = Immutable.fromJS({
        'product-2': { categories: [{ id: 'cat-2' }, { id: 'cat-3' }] },
        'product-3': { categories: [{ id: 'cat-3' }, { id: 'cat-4' }] },
      })

      let result = getProductsQtyInCategory('cat-2', basket, products)
      expect(result).to.equal(1)

      result = getProductsQtyInCategory('cat-3', basket, products)
      expect(result).to.equal(4)
    })

    it('should NOT include gift products if includeGiftProducts is set to false', function() {
      const basket = Immutable.fromJS({
        products: { 'product-2': 1, 'product-3': 2 },
        gifts: { 'product-3': 1 },
      })

      const products = Immutable.fromJS({
        'product-2': { categories: [{ id: 'cat-2' }, { id: 'cat-3' }] },
        'product-3': { categories: [{ id: 'cat-3' }, { id: 'cat-4' }] },
      })

      let result = getProductsQtyInCategory('cat-2', basket, products, false)
      expect(result).to.equal(1)

      result = getProductsQtyInCategory('cat-3', basket, products, false)
      expect(result).to.equal(3)
    })
  })

  describe('getProductLimitReached', function() {
    it('should return object containing type "box" & value of max products allowed when total products limit reached', function() {
      const productsOverallLimitReachedSpy = sinon.stub().returns(true)
      const getProductLimitReached = require('inject-loader?config&utils/basketProductLimits!utils/basket')({
        config: {
          basket: {
            maxProductsNum: 10,
          },
        },
        'utils/basketProductLimits': { productsOverallLimitReached: productsOverallLimitReachedSpy },
      }).getProductLimitReached

      const result = getProductLimitReached('productId', 'basket', 'products', 'productsCategories')

      expect(productsOverallLimitReachedSpy).to.have.been.calledOnce
      expect(productsOverallLimitReachedSpy.args[0][0]).to.equal('basket')
      expect(result).to.deep.equal({ type: 'box', value: 10 })
    })

    it('should return object containing type "item" & value equal to max of the specific item allowed when total products limit reached', function() {
      const productsOverallLimitReachedSpy = sinon.stub().returns(false)
      const getProductItemLimitReachedSpy = sinon.stub().returns(3)
      const getProductLimitReached = require('inject-loader?config&utils/basketProductLimits!utils/basket')({
        config: {
          basket: {
            maxProductsNum: 10,
          },
        },
        'utils/basketProductLimits': {
          productsOverallLimitReached: productsOverallLimitReachedSpy,
          getProductItemLimitReached: getProductItemLimitReachedSpy,
        },
      }).getProductLimitReached

      const result = getProductLimitReached('productId', 'basket', 'products', 'productsCategories')

      expect(getProductItemLimitReachedSpy).to.have.been.calledOnce
      expect(getProductItemLimitReachedSpy.args[0]).to.deep.equal(['productId', 'basket', 'products'])
      expect(result).to.deep.equal({ type: 'item', value: 3 })
    })

    it('should return object containing type "category" & value equal to title of the first category which has reached its limit', function() {
      const productsOverallLimitReachedSpy = sinon.stub().returns(false)
      const getProductItemLimitReachedSpy = sinon.stub().returns(false)
      const getFirstProductCategoryAtLimitSpy = sinon.stub().returns('category name')
      const getProductLimitReached = require('inject-loader?config&utils/basketProductLimits!utils/basket')({
        config: {
          basket: {
            maxProductsNum: 10,
          },
        },
        'utils/basketProductLimits': {
          productsOverallLimitReached: productsOverallLimitReachedSpy,
          getProductItemLimitReached: getProductItemLimitReachedSpy,
          getFirstProductCategoryAtLimit: getFirstProductCategoryAtLimitSpy,
        },
      }).getProductLimitReached

      const result = getProductLimitReached('productId', 'basket', 'products', 'productsCategories')

      expect(getFirstProductCategoryAtLimitSpy).to.have.been.calledOnce
      expect(getFirstProductCategoryAtLimitSpy.args[0]).to.deep.equal(['productId', 'basket', 'products', 'productsCategories'])
      expect(result).to.deep.equal({ type: 'category', value: 'category name' })
    })
  })
})
