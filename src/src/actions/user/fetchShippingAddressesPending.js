import { actionTypes } from "actions/actionTypes"

export const fetchShippingAddressesPending = pending => ({
  type: actionTypes.USER_SHIPPING_ADDRESSES_PENDING,
  pending
})
