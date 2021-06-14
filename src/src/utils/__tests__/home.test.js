import Immutable from 'immutable'
import home from 'config/home'
import { getPromoBannerState } from '../home'

describe('getPromoBannerState', () => {
  const state = {
    features: Immutable.fromJS({
      enableSignupReduction: {
        value: false
      },
      promoBanner: Immutable.fromJS({
        promoBannerCode: null
      })
    }),
    promoCurrent: null,
    basket: Immutable.fromJS({
      promoCode: null
    }),
    auth: Immutable.fromJS({
      isAuthenticated: false
    }),
    error: Immutable.fromJS({})
  }

  const expectedPromoCode = home.promo.defaultPromoCode

  describe('When the state is clean', () => {
    test('Then the promo code should be applicable', () => {
      const result = getPromoBannerState(state)
      expect(result).toEqual({
        canApplyPromo: true,
        promoCode: expectedPromoCode
      })
    })
  })

  describe('When the user is authenticated', () => {
    test('Then the promo code should not be applicable', () => {
      const result = getPromoBannerState({
        ...state,
        auth: Immutable.fromJS({
          isAuthenticated: true
        })
      })

      expect(result).toMatchObject({
        canApplyPromo: false
      })
    })
  })

  describe('When there is a promo code applied in the basket', () => {
    test('Then the promo code should not be applicable', () => {
      const result = getPromoBannerState({
        ...state,
        basket: Immutable.fromJS({
          promoCode: 'JOEWICKSGOUSTO'
        })
      })

      expect(result).toMatchObject({
        canApplyPromo: false,
      })
    })
  })

  describe('When there is a current promo', () => {
    test('Then the prmoo code should not be applicable', () => {
      const result = getPromoBannerState({
        ...state,
        promoCurrent: 'JOEWICKSGOUSTO'
      })

      expect(result).toMatchObject({
        canApplyPromo: false,
      })
    })
  })

  describe('When signup reduction is enabled', () => {
    test('Then the prmoo code should not be applicable', () => {
      const result = getPromoBannerState({
        ...state,
        features: state.features.set(
          'enableSignupReduction',
          Immutable.Map({
            value: true
          })
        )
      })

      expect(result).toMatchObject({
        canApplyPromo: false,
      })
    })
  })

  describe('When promoCode is defined in promoBannerCode in the state', () => {
    test('Then that promo code should be passed through', () => {
      const result = getPromoBannerState({
        ...state,
        features: state.features.set(
          'promoBannerCode',
          Immutable.fromJS({
            value: 'GAFFIL2035M'
          })
        )
      })

      expect(result).toMatchObject({
        promoCode: 'GAFFIL2035M'
      })
    })
  })
})
