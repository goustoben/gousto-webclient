import { actionTypes } from "actions/actionTypes"
import { error } from "actions/status/error"
import logger from "utils/logger"
import { pending } from "actions/status/pending"
import { fetchUserCredit } from "apis/users/fetchUserCredit"

export function userFetchCredit() {
  return async (dispatch, getState) => {
    const accessToken = getState().auth.get('accessToken')

    try {
      const {data: userCreditData} = await fetchUserCredit(accessToken)
      const {balance: userCredit} = userCreditData

      dispatch({
        type: actionTypes.USER_CREDIT,
        userCredit,
      })
    } catch (err) {
      dispatch(error(actionTypes.USER_CREDIT, err.message))
      logger.error(err)
      throw err
    } finally {
      dispatch(pending(actionTypes.USER_CREDIT, false))
    }
  }
}
