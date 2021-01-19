import * as userApi from 'apis/user'
import GoustoException from 'utils/GoustoException'
import logger from 'utils/logger'
import { getOrderDetails } from 'utils/basket'
import { trackOrder } from 'actions/order'
import statusActions from 'actions/status'
import { orderConfirmationRedirect } from 'actions/orderConfirmation'
import { actionTypes } from 'actions/actionTypes'

export const orderAssignToUser = (orderAction, existingOrderId) => async (dispatch, getState) => {
  dispatch(statusActions.error(actionTypes.ORDER_SAVE, null))
  dispatch(statusActions.pending(actionTypes.ORDER_SAVE, true))
  const accessToken = getState().auth.get('accessToken')
  const userId = getState().auth.get('id')
  let orderDetailsUtils
  let savedOrder

  try {
    try {
      orderDetailsUtils = getOrderDetails(getState().basket, getState().boxSummaryDeliveryDays)
      const { data } = await userApi.saveUserOrder(accessToken, orderDetailsUtils)
      savedOrder = data
    } catch (err) {
      logger.error({
        message: 'saveUserOrder in orderAssignToUser failed, logging error below...',
        actor: userId,
        extra: {
          orderDetails: orderDetailsUtils
        }
      })
      logger.error(err)

      if (existingOrderId && err.message === 'user already has an order for chosen delivery day') {
        const updateUserOrderPayload = {
          ...orderDetailsUtils,
          order_id: existingOrderId,
        }

        try {
          const { data } = await userApi.updateUserOrder(accessToken, updateUserOrderPayload)
          savedOrder = data
        } catch (err) {
          logger.error({
            message: 'updateUserOrder in orderAssignToUser failed, logging error below...',
            actor: userId,
            extra: {
              updateUserOrderPayload
            }
          })
          logger.error(err)

          throw new GoustoException(err.message || err, {
            error: 'update-order-fail',
          })
        }
      } else {
        throw new GoustoException(err.message || err, {
          error: 'save-order-fail',
        })
      }
    }

    if (savedOrder && savedOrder.id) {
      dispatch(trackOrder(
        orderAction,
        savedOrder,
      ))

      dispatch(orderConfirmationRedirect(savedOrder.id, orderAction))
    } else {
      throw new GoustoException('Order could not be assigned to user', {
        error: 'assign-order-fail',
      })
    }
  } catch (err) {
    logger.error({ message: 'orderAssignToUser failed, logging error below...', actor: userId })
    logger.error(err)

    dispatch(statusActions.error(actionTypes.ORDER_SAVE, err.error))
    dispatch(statusActions.pending(actionTypes.BASKET_CHECKOUT, false))
  } finally {
    dispatch(statusActions.pending(actionTypes.ORDER_SAVE, false))
  }
}
