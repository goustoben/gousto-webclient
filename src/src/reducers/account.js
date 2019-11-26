import actionTypes from 'actions/actionTypes'
import Immutable from 'immutable' /* eslint-disable new-cap */

const data = Immutable.fromJS({
  orderId: null,
  visibility: false,
})

const account = {
  orderCancelledModalVisibility: (state = data, action) => {
    switch (action.type) {
    case actionTypes.ORDER_CANCELLED_MODAL_VISIBILITY_CHANGE: {
      return state.merge({
        visibility: action.data.visibility,
        orderId: action.data.orderId,
      })
    }

    default:
      return state
    }
  },

  expiredBillingModalVisibility: (state = false, action) => {
    switch (action.type) {
    case actionTypes.EXPIRED_BILLING_MODAL_VISIBILITY_CHANGE: {
      return action.visibility
    }

    default: {
      return state
    }
    }
  },
}

export default account
