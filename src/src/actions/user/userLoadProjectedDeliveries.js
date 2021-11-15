import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"
import { error } from "actions/status/error"
import { getUserId } from "selectors/user"
import logger from "utils/logger"
import { fetchProjectedDeliveries } from "routes/Account/apis/subscription/fetchProjectedDeliveries"

export function userLoadProjectedDeliveries(forceRefresh = false) {
  return async (dispatch, getState) => {
    dispatch(pending(actionTypes.USER_LOAD_PROJECTED_DELIVERIES, true))
    dispatch(error(actionTypes.USER_LOAD_PROJECTED_DELIVERIES, null))

    try {
      const state = getState()
      const accessToken = state.auth.get('accessToken')
      const userId = getUserId(state)

      const dispatchProjectedDeliveries = (projectedDeliveries) => {
        dispatch({
          type: actionTypes.USER_LOAD_PROJECTED_DELIVERIES,
          projectedDeliveries
        })
      }

      if (forceRefresh || !state.user.get('projectedDeliveries').size) {
        if (userId) {
          const {data} = await fetchProjectedDeliveries(accessToken, userId)

          dispatchProjectedDeliveries(data.data.projectedDeliveries)
        } else {
          dispatchProjectedDeliveries([])
        }
      }
    } catch (err) {
      dispatch(error(actionTypes.USER_LOAD_PROJECTED_DELIVERIES, err.message))
      logger.error(err)
      throw err
    } finally {
      dispatch(pending(actionTypes.USER_LOAD_PROJECTED_DELIVERIES, false))
    }
  }
}
