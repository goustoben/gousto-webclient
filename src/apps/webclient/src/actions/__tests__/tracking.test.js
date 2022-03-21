import Immutable from 'immutable'
import moment from 'moment'

import {
  trackFirstPurchase,
  setAffiliateSource,
  trackAffiliatePurchase,
  trackRecipeOrderDisplayed,
  trackUserAttributes,
  setUTMSource,
  setTapjoyData,
  clearTapjoyData,
  setRoktData,
  clearRoktData,
  trackGetStarted,
  trackSubmitOrderEvent,
  trackUTMAndPromoCode,
  trackNewUser,
  trackNewOrder,
  trackSubscriptionCreated,
  trackingOrderCheckout,
  trackClickBuildMyBox,
  trackDiscountVisibilityBannerAppearance,
  trackCheckoutNavigationLinks,
  trackCheckoutError,
  trackShowcaseMenuAction,
  trackUnexpectedSignup,
} from 'actions/tracking'
import { trackOrder } from 'apis/tracking'
import { actionTypes } from 'actions/actionTypes'
import {
  clickGetStarted,
  createOrder,
  createUser,
  placeOrder,
  clickSubmitOrder,
  subscriptionCreated,
  discountVisibilityBannerDisplayed,
  clickAccountBreadcrumb,
  checkoutClickContinueToPayment,
  clickCheckoutSecurely,
} from 'actions/trackingKeys'
import globals from 'config/globals'
import { PaymentMethod } from 'config/signup'
import logger from 'utils/logger'
import { canUseWindow } from 'utils/browserEnvironment'

jest.mock('utils/logger', () => ({
  warning: jest.fn(),
}))

jest.mock('apis/tracking', () => ({
  trackOrder: jest.fn(),
}))

jest.mock('selectors/features', () => ({
  getIsPromoCodeValidationEnabled: jest.fn(() => false),
}))

jest.mock('utils/browserEnvironment')

