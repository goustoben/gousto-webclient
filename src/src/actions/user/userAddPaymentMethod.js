import { error } from "actions/status/error"
import { actionTypes } from "actions/actionTypes"
import { pending } from "actions/status/pending"
import logger from "utils/logger"
import { addPaymentMethod } from "apis/users/addPaymentMethod"

export function userAddPaymentMethod(data) {
  return async (dispatch, getState) => {
    dispatch(error(actionTypes.USER_POST_PAYMENT_METHOD, null))
    dispatch(pending(actionTypes.USER_POST_PAYMENT_METHOD, true))

    try {
      const accessToken = getState().auth.get('accessToken')
      const userId = getState().user.get('id')
      const paymentMethodData = {
        payment_type: data.payment_type,
        card_type: data.card_type,
        card_number: data.card_number,
        card_cvv2: data.card_cvv2,
        card_holder: data.card_holder,
        card_expires: data.card_expires,
        force_no_finisher: true
      }
      await addPaymentMethod(accessToken, paymentMethodData, userId)
      dispatch({type: actionTypes.USER_POST_PAYMENT_METHOD, userId})
      window.location.reload()
    } catch (err) {
      logger.error({message: `${actionTypes.USER_POST_PAYMENT_METHOD} - ${err.message}`, errors: [err]})
      dispatch(error(actionTypes.USER_POST_PAYMENT_METHOD, err.code))
    } finally {
      dispatch({type: actionTypes.EXPIRED_BILLING_MODAL_VISIBILITY_CHANGE, visibility: false})
      dispatch(pending(actionTypes.USER_POST_PAYMENT_METHOD, false))
    }
  }
}
