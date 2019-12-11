import Immutable from 'immutable'
import { hasCheckoutError } from 'selectors/checkout'
describe('when the checkout error state is empty ', () => {
  const state = {
    checkout: Immutable.Map({})
  }
  it('should return false', () => {
    expect(hasCheckoutError(state)).toBe(false)
  })
})
describe('when a checkout error exists', () => {
  const state = {
    checkout: Immutable.Map({
      errors: Immutable.Map({
        CHECKOUT_SIGNUP: "422-payment-failed",
      })
    })
  }
  it('should return true', () => {
    expect(hasCheckoutError(state)).toBe(true)
  })
})
describe('when a checkout error exists but the value is falsy', () => {
  const state = {
    checkout: Immutable.Map({
      errors: Immutable.Map({
        CHECKOUT_SIGNUP: null,
      })
    })
  }
  it('should return false', () => {
    expect(hasCheckoutError(state)).toBe(false)
  })
})
describe('when there is no checkout errors', () => {
  const state = {
    checkout: Immutable.Map({
      errors: Immutable.Map({
        CHECKOUT_SIGNUP: null,
        USER_SUBSCRIBE: null,
      })
    })
  }
  it('should return false', () => {
    expect(hasCheckoutError(state)).toBe(false)
  })
})
