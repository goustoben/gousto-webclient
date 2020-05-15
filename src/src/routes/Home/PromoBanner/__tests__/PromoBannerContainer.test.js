import { promoApplicable } from '../PromoBannerContainer'

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
})
