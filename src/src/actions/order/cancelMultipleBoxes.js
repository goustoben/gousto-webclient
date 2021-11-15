import { anyUnset } from "utils/object"
import { actionTypes } from "actions/actionTypes"
import { trackCancelMultipleBoxes } from "actions/order/trackCancelMultipleBoxes"
import { skipDates } from "routes/Account/apis/subscription/skipDates"
import { deleteOrder } from "routes/Account/MyDeliveries/apis/orderV2/deleteOrder"

export const cancelMultipleBoxes = ({selectedOrders}, userId) => async (dispatch, getState) => {
  const malformedOrders = selectedOrders.find(({
                                                 id,
                                                 isProjected,
                                                 deliveryDayId
                                               }) => anyUnset(id, isProjected, deliveryDayId))

  if (malformedOrders || !selectedOrders.length) {
    dispatch({
      type: actionTypes.CANCEL_MULTIPLE_BOXES_ERROR
    })

    return
  }

  dispatch({
    type: actionTypes.CANCEL_MULTIPLE_BOXES_START,
  })

  const state = getState()
  const cancelledOrders = []
  const accessToken = state.auth.get('accessToken')
  const valueProposition = state.onScreenRecovery.get('valueProposition')
  const offer = state.onScreenRecovery.get('offer')

  try {
    const cancellations = selectedOrders.map((order) => {
      let request

      if (order.isProjected) {
        const deliveryDay = order.deliveryDay.split(' ')[0]
        request = skipDates(accessToken, userId, [deliveryDay])
      } else {
        request = deleteOrder(accessToken, order.id, userId)
      }

      return request.then(() => cancelledOrders.push(order))
    })

    await Promise.all(cancellations)

    dispatch({
      type: actionTypes.CANCEL_MULTIPLE_BOXES_SUCCESS,
      count: cancellations.length
    })
  } catch (err) {
    dispatch({
      type: actionTypes.CANCEL_MULTIPLE_BOXES_ERROR,
    })
  } finally {
    cancelledOrders.forEach(({isProjected, id, deliveryDayId}) => {
      dispatch({
        type: isProjected
          ? actionTypes.PROJECTED_ORDER_CANCEL
          : actionTypes.ORDER_CANCEL,
        orderId: id,
        trackingData: {
          actionType: `Order ${isProjected ? 'Skipped' : 'Cancelled'}`,
          delivery_day_id: deliveryDayId,
          order_state: isProjected ? 'projected' : 'pending',
          cms_variation: id,
          recovery_reasons: [
            valueProposition,
            offer,
          ],
        }
      })
    })

    if (cancelledOrders.length) {
      const cancelledIds = cancelledOrders.map(({id}) => id)
      dispatch(trackCancelMultipleBoxes(cancelledIds))
    }
  }
}
