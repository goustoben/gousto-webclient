import Immutable from 'immutable'

import actionTypes from 'actions/actionTypes'

import { basketResetPersistent } from 'utils/basket'
import { getSlot } from 'utils/deliveries'
import { createPreviewOrder } from 'apis/orders'
import { fetchAddressByPostcode } from 'apis/addressLookup'

import {
  checkoutClearErrors,
  checkoutCreatePreviewOrder,
  checkoutAddressLookup,
  checkoutSignup,
  fireCheckoutError,
  checkoutPostSignup,
  trackPurchase,
  trackPromocodeChange,
} from 'actions/checkout'

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

const createState = (stateOverrides) => ({
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
    aboutyou: {
      values: {
        aboutyou: {
          email: 'test@test.com',
        },
      }
    },
    delivery: {
      values: {
        delivery: {
          phone: '01234567890',
          cardNumber: '1234567890',
          cardExpiryDate: '12/24',
        },
      },
    },
    payment: {
      values: {
        payment: {
          postcode: 'w37un',
          houseNo: '1',
        },
      }
    }
  },
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
  pricing: Immutable.fromJS({
    prices: {
      grossTotal: 28.00,
      deliveryTotal: 2.99,
    }
  }),
  ...stateOverrides,
})

describe('checkout actions', () => {
  const dispatch = jest.fn()
  const getState = jest.fn()
  const ga = jest.fn()
  let previewOrder
  let addressCollection

  beforeEach(() => {
    getState.mockReturnValue(createState())
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

  describe('checkoutClearErrors', () => {
    it('should dispatch CHECKOUT_ERRORS_CLEAR', async () => {
      const result = checkoutClearErrors()
      expect(result.type).toBe(actionTypes.CHECKOUT_ERRORS_CLEAR)
    })
  })

  describe('checkoutCreatePreviewOrder', () => {
    it('should call create preview order', async () => {
      await checkoutCreatePreviewOrder()(
        dispatch,
        getState,
      )
      expect(createPreviewOrder).toHaveBeenCalledTimes(1)
      expect(createPreviewOrder).toHaveBeenCalledWith(previewOrder)
    })
    it('should call create preview order and log the error, coreDayId empty', async () => {
      getState.mockReturnValue(createState({
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
      }))
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
    it('should call create preview order and log the error, boxSummaryDeliveryDays empty', async () => {
      getState.mockReturnValue(createState({
        boxSummaryDeliveryDays: null,
      }))
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

  describe('checkoutAddressLookup', () => {
    it('should call fetchAddressByPostcode and dispatch pending CHECKOUT_ADDRESSES_RECEIVE with addresses', async () => {
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

  describe('fireCheckoutError', () => {
    it('should dispatch an error with no value', async () => {
      getState.mockReturnValue(createState())
      await fireCheckoutError('CARD_TOKENISATION_FAILED')(dispatch, getState)
      expect(dispatch).toHaveBeenCalledTimes(1)
      expect(dispatch).toHaveBeenCalledWith({
        key: 'CARD_TOKENISATION_FAILED',
        type: actionTypes.ERROR,
        value: true,
      })
    })

    it('should dispatch an error with an error value', async () => {
      getState.mockReturnValue(createState())
      const errorText = 'card not accepted'

      await fireCheckoutError('CARD_TOKENISATION_FAILED', errorText)(dispatch, getState)
      expect(dispatch).toHaveBeenCalledTimes(1)
      expect(dispatch).toHaveBeenCalledWith({
        key: 'CARD_TOKENISATION_FAILED',
        type: actionTypes.ERROR,
        value: errorText,
      })
    })
  })

  describe('checkoutSignup', () => {
    it('should redirect to invalid step', async () => {
      getState.mockReturnValue(createState())
      await checkoutSignup()(dispatch, getState)
      expect(dispatch).toHaveBeenCalledTimes(8)
    })
  })

  describe('trackPurchase', () => {
    beforeEach(() => {
      getState.mockReturnValue({
        basket: Immutable.fromJS({
          previewOrderId: 'test-order-id',
          promoCode: 'TEST123'
        }),
        pricing: Immutable.fromJS({
          prices: {
            grossTotal: 28.00,
            deliveryTotal: 2.99,
          }
        }),
      })
    })

    afterEach(() => {
      ga.mockClear()
    })

    describe('when ga is undefined', () => {
      beforeEach(() => {
        global.ga = undefined
      })

      it('should not call ga with order details', async () => {
        trackPurchase()(dispatch, getState)
        expect(ga).not.toHaveBeenCalled()
      })
    })

    describe('when ga is defined', () => {
      beforeEach(() => {
        global.ga = ga
      })

      it('should call ga with order details', async () => {
        trackPurchase()(dispatch, getState)
        expect(ga).toHaveBeenCalled()
        expect(ga).toHaveBeenCalledWith('gousto.ec:setAction', 'purchase', {
          id: 'test-order-id',
          revenue: 28.00,
          shipping: 2.99,
          coupon: 'TEST123',
        })
      })
    })
  })

  describe('checkoutPostSignup', () => {
    beforeEach(() => {
      getState.mockReturnValue(createState())
    })

    afterEach(() => {
      ga.mockClear()
    })

    it('should call post signup', async () => {
      await checkoutPostSignup()(dispatch, getState)
      expect(basketResetPersistent).toHaveBeenCalledTimes(1)
    })

    it('should dispatch a call to trackPurchase', async () => {
      global.ga = ga
      await checkoutPostSignup()(dispatch, getState)
      expect(dispatch).toHaveBeenCalledTimes(8)
    })
  })

  describe('checkoutSignup on MOBILE', () => {
    it('should redirect to invalid step', async () => {
      getState.mockReturnValue(createState())
      await checkoutSignup()(dispatch, getState)
      expect(dispatch).toHaveBeenCalledTimes(8)
    })
  })

  describe('trackPromocodeChange', () => {
    it('should dispatch trackPromocodeChange with actionType Promocode Applied', () => {
      trackPromocodeChange('promo', true)(dispatch)
      expect(dispatch).toHaveBeenCalledWith({
        type: 'TRACKING_PROMOCODE_CHANGE',
        trackingData: {
          actionType: 'Promocode Applied' ,
          promocode: 'promo'
        }
      })
    })

    it('should dispatch trackPromocodeChange with actionType Promocode Removed', () => {
      trackPromocodeChange('promo', false)(dispatch)
      expect(dispatch).toHaveBeenCalledWith({
        type: 'TRACKING_PROMOCODE_CHANGE',
        trackingData: {
          actionType: 'Promocode Removed' ,
          promocode: 'promo'
        }
      })
    })
  })
})
