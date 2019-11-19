import Immutable from 'immutable'

import actionTypes from 'actions/actionTypes'

import { warning } from 'utils/logger'
import { getSlot, getDeliveryTariffId } from 'utils/deliveries'
import { redirect } from 'actions/redirect'
import { pending, error } from 'actions/status'
import { createPreviewOrder } from 'apis/orders'
import { orderAssignToUser } from 'actions/order'
import { basketResetPersistent } from 'utils/basket'
import { trackAffiliatePurchase } from 'actions/tracking'
import { fetchAddressByPostcode } from 'apis/addressLookup'

import {
  trackPurchase,
  checkoutSignup,
  fireCheckoutError,
  checkoutPostSignup,
  checkoutClearErrors,
  trackPromocodeChange,
  checkoutAddressLookup,
  checkoutCreatePreviewOrder,
  checkoutTransactionalOrder,
  trackCheckoutButtonPressed,
} from 'actions/checkout'

jest.mock('actions/login')
jest.mock('actions/menu')
jest.mock('actions/user')
jest.mock('actions/basket')
jest.mock('selectors/features')
jest.mock('utils/deliveries')

jest.mock('utils/basket', () => ({
  basketResetPersistent: jest.fn()
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

jest.mock('actions/status', () => ({
  error: jest.fn(),
  pending: jest.fn(),
}))

jest.mock('utils/logger', () => ({
  warning: jest.fn(),
}))

jest.mock('actions/order', () => ({
  orderAssignToUser: jest.fn(),
}))

jest.mock('actions/tracking', () => ({
  trackAffiliatePurchase: jest.fn(),
}))

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
      day_slot_lead_time_id: '',
      delivery_tariff_id: ''
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
        daySlotLeadTimeId: ''
      }),
    )
    getDeliveryTariffId.mockReturnValue('')
  })

  afterEach(() => {
    jest.clearAllMocks()
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

      expect(error).toHaveBeenCalledWith(
        actionTypes.BASKET_PREVIEW_ORDER_CHANGE,
        {
          message: 'Missing data, persistent basket might be expired',
          code: 'basket-expired',
        },
      )
    })

    it('should call create preview order and log the error, boxSummaryDeliveryDays empty', async () => {
      getState.mockReturnValue(createState({
        boxSummaryDeliveryDays: null,
      }))

      await checkoutCreatePreviewOrder()(
        dispatch,
        getState,
      )

      expect(error).toHaveBeenCalledWith(
        actionTypes.BASKET_PREVIEW_ORDER_CHANGE,
        "Cannot read property 'getIn' of null",
      )
    })

    describe('when daySlotLeadTimeId is present in box summary slots', () => {
      const targetUuid = 'some-uuid'

      beforeEach(() => {
        getState.mockReturnValue(createState({
          boxSummaryDeliveryDays: Immutable.fromJS({
            '2016-11-21': {
              id: '3e9a2572-a778-11e6-bb0f-080027596944',
              date: '2016-11-21',
              coreDayId: '253',
              slots: [
                {
                  coreSlotId: '4',
                  id: '3e952522-a778-11e6-8197-080027596944',
                  daySlotLeadTimeId: 'some-uuid' // targetUuid
                },
              ],
            },
          }),
        }))
      })

      it('should call create preview order with day_slot_lead_time_id', async () => {
        getSlot.mockReturnValue(Immutable.fromJS({
          coreSlotId: '4',
          id: '3e952522-a778-11e6-8197-080027596944',
          daySlotLeadTimeId: targetUuid
        }))

        await checkoutCreatePreviewOrder()(
          dispatch,
          getState,
        )

        expect(createPreviewOrder).toHaveBeenCalledTimes(1)
        previewOrder.day_slot_lead_time_id = targetUuid
        expect(createPreviewOrder).toHaveBeenCalledWith(previewOrder)
      })
    })

    describe('when deliveryTariffId is returned from state', () => {
      const deliveryTariffId = 'delivery-tariff-uuid'

      it('should call create preview order with delivery_tariff_id', async () => {
        getDeliveryTariffId.mockReturnValue(deliveryTariffId)

        await checkoutCreatePreviewOrder()(
          dispatch,
          getState
        )

        expect(createPreviewOrder).toHaveBeenCalledTimes(1)
        previewOrder.delivery_tariff_id = deliveryTariffId
        expect(createPreviewOrder).toHaveBeenCalledWith(previewOrder)
      })
    })
  })

  describe('checkoutAddressLookup', () => {
    it('should call fetchAddressByPostcode and dispatch pending CHECKOUT_ADDRESSES_RECEIVE with addresses', async () => {
      const postcode = 'W6 0DH'

      await checkoutAddressLookup(postcode)(dispatch)

      expect(pending).toHaveBeenCalledWith(
        actionTypes.CHECKOUT_ADDRESSES_RECEIVE,
        true,
      )
    })
  })

  describe('fireCheckoutError', () => {
    it('should dispatch an error with no value', async () => {
      getState.mockReturnValue(createState())

      await fireCheckoutError('CARD_TOKENISATION_FAILED')(dispatch, getState)

      expect(error).toHaveBeenCalledWith(
        'CARD_TOKENISATION_FAILED',
        true,
      )
    })

    it('should dispatch an error with an error value', async () => {
      getState.mockReturnValue(createState())
      const errorText = 'card not accepted'

      await fireCheckoutError('CARD_TOKENISATION_FAILED', errorText)(dispatch, getState)

      expect(error).toHaveBeenCalledWith(
        'CARD_TOKENISATION_FAILED',
        errorText,
      )
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
            total: 31.99,
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

    test('should call trackAffiliatePurchase with order details', () => {
      trackPurchase()(dispatch, getState)

      expect(trackAffiliatePurchase).toHaveBeenCalled()
      expect(trackAffiliatePurchase).toHaveBeenCalledWith({
        orderId: 'test-order-id',
        total: 31.99,
        commissionGroup: 'FIRSTPURCHASE',
        promoCode: 'TEST123',
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

  describe('trackCheckoutButtonPressed', () => {
    describe('should dispatch a TRACKING action with tracking data (snowplow and gtm)', () => {
      test('with property if provided', () => {
        const trackingData = {
          actionType: 'DeliveryAddress Confirmed',
          seCategory: 'Checkout',
          position: 'first',
        }

        expect(trackCheckoutButtonPressed('DeliveryAddress Confirmed', { position: 'first' })).toEqual({
          type: 'TRACKING',
          trackingData,
          gtmEvent: trackingData
        })
      })

      test('with no property if not provided', () => {
        const trackingData = {
          actionType: 'NextCTA Clicked',
          seCategory: 'Checkout',
        }

        expect(trackCheckoutButtonPressed('NextCTA Clicked')).toEqual({
          type: 'TRACKING',
          trackingData,
          gtmEvent: trackingData
        })
      })
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
          actionType: 'Promocode Applied',
          promocode: 'promo'
        }
      })
    })

    it('should dispatch trackPromocodeChange with actionType Promocode Removed', () => {
      trackPromocodeChange('promo', false)(dispatch)

      expect(dispatch).toHaveBeenCalledWith({
        type: 'TRACKING_PROMOCODE_CHANGE',
        trackingData: {
          actionType: 'Promocode Removed',
          promocode: 'promo'
        }
      })
    })
  })

  describe('checkoutTransactionalOrder', () => {
    const createTransactionalState = ({
      auth = Immutable.Map({}),
      basket = Immutable.Map({}),
      error = Immutable.Map({}),
      user = Immutable.Map({}),
    } = {}) => ({
      ...createState(),
      auth,
      basket,
      error,
      user,
    })

    beforeEach(() => {
      getState.mockReturnValue(createTransactionalState())
    })

    test('should dispatch a preview order request', async () => {
      await checkoutTransactionalOrder()(dispatch, getState)

      const previewOrderAction = dispatch.mock.calls[0][0]
      previewOrderAction(dispatch, getState)

      expect(pending).toHaveBeenCalledWith(
        actionTypes.BASKET_PREVIEW_ORDER_CHANGE,
        true,
      )
    })

    describe('when preview order fails', () => {
      beforeEach(() => {
        getState.mockReturnValue(createTransactionalState({
          error: Immutable.Map({
            [actionTypes.BASKET_PREVIEW_ORDER_CHANGE]: {
              message: 'Test preview order error',
              code: 'undefined-error',
            },
          }),
        }))
      })

      test('should log a warning', async () => {
        await checkoutTransactionalOrder()(dispatch, getState)

        expect(warning).toHaveBeenCalledWith(expect.stringContaining('undefined-error'))
      })

      test('should redirect to the menu', async () => {
        await checkoutTransactionalOrder()(dispatch, getState)

        expect(redirect).toHaveBeenCalledWith(
          '/menu?from=newcheckout&error=undefined-error',
          true,
        )
      })
    })

    describe('when preview order succeeds', () => {
      describe('and user is not authenticated', () => {
        beforeEach(() => {
          getState.mockReturnValue(createTransactionalState({
            auth: Immutable.Map({
              isAuthenticated: false,
            }),
            basket: Immutable.Map({
              previewOrderId: '100004',
            }),
          }))
        })

        test('should not redirect', async () => {
          await checkoutTransactionalOrder()(dispatch, getState)

          expect(redirect).not.toHaveBeenCalled()
        })

        test('should not assign order to user', async () => {
          await checkoutTransactionalOrder()(dispatch, getState)

          expect(orderAssignToUser).not.toHaveBeenCalled()
        })
      })

      describe('and user is authenticated', () => {
        describe('and user is on hold', () => {
          beforeEach(() => {
            getState.mockReturnValue(createTransactionalState({
              auth: Immutable.Map({
                isAuthenticated: true,
              }),
              basket: Immutable.Map({
                previewOrderId: '100004',
              }),
              user: Immutable.Map({
                status: 'onhold',
              }),
            }))
          })

          test('should redirect to my gousto', async () => {
            await checkoutTransactionalOrder()(dispatch, getState)

            expect(redirect).toHaveBeenCalledWith('/my-gousto')
          })
        })

        describe('and user is not on hold', () => {
          beforeEach(() => {
            getState.mockReturnValue(createTransactionalState({
              auth: Immutable.Map({
                isAuthenticated: true,
              }),
              basket: Immutable.Map({
                previewOrderId: '100004',
              }),
              user: Immutable.Map({
                status: 'active',
              }),
            }))
          })

          test('should assign order to user', async () => {
            await checkoutTransactionalOrder('transactional')(dispatch, getState)

            expect(orderAssignToUser).toHaveBeenCalledWith(
              'transactional',
              '100004'
            )
          })
        })
      })
    })
  })
})
