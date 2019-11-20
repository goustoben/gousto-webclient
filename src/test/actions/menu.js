import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

import Immutable from 'immutable'

import actionTypes from 'actions/actionTypes'
import menuActions from 'actions/menu'
import statusActions from 'actions/status'
import * as boxPricesApi from 'apis/boxPrices'
import logger from 'utils/logger'
chai.use(sinonChai)

describe('menu actions', function () {
  afterEach(function (done) {
    done()
  })
  describe('menuReceiveBoxPrices', function () {
    it('should return MENU_BOX_PRICES_RECEIVE type with prices & tariffId', function () {
      expect(menuActions.menuReceiveBoxPrices('test-prices', 'test-tariffId')).to.deep.equal({
        type: actionTypes.MENU_BOX_PRICES_RECEIVE,
        prices: 'test-prices',
        tariffId: 'test-tariffId',
      })
    })
  })

  describe('menuLoadMenu', function () {
    let dispatchSpy
    let getStateSpy
    let fetchRecipesMock
    let limitReachedMock
    let getSlot
    let actions
    let fetchCollectionsSpy
    let fetchCollectionRecipesSpy
    let getCutoffDateTime
    let recipes

    beforeEach(function () {
      dispatchSpy = sinon.spy()
      getStateSpy = sinon.stub().returns({
        basket: Immutable.Map({ date: '2016-06-26' }),
        auth: Immutable.fromJS({ accessToken: 'blah', refreshToken: 'blabla' }),
        features: Immutable.Map({}),
      })
      fetchRecipesMock = sinon.stub().returns(new Promise(resolve => { resolve({ data: [1, 2, 3] }) }))
      fetchCollectionsSpy = sinon.stub().returns(new Promise(resolve => resolve({ data: undefined })))
      recipes = []
      fetchCollectionRecipesSpy = sinon.stub().returns(new Promise(resolve => resolve({ data: recipes })))

      limitReachedMock = () => false

      getSlot = sinon.stub().returns(Immutable.Map({ whenCutoff: '2016-06-26' }))

      getCutoffDateTime = sinon.stub().returns('2016-06-26')

      actions = require('inject-loader?apis/recipes&utils/deliveries&utils/basket!actions/menu')({
        'apis/recipes': { fetchRecipes: fetchRecipesMock },
        'utils/deliveries': { getSlot, getCutoffDateTime },
        'utils/basket': { limitReached: limitReachedMock },
      }).default
    })

    it('should fetch menu and dispatch actions with type RECIPES_RECEIVE* and BASKET_LIMIT_REACHED', async function () {
      await actions.menuLoadMenu()(dispatchSpy, getStateSpy)

      expect(getStateSpy.callCount).to.equal(4)

      expect(dispatchSpy.callCount).to.equal(4)

      let dispatchSpyArgs = dispatchSpy.args[0]
      expect(dispatchSpyArgs[0]).to.deep.equal({ type: actionTypes.MENU_RECIPES_RECEIVE_PENDING, pending: true })

      dispatchSpyArgs = dispatchSpy.args[1]
      expect(dispatchSpyArgs[0]).to.deep.equal({ type: actionTypes.RECIPES_RECEIVE, recipes: [1, 2, 3] })

      const resultDispatchSpyArgs = dispatchSpy.args[2]
      expect(resultDispatchSpyArgs[0]).to.deep.equal({ type: actionTypes.MENU_RECIPES_RECEIVE_PENDING, pending: false })

      dispatchSpyArgs = dispatchSpy.args[3]
      expect(dispatchSpyArgs[0]).to.deep.equal({ type: actionTypes.BASKET_LIMIT_REACHED, limitReached: false })

      expect(fetchRecipesMock).to.have.been.calledOnce
      const fetchRecipesArgs = fetchRecipesMock.args[0]
      expect(fetchRecipesArgs[1]).to.equal('')
      expect(fetchRecipesArgs[2]).to.deep.equal({
        'filters[available_on]': '2016-06-26',
        'includes[]': ['ingredients', 'allergens']
      })

    })

    it('should fetch menu and dispatch actions with type RECIPES_RECEIVE and BASKET_LIMIT_REACHED and use cutoffDateTime when provided', async function () {
      dispatchSpy = sinon.spy()
      getStateSpy = sinon.stub().returns({
        basket: Immutable.Map({ date: '', slotId: '' }),
        auth: Immutable.fromJS({ accessToken: 'accessToken', refreshToken: 'refreshToken' }),
        features: Immutable.Map({}),
      })
      fetchRecipesMock = sinon.stub().returns(new Promise(resolve => { resolve({ data: [1, 2, 3] }) }))

      getSlot = sinon.stub().returns(Immutable.Map({ whenCutoff: '2016-06-26' }))
      getCutoffDateTime = sinon.stub().returns('2016-06-26')

      actions = require('inject-loader?apis/recipes&utils/deliveries&utils/basket!actions/menu')({
        'apis/recipes': { fetchRecipes: fetchRecipesMock },
        'utils/deliveries': { getSlot, getCutoffDateTime },
        'utils/basket': { limitReached: limitReachedMock },
      }).default

      await actions.menuLoadMenu('2016-06-26')(dispatchSpy, getStateSpy)

      expect(getStateSpy).to.have.been.calledThrice

      expect(dispatchSpy.callCount).to.equal(4)

      let dispatchSpyArgs = dispatchSpy.args[0]
      expect(dispatchSpyArgs[0]).to.deep.equal({ type: actionTypes.MENU_RECIPES_RECEIVE_PENDING, pending: true })

      dispatchSpyArgs = dispatchSpy.args[2]
      expect(dispatchSpyArgs[0]).to.deep.equal({ type: actionTypes.MENU_RECIPES_RECEIVE_PENDING, pending: false })

      const resultDispatchSpyArgs = dispatchSpy.args[1]
      expect(resultDispatchSpyArgs[0]).to.deep.equal({ type: actionTypes.RECIPES_RECEIVE, recipes: [1, 2, 3] })

      dispatchSpyArgs = dispatchSpy.args[3]
      expect(dispatchSpyArgs[0]).to.deep.equal({ type: actionTypes.BASKET_LIMIT_REACHED, limitReached: false })

      expect(fetchRecipesMock).to.have.been.calledOnce
      const fetchRecipesArgs = fetchRecipesMock.args[0]
      expect(fetchRecipesArgs[1]).to.equal('')
      expect(fetchRecipesArgs[2]).to.deep.equal({
        'filters[available_on]': '2016-06-26',
        'includes[]': ['ingredients', 'allergens']
      })
    })

    it('should dispatrch SERVER_REDIRECT when no cutoffDateTime provided or date & slot', async function () {
      getStateSpy = sinon.stub().returns({
        basket: Immutable.Map({ date: '', slotId: '' }),
        auth: Immutable.fromJS({ accessToken: 'accessToken', refreshToken: 'refreshToken' }),
        features: Immutable.Map({}),
      })
      fetchRecipesMock = sinon.stub().returns(new Promise(resolve => { resolve({ data: [1, 2, 3] }) }))

      limitReachedMock = () => false

      getSlot = sinon.stub().returns(Immutable.Map({ whenCutoff: '2016-06-26' }))
      getCutoffDateTime = sinon.stub().returns('2016-06-26')

      actions = require('inject-loader?apis/recipes&utils/deliveries&utils/basket!actions/menu')({
        'apis/recipes': { fetchRecipes: fetchRecipesMock },
        'utils/deliveries': { getSlot, getCutoffDateTime },
        'utils/basket': { limitReached: limitReachedMock },
      }).default

      await actions.menuLoadMenu()(dispatchSpy, getStateSpy)

      expect(getStateSpy.callCount).to.equal(4)
      expect(dispatchSpy.callCount).to.equal(4)

      let dispatchSpyArgs = dispatchSpy.args[0]
      expect(dispatchSpyArgs[0]).to.deep.equal({ type: actionTypes.MENU_RECIPES_RECEIVE_PENDING, pending: true })

      dispatchSpyArgs = dispatchSpy.args[2]
      expect(dispatchSpyArgs[0]).to.deep.equal({ type: actionTypes.MENU_RECIPES_RECEIVE_PENDING, pending: false })

      // cant test this as it runs in client mode
      // const resultDispatchSpyArgs = dispatchSpy.calls.argsFor(2)
      // expect(resultDispatchSpyArgs[0]).toEqual({ type: actionTypes.SERVER_REDIRECT, url: '/menu' })
      // expect(logger).toHaveBeenCalledTimes(1)
    })

    describe('with the collections feature enabled', function () {
      beforeEach(function () {
        dispatchSpy = sinon.stub().returns(new Promise(resolve => { resolve() }))
        getStateSpy = sinon.stub().returns({
          basket: Immutable.Map({ date: '2016-06-26' }),
          auth: Immutable.fromJS({ accessToken: 'blah', refreshToken: 'blabla' }),
          features: Immutable.fromJS({
            collections: {
              value: true,
            },
          }),
          menuCollections: Immutable.OrderedMap({
            123: Immutable.Map({ id: '123', shortTitle: 'a collection' }),
            456: Immutable.Map({ id: '456', shortTitle: 'all recipes' }),
          }),
          routing: {
            locationBeforeTransitions: {
              query: {},
            },
          },
        })
        recipes = []
        fetchCollectionsSpy = sinon.stub().returns(new Promise(resolve => resolve({ data: undefined })))
        fetchCollectionRecipesSpy = sinon.stub().returns(new Promise(resolve => resolve({ data: recipes })))
        getCutoffDateTime = sinon.stub().returns('2016-06-26')
        actions = require('inject-loader?apis/recipes&apis/collections&utils/deliveries&utils/basket!actions/menu')({
          'apis/recipes': { fetchRecipes: fetchRecipesMock },
          'apis/collections': { fetchCollections: fetchCollectionsSpy, fetchCollectionRecipes: fetchCollectionRecipesSpy },
          'utils/deliveries': { getSlot, getCutoffDateTime },
          'utils/basket': { limitReached: limitReachedMock },
        }).default
      })

      it('should fetch collections', async function () {
        await actions.menuLoadMenu()(dispatchSpy, getStateSpy)

        expect(fetchCollectionsSpy).to.have.been.called
      })

      it('should not fetch recipes from the recipe service', async function () {
        await actions.menuLoadMenu()(dispatchSpy, getStateSpy)

        expect(fetchRecipesMock).to.not.have.been.called
      })
    })

    describe('with the force collections feature enabled', function () {
      beforeEach(function () {
        dispatchSpy = sinon.stub().returns(new Promise(resolve => { resolve() }))
        getStateSpy = sinon.stub().returns({
          basket: Immutable.Map({ date: '2016-06-26' }),
          auth: Immutable.fromJS({ accessToken: 'blah', refreshToken: 'blabla' }),
          features: Immutable.fromJS({
            forceCollections: {
              value: true,
            },
          }),
          menuCollections: Immutable.OrderedMap({
            123: Immutable.Map({ id: '123', shortTitle: 'a collection' }),
            456: Immutable.Map({ id: '456', shortTitle: 'all recipes' }),
          }),
          routing: {
            locationBeforeTransitions: {
              query: {},
            },
          },
        })
        recipes = []
        fetchCollectionsSpy = sinon.stub().returns(new Promise(resolve => resolve({ data: undefined })))
        fetchCollectionRecipesSpy = sinon.stub().returns(new Promise(resolve => resolve({ data: recipes })))
        getCutoffDateTime = sinon.stub().returns('2016-06-26')
        actions = require('inject-loader?apis/recipes&apis/collections&utils/deliveries&utils/basket!actions/menu')({
          'apis/recipes': { fetchRecipes: fetchRecipesMock },
          'apis/collections': { fetchCollections: fetchCollectionsSpy, fetchCollectionRecipes: fetchCollectionRecipesSpy },
          'utils/deliveries': { getSlot, getCutoffDateTime },
          'utils/basket': { limitReached: limitReachedMock },
        }).default
      })
      it('should fetch collections', async function () {
        await actions.menuLoadMenu()(dispatchSpy, getStateSpy)

        expect(fetchCollectionsSpy).to.have.been.called
      })
      it('should not fetch recipes from the recipe service', async function () {
        await actions.menuLoadMenu()(dispatchSpy, getStateSpy)

        expect(fetchRecipesMock).to.not.have.been.called
      })
    })
  })

  describe('menuLoadBoxPrices', function () {
    let sandbox
    let dispatch
    let getState
    let fetchBoxPrices
    let pending
    let error
    let loggerError

    beforeEach(function () {
      sandbox = sinon.sandbox.create()
      dispatch = sandbox.spy()
      getState = sandbox.stub().returns({
        basket: Immutable.Map({}),
        auth: Immutable.fromJS({ accessToken: 'blah', refreshToken: 'blabla' }),
      })
      fetchBoxPrices = sandbox.stub(boxPricesApi, 'fetchBoxPrices').returns(new Promise(resolve => { resolve({ data: { price1: 2.45, price2: 3.45 } }) }))
      pending = sandbox.stub(statusActions, 'pending')
      error = sandbox.stub(statusActions, 'error')
      loggerError = sandbox.stub(logger, 'error')
    })

    afterEach(function () {
      sandbox.restore()
    })

    function setBasketState(state) {
      getState.returns({
        basket: Immutable.Map(state),
        auth: Immutable.fromJS({ accessToken: 'access-token', refreshToken: 'blabla' }),
      })
    }

    it('should set pending status to true & then false', async function () {
      await menuActions.menuLoadBoxPrices()(dispatch, getState)
      expect(pending).to.have.been.calledTwice
      expect(pending.firstCall).to.have.been.calledWithExactly(actionTypes.MENU_BOX_PRICES_RECEIVE, true)
      expect(pending.lastCall).to.have.been.calledWithExactly(actionTypes.MENU_BOX_PRICES_RECEIVE, false)
    })

    it('should reset error status for MENU_BOX_PRICES_RECEIVE', async function () {
      await menuActions.menuLoadBoxPrices()(dispatch, getState)
      expect(error).to.have.been.calledOnce
      expect(error).to.have.been.calledWithExactly(actionTypes.MENU_BOX_PRICES_RECEIVE, false)
    })

    it('should set error status for MENU_BOX_PRICES_RECEIVE to "fetch-failed" and should log error if unable to fetch box prices', async function () {
      fetchBoxPrices.throws(new Error('response from fetchBoxPrices call'))
      setBasketState({
        orderId: 'test-id',
        tariffId: 2,
      })
      await menuActions.menuLoadBoxPrices()(dispatch, getState)

      expect(error.lastCall).to.have.been.calledWithExactly(actionTypes.MENU_BOX_PRICES_RECEIVE, 'fetch-failed')
      expect(loggerError).to.have.been.calledOnce
      expect(loggerError).to.have.been.calledWithExactly('Could not load menu box prices: fetch failed for tariff_id "2", Error: response from fetchBoxPrices call')
    })

    it('should call fetchBoxPrices once with orderId when editing an order', async function () {
      setBasketState({
        orderId: 'test-id',
        promoCode: 'test-promocode',
      })
      await menuActions.menuLoadBoxPrices()(dispatch, getState)

      expect(fetchBoxPrices).to.have.been.calledOnce
      expect(fetchBoxPrices).to.have.been.calledWithExactly('access-token', { order_id: 'test-id' })
    })

    it('should call fetchBoxPrices once with promo code if available and not editing an order', async function () {
      setBasketState({
        promoCode: 'test-promocode',
      })
      await menuActions.menuLoadBoxPrices()(dispatch, getState)

      expect(fetchBoxPrices).to.have.been.calledOnce
      expect(fetchBoxPrices).to.have.been.calledWithExactly('access-token', { promocode: 'test-promocode' })
    })

    it('should include tariffId in fetchBoxPrices call if available regardless of if editing an order or not', async function () {
      setBasketState({
        orderId: 'test-id',
        promoCode: 'test-promocode',
        tariffId: 2,
      })
      await menuActions.menuLoadBoxPrices()(dispatch, getState)

      expect(fetchBoxPrices).to.have.been.calledOnce
      expect(fetchBoxPrices).to.have.been.calledWithExactly('access-token', {
        order_id: 'test-id',
        tariff_id: 2,
      })

      fetchBoxPrices.reset()
      setBasketState({
        promoCode: 'test-promocode',
        tariffId: 3,
      })
      await menuActions.menuLoadBoxPrices()(dispatch, getState)

      expect(fetchBoxPrices).to.have.been.calledOnce
      expect(fetchBoxPrices).to.have.been.calledWithExactly('access-token', {
        promocode: 'test-promocode',
        tariff_id: 3,
      })
    })
  })

  describe('menuClearStock', function () {
    it('should dispatch MENU_RECIPE_STOCK_CLEAR action', function () {
      expect(menuActions.menuClearStock()).to.deep.equal({ type: actionTypes.MENU_RECIPE_STOCK_CLEAR })
    })
  })

  describe('menuLoadStock', function () {
    const getFetchMock = stock => sinon.stub().returns(new Promise(resolve => { resolve({ data: stock }) }))
    let dispatchSpy
    let getStateSpy
    beforeEach(function () {
      dispatchSpy = sinon.spy()
      getStateSpy = sinon.stub().returns({
        boxSummaryDeliveryDays: Immutable.fromJS({ '2016-06-26': { coreDayId: '26' } }),
        basket: Immutable.fromJS({
          date: '2016-06-26',
          recipes: [],
        }),
        auth: Immutable.fromJS({ accessToken: 'blah', refreshToken: 'blabla' }),
      })
    })

    it('should have fetched stock numbers', async function () {
      const fetchStockMock = getFetchMock({
        123: {
          recipeId: '123',
          number: 21,
          familyNumber: 41,
          committed: '1',
        },
        456: {
          recipeId: '456',
          number: 421,
          familyNumber: 441,
          committed: '1',
        },
      })

      const actions = require('inject-loader?apis/recipes!actions/menu')({
        'apis/recipes': { fetchRecipeStock: fetchStockMock },
      }).default

      await actions.menuLoadStock()(dispatchSpy, getStateSpy)

      expect(getStateSpy.callCount).to.equal(4)
      expect(dispatchSpy).to.have.been.calledOnce
      const dispatchSpyArgs = dispatchSpy.args[0]
      expect(dispatchSpyArgs[0]).to.deep.equal({
        type: actionTypes.MENU_RECIPE_STOCK_REPLACE,
        stock: {
          123: { 2: 21, 4: 41, committed: true },
          456: { 2: 421, 4: 441, committed: true }
        }
      })
    })

    it('should have adjusted stock numbers', async function () {
      const fetchStockMock = getFetchMock({
        123: {
          recipeId: '123',
          number: 21,
          familyNumber: 41,
          committed: '0',
        },
        456: {
          recipeId: '456',
          number: 421,
          familyNumber: 441,
          committed: '1',
        },
      })

      const actions = require('inject-loader?apis/recipes!actions/menu')({
        'apis/recipes': { fetchRecipeStock: fetchStockMock },
      }).default

      await actions.menuLoadStock()(dispatchSpy, getStateSpy)

      expect(getStateSpy.callCount).to.equal(4)
      expect(dispatchSpy).to.have.been.calledOnce
      const dispatchSpyArgs = dispatchSpy.args[0]
      expect(dispatchSpyArgs[0]).to.deep.equal({
        type: actionTypes.MENU_RECIPE_STOCK_REPLACE,
        stock: {
          123: { 2: 1000, 4: 1000, committed: false },
          456: { 2: 421, 4: 441, committed: true }
        }
      })
    })

    it('should not replace stock if specified', async function () {
      const fetchStockMock = getFetchMock({
        123: {
          recipeId: '123',
          number: 21,
          familyNumber: 41,
          committed: '0',
        },
        456: {
          recipeId: '456',
          number: 421,
          familyNumber: 441,
          committed: '1',
        },
      })

      const actions = require('inject-loader?apis/recipes!actions/menu')({
        'apis/recipes': { fetchRecipeStock: fetchStockMock },
      }).default

      await actions.menuLoadStock(false)(dispatchSpy, getStateSpy)

      expect(getStateSpy).to.have.been.calledTwice
      expect(dispatchSpy).to.have.been.calledOnce
      const dispatchSpyArgs = dispatchSpy.args[0]
      expect(dispatchSpyArgs[0]).to.deep.equal({
        type: actionTypes.MENU_RECIPE_STOCK_CHANGE,
        stock: {
          123: { 2: 1000, 4: 1000, committed: false },
          456: { 2: 421, 4: 441, committed: true }
        }
      })
    })

    it('should adjust the stock to account for recipes in the basket on stock load', async function () {
      getStateSpy = sinon.stub().returns({
        boxSummaryDeliveryDays: Immutable.fromJS({ '2016-06-26': { coreDayId: '26' } }),
        basket: Immutable.fromJS({
          date: '2016-06-26',
          recipes: {
            123: 2,
            456: 1,
          },
          numPortions: 2,
        }),
        auth: Immutable.fromJS({ accessToken: 'blah', refreshToken: 'blabla' }),
      })
      const fetchStockMock = getFetchMock({
        123: {
          recipeId: '123',
          number: 21,
          familyNumber: 41,
          committed: '0',
        },
        456: {
          recipeId: '456',
          number: 421,
          familyNumber: 441,
          committed: '1',
        },
      })

      const actions = require('inject-loader?apis/recipes!actions/menu')({
        'apis/recipes': { fetchRecipeStock: fetchStockMock },
      }).default

      await actions.menuLoadStock()(dispatchSpy, getStateSpy)

      expect(getStateSpy.callCount).to.equal(4)
      expect(dispatchSpy.callCount).to.equal(4)
      expect(dispatchSpy.args[0][0]).to.deep.equal({
        type: actionTypes.MENU_RECIPE_STOCK_REPLACE,
        stock: {
          123: { 2: 1000, 4: 1000, committed: false },
          456: { 2: 421, 4: 441, committed: true }
        }
      })
      expect(dispatchSpy.args[1][0]).to.deep.equal({
        type: actionTypes.MENU_RECIPE_STOCK_CHANGE,
        stock: { 123: { 2: -1 } },
      })
      expect(dispatchSpy.args[2][0]).to.deep.equal({
        type: actionTypes.MENU_RECIPE_STOCK_CHANGE,
        stock: { 123: { 2: -1 } },
      })
      expect(dispatchSpy.args[3][0]).to.deep.equal({
        type: actionTypes.MENU_RECIPE_STOCK_CHANGE,
        stock: { 456: { 2: -1 } },
      })
    })
  })

  describe('menuLoadOrderDetails', function () {
    const getFetchMock = order => sinon.stub().returns(new Promise(resolve => { resolve({ data: order }) }))
    let dispatchSpy
    let basketIdChangeSpy, basketDateChangeSpy, basketNumPortionChangeSpy, basketOrderLoadedSpy, basketPostcodeChangeSpy, basketSlotChangeSpy, basketRecipeAddSpy, getStateSpy, config
    let menuActions
    let order
    let basketResetSpy
    let productsLoadProductsByIdSpy, productsLoadStockSpy, productsLoadCategoriesSpy, basketProductAddSpy

    beforeEach(function () {
      dispatchSpy = sinon.stub().returns(new Promise(resolve => { resolve() }))
      getStateSpy = sinon.stub().returns({
        basket: Immutable.Map({}),
        boxSummaryDeliveryDays: Immutable.fromJS({ '2016-06-26': { slots: [{ coreSlotId: 'slot123', id: 'long-slot-id' }, { coreSlotId: '7', id: 'another-long-slot-id' }] } }),
        auth: Immutable.fromJS({ accessToken: 'blah', refreshToken: 'blabla' }),
      })
      basketIdChangeSpy = sinon.spy()
      basketDateChangeSpy = sinon.spy()
      basketNumPortionChangeSpy = sinon.spy()
      basketPostcodeChangeSpy = sinon.spy()
      basketSlotChangeSpy = sinon.spy()
      basketRecipeAddSpy = sinon.spy()
      basketResetSpy = sinon.spy()
      basketOrderLoadedSpy = sinon.spy()

      order = {
        id: 'order123',
        whenCutoff: '2016-06-26',
        deliveryDate: '2016-06-29',
        box: {
          numPortions: 2,
        },
        shippingAddress: {
          postcode: 'W3 7UN',
        },
        deliverySlot: {
          id: 'slot123',
        },
        recipeItems: [
          { recipeId: 'r1', quantity: '4' },
          { recipeId: 'r2', quantity: '2' },
        ],
      }
      const fetcOrderMock = getFetchMock(order)

      menuActions = require('inject-loader?./basket&apis/orders&config/menu!actions/menu')({
        './basket': {
          basketIdChange: basketIdChangeSpy,
          basketDateChange: basketDateChangeSpy,
          basketNumPortionChange: basketNumPortionChangeSpy,
          basketOrderLoaded: basketOrderLoadedSpy,
          basketPostcodeChange: basketPostcodeChangeSpy,
          basketSlotChange: basketSlotChangeSpy,
          basketRecipeAdd: basketRecipeAddSpy,
          basketReset: basketResetSpy,
        },
        'apis/orders': { fetchOrder: fetcOrderMock },
        'config/menu': { stockThreshold: 1 },
      }).default
    })

    it('should call dispatch 13 times', async function () {
      await menuActions.menuLoadOrderDetails('order123')(dispatchSpy, getStateSpy)

      expect(dispatchSpy.callCount).to.equal(13)
    })

    it('should reset the basket', async function () {
      await menuActions.menuLoadOrderDetails('order123')(dispatchSpy, getStateSpy)

      expect(basketResetSpy).to.have.been.calledOnce
    })

    it('should set the cutoffUntil date', async function () {
      await menuActions.menuLoadOrderDetails('order123')(dispatchSpy, getStateSpy)

      expect(dispatchSpy.args[1][0]).to.deep.equal({ type: actionTypes.MENU_CUTOFF_UNTIL_RECEIVE, cutoffUntil: '2016-06-26' })
    })

    it('should call basketOrderLoaded with order id', async function () {
      await menuActions.menuLoadOrderDetails('order123')(dispatchSpy, getStateSpy)

      expect(basketOrderLoadedSpy).to.have.been.calledOnce
      expect(basketOrderLoadedSpy.args[0][0]).to.equal('order123')
    })

    it('should set the order loaded', async function () {
      await menuActions.menuLoadOrderDetails('order123')(dispatchSpy, getStateSpy)

      expect(basketIdChangeSpy).to.have.been.calledOnce
      expect(basketIdChangeSpy.args[0][0]).to.equal('order123')
    })

    it('should set the date to be delivery date', async function () {
      await menuActions.menuLoadOrderDetails('order123')(dispatchSpy, getStateSpy)

      expect(basketDateChangeSpy).to.have.been.calledOnce
      expect(basketDateChangeSpy.args[0][0]).to.equal('2016-06-29')
    })

    it('should set portion number', async function () {
      await menuActions.menuLoadOrderDetails('order123')(dispatchSpy, getStateSpy)

      expect(basketNumPortionChangeSpy).to.have.been.calledOnce
      expect(basketNumPortionChangeSpy.args[0][0]).to.equal(2)
    })

    it('should set the postcode', async function () {
      await menuActions.menuLoadOrderDetails('order123')(dispatchSpy, getStateSpy)

      expect(basketPostcodeChangeSpy).to.have.been.calledOnce
      expect(basketPostcodeChangeSpy.args[0][0]).to.equal('W3 7UN')
    })

    it('should set the slot', async function () {
      await menuActions.menuLoadOrderDetails('order123')(dispatchSpy, getStateSpy)

      expect(basketSlotChangeSpy).to.have.been.calledOnce
      expect(basketSlotChangeSpy.args[0][0]).to.equal('long-slot-id')
    })

    it('should add stock for recipes', async function () {
      await menuActions.menuLoadOrderDetails('order123')(dispatchSpy, getStateSpy)

      expect(dispatchSpy.args[4][0]).to.deep.equal({
        type: 'MENU_RECIPE_STOCK_CHANGE', stock: { r1: { 2: 3 } },
      })
      expect(dispatchSpy.args[7][0]).to.deep.equal({
        type: 'MENU_RECIPE_STOCK_CHANGE', stock: { r2: { 2: 2 } },
      })
    })

    it('should add recipe to basket', async function () {
      await menuActions.menuLoadOrderDetails('order123')(dispatchSpy, getStateSpy)

      expect(basketRecipeAddSpy).to.have.been.calledThrice
      expect(basketRecipeAddSpy.args[0][0]).to.equal('r1')
      expect(basketRecipeAddSpy.args[1][0]).to.equal('r1')
      expect(basketRecipeAddSpy.args[2][0]).to.equal('r2')
    })

    it('should NOT call the slot thing with the alternate slot Id if present', async function () {
      order.originalDeliveryDay = {
        alternateDeliveryDay: {
          deliverySlotId: '7',
        },
      }
      const fetcOrderMock = getFetchMock(order)

      menuActions = require('inject-loader?./basket&apis/orders!actions/menu')({
        './basket': {
          basketIdChange: basketIdChangeSpy,
          basketDateChange: basketDateChangeSpy,
          basketNumPortionChange: basketNumPortionChangeSpy,
          basketOrderLoaded: basketOrderLoadedSpy,
          basketPostcodeChange: basketPostcodeChangeSpy,
          basketSlotChange: basketSlotChangeSpy,
          basketRecipeAdd: basketRecipeAddSpy,
          basketReset: basketResetSpy,
        },
        'apis/orders': { fetchOrder: fetcOrderMock },
      }).default

      await menuActions.menuLoadOrderDetails('order123')(dispatchSpy, getStateSpy)

      expect(basketSlotChangeSpy).to.have.been.calledOnce
      expect(basketSlotChangeSpy.args[0][0]).to.equal('long-slot-id')
    })

    describe('product logic', function () {
      const prepareMenuActions = (productItems) => {
        basketProductAddSpy = sinon.spy()
        productsLoadProductsByIdSpy = sinon.spy()
        productsLoadStockSpy = sinon.spy()
        productsLoadCategoriesSpy = sinon.spy()

        order = {
          id: 'order123',
          whenCutoff: '2018-06-26',
          deliveryDate: '2018-06-29',
          box: {
            numPortions: 2,
          },
          shippingAddress: {
            postcode: 'W3 7UN',
          },
          deliverySlot: {
            id: 'slot123',
          },
          recipeItems: [
            { recipeId: 'r1', quantity: '4' },
            { recipeId: 'r2', quantity: '2' },
          ],
          productItems,
        }
        const fetcOrderMock = getFetchMock(order)

        return require('inject-loader?./basket&./products&apis/orders!actions/menu')({
          './basket': {
            basketProductAdd: basketProductAddSpy,
            basketIdChange: basketIdChangeSpy,
            basketDateChange: basketDateChangeSpy,
            basketNumPortionChange: basketNumPortionChangeSpy,
            basketOrderLoaded: basketOrderLoadedSpy,
            basketPostcodeChange: basketPostcodeChangeSpy,
            basketSlotChange: basketSlotChangeSpy,
            basketRecipeAdd: basketRecipeAddSpy,
            basketReset: basketResetSpy,
          },
          './products': {
            productsLoadProductsById: productsLoadProductsByIdSpy,
            productsLoadStock: productsLoadStockSpy,
            productsLoadCategories: productsLoadCategoriesSpy,
          },
          'apis/orders': { fetchOrder: fetcOrderMock },
        }).default
      }

      it('should not load products by default', async function () {
        menuActions = prepareMenuActions([])
        await menuActions.menuLoadOrderDetails('order123')(dispatchSpy, getStateSpy)

        expect(productsLoadProductsByIdSpy).to.have.not.been.called
        expect(productsLoadStockSpy).to.have.not.been.called
        expect(productsLoadCategoriesSpy).to.have.not.been.called
        expect(basketProductAddSpy).to.have.not.been.called
      })

      it('should load products when passed an order containing product items', async function () {
        menuActions = prepareMenuActions([
          { id: 'p1', itemableId: 'p1', quantity: '1' },
          { id: 'p2', itemableId: 'p2', quantity: '2' },
          { id: 'p3', itemableId: 'p3', quantity: '1' },
        ])
        await menuActions.menuLoadOrderDetails('order123')(dispatchSpy, getStateSpy)

        expect(productsLoadProductsByIdSpy).to.have.been.calledWith(['p1', 'p2', 'p3'])
        expect(productsLoadStockSpy).to.have.been.called
        expect(productsLoadCategoriesSpy).to.have.been.called
        expect(basketProductAddSpy.callCount).to.equal(4)
      })
    })
  })

  describe('menuCollectionsReceive', function () {
    it('should dispatch MENU_COLLECTIONS_RECEIVE action', function () {
      expect(menuActions.menuCollectionsReceive()).to.deep.equal({ type: actionTypes.MENU_COLLECTIONS_RECEIVE, collections: undefined })
    })
    it('should map the argument through to the collections property of the action', function () {
      expect(menuActions.menuCollectionsReceive(123)).to.deep.equal({ type: actionTypes.MENU_COLLECTIONS_RECEIVE, collections: 123 })
    })
  })

  describe('menuRecipeDetailVisibilityChange', function () {
    it('should dispatch MENU_RECIPE_DETAIL_VISIBILITY_CHANGE action', function () {
      const dispatchSpy = sinon.spy()
      const getStateSpy = sinon.stub().returns({
        menuRecipeDetailShow: 123,
        routing: {
          locationBeforeTransitions: {
            query: {},
          },
        },
      })
      menuActions.menuRecipeDetailVisibilityChange()(dispatchSpy, getStateSpy)
      expect(getStateSpy).to.have.been.calledTwice
      expect(dispatchSpy).to.have.been.calledTwice
      expect(dispatchSpy.args[0][0]).to.deep.equal({
        type: actionTypes.MENU_RECIPE_DETAIL_VISIBILITY_CHANGE,
        recipeId: undefined,
        trackingData: {
          actionType: actionTypes.MENU_RECIPE_DETAIL_VISIBILITY_CHANGE,
          show: false,
          recipeId: 123,
        }
      })
    })

    it('should update url query parameter with the recipe id', function () {
      const theMenuActions = require('inject-loader?react-router-redux!actions/menu')({
        'react-router-redux': { push: i => i },
      }).default
      const dispatchSpy = sinon.spy()
      const getStateSpy = sinon.stub().returns({
        menuRecipeDetailShow: 123,
        routing: {
          locationBeforeTransitions: {
            query: {},
          },
        },
      })
      theMenuActions.menuRecipeDetailVisibilityChange(123)(dispatchSpy, getStateSpy)
      expect(getStateSpy).to.have.been.calledOnce
      expect(dispatchSpy).to.have.been.calledTwice
      expect(dispatchSpy.args[1][0]).to.deep.equal({ query: { recipeDetailId: 123 } })
    })
  })

  describe('menuMobileGridViewSet', function () {
    it('should dispatch a MENU_MOBILE_GRID_VIEW_SET action with the from and to arguments mapped to the trackingData', function () {
      expect(menuActions.menuMobileGridViewSet('a', 'b')).to.deep.equal({
        type: actionTypes.MENU_MOBILE_GRID_VIEW_SET, trackingData: {
          actionType: actionTypes.MENU_MOBILE_GRID_VIEW_SET,
          from: 'a',
          to: 'b',
        }
      })
    })
  })

  describe('menuAddEmptyStock', function () {
    it('should dispatch MENU_RECIPE_STOCK_CHANGE action type', function () {
      const dispatchSpy = sinon.spy()
      const getStateSpy = sinon.stub().returns({
        menuRecipes: ['recipe-1', 'recipe-2'],
      })

      menuActions.menuAddEmptyStock()(dispatchSpy, getStateSpy)

      expect(dispatchSpy).to.have.been.calledOnce
      expect(getStateSpy).to.have.been.calledOnce

      expect(dispatchSpy.args[0][0]).to.deep.equal({
        type: actionTypes.MENU_RECIPE_STOCK_CHANGE,
        stock: {
          'recipe-1': { 2: null, 4: null },
          'recipe-2': { 2: null, 4: null },
        },
      })
    })
  })

  describe('menuBrowseCTAVisibilityChange', function () {
    it('should dispatch MENU_BROWSE_CTA_VISIBILITY_CHANGE action type and correct value', function () {
      const result = menuActions.menuBrowseCTAVisibilityChange(true)
      expect(result).to.deep.equal({
        type: actionTypes.MENU_BROWSE_CTA_VISIBILITY_CHANGE,
        show: true,
      })
    })
  })

  describe('menuLoadCollectionRecipes', function () {
    let actions
    let fetchCollectionRecipesSpy
    let resolved
    let dispatchSpy
    let getStateSpy
    let collectionRecipes

    beforeEach(function () {
      resolved = 0
      dispatchSpy = sinon.stub()
      getStateSpy = sinon.stub().returns({
        auth: Immutable.Map({ accessToken: 'accessToken' }),
      })
      collectionRecipes = {
        recipes: [],
      }

      fetchCollectionRecipesSpy = function () {
        return new Promise(function (resolve) {
          setTimeout(function () {
            resolved++
            resolve({ data: collectionRecipes })
          }, 150)
        })
      }

      actions = require('inject-loader!actions/menu')({
        'apis/collections': {
          fetchCollectionRecipes: fetchCollectionRecipesSpy,
        },
      }).default
    })

    it('should resolve before returning', async function () {
      try {
        await actions.menuLoadCollectionRecipes('123', '123', false)(dispatchSpy, getStateSpy)
      } catch (err) {
        expect(err).to.equal(undefined)
      }
      expect(resolved).to.equal(1)
    })
  })

  describe('menuLoadCollectionsRecipes', function () {
    let actions
    let fetchCollectionRecipesSpy
    let resolved
    let dispatchSpy
    let getStateSpy
    let collectionRecipes

    beforeEach(function () {
      resolved = 0
      dispatchSpy = sinon.stub()
      getStateSpy = sinon.stub().returns({
        auth: Immutable.Map({ accessToken: 'accessToken' }),
        menuCollections: Immutable.OrderedMap({
          123: Immutable.Map({ id: '123', shortTitle: 'a collection' }),
          456: Immutable.Map({ id: '456', shortTitle: 'all recipes' }),
          567: Immutable.Map({ id: '567', shortTitle: 'another collection' }),
          234: Immutable.Map({ id: '234', shortTitle: '1another collection' }),
          2345: Immutable.Map({ id: '2345', shortTitle: '15another collection' }),
          12345: Immutable.Map({ id: '12345', shortTitle: '125another collection' }),
          32345: Immutable.Map({ id: '32345', shortTitle: '315another collection' }),
          42345: Immutable.Map({ id: '42345', shortTitle: '415another collection' }),
          52345: Immutable.Map({ id: '52345', shortTitle: '515another collection' }),
          62345: Immutable.Map({ id: '62345', shortTitle: '615another collection' }),
        }),
      })
      collectionRecipes = {
        recipes: [],
      }

      fetchCollectionRecipesSpy = function (a, collectionId) {
        return new Promise(function (resolve) {
          setTimeout(function () {
            resolved++
            resolve({ data: collectionRecipes })
          }, parseInt(collectionId, 10) % 2 === 0 ? 200 : 1000)
        })
      }

      actions = require('inject-loader!actions/menu')({
        'apis/collections': {
          fetchCollectionRecipes: fetchCollectionRecipesSpy,
        },
        'utils/basket': {
          limitReached: () => false,
        },
      }).default
    })

    it('should resolve before returning', async function () {
      this.timeout(5000)
      try {
        await actions.menuLoadCollectionsRecipes('123')(dispatchSpy, getStateSpy)
      } catch (err) {
        expect(err).to.equal(undefined)
      }
      expect(resolved).to.equal(10)
    })
  })

  describe('menuLoadCollections', function () {
    let collections
    let fetchCollectionsMock
    let dispatchSpy
    let getStateSpy
    let getSlot
    let actions
    let getCutoffDateTime
    beforeEach(function () {
      collections = [
        { id: '123', shortTitle: 'a collection' },
        { id: '456', shortTitle: 'all recipes' },
      ]
      getCutoffDateTime = sinon.stub().returns('2016-06-26')
      fetchCollectionsMock = sinon.stub().returns(new Promise(resolve => { resolve({ data: collections }) }))
      getSlot = sinon.stub().returns(Immutable.Map({ whenCutoff: '2016-06-26' }))
      actions = require('inject-loader?apis/collections&utils/deliveries&./filters!actions/menu')({
        'apis/collections': { fetchCollections: fetchCollectionsMock },
        'utils/deliveries': { getSlot, getCutoffDateTime },
      }).default
      dispatchSpy = sinon.stub().returns(new Promise(resolve => { resolve() }))
      getStateSpy = sinon.stub().returns({
        boxSummaryDeliveryDays: Immutable.fromJS({ '2016-06-26': { slots: [{ coreSlotId: 'slot123', id: 'long-slot-id' }] } }),
        basket: Immutable.fromJS({
          date: '2016-06-23',
          slotId: '123-123-uuid',
        }),
        menuCollections: Immutable.OrderedMap({
          123: Immutable.Map({ id: '123', shortTitle: 'a collection' }),
          456: Immutable.Map({ id: '456', shortTitle: 'all recipes', default: true }),
        }),
        auth: Immutable.fromJS({ accessToken: 'blah', refreshToken: 'blabla' }),
        routing: {
          locationBeforeTransitions: {
            query: {},
          },
        },
        features: Immutable.fromJS({
          filterMenu: {
            value: false,
          },
        }),
      })
    })

    it('should call fetchCollections', async function () {
      await actions.menuLoadCollections()(dispatchSpy, getStateSpy).then(() => {
        expect(dispatchSpy).to.have.been.calledThrice
        expect(getStateSpy.callCount).to.equal(9)
        expect(fetchCollectionsMock).to.have.been.calledOnce
      })
    })

    it('should call fetchCollections, passing through the first parameter', async function () {
      await actions.menuLoadCollections('2016-06-26')(dispatchSpy, getStateSpy).then(() => {
        expect(dispatchSpy).to.have.been.calledThrice
        expect(getStateSpy.callCount).to.equal(9)
        expect(fetchCollectionsMock).to.have.been.calledOnce
        expect(fetchCollectionsMock.getCall(0).args[2]).to.deep.equal({
          filters: {
            available_on: '2016-06-26',
          },
        })
      })
    })

    it('should dispatch a MENU_COLLECTIONS_RECEIVE action with the fetched collections', async function () {
      await actions.menuLoadCollections()(dispatchSpy, getStateSpy).then(() => {
        expect(dispatchSpy).to.have.been.calledThrice
        expect(getStateSpy.callCount).to.equal(9)
        expect(dispatchSpy.getCall(0).args[0]).to.deep.equal({
          type: actionTypes.MENU_COLLECTIONS_RECEIVE,
          collections,
        })
      })
    })

    it('should call dispatch with a router push containing the name of the default collection', async function () {
      await actions.menuLoadCollections()(dispatchSpy, getStateSpy).then(() => {
        expect(dispatchSpy).to.have.been.calledThrice
        expect(getStateSpy.callCount).to.equal(9)
        expect(dispatchSpy.getCall(2).args[0].payload.args[0]).to.deep.equal({ query: { collection: 'all-recipes' } })
      })
    })

    it('should not call dispatch with a router push if the collection is already selected', async function () {
      getStateSpy = sinon.stub().returns({
        boxSummaryDeliveryDays: Immutable.fromJS({ '2016-06-26': { slots: [{ coreSlotId: 'slot123', id: 'long-slot-id' }] } }),
        basket: Immutable.fromJS({
          date: '2016-06-23',
          slotId: '123-123-uuid',
        }),
        menuCollections: Immutable.OrderedMap({
          123: Immutable.Map({ id: '123', shortTitle: 'a collection', published: true }),
          456: Immutable.Map({ id: '456', shortTitle: 'all recipes', default: true, published: true }),
        }),
        menuCollectionRecipes: Immutable.fromJS({
          123: ['', '', ''],
          456: ['', '', ''],
        }),
        features: Immutable.fromJS({
          filterMenu: {
            value: false,
          },
        }),
        auth: Immutable.fromJS({ accessToken: 'blah', refreshToken: 'blabla' }),
        routing: {
          locationBeforeTransitions: {
            query: {
              collection: 'all-recipes',
            },
          },
        },
      })
      await actions.menuLoadCollections()(dispatchSpy, getStateSpy).then(() => {
        expect(dispatchSpy).to.have.been.calledOnce
        expect(getStateSpy.callCount).to.equal(6)
      })
    })

    it('should not call dispatch with a router push if the noUrlChange argument is true', async function () {
      await actions.menuLoadCollections(null, true)(dispatchSpy, getStateSpy).then(() => {
        expect(dispatchSpy).to.have.been.calledOnce
        expect(getStateSpy).to.have.been.calledOnce
      })
    })

    it('should call dispatch with a router push if preferred collection set', async function () {
      getStateSpy = sinon.stub().returns({
        boxSummaryDeliveryDays: Immutable.fromJS({ '2016-06-26': { slots: [{ coreSlotId: 'slot123', id: 'long-slot-id' }] } }),
        basket: Immutable.fromJS({
          date: '2016-06-23',
          slotId: '123-123-uuid',
        }),
        features: Immutable.fromJS({
          preferredCollection: {
            value: 'a-collection',
          },
        }),
        menuCollections: Immutable.OrderedMap({
          123: Immutable.Map({ id: '123', shortTitle: 'a collection', published: true }),
          456: Immutable.Map({ id: '456', shortTitle: 'all recipes', default: true, published: true }),
        }),
        menuCollectionRecipes: Immutable.fromJS({
          123: ['', '', ''],
          456: ['', '', ''],
        }),
        auth: Immutable.fromJS({ accessToken: 'blah', refreshToken: 'blabla' }),
        routing: {
          locationBeforeTransitions: {
            query: {
              collection: '',
            },
          },
        },
      })
      await actions.menuLoadCollections()(dispatchSpy, getStateSpy).then(() => {
        expect(dispatchSpy).to.have.been.calledThrice
        expect(getStateSpy.callCount).to.equal(8)
        expect(dispatchSpy.getCall(2).args[0].payload.args[0]).to.deep.equal({ query: { collection: 'a-collection' } })
      })
    })
  })
})
