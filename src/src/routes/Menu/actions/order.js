import logger from 'utils/logger'
import { trackOrder } from 'actions/order'
import statusActions from 'actions/status'
import { orderConfirmationRedirect } from 'actions/orderConfirmation'
import { actionTypes } from 'actions/actionTypes'
import { getAccessToken, getAuthUserId } from 'selectors/auth'
import * as coreApi from '../apis/core'
import { getOrderDetails } from '../selectors/order'

const handleErrorForOrder = (message) => (dispatch) => {
  dispatch(statusActions.error(actionTypes.ORDER_SAVE, message))
  dispatch(statusActions.pending(actionTypes.BASKET_CHECKOUT, false))

  dispatch(statusActions.pending(actionTypes.ORDER_SAVE, false))
}

export const orderAssignToUser = (orderAction, existingOrderId) => async (dispatch, getState) => {
  dispatch(statusActions.error(actionTypes.ORDER_SAVE, null))
  dispatch(statusActions.pending(actionTypes.ORDER_SAVE, true))

  const accessToken = getAccessToken(getState())
  const userId = getAuthUserId(getState())
  const orderDetails = getOrderDetails(getState())

  // We omit the additional keys we don't need
  delete orderDetails.delivery_tariff_id
  delete orderDetails.order_id
  delete orderDetails.promo_code

  let savedOrder

  try {
    const { data } = await coreApi.saveUserOrder(accessToken, orderDetails)
    savedOrder = data
  } catch (err) {
    logger.error({
      message: 'saveUserOrder in orderAssignToUser failed, logging error below...',
      actor: userId,
      extra: {
        orderDetails
      }
    })

    logger.error(err)

    if (!existingOrderId || err.message !== 'user already has an order for chosen delivery day') {
      dispatch(handleErrorForOrder('save-order-fail'))

      return
    }

    const updateUserOrderPayload = {
      ...orderDetails,
      order_id: existingOrderId,
    }

    try {
      const { data } = await coreApi.updateUserOrder(accessToken, updateUserOrderPayload)
      savedOrder = data
    } catch (error) {
      logger.error({
        message: 'updateUserOrder in orderAssignToUser failed, logging error below...',
        actor: userId,
        extra: {
          updateUserOrderPayload
        }
      })
      logger.error(error)

      dispatch(handleErrorForOrder('update-order-fail'))

      return
    }
  }

  if (!savedOrder || !savedOrder.id) {
    logger.error({ message: 'orderAssignToUser failed, logging error below...', actor: userId })
    logger.error('assign-order-fail')

    dispatch(handleErrorForOrder('assign-order-fail'))

    return
  }

  dispatch(trackOrder(
    orderAction,
    savedOrder,
  ))
  dispatch(orderConfirmationRedirect(savedOrder.id, orderAction))
  dispatch(statusActions.pending(actionTypes.ORDER_SAVE, false))
}
