import { actionTypes } from 'actions/actionTypes'

export const checkoutUrgencySetCurrentStatus = (currentStatus) => ({
  type: actionTypes.CHECKOUT_URGENCY_SET_CURRENT_STATUS,
  currentStatus,
})
