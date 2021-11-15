import { pending } from "actions/status/pending"

export const fireCheckoutPendingEvent = (pendingName, checkoutValue = true) => dispatch => {
  dispatch(pending(pendingName, checkoutValue))
}
