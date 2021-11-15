import { error } from "actions/status/error"
import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"
import { temp } from "actions/temp/temp"
import { unSkipDates } from "routes/Account/apis/subscription/unSkipDates"

export const projectedOrderRestore = (orderId, userId, deliveryDayId, deliveryDay) => (
  async (dispatch, getState) => {
    dispatch(error(actionTypes.PROJECTED_ORDER_RESTORE, null))
    dispatch(pending(actionTypes.PROJECTED_ORDER_RESTORE, true))
    dispatch(temp('osrOrderId', orderId))
    const state = getState()
    const accessToken = state.auth.get('accessToken')

    try {
      const deliveryDayDate = deliveryDay.split(' ')[0]
      await unSkipDates(accessToken, userId, [deliveryDayDate])

      dispatch({
        type: actionTypes.PROJECTED_ORDER_RESTORE,
        orderId,
      })
    } catch (err) {
      dispatch(error(actionTypes.PROJECTED_ORDER_RESTORE, {error: err.message, orderId}))
    } finally {
      dispatch(pending(actionTypes.PROJECTED_ORDER_RESTORE, false))
    }
  }
)
