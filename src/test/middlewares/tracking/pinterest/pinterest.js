import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import Immutable from 'immutable' /* eslint-disable new-cap */
import actions from 'actions/actionTypes'
import windowUtils from 'utils/window'
import Tracker, { pinterestTracking } from 'middlewares/tracking/pinterest/pinterest'

describe('pinterestTracking', function() {
  let pinterestSpy
  let sandbox
  let windowUtilStub

  beforeEach(function() {
    sandbox = sinon.sandbox.create()
    pinterestSpy = sinon.spy()
    windowUtilStub = sandbox.stub(windowUtils, 'getWindow').returns({ pintrk: pinterestSpy })
  })

  afterEach(function() {
    sandbox.restore()
  })

  it('should pass action, state, prevState, and pathname from prevState as argument to any matching callback', function() {
    const callbackSpy = sandbox.spy()
    sandbox.stub(pinterestTracking, 'getCallbacks').returns({
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
    expect(pinterestSpy).to.have.been.calledOnce
    expect(pinterestSpy.args[0]).to.deep.equal(['track', 'AddToCart', {
      value: 1,
    }])
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
    expect(pinterestSpy).to.have.been.calledOnce
    expect(pinterestSpy.args[0]).to.deep.equal(['track', 'ViewCategory',
      { product_category: '1' }
    ])
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
    expect(pinterestSpy).to.have.been.calledOnce
    expect(pinterestSpy.args[0]).to.deep.equal(['track', 'InitiateCheckout', {
      property: ['1', '2'],
    }])
  })

  it('should call purchaseCompleted with actions.CHECKOUT_SIGNUP_SUCCESS', function() {
    const basket = Immutable.fromJS({
      recipes: {
        1: 1,
        2: 1,
      },
      promoCode: 'PROMO10',
      numPortions: '2',
    })
    const menuBoxPrices = Immutable.fromJS({
      2: {
        2: {
          gourmet: { grossTotal: 40 },
        },
      },
    })
    Tracker({
      type: actions.CHECKOUT_SIGNUP_SUCCESS,
    }, { basket, menuBoxPrices })
    expect(pinterestSpy).to.have.been.calledOnce
    expect(pinterestSpy.args[0]).to.deep.equal(['track', 'Signup', {
      order_quantity: 2,
      value: 40,
      promo_code: 'PROMO10',
      currency: 'GBP',
      line_items: [
        {
          product_id: 1,
          product_quantity: 1,
        },
        {
          product_id: 2,
          product_quantity: 1,
        }
      ]
    }])
  })

  it('should call pageChange on @@router/LOCATION_CHANGE', function() {
    Tracker({ type: '@@router/LOCATION_CHANGE' })
    expect(pinterestSpy).to.have.been.calledOnce
    expect(pinterestSpy.args[0]).to.deep.equal(['track', 'PageVisit', {
      property: undefined,
    }])
  })
})
