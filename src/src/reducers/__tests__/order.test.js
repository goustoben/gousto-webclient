import actionTypes from 'actions/actionTypes'

import { orders, initialState } from 'reducers/orders'

describe('orders state', () => {
  let event

  beforeEach(() => {
    event = document.createEvent('CustomEvent')
    process.browser = 'not-falsy' // Test it as in client rendering
  })

  describe('when action type is ORDER_UPDATE_PRODUCTS', () => {

    test('event dispatches when order update succeeds and it does not change the state', () => {
      window.dispatchEvent = jest.fn()
      const state = initialState()
      const result = orders(
        state,
        {
          type: actionTypes.ORDER_UPDATE_PRODUCTS,
        }
      )
      event.initCustomEvent(
        'orderUpdateProductsResponse',
        true,
        true,
        { status: 'ok' }
      )

      expect(window.dispatchEvent).toHaveBeenCalledWith(event)
      expect(result).toEqual(state)
    })

    test('event dispatches with the error when order update errors and the state does not change', () => {
      window.dispatchEvent = jest.fn()
      const state = initialState()
      const result = orders(
        state,
        {
          type: actionTypes.ORDER_UPDATE_PRODUCTS,
          error: 'an error'
        }
      )
      event.initCustomEvent(
        'orderUpdateProductsResponse',
        true,
        true,
        { status: 'error', error: 'an error' }
      )

      expect(window.dispatchEvent).toHaveBeenCalledWith(event)
      expect(result).toEqual(state)
    })
  })

  describe('when action type is ORDER_HAS_ANY_PRODUCTS', () => {
    test('event dispatches when order request succeeds and it does not change the state', () => {
      window.dispatchEvent = jest.fn()
      const state = initialState()
      const result = orders(
        state,
        {
          type: actionTypes.ORDER_HAS_ANY_PRODUCTS,
          hasProducts: 'whatever the result is here'
        }
      )
      event.initCustomEvent(
        'orderDoesContainProductsResponse',
        true,
        true,
        { status: 'ok', data: { result: 'whatever the result is here' } }
      )

      expect(window.dispatchEvent).toHaveBeenCalledWith(event)
      expect(result).toEqual(state)
    })

    test('event dispatches with the error when order request errors and the state does not change', () => {
      window.dispatchEvent = jest.fn()
      const state = initialState()
      const result = orders(
        state,
        {
          type: actionTypes.ORDER_HAS_ANY_PRODUCTS,
          error: 'an error'
        }
      )
      event.initCustomEvent(
        'orderDoesContainProductsResponse',
        true,
        true,
        { status: 'error', error: 'an error' }
      )

      expect(window.dispatchEvent).toHaveBeenCalledWith(event)
      expect(result).toEqual(state)
    })
  })
})
