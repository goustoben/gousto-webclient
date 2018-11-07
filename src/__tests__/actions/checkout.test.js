import Immutable from 'immutable'

import actionTypes from 'actions/actionTypes'

import { basketResetPersistent } from 'utils/basket'
import { getSlot } from 'utils/deliveries'
import { createPreviewOrder } from 'apis/orders'
import { fetchAddressByPostcode } from 'apis/addressLookup'

jest.mock('utils/basket', () => ({
  basketResetPersistent: jest.fn()
}))

jest.mock('utils/deliveries', () => ({
  getSlot: jest.fn(),
}))

jest.mock('actions/redirect', () => ({
  redirect: jest.fn(),
}))

jest.mock('apis/orders', () => ({
  createPreviewOrder: jest.fn(),
}))

jest.mock('apis/addressLookup', () => ({
  fetchAddressByPostcode: jest.fn(),
}))

jest.mock('actions/login')
jest.mock('actions/menu')
jest.mock('actions/user')
jest.mock('actions/basket')

import {
  checkoutClearErrors,
  checkoutCreatePreviewOrder,
  checkoutAddressLookup,
  checkoutSignup,
  checkoutPostSignup,
} from 'actions/checkout'

describe('checkout actions', function() {
  const dispatch = jest.fn()
  const getState = jest.fn()
  const ga = jest.fn()
  let previewOrder
  let addressCollection
  let addressItem
  let store

  beforeEach(function () {
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
          slots: [
            {
              coreSlotId: '1',
              id: '3e952522-a778-11e6-8197-080027596944',
            },
          ],
        },
      }),
      request: Immutable.fromJS({
        browser: 'desktop',
      }),
    }
    getState.mockReturnValue(store)
    previewOrder = {
      delivery_day_id: '253',
      delivery_slot_id: '4',
      recipe_choices: [
        { id: 'recipe-id-1', quantity: 4, type: 'Recipe' },
        { id: 'recipe-id-2', quantity: 4, type: 'Recipe' },
        { id: 'recipe-id-2', quantity: 4, type: 'Recipe' },
      ],
    }
    addressCollection = [{ 1: 'a' }, { 2: 'b' }]
    addressItem = { id: '2000287', line_1: '3 Aldensley Road' }
    fetchAddressByPostcode.mockReturnValue(
      new Promise(resolve => {
        resolve({ data: { results: addressCollection } })
      }),
    )
    createPreviewOrder.mockReturnValue(
      new Promise(resolve => {
        resolve({
          data: {
            order: {
              id: 1,
            },
            ...previewOrder,
          },
        })
      }),
    )

    getSlot.mockReturnValue(
      Immutable.Map({
        coreSlotId: '4',
        id: '3e977c1e-a778-11e6-aa8b-080027596944',
      }),
    )
  })

  afterEach(() => {
    dispatch.mockClear()
    getState.mockClear()
  })

  describe('checkoutClearErrors', function () {
    it('should dispatch CHECKOUT_ERRORS_CLEAR', async function () {
      const result = checkoutClearErrors()
      expect(result.type).toBe(actionTypes.CHECKOUT_ERRORS_CLEAR)
    })
  })

  describe('checkoutCreatePreviewOrder', function () {
    it('should call create preview order', async function () {
      await checkoutCreatePreviewOrder()(
        dispatch,
        getState,
      )
      expect(createPreviewOrder).toHaveBeenCalledTimes(1)
      expect(createPreviewOrder).toHaveBeenCalledWith(previewOrder)
    })
    it('should call create preview order and log the error, coreDayId empty', async function () {
      Object.assign(store, {
        boxSummaryDeliveryDays: Immutable.fromJS({
          '2016-11-21': {
            id: '3e9a2572-a778-11e6-bb0f-080027596944',
            date: '2016-11-21',
            coreDayId: '',
            slots: [
              {
                coreSlotId: '1',
                id: '3e952522-a778-11e6-8197-080027596944',
              },
            ],
          },
        }),
      })
      getState.mockReturnValue(store)
      await checkoutCreatePreviewOrder()(
        dispatch,
        getState,
      )
      expect(dispatch).toHaveBeenCalledTimes(6)
      expect(dispatch).toHaveBeenCalledWith({
        key: actionTypes.BASKET_PREVIEW_ORDER_CHANGE,
        type: 'ERROR',
        value: {
          message: 'Missing data, persistent basket might be expired',
          code: 'basket-expired',
        },
      })
    })
    it('should call create preview order and log the error, boxSummaryDeliveryDays empty', async function () {
      Object.assign(store, { boxSummaryDeliveryDays: null })
      getState.mockReturnValue(store)
      await checkoutCreatePreviewOrder()(
        dispatch,
        getState,
      )
      expect(dispatch).toHaveBeenCalledTimes(4)
      expect(dispatch).toHaveBeenCalledWith({
        key: actionTypes.BASKET_PREVIEW_ORDER_CHANGE,
        type: 'ERROR',
        value: "Cannot read property 'getIn' of null",
      })
    })
  })

  describe('checkoutAddressLookup', function () {
    it('should call fetchAddressByPostcode and dispatch pending CHECKOUT_ADDRESSES_RECEIVE with addresses', async function () {
      const postcode = 'W6 0DH'
      await checkoutAddressLookup(postcode)(dispatch)
      expect(dispatch).toHaveBeenCalledTimes(3)
      expect(dispatch).toHaveBeenCalledWith({
        key: actionTypes.CHECKOUT_ADDRESSES_RECEIVE,
        type: 'PENDING',
        value: true,
      })
    })
  })

  describe('checkoutSignup', function () {
    it('should redirect to invalid step', async function () {
      getState.mockReturnValue({
        basket: Immutable.fromJS({
          address: '3 Moris House, London',
          date: '2016-11-21',
          numPortions: 4,
          recipes: {
            10: 2,
            17: 1,
            44: 1,
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
            slots: [
              {
                coreSlotId: '1',
                id: '3e952522-a778-11e6-8197-080027596944',
              },
            ],
          },
        }),
        menuBoxPrices: Immutable.fromJS({
          2: {
            4: {
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
                promoCode: false,
              },
            },
          },
        }),
        request: Immutable.fromJS({
          browser: 'desktop',
        }),
      })
      await checkoutSignup()(dispatch, getState)
      expect(dispatch).toHaveBeenCalledTimes(8)
    })
  })

  describe('checkoutPostSignup', function() {
    beforeEach(() => {
      getState.mockReturnValue({
        basket: Immutable.fromJS({
          address: '3 Moris House, London',
          date: '2016-11-21',
          numPortions: 4,
          recipes: {
            10: 2,
            17: 1,
            44: 1,
          },
          stepsOrder: ['boxdetails', 'aboutyou', 'delivery', 'payment'],
          slotId: '33e977c1e-a778-11e6-aa8b-080027596944',
          postcode: 'W6 0DH',
          previewOrderId: 'test-order-id',
          promoCode: 'TEST123'
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
        price: Immutable.Map({
          grossTotal: 28.00,
          deliveryTotal: 2.99,
        })
      })
    })

    afterEach(() => {
      ga.mockClear()
    })

    it('should call post signup', async function() {
      await checkoutPostSignup()(dispatch, getState)
      expect(basketResetPersistent).toHaveBeenCalledTimes(1)
    })

    describe('when ga is undefined', () => {
      beforeEach(() => {
        global.ga = undefined
      })

      it('should not call ga with order details', async function() {
        await checkoutPostSignup()(dispatch, getState)
        expect(ga).not.toHaveBeenCalled()
      })
    })

    describe('when ga is defined', () => {
      beforeEach(() => {
        global.ga = ga
      })

      it('should call ga with order details', async function() {
        await checkoutPostSignup()(dispatch, getState)
        expect(ga).toHaveBeenCalled()
        expect(ga).toHaveBeenCalledWith('ec:setAction', 'purchase', {
          id: 'test-order-id',
          revenue: 28.00,
          shipping: 2.99,
          coupon: 'TEST123',
        })
      })
    })
  })

  describe('checkoutSignup on MOBILE', function () {
    it('should redirect to invalid step', async function () {
      getState.mockReturnValue({
        basket: Immutable.fromJS({
          address: '3 Moris House, London',
          date: '2016-11-21',
          numPortions: 2,
          recipes: {
            10: 2,
            17: 1,
            44: 1,
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
            slots: [
              {
                coreSlotId: '1',
                id: '3e952522-a778-11e6-8197-080027596944',
              },
            ],
          },
        }),
        menuBoxPrices: Immutable.fromJS({
          2: {
            4: {
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
                promoCode: false,
              },
            },
          },
        }),
        request: Immutable.fromJS({
          browser: 'desktop',
        }),
      })
      await checkoutSignup()(dispatch, getState)
      expect(dispatch).toHaveBeenCalledTimes(8)
    })
  })
})