describe('tracking actions', () => {
  let getState
  let dispatch

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('trackFirstPurchase', () => {
    const state = {
      user: Immutable.fromJS({
        goustoReference: '123',
        orders: [
          {
            id: 'order-a',
            prices: {
              total: '13.99',
              grossTotal: '15.99',
              promoCode: '10OFF',
            },
          },
        ],
      }),
      tracking: Immutable.fromJS({
        asource: 'test-source',
      }),
    }

    const pricing = {
      total: '13.99',
      grossTotal: '15.99',
      promoCode: '10OFF',
    }

    beforeEach(() => {
      jest.resetAllMocks()

      dispatch = jest.fn()
      getState = jest.fn().mockReturnValue(state)
    })

    test('should dispatch TRACKING action', () => {
      trackFirstPurchase('order-a')(dispatch, getState)
      const dispatchData = dispatch.mock.calls[0][0]

      expect(dispatchData.type).toBe(actionTypes.TRACKING)
    })

    test('should dispatch correct trackingData', () => {
      trackFirstPurchase('order-a', pricing)(dispatch, getState)
      const { trackingData } = dispatch.mock.calls[0][0]

      expect(trackingData.asource).toBe('test-source')
      expect(trackingData.goustoReference).toBe('123')
      expect(trackingData.event).toBe('firstPurchase')
      expect(trackingData.orderId).toBe('order-a')
      expect(trackingData.orderTotal).toBe('13.99')
      expect(trackingData.voucher).toBe('10OFF')
    })

    test('should dispatch correct optimizely data', () => {
      trackFirstPurchase('order-a', pricing)(dispatch, getState)
      const { optimizelyData } = dispatch.mock.calls[0][0]

      expect(optimizelyData.eventName).toBe('order_placed_gross')
      expect(optimizelyData.tags.revenue).toBe('15.99')

      const optimizelyData2 = dispatch.mock.calls[1][0].optimizelyData

      expect(optimizelyData2.eventName).toBe('order_placed_net')
      expect(optimizelyData2.tags.revenue).toBe('13.99')
    })

    test('should log warning when no user is found', () => {
      logger.warning.mockClear()

      trackFirstPurchase('order-a')(dispatch, () => ({
        user: Immutable.fromJS({ orders: [] }),
        tracking: Immutable.fromJS({}),
      }))

      expect(logger.warning.mock.calls[0][0]).toBe(
        'Missing user data for first purchase tracking: no user found in store',
      )
    })

    test('should log warning when specified order is not found', () => {
      logger.warning.mockClear()

      trackFirstPurchase('order-a')(dispatch, () => ({
        user: Immutable.fromJS({
          goustoReference: '123',
          orders: [{ id: 'order-b' }],
        }),
        tracking: Immutable.fromJS({}),
      }))

      expect(logger.warning.mock.calls[0][0]).toBe(
        'Missing order data for first purchase tracking: no user order "order-a" found in store',
      )
    })
  })

  describe('setAffiliateSource', () => {
    beforeEach(() => {
      dispatch = jest.fn()
    })

    test('should dispatch AFFILIATE_SOURCE_SET action', () => {
      setAffiliateSource('example-source')(dispatch)
      const dispatchData = dispatch.mock.calls[0][0]

      expect(dispatchData.type).toBe(actionTypes.AFFILIATE_SOURCE_SET)
    })

    test('should dispatch correct asource', () => {
      setAffiliateSource('example-source')(dispatch)
      const dispatchData = dispatch.mock.calls[0][0]

      expect(dispatchData.asource).toBe('example-source')
    })
  })

  describe('trackRecipeOrderDisplayed', () => {
    const displayedOrder = ['6', '3', '2']
    let state = {
      basket: Immutable.Map({
        orderId: '1234567',
        date: '2018-05-04',
      }),
      menuBrowseCtaShow: false,
      recipes: Immutable.Map({
        a: Immutable.Map({ isRecommended: true }),
        b: Immutable.Map({ isRecommended: false }),
      }),
      boxSummaryDeliveryDays: Immutable.Map({
        '2018-05-04': Immutable.Map({ id: 'test-day-id' }),
      }),
      menu: Immutable.Map({
      }),
      filters: Immutable.Map({
        currentCollectionId: '678',
      }),
      menuService: {
        meta: {
          recommendations: {
            version: '1'
          }
        }
      }
    }

    beforeEach(() => {
      dispatch = jest.fn()
      getState = jest.fn()
    })

    test('should dispatch RECIPES_DISPLAYED_ORDER_TRACKING action', () => {
      getState.mockReturnValue(state)
      trackRecipeOrderDisplayed()(dispatch, getState)

      expect(dispatch).toHaveBeenCalledTimes(1)
      expect(dispatch.mock.calls[0][0].type).toBe(
        actionTypes.RECIPES_DISPLAYED_ORDER_TRACKING,
      )
    })

    test('should dispatch correct arguments', () => {
      getState.mockReturnValue(state)

      trackRecipeOrderDisplayed(displayedOrder)(dispatch, getState)

      const dispatchCall = dispatch.mock.calls[0][0]

      expect(dispatchCall).toEqual({
        type: 'RECIPES_DISPLAYED_ORDER_TRACKING',
        displayedOrder: ['6', '3', '2'],
        collectionId: '678',
        recommended: true,
        browseMode: false,
        deliveryDayId: 'test-day-id',
        orderId: '1234567',
        recommenderVersion: '1',
        isRecommendationsShown: false,
        currentMenuId: undefined,
        transactionType: 'not set',
      })
    })

    describe('should dispatch recommended state', () => {
      test('when Gousto Recommends collection is present', () => {
        state = {
          ...state,
          menuService: {
            ...state.menuService,
            collection: {
              '5f730d3c-aab1-4f84-b561-305540390885': {
                attributes: {
                  short_title: 'Gousto Recommends',
                  slug: 'recommendations'
                },
                id: '5f730d3c-aab1-4f84-b561-305540390885',
                type: 'collection'
              }
            }
          }
        }

        getState.mockReturnValue(state)

        trackRecipeOrderDisplayed(displayedOrder)(dispatch, getState)

        expect(dispatch.mock.calls[0][0].isRecommendationsShown).toBe(true)
      })

      test('when no recipes are recommended', () => {
        state = {
          basket: Immutable.Map({
            date: '2018-01-01',
          }),
          menuBrowseCtaShow: false,
          recipes: Immutable.Map({
            a: Immutable.Map({ isRecommended: false }),
            b: Immutable.Map({ isRecommended: false }),
          }),
          boxSummaryDeliveryDays: Immutable.Map({
            '2018-01-01': Immutable.Map({ id: 'test-day-id' }),
          }),
          menu: Immutable.Map({
          }),
          filters: Immutable.Map({
            currentCollectionId: '910',
          }),
          menuService: {
            meta: {
              recommendations: {
                version: '1'
              }
            }
          }
        }
        getState.mockReturnValue(state)

        trackRecipeOrderDisplayed(displayedOrder)(dispatch, getState)

        expect(dispatch.mock.calls[0][0].recommended).toBeFalsy()
      })

      test('when one or more recipes are recommended', () => {
        state = {
          basket: Immutable.Map({
            date: '2018-04-04',
          }),
          menuBrowseCtaShow: false,
          recipes: Immutable.Map({
            a: Immutable.Map({ isRecommended: true }),
            b: Immutable.Map({ isRecommended: false }),
          }),
          boxSummaryDeliveryDays: Immutable.Map({
            '2018-04-04': Immutable.Map({ id: 'test-day-id' }),
          }),
          menu: Immutable.Map({
          }),
          filters: Immutable.Map({
            currentCollectionId: '112',
          }),
          menuService: {
            meta: {
              recommendations: {
                version: '1'
              }
            }
          }
        }
        getState.mockReturnValue(state)

        trackRecipeOrderDisplayed(displayedOrder)(dispatch, getState)

        expect(dispatch.mock.calls[0][0].recommended).toBeTruthy()
      })
    })
  })

  describe('trackAffiliatePurchase', () => {
    let AWIN
    const Sale = {
      amount: '24.50',
      channel: '',
      orderRef: 9010321,
      parts: 'FIRSTPURCHASE:24.50',
      voucher: 'DTI-SB-P30M',
      currency: 'GBP',
      test: '0',
    }

    beforeEach(() => {
      canUseWindow.mockReturnValue(true)
      AWIN = {
        enhancedTracking: true,
        sProtocol: 'https://',
        InputIdentifiers: ['email'],
        Tracking: {
          Sale: undefined,
          run: jest.fn(),
        },
      }
      global.AWIN = { ...AWIN }
      dispatch = jest.fn()
      getState = jest.fn().mockReturnValue({
        tracking: Immutable.Map({
          asource: 'test-source',
          awc: '5070_1532523479_c84435fcd1d056ea5d62d9f93e1398e3',
          tapjoyTransactionId: 'fake_transaction_id',
          tapjoyPublisherId: 'fake_publisher_id',
          roktTrackingId: 'fake_rokt_id',
        }),
        payment: Immutable.Map({
          paymentMethod: PaymentMethod.Card,
        }),
      })
      jest.clearAllMocks()
    })

    afterEach(() => {
      delete global.AWIN
    })

    describe('when attempting to track with empty orderId', () => {
      test('then it should not do anything as this is a double-counted transaction', async () => {
        await trackAffiliatePurchase({
          orderId: '',
          total: '34.99',
          commissionGroup: 'FIRSTPURCHASE',
          promoCode: '',
        })(dispatch, getState)

        expect(global.AWIN.Tracking.run).not.toHaveBeenCalled()
        expect(trackOrder).not.toHaveBeenCalled()
      })
    })

    describe('if not on the client', () => {
      beforeEach(() => {
        canUseWindow.mockReturnValue(false)
      })

      test('should not modify AWIN', async () => {
        await trackAffiliatePurchase({
          orderId: 9010320,
          total: '34.99',
          commissionGroup: 'EXISTING',
          promoCode: '',
        })(dispatch, getState)

        expect(global.AWIN.Tracking.Sale).toBeUndefined()
      })
    })

    describe('when global.AWIN is undefined', () => {
      beforeEach(() => {
        global.AWIN = undefined
      })

      test('then it should don run AWIN as the tracking method is unavailable', async () => {
        await trackAffiliatePurchase({
          orderId: 9010320,
          total: '34.99',
          commissionGroup: 'EXISTING',
          promoCode: '',
        })(dispatch, getState)

        expect(global.AWIN).toBe(undefined)
        expect(trackOrder).not.toHaveBeenCalledWith(expect.objectContaining({
          merchant: '5070',
          cr: 'GBP',
          amount: '34.99',
          parts: 'FIRSTPURCHASE:34.99',
          cks: '5070_1532523479_c84435fcd1d056ea5d62d9f93e1398e3',
        }))
      })
    })

    describe('when global.AWIN is defined', () => {
      test('then should save order as Tracking.Sale and invoke run', async () => {
        await trackAffiliatePurchase({
          orderId: 9010321,
          total: '24.50',
          commissionGroup: 'FIRSTPURCHASE',
          promoCode: 'DTI-SB-P30M',
        })(dispatch, getState)

        expect(global.AWIN.Tracking.Sale).toEqual(Sale)
        expect(global.AWIN.Tracking.run).toHaveBeenCalled()
      })

      describe('and when on a non-production environment', () => {
        let originalEnv
        beforeEach(() => {
          originalEnv = globals.env
          globals.env = 'development'
        })

        afterEach(() => {
          globals.env = originalEnv
        })

        test('then it should fill the "test" field correctly', async () => {
          const expectedSale = {
            ...Sale,
            test: '1',
          }

          await trackAffiliatePurchase({
            orderId: 9010321,
            total: '24.50',
            commissionGroup: 'FIRSTPURCHASE',
            promoCode: 'DTI-SB-P30M',
          })(dispatch, getState)

          expect(global.AWIN.Tracking.Sale).toEqual(expectedSale)
        })

        test('then should send tracking data to server', async () => {
          await trackAffiliatePurchase({
            orderId: 9010321,
            total: '24.50',
            commissionGroup: 'FIRSTPURCHASE',
            promoCode: 'DTI-SB-P30M',
          })(dispatch, getState)

          expect(trackOrder).toHaveBeenCalledWith(expect.objectContaining({
            common: {
              order_id: 9010321,
            },
            awin: {
              merchant: '5070',
              cr: 'GBP',
              amount: '24.50',
              parts: 'FIRSTPURCHASE:24.50',
              cks: '5070_1532523479_c84435fcd1d056ea5d62d9f93e1398e3',
            }
          }))
        })
      })

      describe('when Tapjoy transaction id is not provided', () => {
        beforeEach(() => {
          getState = jest.fn().mockReturnValue({
            tracking: Immutable.Map({
              tapjoyTransactionId: '',
              tapjoyPublisherId: '',
            }),
            payment: Immutable.Map({
              paymentMethod: PaymentMethod.Card,
            }),
          })
        })

        test('then should not send tracking data to server', async () => {
          await trackAffiliatePurchase({
            orderId: 9010321,
            total: '24.50',
            commissionGroup: 'FIRSTPURCHASE',
            promoCode: 'DTI-SB-P30M',
            isSignup: true,
          })(dispatch, getState)

          expect(trackOrder).not.toHaveBeenCalledWith(expect.objectContaining({
            tapjoy: {
              transaction_id: expect.any(String),
              publisher_id: expect.any(String),
            }
          }))
        })
      })

      describe('when this is not signup flow', () => {
        test('then should not send Tapjoy tracking data to server', async () => {
          await trackAffiliatePurchase({
            orderId: 9010321,
            total: '24.50',
            commissionGroup: 'FIRSTPURCHASE',
            promoCode: 'DTI-SB-P30M',
            isSignup: false,
          })(dispatch, getState)

          expect(trackOrder).not.toHaveBeenCalledWith(expect.objectContaining({
            tapjoy: {
              transaction_id: expect.any(String),
              publisher_id: expect.any(String),
            }
          }))
        })
      })

      describe('when this is signup flow and Tapjoy transaction id in store', () => {
        test('then should send Tapjoy tracking data to server', async () => {
          await trackAffiliatePurchase({
            orderId: 9010321,
            total: '24.50',
            commissionGroup: 'FIRSTPURCHASE',
            promoCode: 'DTI-SB-P30M',
            isSignup: true,
          })(dispatch, getState)

          expect(trackOrder).toHaveBeenCalledWith(expect.objectContaining({
            common: {
              order_id: 9010321,
            },
            tapjoy: {
              transaction_id: 'fake_transaction_id',
              publisher_id: 'fake_publisher_id',
            },
          }))
        })
      })
    })

    describe('when Rokt Id is provided', () => {
      test('then should send tracking data to server', async () => {
        await trackAffiliatePurchase({
          orderId: 9010321,
          total: '24.50',
          commissionGroup: 'FIRSTPURCHASE',
          promoCode: 'DTI-SB-P30M',
          isSignup: true,
        })(dispatch, getState)

        expect(trackOrder).toHaveBeenCalledWith(expect.objectContaining({
          rokt: {
            passbackconversiontrackingid: 'fake_rokt_id',
            amount: '24.50',
            currency: 'GBP',
            paymenttype: 'card',
          }
        }))
      })
    })

    describe('when Rokt Id is not provided', () => {
      beforeEach(() => {
        getState = jest.fn().mockReturnValue({
          tracking: Immutable.Map({
            roktTrackingId: '',
          }),
          payment: Immutable.Map({
            paymentMethod: PaymentMethod.Card,
          }),
        })
      })

      test('then should not send tracking data to server', async () => {
        await trackAffiliatePurchase({
          orderId: 9010321,
          total: '24.50',
          commissionGroup: 'FIRSTPURCHASE',
          promoCode: 'DTI-SB-P30M',
          isSignup: true,
        })(dispatch, getState)

        expect(trackOrder).not.toHaveBeenCalledWith(expect.objectContaining({
          rokt: {
            passbackconversiontrackingid: expect.any(String),
            amount: expect.any(String),
            currency: expect.any(String),
            paymenttype: expect.any(String),
          }
        }))
      })
    })
  })

  describe('trackUserAttributes', () => {
    let isSignupInLast30Days
    const state = {
      user: Immutable.fromJS({
        subscription:
          Immutable.fromJS({
            createdAt: '2019-08-21 12:53:33'
          })
      })
    }

    beforeEach(() => {
      dispatch = jest.fn()
      getState = jest.fn().mockReturnValue(state)
      isSignupInLast30Days = moment().isSameOrBefore(moment('2019-08-21 12:53:33').add(30, 'days'))
    })

    test('should dispatch a TRACKING action if signupDate exists', () => {
      trackUserAttributes()(dispatch, getState)
      const dispatchCall = dispatch.mock.calls[0][0]
      expect(dispatchCall).toMatchObject({
        type: actionTypes.TRACKING,
        optimizelyData: {
          type: 'user',
          eventName: 'user_subscription_start',
          attributes: {
            isSignupInLast30Days,
          }
        }
      })
    })
  })

  describe('setUTMSource', () => {
    describe('when utmSource not set', () => {
      beforeEach(() => {
        const state = {
          tracking: Immutable.fromJS({
            utmSource: undefined
          })
        }
        dispatch = jest.fn()
        getState = jest.fn().mockReturnValue(state)
      })

      test('then should dispatch SET_UTM_SOURCE action', () => {
        setUTMSource()(dispatch, getState)
        const expected = {
          type: actionTypes.SET_UTM_SOURCE,
          payload: { referral: '' }
        }
        expect(dispatch).toHaveBeenCalledWith(expected)
      })
    })

    describe('when has utmSource set', () => {
      beforeEach(() => {
        const state = {
          tracking: Immutable.fromJS({
            utmSource: {}
          })
        }
        dispatch = jest.fn()
        getState = jest.fn().mockReturnValue(state)
      })

      test('then setUTMSource action should not be dispatched', () => {
        setUTMSource()(dispatch, getState)
        expect(dispatch).not.toBeCalled()
      })
    })
  })

  describe('setTapjoyData', () => {
    beforeEach(() => {
      const state = {
        tracking: Immutable.Map({
          tapjoyTransactionId: '',
          tapjoyPublisherId: '',
        })
      }
      dispatch = jest.fn()
      getState = jest.fn().mockReturnValue(state)
    })

    test('then should dispatch SET_TAPJOY_DATA action', () => {
      const expected = {
        type: actionTypes.SET_TAPJOY_DATA,
        transactionId: 'fake_transaction_id',
        publisherId: 'fake_publisher_id',
      }

      const result = setTapjoyData('fake_transaction_id', 'fake_publisher_id')

      expect(result).toEqual(expected)
    })
  })

  describe('clearTapjoyData', () => {
    beforeEach(() => {
      const state = {
        tracking: Immutable.Map({
          tapjoyTransactionId: '',
          tapjoyPublisherId: '',
        })
      }
      dispatch = jest.fn((fn) => {
        if (fn && typeof fn === 'function') {
          fn(dispatch, getState)
        }
      })
      getState = jest.fn().mockReturnValue(state)
    })

    test('then should dispatch SET_TAPJOY_DATA action with empty value', () => {
      const expected = {
        type: actionTypes.SET_TAPJOY_DATA,
        transactionId: '',
        publisherId: '',
      }

      const result = clearTapjoyData()

      expect(result).toEqual(expected)
    })
  })

  describe('setRoktData', () => {
    beforeEach(() => {
      const state = {
        tracking: Immutable.Map({
          roktTrackingId: '',
        })
      }
      dispatch = jest.fn()
      getState = jest.fn().mockReturnValue(state)
    })

    test('then should dispatch SET_ROKT_DATA action', () => {
      const expected = {
        type: actionTypes.SET_ROKT_DATA,
        roktTrackingId: 'fake_rokt_id',
      }

      const result = setRoktData('fake_rokt_id')

      expect(result).toEqual(expected)
    })
  })

  describe('clearRoktData', () => {
    beforeEach(() => {
      const state = {
        tracking: Immutable.Map({
          roktTrackingId: '',
        })
      }
      dispatch = jest.fn((fn) => {
        if (fn && typeof fn === 'function') {
          fn(dispatch, getState)
        }
      })
      getState = jest.fn().mockReturnValue(state)
    })

    test('then should dispatch SET_ROKT_DATA action with empty value', () => {
      const expected = {
        type: actionTypes.SET_ROKT_DATA,
        roktTrackingId: '',
      }

      const result = clearRoktData()

      expect(result).toEqual(expected)
    })
  })

  describe('trackGetStarted', () => {
    describe('when section passed', () => {
      const section = 'hero'

      beforeEach(() => {
        const state = {
          basket: Immutable.fromJS({
            promoCode: '123'
          }),
          tracking: Immutable.fromJS({
            utmSource: undefined
          })
        }
        dispatch = jest.fn()
        getState = jest.fn().mockReturnValue(state)
      })

      test('then trackGetStarted action should be dispatched with proper payload', () => {
        trackGetStarted(section)(dispatch, getState)
        const { type, trackingData } = dispatch.mock.calls[0][0]
        expect(type).toEqual(clickGetStarted)
        expect(trackingData.actionType).toEqual(clickGetStarted)
        expect(trackingData.section).toEqual(section)
        expect(trackingData.promoCode).toEqual('123')
      })
    })
  })

  describe('trackSubmitOrderEvent', () => {
    beforeEach(() => {
      const state = {
        basket: Immutable.fromJS({
          promoCode: 'promo1'
        }),
        tracking: Immutable.Map({
          utmSource: {
            referral: '123',
          }
        }),
        payment: Immutable.fromJS({
          paymentMethod: PaymentMethod.Card,
        }),
      }
      dispatch = jest.fn()
      getState = jest.fn().mockReturnValue(state)
    })

    describe('when fired', () => {
      test('then should have correct event data', () => {
        const expected = {
          type: clickSubmitOrder,
          trackingData: {
            actionType: clickSubmitOrder,
            referral: '123',
            promoCode: 'promo1',
            paymentMethod: PaymentMethod.Card,
          }
        }

        trackSubmitOrderEvent()(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith(expected)
      })
    })
  })

  describe('trackUTMAndPromoCode', () => {
    beforeEach(() => {
      const state = {
        basket: Immutable.fromJS({
          promoCode: 'promo1'
        }),
        tracking: Immutable.fromJS({
          utmSource: {}
        })
      }
      dispatch = jest.fn()
      getState = jest.fn().mockReturnValue(state)
    })

    describe('when section is passed', () => {
      const section = { section: 'top' }

      test('then trackUTMAndPromoCode should be dispatched with proper payload', () => {
        trackUTMAndPromoCode(clickCheckoutSecurely, section)(dispatch, getState)
        const { type, trackingData } = dispatch.mock.calls[0][0]
        expect(type).toEqual(clickCheckoutSecurely)
        expect(trackingData.actionType).toEqual(clickCheckoutSecurely)
        expect(trackingData.promoCode).toEqual('promo1')
        expect(trackingData.section).toEqual('top')
      })
    })

    describe('when section is undefined', () => {
      test('then trackUTMAndPromoCode should be dispatched with proper payload', () => {
        trackUTMAndPromoCode(checkoutClickContinueToPayment)(dispatch, getState)
        const { type, trackingData } = dispatch.mock.calls[0][0]
        expect(type).toEqual(checkoutClickContinueToPayment)
        expect(trackingData.actionType).toEqual(checkoutClickContinueToPayment)
        expect(trackingData.promoCode).toEqual('promo1')
        expect(trackingData.section).toBeUndefined()
      })
    })

    describe('when keyType is not defined in trackingKeys', () => {
      test('then keyType should be used as actionType', () => {
        const keyType = '3dsmodal_display'

        trackUTMAndPromoCode(keyType)(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith({
          type: keyType,
          trackingData: expect.objectContaining({
            actionType: keyType
          })
        })
      })
    })
  })

  describe('trackNewUser', () => {
    describe('Failed to create new user', () => {
      describe('Given no arguments is defined', () => {
        beforeEach(() => {
          const state = {
            basket: Immutable.fromJS({
              promoCode: 'abc123'
            }),
            tracking: Immutable.fromJS({
              utmSource: undefined
            }),
            payment: Immutable.fromJS({
              paymentMethod: PaymentMethod.Card,
            }),
          }

          dispatch = jest.fn()
          getState = jest.fn().mockReturnValue(state)
        })

        describe('When trackNewUser got dispatched with no userId passed', () => {
          beforeEach(() => {
            trackNewUser()(dispatch, getState)
          })

          test('Then data should be tracked with failed status', () => {
            const expected = {
              type: createUser,
              trackingData: {
                actionType: createUser,
                promoCode: 'abc123',
                status: 'failed',
                paymentMethod: PaymentMethod.Card,
              }
            }

            expect(dispatch).toHaveBeenCalledWith(expected)
          })
        })
      })
    })

    describe('New user created successfully', () => {
      describe('Given arguments is defined', () => {
        describe('When trackNewUser got dispatched with userId passed', () => {
          const userId = '9876'
          beforeEach(() => {
            const state = {
              basket: Immutable.fromJS({
                promoCode: 'abc123'
              }),
              tracking: Immutable.fromJS({
                utmSource: undefined
              }),
              payment: Immutable.fromJS({
                paymentMethod: PaymentMethod.Card,
              }),
            }

            dispatch = jest.fn()
            getState = jest.fn().mockReturnValue(state)
            trackNewUser(userId)(dispatch, getState)
          })

          test('Then data should be tracked with userId and success status', () => {
            const expected = {
              type: createUser,
              trackingData: {
                actionType: createUser,
                promoCode: 'abc123',
                status: 'success',
                userId,
                paymentMethod: PaymentMethod.Card,
              }
            }
            expect(dispatch).toHaveBeenCalledWith(expected)
          })
        })
      })
    })
  })

  describe('trackNewOrder', () => {
    describe('Checkout order failed', () => {
      describe('Given no userId argument passed', () => {
        describe('When trackNewOrder got dispatched with orderId', () => {
          beforeEach(() => {
            const state = {
              basket: Immutable.fromJS({
                promoCode: 'abc123'
              }),
              tracking: Immutable.fromJS({
                utmSource: undefined
              }),
              payment: Immutable.fromJS({
                paymentMethod: PaymentMethod.Card,
              }),
            }

            dispatch = jest.fn()
            getState = jest.fn().mockReturnValue(state)
          })

          test('Then data should be tracked with failed status', () => {
            const userId = null
            const orderId = '765'
            const expected = {
              type: createOrder,
              trackingData: {
                actionType: createOrder,
                promoCode: 'abc123',
                status: 'failed',
                orderId,
                userId,
                paymentMethod: PaymentMethod.Card,
              }
            }

            trackNewOrder(orderId, userId)(dispatch, getState)
            expect(dispatch).toHaveBeenCalledWith(expected)
          })
        })
      })
    })

    describe('trackSubscriptionCreated', () => {
      beforeEach(() => {
        const state = {
          basket: Immutable.fromJS({
            promoCode: 'promo1',
            previewOrderId: 'order_123',
          }),
          tracking: Immutable.Map({
            utmSource: {
              referral: '123',
            }
          }),
          payment: Immutable.fromJS({
            paymentMethod: PaymentMethod.Card,
          }),
          user: Immutable.fromJS({
            id: 'user_234',
            subscription: {
              id: 'subscription_345'
            }
          })
        }
        dispatch = jest.fn()
        getState = jest.fn().mockReturnValue(state)
      })

      const pricing = {
        promoCode: 'promo2',
      }

      describe('when fired', () => {
        const orderId = 'order_123'
        const userId = 'user_234'
        const subscriptionId = 'subscription_345'

        test('then should have correct event data', () => {
          const expected = {
            type: subscriptionCreated,
            trackingData: {
              actionType: subscriptionCreated,
              referral: '123',
              promoCode: 'promo2',
              paymentMethod: PaymentMethod.Card,
              userId,
              orderId,
              subscriptionId,
            }
          }

          trackSubscriptionCreated({ pricing })(dispatch, getState)

          expect(dispatch).toHaveBeenCalledWith(expected)
        })
      })
    })

    describe('Checkout order placed', () => {
      describe('Given arguments passed', () => {
        describe('When trackNewOrder got dispatched with orderId and userId', () => {
          beforeEach(() => {
            const state = {
              basket: Immutable.fromJS({
                promoCode: 'abc123'
              }),
              tracking: Immutable.fromJS({
                utmSource: undefined
              }),
              payment: Immutable.fromJS({
                paymentMethod: PaymentMethod.Card,
              }),
            }

            dispatch = jest.fn()
            getState = jest.fn().mockReturnValue(state)
          })

          test('Then data should be tracked with success status', () => {
            const userId = '546'
            const orderId = '765'
            const expected = {
              type: createOrder,
              trackingData: {
                actionType: createOrder,
                promoCode: 'abc123',
                status: 'success',
                orderId,
                userId,
                paymentMethod: PaymentMethod.Card,
              }
            }

            trackNewOrder(orderId, userId)(dispatch, getState)
            expect(dispatch).toHaveBeenCalledWith(expected)
          })
        })
      })
    })
  })

  describe('trackingOrderCheckout', () => {
    let pricing = {
      total: '24.00',
      grossTotal: '24.00',
      promoCode: false,
    }
    const state = {
      basket: Immutable.fromJS({
        orderId: '178',
      }),
      user: Immutable.fromJS({
        orders: {
          178: {
            recipeItems: [
              '1234'
            ]
          },
        },
        subscription: {
          state: 'active',
        }
      }),
      temp: Immutable.fromJS({
        originalGrossTotal: '24.99',
        originalNetTotal: '24.99'
      })
    }
    beforeEach(() => {
      dispatch = jest.fn()
      getState = () => (state)
    })
    test('should dispatch Order Edited tracking action for subscription box', async () => {
      await trackingOrderCheckout({pricing})(dispatch, getState)
      expect(dispatch).toHaveBeenCalledWith({
        type: 'TRACKING',
        trackingData: {
          actionType: 'Order Edited',
          order_id: '178',
          order_total: '24.00',
          promo_code: false,
          signp: false,
          subscription_active: true,
        },
        optimizelyData: {
          type: 'event',
          eventName: 'order_edited_gross',
          tags: {
            revenue: '-0.99'
          }
        }
      })

      expect(dispatch).toHaveBeenCalledWith({
        type: 'TRACKING',
        optimizelyData: {
          type: 'event',
          eventName: 'order_edited_net',
          tags: {
            revenue: '-0.99'
          }
        }
      })
    })

    test('should dispatch Order Edited tracking action for transactional box', async () => {
      getState = () => ({
        ...state,
        basket: Immutable.fromJS({
          orderId: '179',
          editBox: true,
        }),
      })

      await trackingOrderCheckout({pricing})(dispatch, getState)
      expect(dispatch).toHaveBeenCalledWith({
        type: 'TRACKING',
        trackingData: {
          actionType: 'Order Edited',
          order_id: '179',
          order_total: '24.00',
          promo_code: false,
          signp: false,
          subscription_active: true,
        },
        optimizelyData: {
          type: 'event',
          eventName: 'order_edited_gross',
          tags: {
            revenue: '-0.99'
          }
        }
      })

      expect(dispatch).toHaveBeenCalledWith({
        type: 'TRACKING',
        optimizelyData: {
          type: 'event',
          eventName: 'order_edited_net',
          tags: {
            revenue: '-0.99'
          }
        }
      })
    })

    test('should dispatch Order Place tracking action for transactional box', async () => {
      getState = () => ({
        ...state,
        basket: Immutable.fromJS({
          orderId: '',
        }),
        user: Immutable.fromJS({
          orders: {
            178: {
              recipeItems: [
                '1234'
              ]
            },
          },
          subscription: {
            state: 'active',
          }
        }),
      })
      await trackingOrderCheckout({pricing})(dispatch, getState)
      expect(dispatch).toHaveBeenCalledWith({
        type: 'TRACKING',
        trackingData: {
          actionType: placeOrder,
          order_id: '',
          order_total: '24.00',
          promo_code: false,
          signp: false,
          subscription_active: true,
        },
        optimizelyData: {
          type: 'event',
          eventName: 'order_placed_gross',
          tags: {
            revenue: '24.00'
          }
        }
      })

      expect(dispatch).toHaveBeenCalledWith({
        type: 'TRACKING',
        optimizelyData: {
          type: 'event',
          eventName: 'order_placed_net',
          tags: {
            revenue: '24.00'
          }
        }
      })
    })

    test('should dispatch Order Place tracking action for subscription box', async () => {
      getState = () => ({
        ...state,
        user: Immutable.fromJS({
          orders: {
            178: {
              recipeItems: []
            },
          },
          subscription: {
            state: 'active',
          }
        }),
      })
      pricing = {
        total: '22.00',
        grossTotal: '22.00',
        promoCode: false,
      }
      await trackingOrderCheckout({pricing})(dispatch, getState)
      expect(dispatch).toHaveBeenCalledWith({
        type: 'TRACKING',
        trackingData: {
          actionType: placeOrder,
          order_id: '178',
          order_total: '22.00',
          promo_code: false,
          signp: false,
          subscription_active: true,
        },
        optimizelyData: {
          type: 'event',
          eventName: 'order_placed_gross',
          tags: {
            revenue: '22.00'
          }
        }
      })

      expect(dispatch).toHaveBeenCalledWith({
        type: 'TRACKING',
        optimizelyData: {
          type: 'event',
          eventName: 'order_placed_net',
          tags: {
            revenue: '22.00'
          }
        }
      })
    })
  })

  describe('trackClickBuildMyBox', () => {
    beforeEach(() => {
      const state = {
        basket: Immutable.fromJS({
          promoCode: 'promo1'
        }),
        tracking: Immutable.fromJS({
          utmSource: {}
        })
      }
      dispatch = jest.fn()
      getState = jest.fn().mockReturnValue(state)
    })

    describe('when called', () => {
      test('then should dispatch a proper tracking event', () => {
        trackClickBuildMyBox('2 people', 'menu')(dispatch, getState)

        const { type, trackingData } = dispatch.mock.calls[0][0]
        expect(type).toEqual('click_build_my_box')
        expect(trackingData.actionType).toEqual('click_build_my_box')
        expect(trackingData.promoCode).toEqual('promo1')
        expect(trackingData.destination).toEqual('menu')
        expect(trackingData.boxSize).toEqual('2 people')
      })
    })
  })

  describe('trackDiscountVisibilityBannerAppearance', () => {
    const wizardStep = 'boxSize'

    beforeEach(() => {
      const state = {
        tracking: Immutable.fromJS({
          utmSource: {}
        }),
        basket: Immutable.fromJS({
          promoCode: ''
        })
      }
      dispatch = jest.fn()
      getState = jest.fn().mockReturnValue(state)
    })

    test('should dispatch trackDiscountVisibilityBannerAppearance with proper type', () => {
      trackDiscountVisibilityBannerAppearance(wizardStep)(dispatch, getState)
      const { type, trackingData } = dispatch.mock.calls[0][0]
      expect(type).toEqual(discountVisibilityBannerDisplayed)
      expect(trackingData.step).toEqual(wizardStep)
      expect(trackingData.actionType).toEqual(discountVisibilityBannerDisplayed)
    })
  })

  describe('trackCheckoutNavigationLinks', () => {
    beforeEach(() => {
      const state = {
        tracking: Immutable.fromJS({
          utmSource: {}
        }),
        basket: Immutable.fromJS({
          promoCode: 'DTI-20M'
        })
      }
      dispatch = jest.fn()
      getState = jest.fn().mockReturnValue(state)
    })

    test('should dispatch trackCheckoutNavigationLinks with proper type', () => {
      trackCheckoutNavigationLinks('Account')(dispatch, getState)
      const { type, trackingData } = dispatch.mock.calls[0][0]
      expect(type).toEqual(clickAccountBreadcrumb)
      expect(trackingData.actionType).toEqual(clickAccountBreadcrumb)
    })
  })

  describe('trackCheckoutError', () => {
    beforeEach(() => {
      const state = {
        tracking: Immutable.fromJS({
          utmSource: {},
        }),
        basket: Immutable.fromJS({
          promoCode: 'DTI-20M',
        }),
      }
      dispatch = jest.fn()
      getState = jest.fn().mockReturnValue(state)
    })

    test('should dispatch the correct tracking action', () => {
      trackCheckoutError(
        'CHECKOUT_SIGNUP',
        '409-duplicate-details',
        'testInitiator'
      )(dispatch, getState)
      const { type, trackingData } = dispatch.mock.calls[0][0]
      expect(type).toEqual('checkout_validation_error')
      expect(trackingData).toMatchObject({
        actionType: 'checkout_validation_error',
        errorName: 'CHECKOUT_SIGNUP',
        errorValue: '409-duplicate-details',
        initiator: 'testInitiator',
        messageCode: 'user-promo-invalid',
        promoCode: 'DTI-20M',
      })
    })
  })

  describe('trackShowcaseMenuAction', () => {
    beforeEach(() => {
      const state = {
        basket: Immutable.fromJS({
          promoCode: 'promo1',
        }),
        tracking: Immutable.Map({
          utmSource: {
            referral: '123',
          },
        }),
      }
      dispatch = jest.fn()
      getState = jest.fn().mockReturnValue(state)
    })

    test('it should track utm, promo code, and additional data', () => {
      const type = 'showcase_menu_click_category_filter'

      trackShowcaseMenuAction(type, { category: 'Fish' })(
        dispatch,
        getState
      )

      expect(dispatch).toHaveBeenCalledWith({
        type,
        trackingData: expect.objectContaining({
          actionType: type,
          category: 'Fish',
          promoCode: 'promo1',
          referral: '123',
        }),
      })
    })
  })

  describe('trackUnexpectedSignup', () => {
    beforeEach(() => {
      const state = {
        basket: Immutable.fromJS({
          promoCode: 'promo1',
          previewOrderId: 1231231
        }),
        user: Immutable.fromJS({
          id: 4564
        }),
        tracking: Immutable.Map({
          utmSource: {
            referral: '123',
          },
        }),
      }
      dispatch = jest.fn()
      getState = jest.fn().mockReturnValue(state)
    })

    test('it should track utm, promo code, orderId and userId', () => {
      const type = 'unexpected_signup'

      trackUnexpectedSignup()(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({
        type,
        trackingData: expect.objectContaining({
          actionType: type,
          promoCode: 'promo1',
          referral: '123',
          orderId: 1231231,
          userId: 4564,
        }),
      })
    })
  })
})
