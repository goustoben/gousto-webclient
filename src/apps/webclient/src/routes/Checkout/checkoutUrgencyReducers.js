import Immutable from 'immutable'
import { actionTypes } from 'actions/actionTypes'
import { checkoutUrgencyStatuses } from './checkoutUrgencyConfig'

const checkoutUrgencyInitialState = Immutable.fromJS({
  currentStatus: checkoutUrgencyStatuses.inactive,
})

export const checkoutUrgencyReducers = {
  checkoutUrgency: (state, action) => {
    if (!state) {
      return checkoutUrgencyInitialState
    }

    switch (action.type) {
      case actionTypes.CHECKOUT_URGENCY_SET_CURRENT_STATUS: {
        const { currentStatus } = action

        return state.set('currentStatus', currentStatus)
      }
      default: {
        return state
      }
    }
  },
}
