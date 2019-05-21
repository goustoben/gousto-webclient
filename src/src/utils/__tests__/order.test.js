import Immutable from 'immutable'

import {
  getAffiliateTrackingData,
  getConfirmationPromoCode,
  getPreviewOrderErrorName,
} from 'utils/order'

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
})
