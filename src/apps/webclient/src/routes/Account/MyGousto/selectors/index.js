import { actionTypes } from '../actions/actionTypes'

export const getNextOrder = (state) => (
  state.myGousto.get('nextOrder')
)

export const getNextProjectedOrder = (state) => {
  const nextProjectedOrder = state.myGousto.get('nextProjectedOrder')

  return nextProjectedOrder ? nextProjectedOrder.toJS() : null
}

export const getPreviousOrder = (state) => (
  state.myGousto.get('previousOrder')
)

export const getIsOrdersPending = (state) => (
  state.pending.get(actionTypes.MY_GOUSTO_LOAD_ORDERS, true)
)

export const getIsProjectedDeliveriesPending = (state) => (
  state.pending.get(actionTypes.LOAD_NEXT_PROJECTED_ORDER, true)
)
