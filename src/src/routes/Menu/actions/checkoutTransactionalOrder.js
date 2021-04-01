import logger from 'utils/logger'
import { actionTypes } from 'actions/actionTypes'
import statusActions from 'actions/status'
import { trackOrder } from 'actions/order'
import { orderConfirmationRedirect } from 'actions/orderConfirmation'
import { getAccessToken, getAuthUserId, getIsAuthenticated } from 'selectors/auth'
import { getSlotForBoxSummaryDeliveryDays, getOrderV2 } from '../selectors/order'
import { createOrder } from '../apis/orderV2'

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

  // todo what do we do with promo code?

  const orderRequest = getOrderV2(state)

  // todo this needs sessionId adding
  const sessionId = undefined

  try {
    const order = await createOrder(accessToken, orderRequest, sessionId, userId)

    dispatch(trackOrder(undefined, order))
    dispatch(orderConfirmationRedirect(order.id, 'create'))
    dispatch(statusActions.pending(actionTypes.ORDER_SAVE, false))
  } catch (e) {
    const { message, code } = e
    logger.error(e)
    dispatch(error(actionTypes.ORDER_SAVE, { message, code }))
  }
}
