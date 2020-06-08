import { actionTypes } from 'actions/actionTypes'
import Immutable from 'immutable'

const errorsToCapture = [
  actionTypes.USER_SUBSCRIBE,
  actionTypes.CHECKOUT_SIGNUP,
  actionTypes.CHECKOUT_SIGNUP_LOGIN,
  actionTypes.ORDER_SAVE,
  actionTypes.CARD_TOKENIZATION_FAILED,
  actionTypes.NETWORK_FAILURE,
  actionTypes.VALID_CARD_DETAILS_NOT_PROVIDED,
]

const initialState = () => Immutable.fromJS({
  addressEdited: false,
  billingAddressEdited: false,
  confirmedAddress: false,
  selectedAddress: {},
  deliveryAddress: {
    houseNo: '',
    street: '',
    town: '',
    postcode: '',
    county: '',
  },
  deliveryAddresses: [],
  selectedAddressId: '',
  billingaddresstoggle: 'hidebillingaddress',
  billingAddresses: [],
  billingAddressId: '',
  selectedBillingAddress: {},
  billingAddress: {
    houseNo: '',
    street: '',
    town: '',
    postcode: '',
    county: '',
  },
  intervals: [],
  errors: {},
})

const checkout = {
  checkout: (state, action) => {
    if (!state) {
      return initialState()
    }

    switch (action.type) {
    case actionTypes.CHECKOUT_ERRORS_CLEAR: {
      return state.set('errors', initialState().get('errors'))
    }

    case actionTypes.CHECKOUT_ADDRESSES_RECEIVE: {
      const { addresses } = action
      const addressList = []
      addresses.forEach((address) => {
        addressList.push({
          id: address.id,
          labels: address.labels,
          count: address.count,
        })
      })

      return state.set('deliveryAddresses', Immutable.fromJS(addressList))
    }

    case actionTypes.CHECKOUT_INTERVALS_RECEIVE: {
      const { intervals } = action

      return state.set('intervals', Immutable.fromJS(intervals))
    }

    case actionTypes.ERROR: {
      if (action.hasOwnProperty('key') && action.hasOwnProperty('value')) {
        if (errorsToCapture.indexOf(action.key) !== -1) {
          let { value } = action

          if (value instanceof Error) {
            value = value.message
          }

          return state.setIn(['errors', action.key], value)
        }
      }

      return state
    }

    default: {
      return state
    }
    }
  },
}

export default checkout
