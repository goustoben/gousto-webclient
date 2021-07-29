import Immutable from 'immutable'
import moment from 'moment'

import {
  getAffiliateTrackingData,
  getConfirmationPromoCode,
  getPreviewOrderErrorName,
  findNewestOrder,
  isOrderEligibleForSelfRefundResolution,
} from 'utils/order'

const deliveryDateFormat = 'YYYY-MM-DD HH:mm:ss'
const upcomingOrders = Immutable.fromJS({
  99: {
    deliveryDate: moment().subtract(10, 'days').format(deliveryDateFormat),
    deliverySlot: {
      deliveryEnd: '18:59:59',
      deliveryStart: '08:00:00'
    },
    id: '99',
  },
  100: {
    deliveryDate: moment().format(deliveryDateFormat),
    deliverySlot: {
      deliveryEnd: '18:59:59',
      deliveryStart: '08:00:00'
    },
    id: '100',
  },
  101: {
    deliveryDate: moment().add(2, 'days').format(deliveryDateFormat),
    deliverySlot: {
      deliveryEnd: '18:59:59',
      deliveryStart: '08:00:00'
    },
    id: '101',
  },
  102: {
    deliveryDate: moment().add(5, 'days').format(deliveryDateFormat),
    deliverySlot: {
      deliveryEnd: '18:59:59',
      deliveryStart: '08:00:00'
    },
    id: '102',
  },
})
const pastOrder = Immutable.fromJS({
  99: {
    deliveryDate: moment().subtract(10, 'days').format(deliveryDateFormat),
    deliverySlot: {
      deliveryEnd: '18:59:59',
      deliveryStart: '08:00:00'
    },
    id: '99',
  },
  100: {
    deliveryDate: moment().subtract(2, 'days').format(deliveryDateFormat),
    deliverySlot: {
      deliveryEnd: '18:59:59',
      deliveryStart: '08:00:00'
    },
    id: '100',
  },
})

