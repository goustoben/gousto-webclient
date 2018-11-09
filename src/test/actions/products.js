import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import actionTypes from 'actions/actionTypes'
import Immutable from 'immutable' /* eslint-disable new-cap */
import actions from 'actions/products'

describe('products actions', function() {
  describe('productDetailVisibilityChange', function() {
    it('should dispatch PRODUCT_DETAIL_VISIBILITY_CHANGE action', function() {
      const dispatchSpy = sinon.spy()
      const getStateSpy = sinon.stub().returns({ routing: { locationBeforeTransitions: {} } })
      actions.productDetailVisibilityChange()(dispatchSpy, getStateSpy)

      expect(dispatchSpy.args[0][0].type).to.equal(actionTypes.PRODUCT_DETAIL_VISIBILITY_CHANGE)
    })

    it('should set trackingData for show', function() {
      const dispatchSpy = sinon.spy()
      const getStateSpy = sinon.stub().returns({ routing: { locationBeforeTransitions: {} } })
      actions.productDetailVisibilityChange('product-123')(dispatchSpy, getStateSpy)

      expect(dispatchSpy.args[0][0]).to.deep.equal({
        type: actionTypes.PRODUCT_DETAIL_VISIBILITY_CHANGE,
        trackingData: {
          actionType: actionTypes.PRODUCT_DETAIL_VISIBILITY_CHANGE,
          show: true,
          productId: 'product-123',
        },
      })
    })

    it('should set trackingData for hide', function() {
      const dispatchSpy = sinon.spy()
      const getStateSpy = sinon.stub().returns({ routing: { locationBeforeTransitions: { query: { productDetailId: 'product-123' } } } })
      actions.productDetailVisibilityChange()(dispatchSpy, getStateSpy)

      expect(dispatchSpy.args[0][0]).to.deep.equal({
        type: actionTypes.PRODUCT_DETAIL_VISIBILITY_CHANGE,
        trackingData: {
          actionType: actionTypes.PRODUCT_DETAIL_VISIBILITY_CHANGE,
          show: false,
          productId: 'product-123',
        },
      })
    })

    it('should update url query parameter with the product id', function() {
      const injectedProductActions = require('inject-loader?react-router-redux!actions/products')({
        'react-router-redux': { push: i => i },
      }).default
      const dispatchSpy = sinon.spy()
      const getStateSpy = sinon.stub().returns({ routing: { locationBeforeTransitions: {} } })
      injectedProductActions.productDetailVisibilityChange('product-123')(dispatchSpy, getStateSpy)

      expect(dispatchSpy.args[1][0]).to.deep.equal({ query: { productDetailId: 'product-123' } })
    })
  })

  describe('productsLoadCategories', function() {
    let fetchProductCategoriesMock
    let statusPendingSpy
    let statusErrorSpy
    let dispatchSpy
    let getStateSpy
    let productActions

    beforeEach(function() {
      fetchProductCategoriesMock = sinon.stub().returns(Promise.resolve({ data: [{ id: 1, boxLimit: 3 }] }))
      statusPendingSpy = sinon.spy()
      statusErrorSpy = sinon.spy()
      dispatchSpy = sinon.spy()
      getStateSpy = sinon.stub().returns({
        auth: Immutable.fromJS({ accessToken: 'accessToken' }),
        products: Immutable.Map(),
        productsCategories: Immutable.Map(),
      })

      productActions = require('inject-loader?apis/products&./status!actions/products')({
        'apis/products': { fetchProductCategories: fetchProductCategoriesMock },
        './status': { pending: statusPendingSpy, error: statusErrorSpy },
      }).default
    })

    it('should dispatch status "pending" true for PRODUCT_CATEGORIES_RECEIVE action before fetching product categories', async function() {
      await productActions.productsLoadCategories()(dispatchSpy, getStateSpy)

      expect(statusPendingSpy.args[0]).to.deep.equal([actionTypes.PRODUCT_CATEGORIES_RECEIVE, true])
    })

    it('should dispatch status "pending" false for PRODUCT_CATEGORIES_RECEIVE action after fetching product categories', async function() {
      await productActions.productsLoadCategories()(dispatchSpy, getStateSpy)

      expect(statusPendingSpy.args[1]).to.deep.equal([actionTypes.PRODUCT_CATEGORIES_RECEIVE, false])
    })

    it('should dispatch status "error" true for PRODUCT_CATEGORIES_RECEIVE action if an error occurs while fetching product categories', async function() {
      fetchProductCategoriesMock.returns(new Promise(function() { throw new Error('error!') }))

      productActions = require('inject-loader?apis/products&./status&!actions/products')({
        'apis/products': { fetchProductCategories: fetchProductCategoriesMock },
        './status': { pending: statusPendingSpy, error: statusErrorSpy },
      }).default

      await productActions.productsLoadCategories()(dispatchSpy, getStateSpy)

      const statusErrorSpyCalls = statusErrorSpy.args[0]
      expect(statusErrorSpyCalls[0]).to.equal(actionTypes.PRODUCT_CATEGORIES_RECEIVE)
      expect(statusErrorSpyCalls[1]).to.equal(new Error('error!').message)
    })

    it('should fetch product categories if none have been fetched', async function() {
      await productActions.productsLoadCategories()(dispatchSpy, getStateSpy)

      const dispatchSpyCalls = dispatchSpy.args[1]
      expect(dispatchSpyCalls[0]).to.deep.equal({ type: actionTypes.PRODUCT_CATEGORIES_RECEIVE, categories: [{ id: 1, boxLimit: 3 }] })

      const fetchProductCategoriesMockCalls = fetchProductCategoriesMock.args[0]
      expect(fetchProductCategoriesMockCalls[0]).to.equal('accessToken')
    })
  })

  describe('productsLoadProducts', function() {
    let fetchProductsMock
    let statusPendingSpy
    let statusErrorSpy
    let dispatchSpy
    let getStateSpy
    let productActions

    beforeEach(function() {
      fetchProductsMock = sinon.stub().returns(Promise.resolve({ data: ['1', '2'] }))
      statusPendingSpy = sinon.spy()
      statusErrorSpy = sinon.spy()
      dispatchSpy = sinon.spy()
      getStateSpy = sinon.stub().returns({
        auth: Immutable.fromJS({ accessToken: 'accessToken' }),
        products: Immutable.OrderedMap({}),
      })

      productActions = require('inject-loader?apis/products&./status!actions/products')({
        'apis/products': { fetchProducts: fetchProductsMock },
        './status': { pending: statusPendingSpy, error: statusErrorSpy },
      }).default
    })

    it('should dispatch status "pending" true for PRODUCTS_RECEIVE action before fetching products', async function() {
      await productActions.productsLoadProducts()(dispatchSpy, getStateSpy)

      expect(statusPendingSpy.args[0]).to.deep.equal([actionTypes.PRODUCTS_RECEIVE, true])
    })

    it('should dispatch status "pending" false for PRODUCTS_RECEIVE action after fetching products', async function() {
      await productActions.productsLoadProducts()(dispatchSpy, getStateSpy)

      expect(statusPendingSpy.args[1]).to.deep.equal([actionTypes.PRODUCTS_RECEIVE, false])
    })

    it('should dispatch status "error" true for PRODUCTS_RECEIVE action if an error occurs while fetching products', async function() {
      fetchProductsMock.returns(new Promise(function() { throw new Error('error!') }))

      productActions = require('inject-loader?apis/products&./status&!actions/products')({
        'apis/products': { fetchProducts: fetchProductsMock },
        './status': { pending: statusPendingSpy, error: statusErrorSpy },
      }).default

      await productActions.productsLoadProducts()(dispatchSpy, getStateSpy)

      expect(statusErrorSpy.args[0]).to.deep.equal([actionTypes.PRODUCTS_RECEIVE, new Error('error!').message])
    })

    it('should fetch products by default if none have been fetched', async function() {
      await productActions.productsLoadProducts()(dispatchSpy, getStateSpy)

      const dispatchSpyCalls = dispatchSpy.args[1]
      expect(dispatchSpyCalls[0]).to.deep.equal({
        type: actionTypes.PRODUCTS_RECEIVE,
        products: ['1', '2'],
        cutoffDate: undefined,
      })

      const fetchProductsMockCalls = fetchProductsMock.args[0]
      expect(fetchProductsMockCalls[0]).to.equal('accessToken')
    })

    it('should not fetch products by default if there are products in product store & no cutoffDate is passed in', async function() {
      getStateSpy.returns({
        auth: Immutable.fromJS({ accessToken: 'accessToken' }),
        products: Immutable.fromJS({
          1: { id: '1', title: 'Title 1' },
        }),
      })

      await productActions.productsLoadProducts()(dispatchSpy, getStateSpy)

      expect(fetchProductsMock).to.not.have.been.called
    })

    it('should fetch products for given cutoff date when cutoffDate is passed in', async function() {
      await productActions.productsLoadProducts('whenCutoff timestamp')(dispatchSpy, getStateSpy)

      const dispatchSpyCalls = dispatchSpy.args[1]
      expect(dispatchSpyCalls[0]).to.deep.equal({
        type: actionTypes.PRODUCTS_RECEIVE,
        products: ['1', '2'],
        cutoffDate: 'whenCutoff timestamp',
      })

      const fetchProductsMockCalls = fetchProductsMock.args[0]
      expect(fetchProductsMockCalls[0]).to.equal('accessToken')
      expect(fetchProductsMockCalls[1]).to.equal('whenCutoff timestamp')
    })
  })

  describe('productsLoadRandomProducts', function() {
    let fetchRandomProductsMock
    let statusPendingSpy
    let statusErrorSpy
    let dispatchSpy
    let getStateStub
    let productActions

    beforeEach(function() {
      fetchRandomProductsMock = sinon.stub().returns(Promise.resolve({ data: ['1', '2'] }))
      statusPendingSpy = sinon.spy()
      statusErrorSpy = sinon.spy()
      dispatchSpy = sinon.spy()
      getStateStub = sinon.stub().returns({
        auth: Immutable.fromJS({ accessToken: 'accessToken' }),
        randomProducts: Immutable.List([]),
      })

      productActions = require('inject-loader?apis/products&./status!actions/products')({
        'apis/products': { fetchRandomProducts: fetchRandomProductsMock },
        './status': { pending: statusPendingSpy, error: statusErrorSpy },
      }).default
    })

    it('should dispatch status "pending" true for PRODUCTS_RANDOM_RECEIVE action before fetching products', async function() {
      await productActions.productsLoadRandomProducts()(dispatchSpy, getStateStub)

      expect(statusPendingSpy.args[0]).to.deep.equal([actionTypes.PRODUCTS_RANDOM_RECEIVE, true])
    })

    it('should dispatch status "pending" false for PRODUCTS_RANDOM_RECEIVE action after fetching products', async function() {
      await productActions.productsLoadRandomProducts()(dispatchSpy, getStateStub)

      expect(statusPendingSpy.args[1]).to.deep.equal([actionTypes.PRODUCTS_RANDOM_RECEIVE, false])
    })

    it('should dispatch status "error" true for PRODUCTS_RANDOM_RECEIVE action if an error occurs while fetching products', async function() {
      fetchRandomProductsMock.returns(new Promise(function() { throw new Error('error!') }))

      productActions = require('inject-loader?apis/products&./status&!actions/products')({
        'apis/products': { fetchRandomProducts: fetchRandomProductsMock },
        './status': { pending: statusPendingSpy, error: statusErrorSpy },
      }).default

      await productActions.productsLoadRandomProducts()(dispatchSpy, getStateStub)

      expect(statusErrorSpy.args[1]).to.deep.equal([actionTypes.PRODUCTS_RANDOM_RECEIVE, new Error('error!').message])
    })

    it('should fetch products by default if none have been fetched', async function() {
      await productActions.productsLoadRandomProducts()(dispatchSpy, getStateStub)

      const dispatchSpyCalls = dispatchSpy.args[2]
      expect(dispatchSpyCalls[0]).to.deep.equal({
        type: actionTypes.PRODUCTS_RANDOM_RECEIVE,
        products: ['1', '2'],
      })
      const fetchProductsMockCalls = fetchRandomProductsMock.args[0]
      expect(fetchProductsMockCalls[0]).to.equal('accessToken')
    })

    it('should not fetch products if there are products in randomProducts store', async function() {
      getStateStub.returns({
        auth: Immutable.fromJS({ accessToken: 'accessToken' }),
        randomProducts: Immutable.fromJS([
          { id: '1', title: 'Title 1' },
        ]),
      })
      await productActions.productsLoadRandomProducts()(dispatchSpy, getStateStub)

      expect(fetchRandomProductsMock).to.not.have.been.called
    })

    it('should call fetchRandomProducts with the parameter passed', async function() {
      fetchRandomProductsMock = sinon.stub().withArgs(1, [2]).returns(Promise.resolve({ data: ['3', '4'] }))
      productActions = require('inject-loader?apis/products&./status&!actions/products')({
        'apis/products': { fetchRandomProducts: fetchRandomProductsMock },
        './status': { pending: statusPendingSpy, error: statusErrorSpy },
      }).default
      await productActions.productsLoadRandomProducts(1, [2])(dispatchSpy, getStateStub)

      const dispatchSpyCalls = dispatchSpy.args[2]
      expect(dispatchSpyCalls[0]).to.deep.equal({
        type: actionTypes.PRODUCTS_RANDOM_RECEIVE,
        products: ['3', '4'],
      })
      expect(fetchRandomProductsMock.getCall(0).args).to.deep.equal([ 'accessToken', 1, [ 2 ] ])
    })
  })

  describe('productsLoadProductsById', function() {
    let fetchProductMock
    let statusPendingSpy
    let statusErrorSpy
    let dispatchSpy
    let getStateSpy
    let productActions
    let productAPI

    beforeEach(function() {
      productAPI = { fetchProduct: () => {} }
      fetchProductMock = sinon.stub(productAPI, 'fetchProduct', function(token, id) { return Promise.resolve({ data: { id } }) })
      statusPendingSpy = sinon.spy()
      statusErrorSpy = sinon.spy()
      dispatchSpy = sinon.spy()
      getStateSpy = sinon.stub().returns({
        auth: Immutable.fromJS({ accessToken: 'accessToken' }),
        products: Immutable.fromJS({
          1: { id: '1', title: 'Title 1' },
          3: { id: '3', title: 'Title 3' },
          7: { id: '7', title: 'Title 7' },
        }),
      })

      productActions = require('inject-loader?apis/products&./status!actions/products')({
        'apis/products': { fetchProduct: fetchProductMock },
        './status': { pending: statusPendingSpy, error: statusErrorSpy },
      }).default
    })

    it('should dispatch status "pending" true for PRODUCTS_RECEIVE action before fetching products', async function() {
      await productActions.productsLoadProductsById(['1', '2', '3', '4'])(dispatchSpy, getStateSpy)

      expect(statusPendingSpy.args[0]).to.deep.equal([actionTypes.PRODUCTS_RECEIVE, true])
    })

    it('should dispatch status "pending" false for PRODUCTS_RECEIVE action after fetching products', async function() {
      await productActions.productsLoadProductsById(['1', '2', '3', '4'])(dispatchSpy, getStateSpy)

      const statusPendingSpyCalls = statusPendingSpy.args[1]
      expect(statusPendingSpyCalls).to.deep.equal([actionTypes.PRODUCTS_RECEIVE, false])
    })

    it('should dispatch status "error" true for PRODUCTS_RECEIVE action if an error occurs while fetching products', async function() {
      fetchProductMock = sinon.stub().returns(new Promise(function() { throw new Error('error!') }))

      productActions = require('inject-loader?apis/products&./status&!actions/products')({
        'apis/products': { fetchProduct: fetchProductMock },
        './status': { pending: statusPendingSpy, error: statusErrorSpy },
      }).default

      await productActions.productsLoadProductsById(['1', '2', '3', '4'])(dispatchSpy, getStateSpy)

      const statusErrorSpyCalls = statusErrorSpy.args[0]
      expect(statusErrorSpyCalls[0]).to.equal(actionTypes.PRODUCTS_RECEIVE)
      expect(statusErrorSpyCalls[1]).to.equal(new Error('error!').message)
    })

    it('should fetch products for each specified id if not already fetched', async function() {
      await productActions.productsLoadProductsById(['1', '2', '3', '4'])(dispatchSpy, getStateSpy)

      let fetchProductMockCall = fetchProductMock.args[0]
      expect(fetchProductMockCall[0]).to.equal('accessToken')
      expect(fetchProductMockCall[1]).to.equal('2')
      fetchProductMockCall = fetchProductMock.args[1]
      expect(fetchProductMockCall[0]).to.equal('accessToken')
      expect(fetchProductMockCall[1]).to.equal('4')

      const dispatchSpyCalls = dispatchSpy.args[1]
      expect(dispatchSpyCalls[0]).to.deep.equal({ type: actionTypes.PRODUCTS_RECEIVE, products: [{ id: '2' }, { id: '4' }] })
    })

    it('should not fetch products if no new products are found in ids requested', async function() {
      await productActions.productsLoadProductsById(['1', '3', '7'])(dispatchSpy, getStateSpy)

      expect(fetchProductMock).to.not.have.been.called
    })
  })

  describe('productsLoadStock', function() {
    let fetchProductStockMock
    let statusPendingSpy
    let statusErrorSpy
    let dispatchSpy
    let getStateSpy
    let productActions

    beforeEach(function() {
      fetchProductStockMock = sinon.stub().returns(Promise.resolve({ data: { 'product-1': { number: 1000 } } }))
      statusPendingSpy = sinon.spy()
      statusErrorSpy = sinon.spy()
      dispatchSpy = sinon.spy()
      getStateSpy = sinon.stub().returns({
        auth: Immutable.fromJS({ accessToken: 'accessToken' }),
        products: Immutable.Map(),
        productsStock: Immutable.Map(),
      })

      productActions = require('inject-loader?apis/products&./status!actions/products')({
        'apis/products': { fetchProductStock: fetchProductStockMock },
        './status': { pending: statusPendingSpy, error: statusErrorSpy },
      }).default
    })

    it('should dispatch status "pending" true for PRODUCTS_STOCK_CHANGE action before fetching product stock', async function() {
      await productActions.productsLoadStock()(dispatchSpy, getStateSpy)

      expect(statusPendingSpy.args[0]).to.deep.equal([actionTypes.PRODUCTS_STOCK_CHANGE, true])
    })

    it('should dispatch status "pending" false for PRODUCTS_STOCK_CHANGE action after fetching product stock', async function() {
      await productActions.productsLoadStock()(dispatchSpy, getStateSpy)

      expect(statusPendingSpy.args[1]).to.deep.equal([actionTypes.PRODUCTS_STOCK_CHANGE, false])
    })

    it('should dispatch status "error" true for PRODUCTS_STOCK_CHANGE action if an error occurs while fetching product stock', async function() {
      fetchProductStockMock.returns(new Promise(function() { throw new Error('error!') }))

      productActions = require('inject-loader?apis/products&./status&!actions/products')({
        'apis/products': { fetchProductStock: fetchProductStockMock },
        './status': { pending: statusPendingSpy, error: statusErrorSpy },
      }).default

      await productActions.productsLoadStock()(dispatchSpy, getStateSpy)

      const statusErrorSpyCalls = statusErrorSpy.args[0]
      expect(statusErrorSpyCalls[0]).to.equal(actionTypes.PRODUCTS_STOCK_CHANGE)
      expect(statusErrorSpyCalls[1]).to.equal(new Error('error!').message)
    })

    it('should fetch product stock if it has not been fetched', async function() {
      await productActions.productsLoadStock()(dispatchSpy, getStateSpy)

      const dispatchSpyCalls = dispatchSpy.args[1]
      expect(dispatchSpyCalls[0]).to.deep.equal({ type: actionTypes.PRODUCTS_STOCK_CHANGE, stock: { 'product-1': 1000 } })

      const fetchProductStockMockCalls = fetchProductStockMock.args[0]
      expect(fetchProductStockMockCalls[0]).to.equal('accessToken')
    })
  })
})
