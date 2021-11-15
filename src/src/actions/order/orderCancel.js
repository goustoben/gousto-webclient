import { error } from "actions/status/error"
import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"
import { getAuthUserId } from "selectors/auth"
import { deleteOrder } from "routes/Account/MyDeliveries/apis/orderV2/deleteOrder"

export const orderCancel = (orderId, deliveryDayId, variation) => (
  async (dispatch, getState) => {
    dispatch(error(actionTypes.ORDER_CANCEL, null))
    dispatch(pending(actionTypes.ORDER_CANCEL, true))
    const state = getState()
    const accessToken = state.auth.get('accessToken')
    const valueProposition = state.onScreenRecovery.get('valueProposition')
    const offer = state.onScreenRecovery.get('offer')
    const userId = getAuthUserId(state)

    try {
      await deleteOrder(accessToken, orderId, userId)

      dispatch({
        type: actionTypes.ORDER_CANCEL,
        orderId,
        trackingData: {
          actionType: 'Order Cancelled',
          order_id: orderId,
          delivery_day_id: deliveryDayId,
          order_state: 'pending',
          cms_variation: variation,
          recovery_reasons: [
            valueProposition,
            offer,
          ],
        }
      })
    } catch (err) {
      dispatch(error(actionTypes.ORDER_CANCEL, {error: err.message, orderId}))
      throw err
    } finally {
      dispatch(pending(actionTypes.ORDER_CANCEL, false))
    }
  })
