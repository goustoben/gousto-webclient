import { fromJS } from 'immutable'
import { findNewestOrder } from 'utils/order'
import { actionTypes } from '../routes/Account/MyGousto/actions/actionTypes'

export const initialState = fromJS({
  nextProjectedOrder: null,
})

export const myGousto = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.LOAD_NEXT_PROJECTED_ORDER: {
    return state.set('nextProjectedOrder', fromJS(action.payload.nextProjectedOrder))
  }
  case actionTypes.MY_GOUSTO_LOAD_ORDERS: {
    const { orders } = action.payload
    const immutableOrders = fromJS(orders)
    const previousOrder = findNewestOrder(immutableOrders, false)
    const nextOrder = findNewestOrder(immutableOrders, true)

    return state
      .set('previousOrder', previousOrder)
      .set('nextOrder', nextOrder)
  }
  default:
    return state
  }
}
