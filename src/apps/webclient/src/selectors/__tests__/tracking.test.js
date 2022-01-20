import Immutable from 'immutable'
import { getUTMAndPromoCode, getTransactionType } from '../tracking'

const getState = (orderId) => ({
  basket: Immutable.fromJS({
    orderId: orderId === 'transactional' ? null : orderId,
  }),
  user: Immutable.fromJS({
    orders: {
      subscription: { phase: 'awaiting_choices' },
      'not set': { phase: 'open' }
    },
  }),
})

describe('tracking', () => {
  describe('getUTMAndPromoCode', () => {
    const promoCode = '123'
    const utmSource = 'google.com'
    const state = {
      basket: Immutable.fromJS({
        promoCode,
      }),
      tracking: Immutable.fromJS({
        utmSource,
      })
    }
    test('should return utm and promo code from store', () => {
      const expected = {
        UTM: utmSource,
        promoCode
      }
      expect(getUTMAndPromoCode(state)).toMatchObject(expected)
    })
  })

  describe('getTransactionType', () => {
    let state
    describe('when user is creating a new one off box', () => {
      beforeEach(() => {
        state = getState('transactional')
      })
      test('should return the string `transactional`', () => {
        expect(getTransactionType(state)).toBe('transactional')
      })
    })

    describe('when user is editing a new subscription box for the first time', () => {
      beforeEach(() => {
        state = getState('subscription')
      })
      test('should return the string `subscription`', () => {
        expect(getTransactionType(state)).toBe('subscription')
      })
    })

    describe('when user is editing an existing order', () => {
      beforeEach(() => {
        state = getState('not set')
      })
      test('should return the string `not set`', () => {
        expect(getTransactionType(state)).toBe('not set')
      })
    })
  })
})
