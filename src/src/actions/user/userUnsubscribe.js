import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"
import { error } from "actions/status/error"
import { deleteMarketingSubscription } from "apis/users/deleteMarketingSubscription"

export function userUnsubscribe({authUserId, marketingType, marketingUnsubscribeToken}) {
  return async dispatch => {
    dispatch(pending(actionTypes.UNSUBSCRIBED_USER, true))
    dispatch(error(actionTypes.UNSUBSCRIBED_USER, ''))

    try {
      await deleteMarketingSubscription(authUserId, marketingType, marketingUnsubscribeToken)

      dispatch({
        type: actionTypes.UNSUBSCRIBED_USER
      })
    } catch (err) {
      dispatch(error(actionTypes.UNSUBSCRIBED_USER, err))
    } finally {
      dispatch(pending(actionTypes.UNSUBSCRIBED_USER, false))
    }
  }
}
