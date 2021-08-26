import Immutable from 'immutable'
import {
  getIsSocialBelongingEnabled,
  getIsBoxSizeVerticalLayoutEnabled,
  getCurrentPromoCodeCustomText1,
} from '../signupSelectors'

describe('signupSelectors', () => {
  describe('given getIsSocialBelongingEnabled is called', () => {
    let state

    beforeEach(() => {
      state = {
        features: Immutable.fromJS({
          isSocialBelongingEnabled: {
            value: true,
          },
        }),
      }
    })

    test('then it should return true', () => {
      expect(getIsSocialBelongingEnabled(state)).toBeTruthy()
    })
  })

  describe('given getIsBoxSizeVerticalLayoutEnabled is called', () => {
    let state

    beforeEach(() => {
      state = {
        features: Immutable.fromJS({
          isBoxSizeVerticalLayoutEnabled: {
            value: true,
          },
        }),
      }
    })

    test('then it should return true', () => {
      expect(getIsBoxSizeVerticalLayoutEnabled(state)).toBeTruthy()
    })
  })

  describe('given getCurrentPromoCodeCustomText1 is called', () => {
    let state

    beforeEach(() => {
      state = {
        basket: Immutable.fromJS({
          promoCode: 'TEST-PROMO-CODE',
        }),
        promoStore: Immutable.fromJS({
          'TEST-PROMO-CODE': {
            code: 'TEST-PROMO-CODE',
            codeData: {
              campaign: {
                landingDetails1: 'custom text',
              },
            },
          },
        }),
      }
    })

    test('then it should return the correct value', () => {
      expect(getCurrentPromoCodeCustomText1(state)).toEqual('custom text')
    })

    describe('when promo code data is missing', () => {
      beforeEach(() => {
        state = {
          basket: Immutable.fromJS({
            promoCode: 'TEST-PROMO-CODE',
          }),
          promoStore: Immutable.fromJS({}),
        }
      })

      test('then it should return null', () => {
        expect(getCurrentPromoCodeCustomText1(state)).toBe(null)
      })
    })
  })
})
