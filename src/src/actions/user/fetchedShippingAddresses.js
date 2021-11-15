import { actionTypes } from "actions/actionTypes"

export const fetchedShippingAddresses = shippingAddresses => ({
  type: actionTypes.USER_SHIPPING_ADDRESSES_RECEIVE,
  shippingAddresses
})
