import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable' /* eslint-disable new-cap */

import Welcome from 'routes/Welcome/VariationImmediate/Welcome'
import SubHeader from 'routes/Welcome/SubHeader'
import ExpectationsCarousel from 'routes/Welcome/ExpectationsCarousel'
import ProductDetailOverlay from 'routes/Welcome/ProductDetailOverlay'
import OrderSummary from 'containers/welcome/OrderSummary'

describe('Welcome VariationImmediate Page', function() {
  describe('rendering', function() {
    let wrapper
    beforeEach(function() {
      wrapper = shallow(
        <Welcome
          isAuthenticated
          orderId="2"
          products={Immutable.Map()}
          productsLoadProductsById={function() {}}
          productsLoadProducts={function() {}}
          recipes={Immutable.Map()}
          recipesLoadRecipesById={function() {}}
          user={Immutable.Map()}
          userLoadOrders={function() {}}
        />
      )
    })

    it('should return section', function() {
      expect(wrapper.type()).to.equal('section')
    })

    it('should render 1 Welcome SubHeader', function() {
      expect(wrapper.find(SubHeader).length).to.equal(1)
    })

    it('should render 1 ExpectationsCarousel', function() {
      expect(wrapper.find(ExpectationsCarousel).length).to.equal(1)
    })

    it('should render 1 OrderSummary', function() {
      expect(wrapper.find(OrderSummary).length).to.equal(1)
    })

    it('should render 1 ProductDetailOverlay', function() {
      expect(wrapper.find(ProductDetailOverlay).length).to.equal(1)
    })
  })

  describe('fetchData', function() {
    let userLoadOrders
    let recipesLoadRecipesById
    let productsLoadProductsById
    let productsLoadProducts
    let dispatch
    let getState
    let getUserOrderById
    let getUserOrderRecipeIds
    let getUserOrderProductIds
    let getUserOrderGiftProductIds
    let WelcomeRoute
    let contentLoadContentByPageSlug

    beforeEach(function() {
      contentLoadContentByPageSlug = sinon.stub().returns(Promise.resolve())
      userLoadOrders = sinon.stub().returns(Promise.resolve())
      recipesLoadRecipesById = sinon.stub().returns(Promise.resolve())
      productsLoadProductsById = sinon.stub().returns(Promise.resolve())
      productsLoadProducts = sinon.stub().returns(Promise.resolve())
      getUserOrderById = sinon.stub().returns(Immutable.fromJS({ phase: 'open' }))
      getUserOrderRecipeIds = sinon.stub().returns(['1', '2', '3', '4'])
      getUserOrderProductIds = sinon.stub().returns(['5', '6'])
      getUserOrderGiftProductIds = sinon.stub().returns(['7', '8'])

      WelcomeRoute = require('inject-loader?actions&utils/user!routes/Welcome/VariationImmediate/Welcome')({
        actions: { contentLoadContentByPageSlug, userLoadOrders, recipesLoadRecipesById, productsLoadProductsById, productsLoadProducts },
        'utils/user': { getUserOrderById, getUserOrderRecipeIds, getUserOrderProductIds, getUserOrderGiftProductIds },
      }).default

      dispatch = sinon.stub().returns(new Promise(resolve => { resolve() }))
      getState = sinon.stub().returns({
        auth: Immutable.fromJS({ accessToken: 'access-token', isAuthenticated: true }),
        user: Immutable.fromJS({ orders: [] }),
        products: Immutable.fromJS([]),
        recipes: Immutable.fromJS({}),
      })
    })

    it('should call dispatch 5 times', async function() {
      await WelcomeRoute.fetchData({
        store: { dispatch, getState },
        params: { orderId: 'order-123' },
        query: {},
      })

      expect(dispatch.callCount).to.equal(5)
    })

    it('should call userLoadOrders', async function() {
      await WelcomeRoute.fetchData({
        store: { dispatch, getState },
        params: { orderId: 'order-123' },
        query: {},
      })

      expect(userLoadOrders).to.have.been.calledOnce
    })

    it('should call recipesLoadRecipesById', async function() {
      await WelcomeRoute.fetchData({
        store: { dispatch, getState },
        params: { orderId: 'order-123' },
        query: {},
      })

      expect(recipesLoadRecipesById).to.have.been.calledOnce
      expect(recipesLoadRecipesById.args[0][0]).to.deep.equal(['1', '2', '3', '4'])
    })

    it('should call productsLoadProductsById', async function() {
      await WelcomeRoute.fetchData({
        store: { dispatch, getState },
        params: { orderId: 'order-123' },
        query: {},
      })

      expect(productsLoadProductsById).to.have.been.calledOnce
      expect(productsLoadProductsById.args[0][0]).to.deep.equal(['5', '6', '7', '8'])
    })

    it('should call productsLoadProducts', async function() {
      await WelcomeRoute.fetchData({
        store: { dispatch, getState },
        params: { orderId: 'order-123' },
        query: {},
      })

      expect(productsLoadProducts).to.have.been.calledOnce
      expect(productsLoadProducts.args[0][0]).to.be.undefined
    })
  })
})
