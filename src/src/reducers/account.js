import actionTypes from 'actions/actionTypes'
import Immutable from 'immutable' /* eslint-disable new-cap */

const data = Immutable.fromJS({
  orderId: null,
  visibility: false,
})

const addressesInitialState = Immutable.fromJS({
  craftyClicksAddresses: [],
  craftyClicksFullAddressId: '1',
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

  craftyClicksAddresses: (state = addressesInitialState, action) => {
    if (!state) {
      return addressesInitialState
    }
    switch (action.type) {
    case actionTypes.MODAL_ADDRESSES_RECEIVE: {
      const keyedAddresses = Immutable.fromJS(action.data.results)

      return state
        .set('craftyClicksAddresses', keyedAddresses)
    }

    case actionTypes.MODAL_FULL_ADDRESSES_RECEIVE: {
      return state
        .set('craftyClicksFullAddress', action.data.result)
        .set('craftyClicksFullAddressId', action.id)
    }

    default: {
      return state
    }
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
