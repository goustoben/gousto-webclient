import { getPreviewOrderErrorName } from 'utils/order'
import logger from 'utils/logger'
import routes from 'config/routes'
import { createPreviewOrder } from 'apis/orders'

import { actionTypes } from 'actions/actionTypes'
import {
  basketPreviewOrderChange,
} from 'actions/basket'
import { redirect } from 'actions/redirect'
import statusActions from 'actions/status'
import { getAuthUserId, getIsAuthenticated } from 'selectors/auth'
import { getPreviewOrderId } from 'selectors/basket'
import { getUserStatus } from 'selectors/user'
import { checkoutUrgencySetCurrentStatus } from 'routes/Checkout/checkoutActions'
import { checkoutUrgencyStatuses } from 'routes/Checkout/checkoutUrgencyConfig'
import { isServer } from '../../../../server/utils/serverEnvironment'
import {
  getSlotForBoxSummaryDeliveryDays,
  getCouldBasketBeExpired,
  getOrderDetails,
} from '../selectors/order'

import { orderAssignToUser } from './order'

const { pending, error } = statusActions

export const checkoutCreatePreviewOrder = () => async (dispatch, getState) => {
  const userId = getAuthUserId(getState())
  const [slot, slotId] = getSlotForBoxSummaryDeliveryDays(getState())

  dispatch(pending(actionTypes.BASKET_PREVIEW_ORDER_CHANGE, true))
  dispatch(error(actionTypes.BASKET_PREVIEW_ORDER_CHANGE, null))

  const state = getState()

  dispatch(checkoutUrgencySetCurrentStatus(checkoutUrgencyStatuses.loading))

  if (!slot) {
    logger.error({ message: `Can't find any slot with id: ${slotId}`, actor: userId })

    dispatch(pending(actionTypes.BASKET_PREVIEW_ORDER_CHANGE, false))
    dispatch(error(actionTypes.BASKET_PREVIEW_ORDER_CHANGE, `Can't find any slot with id: ${slotId}`))

    return
  }

  const orderDetails = getOrderDetails(state)

  const couldBasketBeExpired = getCouldBasketBeExpired(getState())

  if (couldBasketBeExpired) {
    const { router: { locationBeforeTransitions: { pathName: path } = {} } = {} } = getState()

    logger.warning({
      message: 'Missing data, persistent basket might be expired',
      actor: userId,
      extra: {
        deliveryDayId: orderDetails.deliveryDayId,
        deliverySlotId: orderDetails.deliverySlotId,
        recipeChoices: orderDetails.recipeChoices,
        path,
        serverSide: isServer(),
      }
    })

    dispatch(error(actionTypes.BASKET_PREVIEW_ORDER_CHANGE, { message: 'Missing data, persistent basket might be expired', code: 'basket-expired' }))
  }

  try {
    const { data: previewOrder = {} } = await createPreviewOrder(orderDetails)
    dispatch(basketPreviewOrderChange(String(previewOrder.order.id), previewOrder.order.boxId, previewOrder.surcharges))
    dispatch(error(actionTypes.BASKET_PREVIEW_ORDER_CHANGE, null))

    dispatch(checkoutUrgencySetCurrentStatus(checkoutUrgencyStatuses.running))
  } catch (e) {
    const { message, code } = e
    logger.warning(message)

    const { router: { locationBeforeTransitions: { pathName: path } = {} } = {} } = getState()
    logger.error({
      message: 'createPreviewOrder failed, logging error below...',
      actor: userId,
      extra: {
        orderDetails,
        path,
        serverSide: isServer(),
      }
    })
    logger.error(e)

    dispatch(error(actionTypes.BASKET_PREVIEW_ORDER_CHANGE, { message, code }))
  }

  dispatch(pending(actionTypes.BASKET_PREVIEW_ORDER_CHANGE, false))
}

export const checkoutTransactionalOrder = (orderAction) => async (dispatch, getState) => {
  await dispatch(checkoutCreatePreviewOrder())

  const { error } = getState()

  const previewOrderError = error.get(actionTypes.BASKET_PREVIEW_ORDER_CHANGE, false)
  const previewOrderErrorName = getPreviewOrderErrorName(error)
  const orderId = getPreviewOrderId(getState())
  const userStatus = getUserStatus(getState())
  const isAuthenticated = getIsAuthenticated(getState())

  if (previewOrderError || !orderId) {
    logger.warning(`Preview order id failed to create, persistent basket might be expired, error: ${previewOrderErrorName}`)

    dispatch(redirect(`${routes.client.menu}?from=newcheckout&error=${previewOrderErrorName}`, true))

    return
  }

  if (!isAuthenticated) {
    return
  }

  if (userStatus === 'onhold') {
    dispatch(redirect(`${routes.client.myGousto}`))
  } else {
    dispatch(orderAssignToUser(orderAction, orderId))
  }
}
