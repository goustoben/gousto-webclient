import { fromJS } from 'immutable'

import actionTypes from 'actions/actionTypes'

const initialState = () => fromJS({})

/*
This reducer is not doing actually anything with the store,
it is just dispatching events that Conversion.com will use.
This is an experiment and it will be removed or upgraded to
a real solution which actually updates the store
 */
const orders = (state, action) => {
  // !process.browser used to make sure `window` is not accessed
  // during server-side rendering
  if (!state || !process.browser) {
    return initialState()
  }

  const event = window.document.createEvent('CustomEvent')

  switch (action.type) {
  case actionTypes.ORDER_UPDATE_PRODUCTS:
    if (!action.error) {
      event.initCustomEvent(
        'orderUpdateProductsResponse',
        true,
        true,
        { status: 'ok' }
      )
      window.dispatchEvent(event)
    } else {
      event.initCustomEvent(
        'orderUpdateProductsResponse',
        true,
        true,
        { status: 'error', error: action.error }
      )
      window.dispatchEvent(event)
    }

    return state

  case actionTypes.ORDER_HAS_ANY_PRODUCTS:
    if (!action.error) {
      event.initCustomEvent(
        'orderDoesContainProductsResponse',
        true,
        true,
        { status: 'ok', data: { result: action.hasProducts } }
      )
      window.dispatchEvent(event)
    } else {
      event.initCustomEvent(
        'orderDoesContainProductsResponse',
        true,
        true,
        { status: 'error', error: action.error }
      )
      window.dispatchEvent(event)
    }

    return state

  default:
    return state
  }
}

export {
  orders,
  initialState,
}
