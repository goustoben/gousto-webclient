import Immutable from 'immutable'
/* eslint-disable new-cap */
import chai, {expect} from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

import actionTypes from 'actions/actionTypes'
import basket from 'actions/basket'
chai.use(sinonChai)

describe('basket actions', function () {
  let dispatchSpy
  let getStateSpy
  beforeEach(function () {
    dispatchSpy = sinon.spy()
  })

  describe('basketAddressChange', function () {
    it('should return with BASKET_ADDRESS_CHANGE action type and address', function () {
      const address = Immutable.fromJS({})
      expect(basket.basketAddressChange(address)).to.deep.equal({ type: actionTypes.BASKET_ADDRESS_CHANGE, address })
    })
  })

  describe('basketRecipesClear', function () {
    it('should return with BASKET_RECIPES_CLEAR action type', function () {
      expect(basket.basketRecipesClear()).to.deep.equal({ type: actionTypes.BASKET_RECIPES_CLEAR })
    })
  })

  describe('basketRecipesClear', function () {
    it('should return with BASKET_RECIPES_POSITIONS_CLEAR action type', function () {
      expect(basket.basketRecipesPositionsClear()).to.deep.equal({ type: actionTypes.BASKET_RECIPES_POSITIONS_CLEAR })
    })
  })

  describe('basketStepsOrderReceive', function () {
    it('should return with BASKET_STEPS_ORDER_RECEIVE action type and steps order', function () {
      expect(basket.basketStepsOrderReceive(['summary', 'aboutyou'])).to.deep.equal({
        type: actionTypes.BASKET_STEPS_ORDER_RECEIVE,
        stepsOrder: ['summary', 'aboutyou'],
      })
    })
  })

  describe('basketChosenAddressChange', function () {
    it('should return with BASKET_CHOSEN_ADDRESS_CHANGE action type and address', function () {
      const address = Immutable.fromJS({})
      expect(basket.basketChosenAddressChange(address)).to.deep.equal({
        type: actionTypes.BASKET_CHOSEN_ADDRESS_CHANGE,
        address,
      })
    })
  })

  describe('basketDateChange', function () {
    it('should return with BASKET_DATE_CHANGE action type and date', function () {
      expect(basket.basketDateChange('2016-09-09')).to.deep.equal({
        type: actionTypes.BASKET_DATE_CHANGE,
        date: '2016-09-09',
      })
    })
  })

  describe('basketGiftAdd', function () {
    beforeEach(function () {
      getStateSpy = sinon.stub().returns({
        basket: Immutable.fromJS({
          products: {},
          gifts: {},
        }),
        products: Immutable.fromJS({
          'product-1': { id: 'product-1' },
        }),
      })
    })

    it('should dispatch BASKET_GIFT_ADD action type & productId if type is Product', function () {
      basket.basketGiftAdd('product-1', 'Product')(dispatchSpy, getStateSpy)

      expect(dispatchSpy.args[0][0]).to.deep.equal({
        type: 'BASKET_GIFT_ADD',
        giftId: 'product-1',
      })
    })

    it('should NOT dispatch BASKET_GIFT_ADD action type if type is not Product', function () {
      basket.basketGiftAdd('product-1', 'other')(dispatchSpy, getStateSpy)

      expect(dispatchSpy).to.have.not.been.called
    })
  })

  describe('basketProductAdd', function () {
    let actions

    describe('when product can be added and force flag is false or not set', function () {
      beforeEach(function () {
        getStateSpy = sinon.stub().returns({
          basket: Immutable.Map({
            products: Immutable.Map({}),
          }),
          products: Immutable.fromJS({ 'product-1': { id: 'product-1' } }),
          productsCategories: Immutable.Map(),
          productsStock: Immutable.Map(),
        })

        const productCanBeAddedSpy = sinon.stub().returns(true)

        actions = require('inject-loader?&utils/basketProductLimits!actions/basket')({
          'utils/basketProductLimits': { productCanBeAdded: productCanBeAddedSpy },
        }).default
      })

      it('should dispatch BASKET_PRODUCT_ADD action type with unsaved flag set to true & trackingData defined when adding product before saving order', function () {
        actions.basketProductAdd('product-1', 'view-name')(dispatchSpy, getStateSpy)

        expect(dispatchSpy.args[0][0]).to.deep.equal({
          type: 'BASKET_PRODUCT_ADD',
          productId: 'product-1',
          unsaved: true,
          trackingData: { actionType: 'BASKET_PRODUCT_ADD', productId: 'product-1', view: 'view-name' },
        })
      })

      it('should dispatch PRODUCTS_STOCK_CHANGE action type with -1 when adding product', function () {
        actions.basketProductAdd('product-1', 'view-name')(dispatchSpy, getStateSpy)

        expect(dispatchSpy.args[1][0]).to.deep.equal({
          type: 'PRODUCTS_STOCK_CHANGE',
          stock: { 'product-1': -1 },
        })
      })
    })

    describe('when product cannot be newly added but force flag is true', function () {
      beforeEach(function () {
        getStateSpy = sinon.stub().returns({
          basket: Immutable.Map({
            products: Immutable.Map({}),
          }),
          products: Immutable.fromJS({ 'product-1': { id: 'product-1' } }),
          productsCategories: Immutable.Map(),
          productsStock: Immutable.Map(),
        })

        const productCanBeAddedSpy = sinon.stub().returns(false)

        actions = require('inject-loader?&utils/basketProductLimits!actions/basket')({
          'utils/basketProductLimits': { productCanBeAdded: productCanBeAddedSpy },
        }).default
      })

      it('should dispatch BASKET_PRODUCT_ADD action type, productId, & unsaved flag set to false', function () {
        actions.basketProductAdd('product-1', 'view-name', true)(dispatchSpy, getStateSpy)

        expect(dispatchSpy.args[0][0]).to.deep.equal({
          type: 'BASKET_PRODUCT_ADD',
          productId: 'product-1',
          unsaved: false,
          trackingData: undefined,
        })
      })

      it('should NOT dispatch PRODUCTS_STOCK_CHANGE action type', function () {
        actions.basketProductAdd('product-1', 'view-name', true)(dispatchSpy, getStateSpy)

        expect(dispatchSpy.neverCalledWith({
          type: 'PRODUCTS_STOCK_CHANGE',
          stock: { 'product-1': -1 },
        })).to.equal(true)
      })
    })
  })

  describe('basketProductRemove', function () {
    beforeEach(function () {
      getStateSpy = sinon.stub().returns({
        basket: Immutable.Map({
          products: Immutable.Map({ 'product-2': 3 }),
        }),
        products: Immutable.fromJS({ 'product-2': { id: 'product-2' } }),
        productsCategories: Immutable.Map(),
        productsStock: Immutable.Map(),
      })
    })

    it('should dispatch BASKET_PRODUCT_REMOVE action type called with productId, categories, unsaved flag, & trackingData', function () {
      basket.basketProductRemove('product-2', 'view-name')(dispatchSpy, getStateSpy)

      expect(dispatchSpy.args[0][0]).to.deep.equal({
        type: 'BASKET_PRODUCT_REMOVE',
        productId: 'product-2',
        unsaved: true,
        trackingData: {
          actionType: 'BASKET_PRODUCT_REMOVE',
          productId: 'product-2',
          view: 'view-name',
        },
      })
    })

    it('should dispatch PRODUCTS_STOCK_CHANGE action type with 1 when removing product', function () {
      basket.basketProductRemove('product-2', 'view-name')(dispatchSpy, getStateSpy)

      expect(dispatchSpy.args[1][0]).to.deep.equal({
        type: 'PRODUCTS_STOCK_CHANGE',
        stock: { 'product-2': 1 },
      })
    })
  })

  describe('basketNumPortionChange', function () {

    it('should return with BASKET_NUM_PORTION_CHANGE action type and portion, and BASKET_LIMIT_REACHED', function () {
      const okRecipesMock = recipes => recipes
      const limitReachedMock = () => false
      const basketSumMock = sinon.stub().returns(1)
      const actions = require('inject-loader?&utils/basket&actions/pricing!actions/basket')({
        'utils/basket': { okRecipes: okRecipesMock, limitReached: limitReachedMock },
      }).default
      dispatchSpy = sinon.spy()
      getStateSpy = sinon.stub().returns({
        basket: Immutable.Map({
          recipes: Immutable.Map([['123', 1]]),
          numPortions: 2,
          limitReached: false,
        }),
        menuRecipeStock: Immutable.fromJS({
          123: { 2: 30 },
        }),
        menuRecipes: Immutable.fromJS({
          123: {},
        }),
      })
      actions.basketNumPortionChange('2')(dispatchSpy, getStateSpy)
      expect(dispatchSpy).to.have.been.calledTwice
      expect(dispatchSpy.args[0][0]).to.deep.equal({
        type: actionTypes.BASKET_NUM_PORTION_CHANGE, numPortions: '2', trackingData: {
          actionType: actionTypes.BASKET_NUM_PORTION_CHANGE,
          numPortions: '2',
        },
      })
      expect(dispatchSpy.args[1][0]).to.deep.equal({
        type: actionTypes.BASKET_LIMIT_REACHED, limitReached: false, trackingData: {
          actionType: actionTypes.BASKET_LIMIT_REACHED,
          limitReached: false,
          source: 'BASKET_NUM_PORTION_CHANGE',
        },
      })
    })

    it('should call pricingRequest when BASKET_NUM_PORTION_CHANGE triggered and a number of recipes is greater than two, and BASKET_LIMIT_REACHED', function () {
      const okRecipesMock = recipes => recipes
      const limitReachedMock = () => false
      const basketSumMock = sinon.stub().returns(2)
      const actions = require('inject-loader?&utils/basket&actions/pricing!actions/basket')({
        'utils/basket': { okRecipes: okRecipesMock, limitReached: limitReachedMock, basketSum: basketSumMock },
      }).default
      dispatchSpy = sinon.spy()
      getStateSpy = sinon.stub().returns({
        basket: Immutable.Map({
          recipes: Immutable.Map([['111', 1], ['222', 1]]),
          numPortions: 2,
          limitReached: false,
        }),
        menuRecipeStock: Immutable.fromJS({
          123: { 2: 30 },
        }),
        menuRecipes: Immutable.fromJS({
          123: {},
        }),
      })
      actions.basketNumPortionChange('2')(dispatchSpy, getStateSpy)
    })
  })

  describe('basketNumPeopleChange', function () {
    let okRecipesMock
    let limitReachedMock
    let actions
    let people

    beforeEach(function () {
      okRecipesMock = recipes => recipes
      limitReachedMock = () => false
      actions = require('inject-loader?&utils/basket!actions/basket')({
        'utils/basket': { okRecipes: okRecipesMock, limitReached: limitReachedMock },
      }).default
      dispatchSpy = sinon.spy()
      getStateSpy = sinon.stub().returns({
        basket: Immutable.Map({}),
      })
    })

    it('should return with BASKET_NUM_PEOPLE_CHANGE (1 adult) action type', function () {
      people = { numAdults: 1 }
      actions.basketNumPeopleChange(people)(dispatchSpy, getStateSpy)
      expect(dispatchSpy).to.have.been.calledOnce
      expect(dispatchSpy.args[0][0]).to.deep.equal({
        type: actionTypes.BASKET_NUM_PEOPLE_CHANGE, people,
        trackingData: {
          actionType: actionTypes.BASKET_NUM_PEOPLE_CHANGE,
          people,
        },
      })
    })

    it('should return with BASKET_NUM_PEOPLE_CHANGE (1 adult) action type', function () {
      people = { numAdults: 1 }
      actions.basketNumPeopleChange(people)(dispatchSpy, getStateSpy)
      expect(dispatchSpy).to.have.been.calledOnce
      expect(dispatchSpy.args[0][0]).to.deep.equal({
        type: actionTypes.BASKET_NUM_PEOPLE_CHANGE, people,
        trackingData: {
          actionType: actionTypes.BASKET_NUM_PEOPLE_CHANGE,
          people,
        },
      })
    })

    it('should return with BASKET_NUM_PEOPLE_CHANGE (1 adult) action type', function () {
      people = { numAdults: 1 }
      actions.basketNumPeopleChange(people)(dispatchSpy, getStateSpy)
      expect(dispatchSpy).to.have.been.calledOnce
      expect(dispatchSpy.args[0][0]).to.deep.equal({
        type: actionTypes.BASKET_NUM_PEOPLE_CHANGE, people,
        trackingData: {
          actionType: actionTypes.BASKET_NUM_PEOPLE_CHANGE,
          people,
        },
      })
    })
  })

  describe('basketOrderLoad', function () {
    let sandbox
    let basketResetSpy
    let basketIdChangeSpy
    let basketOrderItemsLoadSpy
    let basketOrderLoadedSpy
    let actions

    beforeEach(function () {
      sandbox = sinon.sandbox.create()
      basketResetSpy = sandbox.spy()
      basketIdChangeSpy = sandbox.spy()
      basketOrderItemsLoadSpy = sandbox.spy()
      basketOrderLoadedSpy = sandbox.spy()
      actions = require('inject-loader?&actions/basket!actions/basket')({
        'actions/basket': {
          basketReset: basketResetSpy,
          basketIdChange: basketIdChangeSpy,
          basketOrderItemsLoad: basketOrderItemsLoadSpy,
          basketOrderLoaded: basketOrderLoadedSpy,
        },
      }).default
    })

    afterEach(function () {
      sandbox.restore()
    })

    it('should call basketReset, basketIdChange, basketOrderItemsLoad, & basketOrderLoaded with orderId if order is not already loaded', function () {
      actions.basketOrderLoad('123')(dispatchSpy, getStateSpy)

      expect(basketResetSpy).to.have.been.calledOnce
      expect(basketIdChangeSpy).to.have.been.calledOnce
      expect(basketIdChangeSpy).to.have.been.calledWithExactly('123')
      expect(basketOrderItemsLoadSpy).to.have.been.calledOnce
      expect(basketOrderItemsLoadSpy).to.have.been.calledWithExactly('123')
      expect(basketOrderLoadedSpy).to.have.been.calledOnce
      expect(basketOrderLoadedSpy).to.have.been.calledWithExactly('123')
    })

    it('should call basketOrderLoaded with orderId even if order is already loaded', function () {
      const alreadyLoadedGetState = sinon.stub().returns({
        basket: Immutable.fromJS({
          orderId: '123',
        }),
      })

      actions.basketOrderLoad('123')(dispatchSpy, alreadyLoadedGetState)

      expect(basketResetSpy).to.have.not.been.called
      expect(basketIdChangeSpy).to.have.not.been.called
      expect(basketOrderItemsLoadSpy).to.have.not.been.called
      expect(basketOrderLoadedSpy).to.have.been.calledOnce
      expect(basketOrderLoadedSpy).to.have.been.calledWithExactly('123')
    })
  })

  describe('basketPromoCodeChange', function () {
    it('should return with BASKET_PROMO_CODE_CHANGE action type and promo code and url', function () {
      expect(basket.basketPromoCodeChange('hooray', 'hoorayAgain')).to.deep.equal({
        type: actionTypes.BASKET_PROMO_CODE_CHANGE,
        promoCode: 'hooray',
      })
    })
  })

  describe('basketPromoCodeAppliedChange', function () {
    it('should return with BASKET_PROMO_CODE_APPLIED_CHANGE action type and promo applied', function () {
      expect(basket.basketPromoCodeAppliedChange(true)).to.deep.equal({
        type: actionTypes.BASKET_PROMO_CODE_APPLIED_CHANGE,
        promoCodeApplied: true,
      })
    })
  })

  describe('basketPromoCodeUrlChange', function () {
    it('should return with BASKET_PROMO_CODE_URL_CHANGE action type and promo code and url', function () {
      expect(basket.basketPromoCodeUrlChange('hooray')).to.deep.equal({
        type: actionTypes.BASKET_PROMO_CODE_URL_CHANGE,
        promoCodeUrl: 'hooray',
      })
    })
  })

  describe('basketPreviewOrderChange', function () {
    it('should return with BASKET_PREVIEW_ORDER_CHANGE action type and preview order id', function () {
      expect(basket.basketPreviewOrderChange(56, 23)).to.deep.equal({
        type: actionTypes.BASKET_PREVIEW_ORDER_CHANGE,
        previewOrderId: 56,
        surcharges: [],
        boxId: 23,
      })
    })
  })

  describe('basketPostcodeChange', function () {
    let loggerSpy
    let boxSummaryDeliveryDaysLoad
    let getMenuDatesMock
    let actions

    beforeEach(function () {
      const deliveryDays = [
        { id: 1 },
        { id: 2 },
      ]
      loggerSpy = sinon.spy()
      dispatchSpy = sinon.spy()
      boxSummaryDeliveryDaysLoad = sinon.stub().returns(Promise.resolve({ data: deliveryDays }))
      getMenuDatesMock = sinon.stub().returns({ start: '2016-09-09', end: '2016-09-15' })

      actions = require('inject-loader?./boxSummary&utils/logger&apis/deliveries&utils/deliveries!actions/basket')({
        'utils/logger': loggerSpy,
        'utils/deliveries': { getMenuDates: getMenuDatesMock },
        './boxSummary': { boxSummaryDeliveryDaysLoad },
      }).default
    })

    it('should dispatch action with BASKET_POSTCODE_CHANGE and BASKET_POSTCODE_PENDING types', function (done) {
      actions.basketPostcodeChange('TW2 7UN')(dispatchSpy)
        .then(function () {
          expect(dispatchSpy.callCount).to.equal(4)

          expect(boxSummaryDeliveryDaysLoad).to.have.been.calledOnce

          expect(dispatchSpy.args[0][0]).to.deep.equal({
            forgetPrevPostcode: false,
            type: actionTypes.BASKET_POSTCODE_CHANGE,
            postcode: 'TW2 7UN',
            trackingData: {
              actionType: actionTypes.BASKET_POSTCODE_CHANGE,
              postcode: 'TW2 7UN',
            },
          })

          expect(dispatchSpy.args[1][0]).to.deep.equal({ type: actionTypes.BASKET_POSTCODE_PENDING, pending: true })
          expect(dispatchSpy.args[3][0]).to.deep.equal({ type: actionTypes.BASKET_POSTCODE_PENDING, pending: false })
        }).then(done, done)
    })

    it('should trim postcode', async function () {
      await actions.basketPostcodeChange('TW2 7UN ')(dispatchSpy)
      expect(dispatchSpy.args[0][0]).to.deep.equal({
        type: actionTypes.BASKET_POSTCODE_CHANGE,
        postcode: 'TW2 7UN',
        forgetPrevPostcode: false,
        trackingData: {
          actionType: actionTypes.BASKET_POSTCODE_CHANGE,
          postcode: 'TW2 7UN',
        },
      })
    })
  })

  describe('basketSlotChange', function () {
    it('should return with BASKET_SLOT_CHANGE action type and slot id', function () {
      dispatchSpy = sinon.spy()
      getStateSpy = sinon.stub().returns({
        basket: Immutable.Map({
          date: '2016-01-01',
        }),
        boxSummaryDeliveryDays: Immutable.fromJS({
          '2016-01-01': {
            id: '123-123-123-uuid',
          },
        }),
      })
      basket.basketSlotChange('slot123')(dispatchSpy, getStateSpy)
      expect(dispatchSpy.args[0][0]).to.deep.equal({
        type: actionTypes.BASKET_SLOT_CHANGE,
        slotId: 'slot123',
        trackingData: {
          date: '2016-01-01',
          dayId: '123-123-123-uuid',
          actionType: actionTypes.BASKET_SLOT_CHANGE,
          slotId: 'slot123',
        },
      })
    })
  })

  describe('basketIdChange', function () {
    it('should return with BASKET_ID_CHANGE action type and order id', function () {
      expect(basket.basketIdChange('order123')).to.deep.equal({
        type: actionTypes.BASKET_ID_CHANGE,
        orderId: 'order123',
      })
    })
  })

  describe('basketTariffChange', function () {
    it('should return with BASKET_TARIFF_CHANGE action type and tariff id', function () {
      expect(basket.basketTariffChange(2)).to.deep.equal({
        type: actionTypes.BASKET_TARIFF_CHANGE,
        tariffId: 2,
      })
    })
  })

  describe('basketRestorePreviousValues', function () {
    it('should restore my previous postcode', function () {
      getStateSpy = sinon.stub().returns({
        basket: Immutable.Map({
          prevPostcode: 'w30df',
          postcode: '',
        }),
      })
      basket.basketRestorePreviousValues()(dispatchSpy, getStateSpy)
      expect(dispatchSpy).to.have.been.calledOnce
      expect(dispatchSpy.args[0][0]).to.deep.equal({
        type: actionTypes.BASKET_POSTCODE_CHANGE,
        postcode: 'w30df',
      })
    })
    it('should restore my previous slotId', function () {
      getStateSpy = sinon.stub().returns({
        basket: Immutable.Map({
          prevSlotId: '123-123-123-uuid',
          slotId: '',
        }),
      })
      basket.basketRestorePreviousValues()(dispatchSpy, getStateSpy)
      expect(dispatchSpy).to.have.been.calledOnce
      expect(dispatchSpy.args[0][0]).to.deep.equal({
        type: actionTypes.BASKET_SLOT_CHANGE,
        slotId: '123-123-123-uuid',
      })
    })
    it('should restore my previous address', function () {
      getStateSpy = sinon.stub().returns({
        basket: Immutable.Map({
          prevAddress: { name: 'myaddress' },
          address: null,
        }),
      })
      basket.basketRestorePreviousValues()(dispatchSpy, getStateSpy)
      expect(dispatchSpy).to.have.been.calledOnce
      expect(dispatchSpy.args[0][0]).to.deep.equal({
        type: actionTypes.BASKET_ADDRESS_CHANGE,
        address: { name: 'myaddress' },
      })
    })
    it('should restore both my previous slotId, postcode, and address', function () {
      getStateSpy = sinon.stub().returns({
        basket: Immutable.Map({
          prevPostcode: 'w30df',
          postcode: '',
          prevSlotId: '123-123-123-uuid',
          slotId: '',
          prevAddress: { name: 'myaddress' },
          address: null,
        }),
      })
      basket.basketRestorePreviousValues()(dispatchSpy, getStateSpy)
      expect(dispatchSpy.callCount).to.equal(3)
      expect(dispatchSpy.args[0][0]).to.deep.equal({
        type: actionTypes.BASKET_SLOT_CHANGE,
        slotId: '123-123-123-uuid',
      })
      expect(dispatchSpy.args[1][0]).to.deep.equal({
        type: actionTypes.BASKET_POSTCODE_CHANGE,
        postcode: 'w30df',
      })
      expect(dispatchSpy.args[2][0]).to.deep.equal({
        type: actionTypes.BASKET_ADDRESS_CHANGE,
        address: { name: 'myaddress' },
      })
    })

    it('should not restore my previous postcode if it\'s blank', function () {
      getStateSpy = sinon.stub().returns({
        basket: Immutable.Map({
          prevPostcode: '',
          postcode: 'w30df',
        }),
      })
      basket.basketRestorePreviousValues()(dispatchSpy, getStateSpy)
      expect(dispatchSpy).to.have.not.been.called
    })
    it('should not restore my previous slotId if it\'s blank', function () {
      getStateSpy = sinon.stub().returns({
        basket: Immutable.Map({
          prevSlotId: '',
          slotId: '123-123-123-uuid',
        }),
      })
      basket.basketRestorePreviousValues()(dispatchSpy, getStateSpy)
      expect(dispatchSpy).to.have.not.been.called
    })
    it('should not restore my previous address if it\'s null', function () {
      getStateSpy = sinon.stub().returns({
        basket: Immutable.Map({
          prevAddress: null,
          address: { name: 'addressname' },
        }),
      })
      basket.basketRestorePreviousValues()(dispatchSpy, getStateSpy)
      expect(dispatchSpy).to.have.not.been.called
    })
    it('should not restore both my previous slotId, postcode, or address if they\'re all blank', function () {
      getStateSpy = sinon.stub().returns({
        basket: Immutable.Map({
          prevPostcode: '',
          postcode: 'w30df',
          prevSlotId: '',
          slotId: '123-123-123-uuid',
          prevAddress: null,
          address: { name: 'addressname' },
        }),
      })
      basket.basketRestorePreviousValues()(dispatchSpy, getStateSpy)
      expect(dispatchSpy).to.have.not.been.called
    })
  })

  describe('basketPostcodeClear', function () {
    it('should clear the postcode and address', function () {
      getStateSpy = sinon.stub().returns({
        basket: Immutable.Map({
          prevPostcode: '',
          postcode: 'w30df',
          prevAddress: null,
          address: { name: 'addressname' },
        }),
      })
      basket.basketPostcodeClear()(dispatchSpy, getStateSpy)
      expect(dispatchSpy).to.have.been.calledTwice
      expect(dispatchSpy.args[0][0]).to.deep.equal({
        type: actionTypes.BASKET_POSTCODE_CHANGE,
        postcode: '',
      })
      expect(dispatchSpy.args[1][0]).to.deep.equal({
        type: actionTypes.BASKET_ADDRESS_CHANGE,
        address: null,
      })
    })
  })

  describe('basketRestorePreviousDate', function () {
    it('should dispatch BASKET_DATE_CHANGE, BASKET_SLOT_CHANGE with previous values then menuLoadMenu and menuLoadStock', function () {
      getStateSpy = sinon.stub().returns({
        basket: Immutable.Map({
          prevDate: '2018-01-01',
          prevSlotId: '123-slot-id',
        }),
      })
      basket.basketRestorePreviousDate()(dispatchSpy, getStateSpy)
      expect(dispatchSpy.callCount).to.equal(4)
      expect(dispatchSpy.args[0][0]).to.deep.equal({
        type: actionTypes.BASKET_DATE_CHANGE,
        date: '2018-01-01',
      })
      expect(dispatchSpy.args[1][0]).to.deep.equal({
        type: actionTypes.BASKET_SLOT_CHANGE,
        slotId: '123-slot-id',
      })
    })
  })

  describe('basketPostcodeChangePure', function () {
    it('should dispatch a BASKET_POSTCODE_CHANGE with the postcode passed in', function () {
      expect(basket.basketPostcodeChangePure('abc123')).to.deep.equal({
        type: actionTypes.BASKET_POSTCODE_CHANGE,
        postcode: 'abc123',
      })
    })
  })

  describe('basketReset', function () {
    it('should dispatch a BASKET_RESET action', function () {
      expect(basket.basketReset()).to.deep.equal({
        type: actionTypes.BASKET_RESET,
      })
    })
  })

  describe('basketSignupCollectionReceive', function () {
    it('should dispatch a BASKET_SIGNUP_COLLECTION_RECEIVE action', function () {
      expect(basket.basketSignupCollectionReceive('lighter')).to.deep.equal({
        type: actionTypes.BASKET_SIGNUP_COLLECTION_RECEIVE,
        collection: 'lighter'
      })
    })
  })
})
