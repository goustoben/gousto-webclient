import Immutable from 'immutable'

import {
  getAffiliateTrackingData,
  getPreviewOrderErrorName,
} from 'utils/order'

describe('order utils', () => {
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

      beforeEach(() => {
        commissionGroup = 'FIRSTPURCHASE'
        order = Immutable.Map({
          id: '9012312',
          prices: Immutable.Map({
            total: '24.99',
            promoCode: 'TV',
          }),
        })
      })

      test('should return affiliate purchase data', () => {
        expect(getAffiliateTrackingData(order, commissionGroup)).toEqual({
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
})
