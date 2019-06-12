import Immutable from 'immutable'
import { isOrderConfirmationPageLoaded } from 'selectors/orderConfirmation'

describe('when any pending action is true', () => {
  const state = {
    pending: Immutable.Map({
      'PRODUCT_CATEGORIES_RECEIVE': false,
      'PRODUCTS_STOCK_CHANGE': false,
      'PRODUCTS_RECEIVE': true,
      'USER_LOAD_REFERRAL_OFFER': false,
      'USER_LOAD_ORDERS': false,
    })
  }

  it('should return true', () => {
    expect(isOrderConfirmationPageLoaded(state)).toEqual(true)
  })
})

describe('when all pending actions are false', () => {
  const state = {
    pending: Immutable.Map({
      'PRODUCT_CATEGORIES_RECEIVE': false,
      'PRODUCTS_STOCK_CHANGE': false,
      'PRODUCTS_RECEIVE': false,
      'USER_LOAD_REFERRAL_OFFER': false,
      'USER_LOAD_ORDERS': false,
    })
  }

  it('should return false', () => {
    expect(isOrderConfirmationPageLoaded(state)).toEqual(false)
  })
})
