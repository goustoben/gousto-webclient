import Immutable from 'immutable'
import home from 'config/home'
import { promoApplicable, getPromoBannerState } from '../home'

describe('promoApplicable', () => {
  let criteria
  let isAuthenticated

  describe('when criteria is set to loggedOut', () => {
    beforeEach(() => {
      criteria = 'loggedOut'
    })

    describe('when isAuthenticated is false', () => {
      beforeEach(() => {
        isAuthenticated = false
      })

      test('then promoApplicable should return true', () => {
        const result = promoApplicable(isAuthenticated, criteria)
        expect(result).toBeTruthy()
      })
    })

    describe('when isAuthenticated is true', () => {
      beforeEach(() => {
        isAuthenticated = true
      })

      test('then promoApplicable should return false', () => {
        const result = promoApplicable(isAuthenticated, criteria)
        expect(result).toBeFalsy()
      })
    })
  })

  describe('when criteria is set to loggedIn', () => {
    beforeEach(() => {
      criteria = 'loggedIn'
    })

    describe('when isAuthenticated is false', () => {
      beforeEach(() => {
        isAuthenticated = false
      })

      test('then promoApplicable should return false', () => {
        const result = promoApplicable(isAuthenticated, criteria)
        expect(result).toBeFalsy()
      })
    })

    describe('when isAuthenticated is true', () => {
      beforeEach(() => {
        isAuthenticated = true
      })

      test('then promoApplicable should return true', () => {
        const result = promoApplicable(isAuthenticated, criteria)
        expect(result).toBeTruthy()
      })
    })
  })

  describe('when criteria is set to any', () => {
    beforeEach(() => {
      criteria = 'any'
    })

    describe('when isAuthenticated is false', () => {
      beforeEach(() => {
        isAuthenticated = false
      })

      test('then promoApplicable should return true', () => {
        const result = promoApplicable(isAuthenticated, criteria)
        expect(result).toBeTruthy()
      })
    })

    describe('when isAuthenticated is true', () => {
      beforeEach(() => {
        isAuthenticated = true
      })

      test('then promoApplicable should return true', () => {
        const result = promoApplicable(isAuthenticated, criteria)
        expect(result).toBeTruthy()
      })
    })
  })

  describe('when criteria is set to something else', () => {
    beforeEach(() => {
      criteria = 'something else'
    })

    describe('when isAuthenticated is false', () => {
      beforeEach(() => {
        isAuthenticated = false
      })

      test('then promoApplicable should return false', () => {
        const result = promoApplicable(isAuthenticated, criteria)
        expect(result).toBeFalsy()
      })
    })

    describe('when isAuthenticated is true', () => {
      beforeEach(() => {
        isAuthenticated = true
      })

      test('then promoApplicable should return false', () => {
        const result = promoApplicable(isAuthenticated, criteria)
        expect(result).toBeFalsy()
      })
    })
  })
})

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

  const expectedPromoCode = home.promo.mayCode

  describe('When the state is clean', () => {
    test('Then the promo banner should be visible and promo code applicable', () => {
      const result = getPromoBannerState(state)
      expect(result).toEqual({
        hide: false,
        canApplyPromo: true,
        promoCode: expectedPromoCode
      })
    })
  })

  describe('When the user is authenticated', () => {
    test('Then the promo banner should be hidden', () => {
      const result = getPromoBannerState({
        ...state,
        auth: Immutable.fromJS({
          isAuthenticated: true
        })
      })

      expect(result).toMatchObject({
        hide: true
      })
    })
  })

  describe('When there is a promo code applied in the basket', () => {
    test('Then the promo banner should be hidden', () => {
      const result = getPromoBannerState({
        ...state,
        basket: Immutable.fromJS({
          promoCode: 'JOEWICKSGOUSTO'
        })
      })

      expect(result).toMatchObject({
        hide: true
      })
    })
  })

  describe('When there is a query string promo code', () => {
    test('Then the promo banner should be hidden', () => {
      // Note: I'm not sure whether this case can actually happen during normal
      // operation, because I haven't understood how window.location actually
      // gets into PromoBannerContainer's ownProps.  But I've preserved the
      // getPromoBannerState's logic, and there is this check in there, so the
      // current test covers it.
      const result = getPromoBannerState(state, undefined, {
        query: {
          promo_code: 'JOEWICKSGOUSTO'
        }
      })

      expect(result).toMatchObject({
        hide: true
      })
    })
  })

  describe('When there is a current promo', () => {
    test('Then the promo banner should be hidden', () => {
      const result = getPromoBannerState({
        ...state,
        promoCurrent: 'JOEWICKSGOUSTO'
      })

      expect(result).toMatchObject({
        hide: true
      })
    })
  })

  describe('When signup reduction is enabled', () => {
    test('Then the promo banner should be hidden', () => {
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
        hide: true
      })
    })
  })

  describe("When promoCode is passed into PromoBannerContainer's props", () => {
    test('Then that promo code should be passed through', () => {
      const result = getPromoBannerState(state, 'GAFFIL2035M')

      expect(result).toMatchObject({
        promoCode: 'GAFFIL2035M'
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
