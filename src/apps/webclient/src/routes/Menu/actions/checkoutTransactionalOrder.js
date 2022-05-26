import { actionTypes } from 'actions/actionTypes'
import { trackOrder } from 'actions/order'
import { orderConfirmationRedirect } from 'actions/orderConfirmation'
import statusActions from 'actions/status'
import { getAccessToken, getAuthUserId, getIsAuthenticated } from 'selectors/auth'
import logger from 'utils/logger'

import { createOrder } from '../apis/orderV2'
import { getSlotForBoxSummaryDeliveryDays, getOrderV2 } from '../selectors/order'

const { pending, error } = statusActions

export const checkoutTransactionalOrder = () => async (dispatch, getState) => {
  const state = getState()
  if (!getIsAuthenticated(state)) {
    return
  }

  const userId = getAuthUserId(state)
  const [slot, slotId] = getSlotForBoxSummaryDeliveryDays(state)

  if (!slot) {
    logger.error({ message: `Can't find any slot with id: ${slotId}`, actor: userId })

    dispatch(pending(actionTypes.ORDER_SAVE, false))
    dispatch(error(actionTypes.ORDER_SAVE, `Can't find any slot with id: ${slotId}`))

    return
  }

  dispatch(statusActions.error(actionTypes.ORDER_SAVE, null))
  dispatch(statusActions.pending(actionTypes.ORDER_SAVE, true))

  // todo is this check really needed? it doesn't stop the flow in v1...
  // const couldBasketBeExpired = getCouldBasketBeExpired(getState())

  const accessToken = getAccessToken(state)
  const orderRequest = getOrderV2(state)

  try {
    const order = await createOrder(accessToken, orderRequest, userId)
    try {
      dispatch(trackOrder('create', order))
    } catch (e) {
      logger.warning({ message: 'error in tracking new order', errors: [e] })
    }
    dispatch(orderConfirmationRedirect(order.id, 'create'))
    dispatch(statusActions.pending(actionTypes.ORDER_SAVE, false))
  } catch (e) {
    const { message, code } = e
    logger.error({ message: 'Error while creating transational order', errors: [e] })
    dispatch(error(actionTypes.ORDER_SAVE, { message, code }))
  }
}
