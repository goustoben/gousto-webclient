import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import Immutable from 'immutable' /* eslint-disable new-cap */
import actions from 'actions/actionTypes'
import windowUtils from 'utils/window'
import Tracker, { fbTracking } from 'middlewares/tracking/facebook/facebook'
import * as routerTracking from 'middlewares/tracking/facebook/router'

describe('fbTracking', function() {
  let facebookSpy
  let sandbox
  let windowUtilStub

  beforeEach(function() {
    sandbox = sinon.sandbox.create()
    facebookSpy = sinon.spy()
    windowUtilStub = sandbox.stub(windowUtils, 'getWindow').returns({ fbq: facebookSpy })
  })

  afterEach(function() {
    sandbox.restore()
  })

  it('should pass action, state, prevState, and pathname from prevState as argument to any matching callback', function() {
    const callbackSpy = sandbox.spy()
    sandbox.stub(fbTracking, 'getCallbacks').returns({
      sampleActionType: callbackSpy,
    })

    const action = { type: 'sampleActionType' }
    const state = {
      routing: {
        locationBeforeTransitions: {
          pathname: '/path-name-after-state-change',
        },
      },
    }
    const prevState = {
      routing: {
        locationBeforeTransitions: {
          pathname: '/path-name-before-state-change',
        },
      },
    }
    Tracker(action, state, prevState)
    expect(callbackSpy).to.have.been.calledOnce
    expect(callbackSpy).to.have.been.calledWithExactly(action, state, prevState, '/path-name-before-state-change')
  })

  it('should call showRecipeTracking with actions.MENU_RECIPE_DETAIL_VISIBILITY_CHANGE', function() {
    const recipeId = '1'
    const recipes = Immutable.fromJS({
      1: {
        title: 'test-recipe',
      },
    })
    const routing = {
      locationBeforeTransitions: {
        query: {
          collection: 'test-collection',
        },
      },
    }
    fbTracking.Tracker({
      type: actions.MENU_RECIPE_DETAIL_VISIBILITY_CHANGE,
      recipeId,
    }, { recipes, routing })
    expect(facebookSpy).to.have.been.calledOnce
    expect(facebookSpy).to.have.been.calledWith('track', 'ViewContent', {
      content_name: 'test-recipe',
      content_ids: ['1'],
      content_type: 'product',
      content_category: 'test-collection',
    })
  })

  it('should call showCollectionTracking with actions.FILTERS_COLLECTION_CHANGE', function() {
    const menuCollectionRecipes = Immutable.fromJS({
      1: ['123', '234', '345', '456'],
    })
    Tracker({
      type: actions.FILTERS_COLLECTION_CHANGE,
      collectionName: 'test-collection',
      collectionId: '1',
    }, { menuCollectionRecipes })
    expect(facebookSpy).to.have.been.calledOnce
    expect(facebookSpy).to.have.been.calledWith('trackCustom', 'ViewCategory', {
      content_name: 'test-collection',
      content_ids: ['123', '234', '345', '456'],
      content_type: 'product',
      content_category: 'test-collection',
    })
  })

  it('should call addRecipeToBasket with actions.BASKET_RECIPE_ADD', function() {
    const recipeId = '1'
    const recipes = Immutable.fromJS({
      1: {
        title: 'test-recipe',
      },
    })
    Tracker({
      type: actions.BASKET_RECIPE_ADD,
      recipeId,
    }, { recipes })
    expect(facebookSpy).to.have.been.calledOnce
    expect(facebookSpy).to.have.been.calledWith('track', 'AddToCart', {
      content_name: 'test-recipe',
      content_ids: ['1'],
      content_type: 'product',
    })
  })

  it('should call initiateCheckout with actions.BASKET_CHECKOUT', function() {
    const basket = Immutable.fromJS({
      recipes: {
        1: 2,
        2: 2,
      },
    })
    Tracker({
      type: actions.BASKET_CHECKOUT,
    }, { basket })
    expect(facebookSpy).to.have.been.calledOnce
    expect(facebookSpy).to.have.been.calledWith('track', 'InitiateCheckout', {
      content_ids: ['1', '2'],
      content_type: 'product',
    })
  })

  it('should call purchaseCompleted with actions.CHECKOUT_SIGNUP_SUCCESS', function() {
    const basket = Immutable.fromJS({
      previewOrderId: '1',
      recipes: {
        1: 1,
        2: 1,
      },
    })
    const pricing = Immutable.fromJS({
      prices: {
        total: 40,
      }
    })

    Tracker({
      type: actions.CHECKOUT_SIGNUP_SUCCESS,
    }, { basket, pricing })
    expect(facebookSpy).to.have.been.calledOnce
    expect(facebookSpy).to.have.been.calledWith('track', 'Purchase', {
      content_ids: ['1', '2'],
      content_type: 'product',
      num_items: 2,
      value: 40,
      currency: 'GBP',
      order_id: '1',
    })
  })

  it('should call onLocationChange on @@router/LOCATION_CHANGE', function() {
    const onLocationChange = sandbox.stub(fbTracking, 'onLocationChange')
    Tracker({ type: '@@router/LOCATION_CHANGE' })
    expect(onLocationChange).to.have.been.calledOnce
  })

  describe('onLocationChange', function() {
    it('should call getUserData once', function() {
      const getUserData = sandbox.stub(routerTracking, 'getUserData')
      fbTracking.onLocationChange({ type: '@@router/LOCATION_CHANGE' })
      expect(getUserData).to.have.been.calledOnce
    })

    it('should call fb with init action once per instantiated fb pixel if user data is available and pixel does not yet have userData', function() {
      const FacebookPixel = function() {}
      FacebookPixel.getState = () => {}
      sandbox.stub(FacebookPixel, 'getState').returns({
        pixelInstantiationIdentifier: 12345,
        pixels: [
          { id: 1, userData: { fn: 'Alice' } },
          { id: 2 },
          { id: 3 },
          { id: 4, userData: {} },
          { id: 5, userData: { ln: 'Tester' } },
        ],
      })
      const fbq = sandbox.spy(FacebookPixel)
      windowUtilStub.returns({ fbq })
      const userData = {
        em: 'test@email.com',
        fn: 'Alice',
        ln: 'Tester',
      }
      sandbox.stub(routerTracking, 'getUserData').returns(userData)
      fbTracking.onLocationChange({ type: '@@router/LOCATION_CHANGE' })
      expect(fbq).to.have.been.calledThrice
      expect(fbq.getCall(0)).to.have.been.calledWithExactly('init', 2, userData, 12345)
      expect(fbq.getCall(1)).to.have.been.calledWithExactly('init', 3, userData, 12345)
      expect(fbq.getCall(2)).to.have.been.calledWithExactly('init', 4, userData, 12345)
    })

    it('should NOT call fb with init action if user data is available but there are no pixels', function() {
      const FacebookPixel = function() {}
      FacebookPixel.getState = () => {}
      sandbox.stub(FacebookPixel, 'getState').returns({})
      const fbq = sandbox.spy(FacebookPixel)
      windowUtilStub.returns({ fbq })
      const userData = {
        em: 'test@email.com',
        fn: 'Alice',
        ln: 'Tester',
      }
      sandbox.stub(routerTracking, 'getUserData').returns(userData)
      fbTracking.onLocationChange({ type: '@@router/LOCATION_CHANGE' })
      expect(fbq).to.have.not.been.called
    })

    it('should NOT call fb with init action if user data is not available', function() {
      const FacebookPixel = function() {}
      FacebookPixel.getState = () => {}
      sandbox.stub(FacebookPixel, 'getState').returns({
        pixelInstantiationIdentifier: 12345,
        pixels: [
          { id: 1, userData: { fn: 'Alice' } },
          { id: 2 },
          { id: 3 },
          { id: 4, userData: {} },
          { id: 5, userData: { ln: 'Tester' } },
        ],
      })
      const fbq = sandbox.spy(FacebookPixel)
      windowUtilStub.returns({ fbq })
      sandbox.stub(routerTracking, 'getUserData').returns(undefined)
      fbTracking.onLocationChange({ type: '@@router/LOCATION_CHANGE' })
      expect(fbq).to.have.not.been.called
    })
  })
})
