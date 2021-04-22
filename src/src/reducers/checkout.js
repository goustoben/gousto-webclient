import Immutable from 'immutable'
import { actionTypes } from 'actions/actionTypes'

const paypalErrors = [
  actionTypes.PAYPAL_TOKEN_FETCH_FAILED,
  actionTypes.PAYPAL_ERROR,
]

const errorsToCapture = [
  actionTypes.USER_SUBSCRIBE,
  actionTypes.CHECKOUT_SIGNUP,
  actionTypes.CHECKOUT_SIGNUP_LOGIN,
  actionTypes.ORDER_SAVE,
  actionTypes.CARD_TOKENIZATION_FAILED,
  actionTypes.NETWORK_FAILURE,
  actionTypes.VALID_CARD_DETAILS_NOT_PROVIDED,
  ...paypalErrors,
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
  goustoRef: null,
  errors: {},
  paypalErrors: {},
})

const checkout = {
  checkout: (state, action) => {
    if (!state) {
      return initialState()
    }

    switch (action.type) {
    case actionTypes.CHECKOUT_ERRORS_CLEAR: {
      return state
        .set('errors', initialState().get('errors'))
    }

    case actionTypes.CHECKOUT_PAYPAL_ERRORS_CLEAR: {
      return state
        .set('paypalErrors', initialState().get('paypalErrors'))
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

    case actionTypes.CHECKOUT_SET_GOUSTO_REF: {
      const { goustoRef } = action

      return state.set('goustoRef', goustoRef)
    }

    case actionTypes.PAYMENT_SET_PAYMENT_METHOD: {
      return state
        .set('errors', initialState().get('errors'))
    }

    case actionTypes.PAYMENT_SET_PAYPAL_CLIENT_TOKEN: {
      return state
        .deleteIn(['paypalErrors', actionTypes.PAYPAL_TOKEN_FETCH_FAILED])
    }

    case actionTypes.ERROR: {
      if (action.hasOwnProperty('key') && action.hasOwnProperty('value')) {
        if (errorsToCapture.indexOf(action.key) !== -1) {
          let { value } = action

          if (value instanceof Error) {
            value = value.message
          }

          const errors = paypalErrors.indexOf(action.key) !== -1
            ? 'paypalErrors'
            : 'errors'

          return state.setIn([errors, action.key], value)
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
