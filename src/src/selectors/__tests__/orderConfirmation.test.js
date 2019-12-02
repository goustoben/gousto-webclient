import Immutable from 'immutable'

import {
  isOrderConfirmationPageLoading,
  isOrderDetailsLoading,
  isReferralOfferLoading,
} from 'selectors/orderConfirmation'

describe('orderConfirmation selectors', () => {
  describe('isOrderDetailsLoading', () => {
    describe('when any pending action is true', () => {
      const state = {
        pending: Immutable.Map({
          'PRODUCT_CATEGORIES_RECEIVE': false,
          'PRODUCTS_STOCK_CHANGE': false,
          'PRODUCTS_RECEIVE': true,
          'USER_LOAD_ORDERS': false,
        })
      }

      test('returns true', () => {
        expect(isOrderDetailsLoading(state)).toEqual(true)
      })
    })

    describe('when all pending actions are false', () => {
      const state = {
        pending: Immutable.Map({
          'PRODUCT_CATEGORIES_RECEIVE': false,
          'PRODUCTS_STOCK_CHANGE': false,
          'PRODUCTS_RECEIVE': false,
          'USER_LOAD_ORDERS': false,
        })
      }

      test('returns false', () => {
        expect(isOrderDetailsLoading(state)).toEqual(false)
      })
    })
  })

  describe('isReferralOfferLoading', () => {
    let state

    describe('when the referral offer is loading', () => {
      beforeEach(() => {
        state = {
          pending: Immutable.Map({
            'USER_LOAD_REFERRAL_OFFER': true,
          })
        }
      })

      test('returns true', () => {
        expect(isReferralOfferLoading(state)).toBe(true)
      })
    })

    describe('when the referral offer is not loading', () => {
      describe('and the piece of store exists', () => {
        beforeEach(() => {
          state = {
            pending: Immutable.Map({
              'USER_LOAD_REFERRAL_OFFER': false,
            })
          }
        })

        test('returns false', () => {
          expect(isReferralOfferLoading(state)).toBe(false)
        })
      })

      describe('and the piece of store does not exist', () => {
        beforeEach(() => {
          state = {
            pending: Immutable.Map({})
          }
        })

        test('returns false', () => {
          expect(isReferralOfferLoading(state)).toBe(false)
        })
      })
    })
  })

  describe('isOrderConfirmationPageLoading', () => {
    let orderDetailsLoading
    let referralOfferLoading
    let resultingSelector

    describe('when the page is loading', () => {
      describe('and the order details are loading', () => {
        beforeEach(() => {
          orderDetailsLoading = true
          referralOfferLoading = false
          resultingSelector = isOrderConfirmationPageLoading.resultFunc(orderDetailsLoading, referralOfferLoading)
        })

        test('returns true', () => {
          expect(resultingSelector).toBe(true)
        })
      })

      describe('and the referral offer is loading', () => {
        beforeEach(() => {
          orderDetailsLoading = false
          referralOfferLoading = true
          resultingSelector = isOrderConfirmationPageLoading.resultFunc(orderDetailsLoading, referralOfferLoading)
        })

        test('returns true', () => {
          expect(resultingSelector).toBe(true)
        })
      })

      describe('and the order details and referral offer are loading', () => {
        beforeEach(() => {
          orderDetailsLoading = true
          referralOfferLoading = true
          resultingSelector = isOrderConfirmationPageLoading.resultFunc(orderDetailsLoading, referralOfferLoading)
        })

        test('returns true', () => {
          expect(resultingSelector).toBe(true)
        })
      })
    })

    describe('when the page is not loading', () => {
      beforeEach(() => {
        orderDetailsLoading = false
        referralOfferLoading = false
        resultingSelector = isOrderConfirmationPageLoading.resultFunc(orderDetailsLoading, referralOfferLoading)
      })

      test('returns false', () => {
        expect(resultingSelector).toBe(false)
      })
    })
  })
})
