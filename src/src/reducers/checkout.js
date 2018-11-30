import actionTypes from 'actions/actionTypes'
import Immutable from 'immutable' /* eslint-disable new-cap */

const errorsToCapture = [
  actionTypes.USER_SUBSCRIBE,
  actionTypes.CHECKOUT_SIGNUP,
  actionTypes.CHECKOUT_SIGNUP_LOGIN,
  actionTypes.ORDER_SAVE,
  actionTypes.CARD_TOKENISATION_FAILED,
  actionTypes.VALID_CARD_DETAILS_NOT_PROVIDED,
]

const initialState = () => Immutable.fromJS({
  addressEdited: false,
  billingAddressEdited: false,
  confirmedAddress: false,
  selectedAddress: {},
  deliveryAddress: {
    companyName: '',
    line1: '',
    line2: '',
    line3: '',
    town: '',
    county: '',
    postcode: '',
  },
  deliveryAddresses: [],
  selectedAddressId: '',
  billingaddresstoggle: 'hidebillingaddress',
  billingAddresses: [],
  billingAddressId: '',
  selectedBillingAddress: {},
  billingAddress: {
    companyName: '',
    line1: '',
    line2: '',
    line3: '',
    town: '',
    county: '',
    postcode: '',
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
      const addresses = action.addresses
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

    case actionTypes.CHECKOUT_INTERVALS_RECIEVE: {
      const { intervals } = action

      return state.set('intervals', Immutable.fromJS(intervals))
    }

    case actionTypes.ERROR: {
      if (action.hasOwnProperty('key') && action.hasOwnProperty('value')) {
        if (errorsToCapture.indexOf(action.key) !== -1) {
          let value = action.value

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
