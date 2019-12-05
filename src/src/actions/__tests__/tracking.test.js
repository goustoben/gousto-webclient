import Immutable from 'immutable' /* eslint-disable new-caps */

import {
  trackFirstPurchase,
  setAffiliateSource,
  trackRecipeOrderDisplayed,
  trackAffiliatePurchase,
  trackUserAttributes
} from 'actions/tracking'
import globals from 'config/globals'
import actionTypes from 'actions/actionTypes'
import { warning } from 'utils/logger'
import moment from 'moment'

jest.mock('utils/logger', () => ({
  warning: jest.fn(),
}))

describe('tracking actions', () => {
  let getState
  let dispatch

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

    const pricing = Immutable.fromJS({
      total: '13.99',
      grossTotal: '15.99',
      promoCode: '10OFF',
    })

    beforeEach(() => {
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
      const trackingData = dispatch.mock.calls[0][0].trackingData

      expect(trackingData.asource).toBe('test-source')
      expect(trackingData.goustoReference).toBe('123')
      expect(trackingData.event).toBe('firstPurchase')
      expect(trackingData.orderId).toBe('order-a')
      expect(trackingData.orderTotal).toBe('13.99')
      expect(trackingData.voucher).toBe('10OFF')
    })

    test('should dispatch correct optimizely data', () => {
      trackFirstPurchase('order-a', pricing)(dispatch, getState)
      const optimizelyData = dispatch.mock.calls[0][0].optimizelyData

      expect(optimizelyData.eventName).toBe('order_placed_gross')
      expect(optimizelyData.tags.revenue).toBe('15.99')

      const optimizelyData2 = dispatch.mock.calls[1][0].optimizelyData

      expect(optimizelyData2.eventName).toBe('order_placed_net')
      expect(optimizelyData2.tags.revenue).toBe('13.99')
    })

    test('should log warning when no user is found', () => {
      warning.mockClear()

      trackFirstPurchase('order-a')(dispatch, () => ({
        user: Immutable.fromJS({ orders: [] }),
        tracking: Immutable.fromJS({}),
      }))

      expect(warning.mock.calls[0][0]).toBe(
        'Missing user data for first purchase tracking: no user found in store',
      )
    })
    test('should log warning when specified order is not found', () => {
      warning.mockClear()

      trackFirstPurchase('order-a')(dispatch, () => ({
        user: Immutable.fromJS({
          goustoReference: '123',
          orders: [{ id: 'order-b' }],
        }),
        tracking: Immutable.fromJS({}),
      }))

      expect(warning.mock.calls[0][0]).toBe(
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
    const originalOrder = ['3', '5', '2', '6']
    const displayedOrder = ['6', '3', '2']
    const collectionId = '678'
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

    test('should dispatch correct arguements', () => {
      getState.mockReturnValue(state)

      trackRecipeOrderDisplayed(
        originalOrder,
        displayedOrder,
      )(dispatch, getState)

      const dispatchCall = dispatch.mock.calls[0][0]

      expect(dispatchCall).toEqual({
        type: 'RECIPES_DISPLAYED_ORDER_TRACKING',
        originalOrder: ['3', '5', '2', '6'],
        displayedOrder: ['6', '3', '2'],
        collectionId: '678',
        recommended: true,
        browseMode: false,
        deliveryDayId: 'test-day-id',
        orderId: '1234567',
      })
    })

    describe('should dispatch recommended state', () => {
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
        }
        getState.mockReturnValue(state)

        trackRecipeOrderDisplayed(originalOrder, displayedOrder, collectionId)(dispatch, getState)

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
        }
        getState.mockReturnValue(state)

        trackRecipeOrderDisplayed(originalOrder, displayedOrder, collectionId)(dispatch, getState)

        expect(dispatch.mock.calls[0][0].recommended).toBeTruthy()
      })
    })
  })

  describe('trackAffiliatePurchase', () => {
    describe('if not on the client', () => {
      const Sale = {
        amount: '',
        channel: '',
        orderRef: 9010322,
        parts: `FIRSTPURCHASE:47.75`,
        voucher: 'TV',
        currency: 'GBP',
      }

      beforeEach(() => {
        globals.client = false
        global.AWIN = {
          Tracking: {
            Sale,
          }
        }
      })

      test('should not modify AWIN', () => {
        trackAffiliatePurchase({
          orderId: 9010320,
          total: '34.99',
          commissionGroup: 'EXISTING',
          promoCode: '',
        })

        expect(global.AWIN).toEqual({
          Tracking: {
            Sale,
          }
        })
      })
    })

    describe('if on the client', () => {
      beforeEach(() => {
        globals.client = true
      })

      describe('when global.AWIN is undefined', () => {
        beforeEach(() => {
          global.AWIN = undefined
        })

        test('should create AWIN and register order as Tracking.Sale', () => {
          trackAffiliatePurchase({
            orderId: 9010320,
            total: '34.99',
            commissionGroup: 'EXISTING',
            promoCode: '',
          })

          expect(global.AWIN).toEqual({
            Tracking: {
              Sale: {
                amount: '34.99',
                channel: '',
                currency: 'GBP',
                orderRef: 9010320,
                parts: 'EXISTING:34.99',
                voucher: ''
              }
            }
          })
        })
      })

      describe('when global.AWIN is defined', () => {
        const AWIN = {
          enhancedTracking: true,
          sProtocol: 'https://',
          InputIdentifiers: ['email'],
          Tracking: {},
        }

        beforeEach(() => {
          global.AWIN = AWIN
        })

        test('should register order as Tracking.Sale, preserving object', () => {
          trackAffiliatePurchase({
            orderId: 9010321,
            total: '24.50',
            commissionGroup: 'FIRSTPURCHASE',
            promoCode: 'DTI-SB-P30M',
          })

          expect(global.AWIN).toBe(AWIN)
          expect(global.AWIN).toEqual({
            ...AWIN,
            Tracking: {
              Sale: {
                amount: '24.50',
                channel: '',
                currency: 'GBP',
                orderRef: 9010321,
                parts: 'FIRSTPURCHASE:24.50',
                voucher: 'DTI-SB-P30M'
              }
            }
          })
        })

        test('should call AWIN.Tracking.run', () => {
          global.AWIN.Tracking.run = jest.fn()

          trackAffiliatePurchase({
            orderId: 9010321,
            total: '24.50',
            commissionGroup: 'FIRSTPURCHASE',
            promoCode: 'DTI-SB-P30M',
          })

          expect(global.AWIN.Tracking.run).toHaveBeenCalled()
        })
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
})