describe('order utils', () => {
  describe('getConfirmationPromoCode', () => {
    let order
    let basket

    describe('when order promocode is not set', () => {
      beforeEach(() => {
        order = Immutable.Map({})
      })

      describe('and basket promocode is not set', () => {
        beforeEach(() => {
          basket = Immutable.Map({})
        })

        test('should return an empty string', () => {
          expect(getConfirmationPromoCode(order, basket)).toBe('')
        })
      })

      describe('and basket promocode is set', () => {
        beforeEach(() => {
          basket = Immutable.Map({ promoCode: 'BASKET-PROMO' })
        })

        test('should return basket promocode', () => {
          expect(getConfirmationPromoCode(order, basket)).toBe('BASKET-PROMO')
        })
      })
    })

    describe('when order promocode is set', () => {
      beforeEach(() => {
        order = Immutable.Map({
          prices: Immutable.Map({ promoCode: 'ORDER-PROMO' }),
        })
      })
      describe('and basket promocode is not set', () => {
        beforeEach(() => {
          basket = Immutable.Map({})
        })

        test('should return order promocode', () => {
          expect(getConfirmationPromoCode(order, basket)).toBe('ORDER-PROMO')
        })
      })

      describe('and basket promocode is set', () => {
        beforeEach(() => {
          basket = Immutable.Map({ promoCode: 'BASKET-PROMO' })
        })

        test('should return order promocode', () => {
          expect(getConfirmationPromoCode(order, basket)).toBe('ORDER-PROMO')
        })
      })
    })
  })

  describe('getAffiliateTrackingData', () => {
    describe('when given nothing', () => {
      test('should fail gracefully', () => {
        expect(getAffiliateTrackingData()).toEqual({
          orderId: '',
          total: '',
          commissionGroup: '',
          promoCode: '',
        })
      })
    })

    describe('when given an order and commission group', () => {
      let order
      let commissionGroup
      let basket

      beforeEach(() => {
        commissionGroup = 'FIRSTPURCHASE'
        order = Immutable.Map({
          id: '9012312',
          prices: Immutable.Map({
            total: '24.99',
            promoCode: 'TV',
          }),
        })
        basket = Immutable.Map({})
      })

      test('should return affiliate purchase data', () => {
        expect(getAffiliateTrackingData(commissionGroup, order, basket)).toEqual({
          orderId: '9012312',
          total: '24.99',
          commissionGroup: 'FIRSTPURCHASE',
          promoCode: 'TV',
        })
      })
    })
  })

  describe('getPreviewOrderErrorName', () => {
    let errors

    describe('when passed an unknown error type', () => {
      beforeEach(() => {
        errors = [
          null,
          { code: null },
          { code: 'undefined' },
          { code: 'order-exists' },
        ]
      })

      test('should return undefined-error', () => {
        errors.forEach(error => {
          expect(getPreviewOrderErrorName(error)).toEqual('undefined-error')
        })
      })
    })

    describe('when passed a known error type', () => {
      beforeEach(() => {
        errors = [
          { code: 'out-of-stock', result: 'no-stock' },
          { code: 'basket-expired', result: 'basket-expired' }
        ]
      })

      test('should return correct error code for known error types', () => {
        errors.forEach(error => {
          expect(getPreviewOrderErrorName(error)).toEqual(error.result)
        })
      })
    })
  })

  describe('given findNewestOrder is called', () => {
    describe('when customer has upcoming and past orders', () => {
      describe('and the areFutureOrdersIncluded param is set to true', () => {
        let order

        beforeEach(() => {
          order = findNewestOrder(upcomingOrders, true)
        })

        test('returns order to be deliveried today', () => {
          const expectedOrderOfToday = Immutable.fromJS({
            deliveryDate: upcomingOrders.getIn(['100', 'deliveryDate']),
            deliverySlot: {
              deliveryEnd: '18:59:59',
              deliveryStart: '08:00:00'
            },
            id: '100',
          })

          expect(order).toEqual(expectedOrderOfToday)
        })
      })

      describe('and the areFutureOrdersIncluded param is set to false', () => {
        let order

        beforeEach(() => {
          order = findNewestOrder(upcomingOrders, false)
        })

        test('returns the most recent delivered order', () => {
          const expectedPreviousOrder = Immutable.fromJS({
            deliveryDate: upcomingOrders.getIn(['99', 'deliveryDate']),
            deliverySlot: {
              deliveryEnd: '18:59:59',
              deliveryStart: '08:00:00'
            },
            id: '99',
          })
          expect(order).toEqual(expectedPreviousOrder)
        })
      })
    })

    describe('when customer has past orders only', () => {
      describe('and the areFutureOrdersIncluded param is set to true', () => {
        let order

        beforeEach(() => {
          order = findNewestOrder(pastOrder, true)
        })

        test('returns null', () => {
          expect(order).toEqual(null)
        })
      })

      describe('and the areFutureOrdersIncluded param is set to false', () => {
        let order

        beforeEach(() => {
          order = findNewestOrder(pastOrder, false)
        })

        test('returns the most recent delivered order', () => {
          const expectedPreviousOrder = Immutable.fromJS({
            deliveryDate: pastOrder.getIn(['100', 'deliveryDate']),
            deliverySlot: {
              deliveryEnd: '18:59:59',
              deliveryStart: '08:00:00'
            },
            id: '100',
          })
          expect(order).toEqual(expectedPreviousOrder)
        })
      })
    })
  })

  describe('given isOrderEligibleForSelfRefundResolution is called', () => {
    describe('when number of days since previous order is under the eligibility threshold', () => {
      let previousOrder

      beforeEach(() => {
        previousOrder = findNewestOrder(pastOrder, false)
      })

      test('order is eligible', () => {
        expect(isOrderEligibleForSelfRefundResolution(previousOrder)).toBe(true)
      })
    })

    describe('when number of days since previous order is not under the eligibility threshold', () => {
      let previousOrder
      const notEligibleOrders = Immutable.fromJS({
        99: {
          deliveryDate: moment().subtract(12, 'days').format(deliveryDateFormat),
          deliverySlot: {
            deliveryEnd: '18:59:59',
            deliveryStart: '08:00:00'
          },
          id: '99',
        },
        100: {
          deliveryDate: moment().subtract(20, 'days').format(deliveryDateFormat),
          deliverySlot: {
            deliveryEnd: '18:59:59',
            deliveryStart: '08:00:00'
          },
          id: '100',
        }
      })

      beforeEach(() => {
        previousOrder = findNewestOrder(notEligibleOrders, false)
      })

      test('order is not eligible', () => {
        expect(isOrderEligibleForSelfRefundResolution(previousOrder)).toBe(false)
      })
    })
  })
})
