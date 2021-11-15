import { actionTypes } from "actions/actionTypes"

export const fetchShippingAddressesError = message => ({
  type: actionTypes.USER_SHIPPING_ADDRESSES_ERROR,
  message
})
