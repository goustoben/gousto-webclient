import { checkAllScheduledCancelled } from "actions/order/checkAllScheduledCancelled"
import { getPendingOrdersDates } from "actions/order/getPendingOrdersDates"
import { actionTypes } from "actions/actionTypes"
import { error } from "actions/status/error"
import { pending } from "actions/status/pending"
import { getUserId } from "selectors/user"
import { userOpenCloseOrderCard } from "actions/user/userOpenCloseOrderCard"
import { skipDates } from "routes/Account/apis/subscription/skipDates"

export const projectedOrderCancel = (orderId, deliveryDayId, variation) => (
  async (dispatch, getState) => {
    const showAllCancelledModalIfNecessary = () => {
      const state = getState()
      const orders = state.user.get('newOrders')
      const subscriptionState = state.subscription.getIn(['subscription', 'state'])
      if (checkAllScheduledCancelled(orders) && subscriptionState === 'active') {
        const pendingOrdersDates = getPendingOrdersDates(orders)
        dispatch({
          type: actionTypes.CANCELLED_ALL_BOXES_MODAL_VISIBILITY_CHANGE,
          visibility: true,
          pendingOrdersDates,
        })
      }
    }

    dispatch(error(actionTypes.PROJECTED_ORDER_CANCEL, null))
    dispatch(pending(actionTypes.PROJECTED_ORDER_CANCEL, true))

    const state = getState()
    const accessToken = state.auth.get('accessToken')
    const valueProposition = state.onScreenRecovery.get('valueProposition')
    const offer = state.onScreenRecovery.get('offer')

    try {
      const orderDate = state.onScreenRecovery.get('orderDate').split(' ')[0]
      const userId = getUserId(state)

      await skipDates(accessToken, userId, [orderDate])

      dispatch({
        type: actionTypes.PROJECTED_ORDER_CANCEL,
        orderId,
        trackingData: {
          actionType: 'Order Skipped',
          delivery_day_id: deliveryDayId,
          order_state: 'projected',
          cms_variation: variation,
          recovery_reasons: [
            valueProposition,
            offer,
          ],
        }
      })

      dispatch(userOpenCloseOrderCard(orderId, true))
      showAllCancelledModalIfNecessary()
    } catch (err) {
      dispatch(error(actionTypes.PROJECTED_ORDER_CANCEL, {error: err.message, orderId}))
    } finally {
      dispatch(pending(actionTypes.PROJECTED_ORDER_CANCEL, false))
    }
  }
)
