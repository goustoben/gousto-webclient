import chai, { expect } from 'chai'
import sinon from 'sinon'
import Immutable from 'immutable' /* eslint-disable new-cap */
import sinonChai from 'sinon-chai'
import actionTypes from 'actions/actionTypes'
import basketActions from 'actions/basket'
import checkoutActions from 'actions/checkout'
import menuActions from 'actions/menu'
import loginActions from 'actions/login'
import userActions from 'actions/user'
import config from 'config/routes'
import * as userApi from 'apis/user'
import redirectActions from 'actions/redirect'
const deliveryUtils = require('utils/deliveries')
const apiOrders = require('apis/orders')
const addressApi = require('apis/addressLookup')
const basketUtils = require('utils/basket')

chai.use(sinonChai)

describe('checkout actions', function() {
  let sandbox
  let dispatchSpy
  let getStateSpy
  let createPreviewOrderSpy
  let fetchAddressByPostcodeSpy
  let previewOrder
  let redirect
  let addressCollection
  let addressItem
  let userSubscribeSpy
  let loginUserSpy
  let getSlotMock
  let store

  beforeEach(function() {
    sandbox = sinon.sandbox.create()
    dispatchSpy = sandbox.spy()
    store = {
      basket: Immutable.fromJS({
        address: '3 Moris House, London',
        date: '2016-11-21',
        numPortions: 4,
        recipes: {
          'recipe-id-1': 1,
          'recipe-id-2': 2,
        },
        stepsOrder: ['boxdetails', 'aboutyou', 'delivery', 'payment'],
        slotId: '33e977c1e-a778-11e6-aa8b-080027596944',
        postcode: 'W6 0DH',
        prevPostcode: 'OX18 1EN',
      }),
      checkout: Immutable.fromJS({
        deliveryAddresses: Immutable.fromJS([
          {
            id: '2000287',
            count: 1,
          },
        ]),
        email: 'test@example.com',
        password: 'testpassword',
        validations: {
          boxdetails: true,
          aboutyou: true,
          delivery: true,
          payment: true,
        },
      }),
      form: {
        checkout: {
          values: {
            aboutyou: {
              email: 'test@test.com',
            },
            payment: {
              postcode: 'w37un',
              houseNo: '1',
            },
            delivery: {
              phone: '01234567890',
              cardNumber: '1234567890',
              cardExpiryDate: '12/24',
            },
          },
        },
      },
      boxSummaryDeliveryDays: Immutable.fromJS({
        '2016-11-21': {
          id: '3e9a2572-a778-11e6-bb0f-080027596944',
          date: '2016-11-21',
          coreDayId: '253',
          slots: [{
            coreSlotId: '1',
            id: '3e952522-a778-11e6-8197-080027596944',
          }],
        },
      }),
      request: Immutable.fromJS({
        browser: 'desktop',
      }),
    }
    getStateSpy = sandbox.stub().returns(store)
    previewOrder = {
      delivery_day_id: '253',
      delivery_slot_id: '4',
      recipe_choices: [
        { id: 'recipe-id-1', quantity: 4, type: 'Recipe' },
        { id: 'recipe-id-2', quantity: 4, type: 'Recipe' },
        { id: 'recipe-id-2', quantity: 4, type: 'Recipe' },
      ],
    }
    addressCollection = [
			1: 'a',
			2: 'b',
    ]
    addressItem = { id: '2000287', line_1: '3 Aldensley Road' }
    redirect = sandbox.stub(redirectActions, 'redirect')
    userSubscribeSpy = sandbox.stub(userActions, 'userSubscribe')
    loginUserSpy = sandbox.stub(loginActions, 'loginUser')
    fetchAddressByPostcodeSpy = sandbox.stub(addressApi, 'fetchAddressByPostcode')
      .returns(new Promise((resolve) => {
        resolve({ data: { results: addressCollection } })
      }))
    createPreviewOrderSpy = sandbox.stub(apiOrders, 'createPreviewOrder')
      .returns(new Promise((resolve) => {
        resolve({
          data: {
            order: {
              id: 1,
            },
            ...previewOrder,
          },
        })
      }))

    getSlotMock = sandbox.stub(deliveryUtils, 'getSlot').returns(Immutable.Map({
      coreSlotId: '4',
      id: '3e977c1e-a778-11e6-aa8b-080027596944',
    }))
  })

  afterEach(function() {
    sandbox.restore()
  })

  describe('checkoutClearErrors', function() {
    it('should dispatch CHECKOUT_ERRORS_CLEAR', async function() {
      const result = checkoutActions.checkoutClearErrors()
      expect(result.type).to.equal(actionTypes.CHECKOUT_ERRORS_CLEAR)
    })
  })

  describe('checkoutCreatePreviewOrder', function() {
    it('should call create preview order', async function() {
      await checkoutActions.checkoutCreatePreviewOrder()(dispatchSpy, getStateSpy)
      expect(createPreviewOrderSpy).to.have.been.calledOnce
      expect(createPreviewOrderSpy).to.be.calledWith(previewOrder)
    })
    it('should call create preview order and log the error, coreDayId empty', async function() {
      Object.assign(store, { boxSummaryDeliveryDays: Immutable.fromJS({
        '2016-11-21': {
          id: '3e9a2572-a778-11e6-bb0f-080027596944',
          date: '2016-11-21',
          coreDayId: '',
          slots: [{
            coreSlotId: '1',
            id: '3e952522-a778-11e6-8197-080027596944',
          }],
        },
      }) })
      getStateSpy = sandbox.stub().returns(store)
      await checkoutActions.checkoutCreatePreviewOrder()(dispatchSpy, getStateSpy)
      expect(dispatchSpy.callCount).to.equal(6)
      expect(dispatchSpy.getCall(2).args[0]).to.deep.equal({
        key: actionTypes.BASKET_PREVIEW_ORDER_CHANGE,
        type: 'ERROR',
        value:  { message: 'Missing data, persistent basket might be expired',
          code: 'basket-expired' },
      })
    })
    it('should call create preview order and log the error, boxSummaryDeliveryDays empty', async function() {
      Object.assign(store, { boxSummaryDeliveryDays: null })
      getStateSpy = sandbox.stub().returns(store)
      await checkoutActions.checkoutCreatePreviewOrder()(dispatchSpy, getStateSpy)
      expect(dispatchSpy.callCount).to.equal(4)
      expect(dispatchSpy.getCall(2).args[0]).to.deep.equal({
        key: actionTypes.BASKET_PREVIEW_ORDER_CHANGE,
        type: 'ERROR',
        value: 'Cannot read property \'getIn\' of null',
      })
    })
  })

  describe('checkoutAddressLookup', function() {
    it('should call fetchAddressByPostcode and dispatch pending CHECKOUT_ADDRESSES_RECEIVE with addresses', async function() {
      const postcode = 'W6 0DH'
      await checkoutActions.checkoutAddressLookup(postcode)(dispatchSpy)
      expect(dispatchSpy.callCount).to.equal(3)
      expect(dispatchSpy.getCall(0).args[0]).to.deep.equal({
        key: actionTypes.CHECKOUT_ADDRESSES_RECEIVE,
        type: 'PENDING',
        value: true,
      })
    })
  })

  describe('checkoutSignup', function() {
    it('should redirect to invalid step', async function() {
      getStateSpy = sinon.stub().returns({
        basket: Immutable.fromJS({
          address: '3 Moris House, London',
          date: '2016-11-21',
          numPortions: 4,
          recipes: {
            '10': 2,
            '17': 1,
            '44': 1
          },
          stepsOrder: ['boxdetails', 'aboutyou', 'delivery', 'payment'],
          slotId: '33e977c1e-a778-11e6-aa8b-080027596944',
          postcode: 'W6 0DH',
        }),
        checkout: Immutable.fromJS({
          email: 'test@example.com',
          password: 'testpassword',
          validations: {
            boxdetails: true,
            aboutyou: true,
            delivery: false,
            payment: true,
          },
        }),
        form: {
          checkout: {
            values: {},
          },
        },
        boxSummaryDeliveryDays: Immutable.fromJS({
          '2016-11-21': {
            id: '3e9a2572-a778-11e6-bb0f-080027596944',
            date: '2016-11-21',
            coreDayId: '253',
            slots: [{
              coreSlotId: '1',
              id: '3e952522-a778-11e6-8197-080027596944',
            }],
          },
        }),
        menuBoxPrices: Immutable.fromJS({
          '2': {
            '4': {
              gourmet: {
                promoCodeValid: false,
                grossTotal: '39.99',
                total: '39.99',
                vatCharged: '0.00',
                recipeDiscount: '0.00',
                deliveryTotal: '0.00',
                pricePerPortionDiscounted: '5.00',
                pricePerPortion: '5.00',
                productTotal: '0.00',
                recipeTotalDiscounted: '39.99',
                recipeTotal: '39.99',
                promoCode: false
              }
            }
          },
        }),
        request: Immutable.fromJS({
          browser: 'desktop',
        }),
      })
      await checkoutActions.checkoutSignup()(dispatchSpy, getStateSpy)
      expect(dispatchSpy.callCount).to.equal(8)
    })

  })

  describe('checkoutPostSignup', function() {
    it('should call post signup', async function () {
      getStateSpy = sinon.stub().returns({
        basket: Immutable.fromJS({
          address: '3 Moris House, London',
          date: '2016-11-21',
          numPortions: 4,
          recipes: {
            '10': 2,
            '17': 1,
            '44': 1
          },
          stepsOrder: ['boxdetails', 'aboutyou', 'delivery', 'payment'],
          slotId: '33e977c1e-a778-11e6-aa8b-080027596944',
          postcode: 'W6 0DH',
        }),
        form: {
          checkout: {
            values: {
              aboutyou: {
                email: 'test@gmail.com',
                password: 'Test1234',
              },
            },
          },
        },
        request: Immutable.fromJS({
          browser: 'desktop',
        }),
      })
      const basketClearCookie = sinon.stub(basketUtils, 'basketResetPersistent')
      await checkoutActions.checkoutPostSignup()(dispatchSpy, getStateSpy)
      expect(basketClearCookie).to.have.been.calledOnce
    })
  })

  describe('checkoutSignup on MOBILE', function() {
    it('should redirect to invalid step', async function() {
      getStateSpy = sinon.stub().returns({
        basket: Immutable.fromJS({
          address: '3 Moris House, London',
          date: '2016-11-21',
          numPortions: 2,
          recipes: {
            '10': 2,
            '17': 1,
            '44': 1
          },
          stepsOrder: ['boxdetails', 'aboutyou', 'delivery', 'payment'],
          slotId: '33e977c1e-a778-11e6-aa8b-080027596944',
          postcode: 'W6 0DH',
        }),
        checkout: Immutable.fromJS({
          email: 'test@example.com',
          password: 'testpassword',
          validations: {
            boxdetails: true,
            aboutyou: true,
            delivery: false,
            payment: true,
          },
        }),
        form: {
          checkout: {
            values: {},
          },
        },
        boxSummaryDeliveryDays: Immutable.fromJS({
          '2016-11-21': {
            id: '3e9a2572-a778-11e6-bb0f-080027596944',
            date: '2016-11-21',
            coreDayId: '253',
            slots: [{
              coreSlotId: '1',
              id: '3e952522-a778-11e6-8197-080027596944',
            }],
          },
        }),
        menuBoxPrices: Immutable.fromJS({
          '2': {
            '4': {
              gourmet: {
                promoCodeValid: false,
                grossTotal: '34.99',
                total: '34.99',
                vatCharged: '0.00',
                recipeDiscount: '0.00',
                deliveryTotal: '0.00',
                pricePerPortionDiscounted: '5.83',
                pricePerPortion: '5.83',
                productTotal: '0.00',
                recipeTotalDiscounted: '34.99',
                recipeTotal: '34.99',
                promoCode: false
              }
            }
          },
        }),
        request: Immutable.fromJS({
          browser: 'desktop',
        }),
      })
      await checkoutActions.checkoutSignup()(dispatchSpy, getStateSpy)
      expect(dispatchSpy.callCount).to.equal(8)
    })

  })
})
