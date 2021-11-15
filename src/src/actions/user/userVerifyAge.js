import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"
import { error } from "actions/status/error"
import logger from "utils/logger"
import { verifyAge } from "apis/users/verifyAge"

export function userVerifyAge(verified, hardSave) {
  return async (dispatch, getState) => {
    dispatch(pending(actionTypes.USER_AGE_VERIFY, true))

    try {
      if (verified && hardSave) {
        const accessToken = getState().auth.get('accessToken')
        await verifyAge(accessToken, 'current')
      }

      dispatch({
        type: actionTypes.USER_AGE_VERIFY,
        verified
      })
    } catch (err) {
      dispatch(error(actionTypes.USER_AGE_VERIFY, err.message))
      dispatch(pending(actionTypes.USER_AGE_VERIFY, false))
      logger.error(err)
      throw err
    }
    dispatch(pending(actionTypes.USER_AGE_VERIFY, false))
  }
}
