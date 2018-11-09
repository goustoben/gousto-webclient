import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import moment from 'moment'
import Immutable from 'immutable'
/* eslint-disable global-require */
/* eslint-disable new-cap */
describe('fetchData', function () {
  describe('fetchData - not logged in', function () {
    let menuLoadOrderDetails
    let menuLoadBoxPrices
    let menuLoadMenu
    let basketDateChange
    let basketNumPortionChange
    let basketSlotChange
    let menuLoadStock
    let basketPostcodeChange
    let menuLoadDays
    let boxSummaryDeliveryDaysLoad
    let menuLoadCollections
    let menuAddEmptyStock
    let dispatch
    let getState
    let basketPostcodeChangePure
    let filterCollectionChange
    let menuCutoffUntilReceive
    let pending
    let fetchData

    beforeEach(function() {
      menuLoadOrderDetails = sinon.stub().returns(new Promise(resolve => { resolve() }))
      menuLoadBoxPrices = sinon.stub().returns(new Promise(resolve => { resolve() }))
      menuLoadMenu = sinon.stub().returns(new Promise(resolve => { resolve() }))
      basketDateChange = sinon.spy()
      basketNumPortionChange = sinon.spy()
      basketSlotChange = sinon.spy()
      menuLoadStock = sinon.stub().returns(new Promise(resolve => { resolve() }))
      menuLoadDays = sinon.stub().returns(new Promise(resolve => { resolve() }))
      basketPostcodeChange = sinon.stub().returns(new Promise(resolve => { resolve() }))
      boxSummaryDeliveryDaysLoad = sinon.stub().returns(new Promise(resolve => { resolve() }))
      menuLoadCollections = sinon.stub().returns(new Promise(resolve => { resolve() }))
      basketPostcodeChangePure = sinon.spy()
      menuAddEmptyStock = sinon.spy()
      filterCollectionChange = sinon.spy()
      pending = sinon.spy()
      menuCutoffUntilReceive = sinon.spy()

      fetchData = require('inject-loader?actions!routes/Menu/fetchData')({
        actions: {
          menuLoadCollections,
          menuLoadOrderDetails,
          menuLoadBoxPrices,
          menuLoadMenu,
          basketDateChange,
          basketNumPortionChange,
          basketSlotChange,
          menuLoadStock,
          basketPostcodeChange,
          menuLoadDays,
          boxSummaryDeliveryDaysLoad,
          basketPostcodeChangePure,
          menuAddEmptyStock,
          filterCollectionChange,
          pending,
          menuCutoffUntilReceive,
        },
      }).default

      dispatch = sinon.stub().returns(object => object)
      getState = sinon.stub().returns(({
        basket: { get: () => false },
        boxSummaryDeliveryDays: Immutable.fromJS([{ date: '2016-05-26' }]),
        features: Immutable.Map({}),
        auth: Immutable.Map({ isAuthenticated: false }),
        request: Immutable.fromJS({}),
      }))
    })

    it('should not dispatch any actions other than pending (redirect only on server)', async function() {
      await fetchData({
        store: { dispatch, getState },
        query: {},
        params: { orderId: 'order-123' },
      })

      expect(dispatch).to.have.been.calledTwice
    })
  })

  describe('fetchData', function () {
    let clock
    let menuLoadOrderDetails
    let menuLoadBoxPrices
    let menuLoadMenu
    let basketDateChange
    let basketNumPortionChange
    let basketSlotChange
    let menuLoadStock
    let basketRecipeAdd
    let basketPostcodeChange
    let menuLoadDays
    let userLoadOrders
    let boxSummaryDeliveryDaysLoad
    let menuLoadCollections
    let menuAddEmptyStock
    let dispatch
    let getState
    let fetchData
    let basketPostcodeChangePure
    let filterCollectionChange
    let pending
    let menuCutoffUntilReceive
    let featureSet
    let temp

    beforeEach(function() {
      menuLoadOrderDetails = sinon.stub().returns(new Promise(resolve => { resolve() }))
      menuLoadBoxPrices = sinon.stub().returns(new Promise(resolve => { resolve() }))
      menuLoadMenu = sinon.stub().returns(new Promise(resolve => { resolve() }))
      basketDateChange = sinon.spy()
      basketNumPortionChange = sinon.spy()
      basketSlotChange = sinon.spy()
      basketRecipeAdd = sinon.stub().returns('basketRecipeAdd')
      menuLoadStock = sinon.stub().returns(new Promise(resolve => { resolve() }))
      menuLoadDays = sinon.stub().returns(new Promise(resolve => { resolve() }))
      userLoadOrders = sinon.stub().returns(new Promise(resolve => { resolve() }))
      basketPostcodeChange = sinon.stub().returns(new Promise(resolve => { resolve() }))
      boxSummaryDeliveryDaysLoad = sinon.stub().returns(new Promise(resolve => { resolve() }))
      menuLoadCollections = sinon.stub().returns(new Promise(resolve => { resolve() }))
      basketPostcodeChangePure = sinon.spy()
      menuAddEmptyStock = sinon.spy()
      filterCollectionChange = sinon.spy()
      pending = sinon.spy()
      menuCutoffUntilReceive = sinon.spy()
      featureSet = sinon.stub().returns('featureSet')
      temp = sinon.spy()

      fetchData = require('inject-loader?actions!routes/Menu/fetchData')({
        actions: {
          menuLoadCollections,
          menuLoadOrderDetails,
          menuLoadBoxPrices,
          menuLoadMenu,
          basketDateChange,
          basketNumPortionChange,
          basketSlotChange,
          menuLoadStock,
          basketRecipeAdd,
          basketPostcodeChange,
          menuLoadDays,
          userLoadOrders,
          boxSummaryDeliveryDaysLoad,
          basketPostcodeChangePure,
          menuAddEmptyStock,
          filterCollectionChange,
          pending,
          menuCutoffUntilReceive,
          featureSet,
          temp,
        },
      }).default
      clock = sinon.useFakeTimers(new Date(2010, 12, 27).getTime())
      dispatch = sinon.stub().returnsArg(0)
      getState = sinon.stub().returns(({
        basket: { get: () => false },
        boxSummaryDeliveryDays: Immutable.fromJS([{ date: '2016-05-26' }]),
        features: Immutable.Map({}),
        auth: Immutable.Map({ isAuthenticated: true }),
      }))
    })

    afterEach(function() {
      clock.restore()
    })

    describe('editing an existing order', function () {
      describe('- logged in', function () {
        it('should call dispatch 6 times by default', async function() {
          await fetchData({
            store: { dispatch, getState },
            query: {},
            params: { orderId: 'order-123' },
          })

          expect(dispatch.callCount).to.equal(6)
        })

        it('should call menuLoadOrderDetails', async function() {
          await fetchData({
            store: { dispatch, getState },
            query: {},
            params: { orderId: 'order-123' },
          })
          expect(menuLoadOrderDetails).to.have.been.calledOnce
          expect(menuLoadOrderDetails.getCall(0).args[0]).to.equal('order-123')

          expect(menuLoadMenu).to.have.been.calledOnce
        })

        it('should call menuLoadMenu', async function() {
          await fetchData({
            store: { dispatch, getState },
            query: {},
            params: { orderId: 'order-123' },
          })

          expect(menuLoadMenu).to.have.been.calledOnce
        })

        it('should call menuLoadStock', async function() {
          await fetchData({
            store: { dispatch, getState },
            query: {},
            params: { orderId: 'order-123' },
          })

          expect(menuLoadStock).to.have.been.calledOnce
          expect(menuLoadStock.getCall(0).args[0]).to.equal(true)
        })

        it('should call featureSet 1 time, force enabling collections', async function() {
          await fetchData({
            store: { dispatch, getState },
            query: {},
            params: { orderId: 'order-123' },
          })

          expect(featureSet).to.have.been.calledOnce
          expect(featureSet.getCall(0).args[0]).to.equal('forceCollections')
          expect(featureSet.getCall(0).args[1]).to.equal(true)
        })

        it('should call featureSet 1 additional time, reseting menuRecipes experiment, if editing order, basket has recipe choices & menuRecipes experiment is set', async function() {
          getState = sinon.stub().returns(({
            basket: Immutable.fromJS({
              get: () => false,
              recipes: {
                1: { id: '1', title: 'Recipe 1' },
              },
            }),
            boxSummaryDeliveryDays: Immutable.fromJS([{ date: '2016-05-26' }]),
            features: Immutable.fromJS({
              menuRecipes: {
                value: 'whatever',
                experiment: true,
              },
            }),
            auth: Immutable.Map({ isAuthenticated: true }),
          }))
          await fetchData({
            store: { dispatch, getState },
            query: {},
            params: { orderId: 'order-123' },
          })

          expect(featureSet).to.have.been.calledWithExactly('menuRecipes', undefined, false)
        })
      })
    })

    describe('coming from the wizard', function () {
      beforeEach(function() {
        getState = sinon.stub().returns(({
          basket: { get: () => false },
          boxSummaryDeliveryDays: Immutable.fromJS([{ date: '2016-05-26' }]),
          features: Immutable.Map({}),
          auth: Immutable.Map({ isAuthenticated: false }),
          request: Immutable.Map({}),
        }))
      })
      it('should load data, call dispatch 10 times', async function() {
        await fetchData({
          store: { dispatch, getState },
          query: { date: '2016-06-26', num_portions: 2, slot_id: 'slot123', postcode: 'w3 6hx' },
          params: {},
        })

        expect(dispatch.callCount).to.equal(10)
      })

      it('should set date', async function() {
        await fetchData({
          store: { dispatch, getState },
          query: { date: '2016-06-26', num_portions: 2, slot_id: 'slot123', postcode: 'w3 6hx' },
          params: {},
        })

        expect(basketDateChange).to.have.been.calledOnce
        expect(basketDateChange.getCall(0).args[0]).to.equal('2016-06-26')
      })

      it('should set num portions', async function() {
        await fetchData({
          store: { dispatch, getState },
          query: { date: '2016-06-26', num_portions: 2, slot_id: 'slot123', postcode: 'w3 6hx' },
          params: {},
        })

        expect(basketNumPortionChange).to.have.been.calledOnce
        expect(basketNumPortionChange.getCall(0).args[0]).to.equal(2)
      })

      it('should set slot id', async function() {
        await fetchData({
          store: { dispatch, getState },
          query: { date: '2016-06-26', num_portions: 2, slot_id: 'slot123', postcode: 'w3 6hx' },
          params: {},
        })

        expect(basketSlotChange).to.have.been.calledOnce
        expect(basketSlotChange.getCall(0).args[0]).to.equal('slot123')
      })

      it('should call boxSummaryDeliveryDaysLoad', async function() {
        await fetchData({
          store: { dispatch, getState },
          query: { date: '2016-06-26', num_portions: 2, slot_id: 'slot123', postcode: 'w3 6hx' },
          params: {},
        })

        expect(boxSummaryDeliveryDaysLoad).to.have.been.calledOnce
      })

      it('should call menuLoadMenu', async function() {
        await fetchData({
          store: { dispatch, getState },
          query: { date: '2016-06-26', num_portions: 2, slot_id: 'slot123', postcode: 'w3 6hx' },
          params: {},
        })

        expect(menuLoadMenu).to.have.been.calledOnce
      })

      it('should call basketPostcodeChangePure', async function() {
        await fetchData({
          store: { dispatch, getState },
          query: { date: '2016-06-26', num_portions: 2, slot_id: 'slot123', postcode: 'w3 6hx' },
          params: {},
        })

        expect(basketPostcodeChangePure).to.have.been.calledOnce
        expect(basketPostcodeChangePure.getCall(0).args[0]).to.equal('w3 6hx')
      })

      it('should call menuLoadStock', async function() {
        await fetchData({
          store: { dispatch, getState },
          query: { date: '2016-06-26', num_portions: 2, slot_id: 'slot123', postcode: 'w3 6hx' },
          params: {},
        })

        expect(menuLoadStock).to.have.been.calledOnce
      })

      describe('with information already in the store', function () {
        it('should not do anything', async function() {
          getState = () => ({
            basket: Immutable.Map({
              date: '123',
              numPortions: 4,
              slotId: 'uuid',
              postcode: 'rwewerwer',
              numPortionsChanged: true,
            }),
            features: Immutable.Map({}),
            auth: Immutable.Map({}),
            request: Immutable.Map({}),
          })
          await fetchData({
            store: { dispatch, getState },
            query: { date: '2016-06-26', num_portions: 2, slot_id: 'slot123', postcode: 'w3 6hx' },
            params: {},
          })

          expect(dispatch.callCount).to.equal(7)
        })
      })

      describe('with default portions number already in the store', function () {
        it('should change the number of portions', async function() {
          getState = () => ({
            basket: Immutable.Map({
              date: '123',
              numPortions: 2,
              slotId: 'uuid',
              postcode: 'rwewerwer',
              numPortionsChanged: false,
            }),
            features: Immutable.Map({}),
            auth: Immutable.Map({}),
            request: Immutable.Map({}),
          })
          await fetchData({
            store: { dispatch, getState },
            query: { date: '2016-06-26', num_portions: 4, slot_id: 'slot123', postcode: 'w3 6hx' },
            params: {},
          })

          expect(dispatch.callCount).to.equal(8)
          expect(basketNumPortionChange).to.have.been.calledOnce
          expect(basketNumPortionChange.getCall(0).args[0]).to.equal(4)
        })
      })
    })

    describe('browse mode', function () {
      beforeEach(function () {
        this.clock = sinon.useFakeTimers(moment('2016-05-26T08:30:50.000Z').valueOf())
      })

      afterEach(function () {
        this.clock.restore()
      })

      it('should only call menuLoadMenu, menuAddEmptyStock, and set temp cutoffDateTime', async function() {
        getState = () => ({
          basket: Immutable.Map({}),
          features: Immutable.fromJS({
            browse: {
              value: true,
            },
          }),
          auth: Immutable.Map({}),
          request: Immutable.Map({
            browser: 'desktop',
          }),
        })

        await fetchData({
          store: { dispatch, getState },
          query: {},
          params: {},
        })

        expect(dispatch.callCount).to.equal(5)

        expect(menuLoadMenu).to.have.been.calledOnce
        expect(temp.getCall(0).args).to.deep.equal(['cutoffDateTime', '2016-05-26T10:00:00.000Z'])
        expect(menuAddEmptyStock).to.have.been.calledOnce
        expect(menuAddEmptyStock.calledAfter(menuLoadMenu)).to.equal(true)
      })
    })

    describe('non-browse mode /menu', function () {
      it('should only call menuLoadMenu & menuAddEmptyStock', async function() {
        getState = () => ({
          basket: { get: () => false },
          features: Immutable.Map({}),
          auth: Immutable.Map({}),
          boxSummaryDeliveryDays: Immutable.fromJS([{ date: '2016-05-26' }]),
          request: Immutable.Map({
            browser: 'mobile',
          }),
          user: Immutable.Map({}),
        })
        await fetchData({
          store: {
            dispatch,
            getState,
          },
          query: {},
          params: {},
        })
        expect(dispatch.callCount).to.equal(7)

        expect(menuLoadDays).to.have.been.calledOnce
        expect(boxSummaryDeliveryDaysLoad).to.have.been.calledOnce
        expect(basketDateChange).to.have.been.calledOnce
        expect(menuLoadMenu).to.have.been.calledOnce
        expect(menuLoadStock).to.have.been.calledOnce
      })
      it('should show selected default day', async function() {
        getState = () => ({
          basket: { get: () => false },
          features: Immutable.Map({}),
          auth: Immutable.Map({}),
          boxSummaryDeliveryDays: Immutable.fromJS([
            { date: '2016-05-26', isDefault: false },
            { date: '2016-05-27', isDefault: true },
          ]),
          user: Immutable.Map({}),
          request: Immutable.Map({
            browser: 'mobile',
          }),
        })
        await fetchData({
          store: {
            dispatch,
            getState,
          },
          query: {},
          params: {},
        })

        expect(dispatch.callCount).to.equal(7)

        expect(menuLoadDays).to.have.been.calledOnce
        expect(boxSummaryDeliveryDaysLoad).to.have.been.calledOnce
        expect(basketDateChange).to.have.been.calledOnce
        expect(basketDateChange.getCall(0).args[0]).to.equal('2016-05-27')
        expect(menuLoadMenu).to.have.been.calledOnce
        expect(menuLoadStock).to.have.been.calledOnce
      })
    })

    describe('with a collection query', function () {
      it('should dispatch a filterCollectionChange action with the id of the named collection', async function() {
        getState = () => ({
          basket: { get: () => false },
          features: Immutable.fromJS({
            collections: {
              value: true,
            },
          }),
          auth: Immutable.Map({}),
          boxSummaryDeliveryDays: Immutable.fromJS([{ date: '2016-05-26' }]),
          menuCollections: Immutable.OrderedMap({
            123: Immutable.Map({ id: '123', shortTitle: 'a Collection', published: true }),
            456: Immutable.Map({ id: '456', shortTitle: 'all recipes', published: true }),
          }),
          menuCollectionRecipes: Immutable.fromJS({
            123: ['', '', ''],
            456: ['', '', ''],
          }),
          user: Immutable.Map({}),
          request: Immutable.Map({
            browser: 'desktop',
          }),
        })
        await fetchData({
          store: {
            dispatch,
            getState,
          },
          query: {
            collection: 'a-collection',
          },
          params: {},
        })

        expect(filterCollectionChange).to.have.been.calledOnce
        expect(filterCollectionChange.getCall(0).args[0]).to.equal('123')
      })
      it('should not dispatch a filterCollectionChange action with the id of the named collection if the collection is not published', async function() {
        getState = () => ({
          basket: { get: () => false },
          features: Immutable.fromJS({
            collections: {
              value: true,
            },
          }),
          auth: Immutable.Map({}),
          boxSummaryDeliveryDays: Immutable.fromJS([{ date: '2016-05-26' }]),
          menuCollections: Immutable.OrderedMap({
            123: Immutable.Map({ id: '123', shortTitle: 'a Collection', published: false }),
            456: Immutable.Map({ id: '456', shortTitle: 'all recipes', published: true }),
          }),
          menuCollectionRecipes: Immutable.fromJS({
            123: ['', '', ''],
            456: ['', '', ''],
          }),
          request: Immutable.Map({
            browser: 'desktop',
          }),
        })
        await fetchData({
          store: {
            dispatch,
            getState,
          },
          query: {
            collection: 'a-collection',
          },
          params: {},
        })

        expect(filterCollectionChange).not.to.have.been.called
      })

      it('should dispatch a filterCollectionChange action with the id of the named collection if the collection is not published but the unpub_collections feature is enabled', async function() {
        getState = () => ({
          basket: { get: () => false },
          features: Immutable.fromJS({
            collections: {
              value: true,
            },
            unpubCollections: {
              value: true,
            },
          }),
          auth: Immutable.Map({}),
          boxSummaryDeliveryDays: Immutable.fromJS([{ date: '2016-05-26' }]),
          menuCollections: Immutable.OrderedMap({
            123: Immutable.Map({ id: '123', shortTitle: 'a Collection', published: false }),
            456: Immutable.Map({ id: '456', shortTitle: 'all recipes', published: true }),
          }),
          menuCollectionRecipes: Immutable.fromJS({
            123: ['', '', ''],
            456: ['', '', ''],
          }),
          request: Immutable.Map({
            browser: 'desktop',
          }),
        })
        await fetchData({
          store: {
            dispatch,
            getState,
          },
          query: {
            collection: 'a-collection',
          },
          params: {},
        })

        expect(filterCollectionChange).to.have.been.calledOnce
        expect(filterCollectionChange.getCall(0).args[0]).to.equal('123')
      })
    })

    describe('with a collectionFreeze query', function () {
      it('should call getCollectionIdWithName with forced collection name', async function () {
        getState = () => ({
          basket: { get: () => false },
          features: Immutable.fromJS({
            collections: {
              value: true,
            },
            collectionFreeze: {
              value: 'frozen',
            },
          }),
          auth: Immutable.Map({}),
          boxSummaryDeliveryDays: Immutable.fromJS([{ date: '2016-05-26' }]),
          menuCollections: Immutable.OrderedMap({
            123: Immutable.Map({ id: '123', shortTitle: 'a Collection', published: true }),
            456: Immutable.Map({ id: '456', shortTitle: 'frozen', published: true }),
          }),
          menuCollectionRecipes: Immutable.fromJS({
            123: ['', '', ''],
            456: ['', '', ''],
          }),
          request: Immutable.Map({
            browser: 'desktop',
          }),
        })
        await fetchData({
          store: {
            dispatch,
            getState,
          },
          query: {
            collection: 'a-collection',
          },
          params: {},
        })

        expect(filterCollectionChange).to.have.been.calledOnce
        expect(filterCollectionChange.getCall(0).args[0]).to.equal('456')
      })
    })

    describe('process recipe array in url', function () {
      const basketBase = Immutable.fromJS({
        get: () => false,
        recipes: {},
        numPortions: 2,
      })
      const menuRecipeStockBase = Immutable.Map({
        101: Immutable.Map({
          2: 100,
          4: 100,
        }),
        99: Immutable.Map({
          2: 100,
          4: 100,
        }),
      })
      const featuresBase = Immutable.fromJS({
        menuRecipes: {
          value: 'whatever',
          experiment: true,
        },
      })
      it('should not add anything if no recipes in query', async function () {
        getState = sinon.stub().returns(({
          basket: basketBase,
          boxSummaryDeliveryDays: Immutable.fromJS([{ date: '2016-05-26' }]),
          features: featuresBase,
          auth: Immutable.Map({ isAuthenticated: true, isAdmin: false }),
          menuRecipeStock: menuRecipeStockBase,
        }))
        await fetchData({
          store: { dispatch, getState },
          query: { recipe: '[99, 34]' },
          params: { orderId: 'order-123' },
        })
        expect(basketRecipeAdd).not.to.have.been.called
      })
      it('should not add anything if user not logged in', async function () {
        getState = sinon.stub().returns(({
          basket: basketBase,
          boxSummaryDeliveryDays: Immutable.fromJS([{ date: '2016-05-26' }]),
          features: Immutable.fromJS({
            menuRecipes: {
              value: 'whatever',
              experiment: true,
            },
          }),
          auth: Immutable.Map({ isAuthenticated: false, isAdmin: false }),
          menuRecipeStock: menuRecipeStockBase,
        }))
        await fetchData({
          store: { dispatch, getState },
          query: { recipe: '[99, 34]' },
          params: { orderId: 'order-123' },
        })
        expect(basketRecipeAdd).not.to.have.been.called
      })
      it('should not add anything if no recipes available', async function () {
        getState = sinon.stub().returns(({
          basket: Immutable.fromJS({
            get: () => false,
            recipes: {
              1: { id: '1', title: 'Recipe 1' },
            },
            numPortions: 2,
          }),
          boxSummaryDeliveryDays: Immutable.fromJS([{ date: '2016-05-26' }]),
          features: featuresBase,
          auth: Immutable.Map({ isAuthenticated: false, isAdmin: false }),
          menuRecipeStock: Immutable.Map({
            101: Immutable.Map({
              2: 100,
              4: 100,
            }),
            99: Immutable.Map({
              2: 0,
              4: 0,
            }),
          }),
        }))
        await fetchData({
          store: { dispatch, getState },
          query: { recipe: '[99, 34]' },
          params: { orderId: 'order-123' },
        })
        expect(basketRecipeAdd).not.to.have.been.called
      })
      it('adds one recipe when one in the query and user logged in and recipe in stock etc etc', async function () {
        getState = sinon.stub().returns(({
          basket: basketBase,
          boxSummaryDeliveryDays: Immutable.fromJS([{ date: '2016-05-26' }]),
          features: featuresBase,
          auth: Immutable.Map({ isAuthenticated: true, isAdmin: false }),
          menuRecipeStock: Immutable.Map({
            101: Immutable.Map({
              2: 100,
              4: 100,
            }),
            99: Immutable.Map({
              2: 100,
              4: 100,
            }),
            89: Immutable.Map({
              2: 100,
              4: 100,
            }),
          }),
        }))
        await fetchData({
          store: { dispatch, getState },
          query: { recipes: '[99,101,89]' },
          params: { orderId: 'order-123' },
        })
        expect(basketRecipeAdd).to.have.been.calledThrice
        expect(basketRecipeAdd.getCall(0).args[0]).to.equal('99')
        expect(basketRecipeAdd.getCall(1).args[0]).to.equal('101')
        expect(basketRecipeAdd.getCall(2).args[0]).to.equal('89')
      })
      it('only adds the first 4 recipes if there are more than 4 in stock recipes', async function () {
        getState = sinon.stub().returns(({
          basket: basketBase,
          boxSummaryDeliveryDays: Immutable.fromJS([{ date: '2016-05-26' }]),
          features: featuresBase,
          auth: Immutable.Map({ isAuthenticated: true, isAdmin: false }),
          menuRecipeStock: Immutable.Map({
            101: Immutable.Map({
              2: 100,
              4: 100,
            }),
            99: Immutable.Map({
              2: 100,
              4: 100,
            }),
            89: Immutable.Map({
              2: 100,
              4: 100,
            }),
            73: Immutable.Map({
              2: 100,
              4: 100,
            }),
            22: Immutable.Map({
              2: 100,
              4: 100,
            }),
          }),
        }))
        await fetchData({
          store: { dispatch, getState },
          query: { recipes: '[12,43,55,99,101,89,73,22]' },
          params: { orderId: 'order-123' },
        })
        expect(basketRecipeAdd.callCount).to.equal(4)
        expect(basketRecipeAdd.getCall(0).args[0]).to.equal('99')
        expect(basketRecipeAdd.getCall(1).args[0]).to.equal('101')
        expect(basketRecipeAdd.getCall(2).args[0]).to.equal('89')
        expect(basketRecipeAdd.getCall(3).args[0]).to.equal('73')
      })
    })
  })
})
