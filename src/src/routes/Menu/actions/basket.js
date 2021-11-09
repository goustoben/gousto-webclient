import statusActions from 'actions/status'
import { actionTypes } from 'actions/actionTypes'
import * as trackingKeys from 'actions/trackingKeys'
import Immutable from 'immutable'
import { updateOrderItems } from 'apis/orders'
import { orderConfirmationUpdateOrderTracking } from 'actions/orderConfirmation'
import tempActions from 'actions/temp'
import { logger } from 'utils/logger'
import { getAccessToken } from 'selectors/auth'
import { getBasketOrderId } from 'selectors/basket'
import { getUpdateOrderProductItemsOrderV1 } from '../selectors/order'

export const basketUpdateProducts = (isOrderConfirmation = false) => (
  async (dispatch, getState) => {
    dispatch(statusActions.pending(actionTypes.BASKET_CHECKOUT, true))
    const state = getState()
    const token = getAccessToken(state)
    const orderId = getBasketOrderId(state)
    const productInformation = getUpdateOrderProductItemsOrderV1(state)

    try {
      const { data: order } = await updateOrderItems(token, orderId, productInformation)
      dispatch({
        type: actionTypes.BASKET_CHECKOUT,
        trackingData: {
          actionType: trackingKeys.checkOutBasketAttempt,
          order,
        },
      })

      const orderDetails = Immutable.fromJS(order)

      await dispatch({
        type: actionTypes.BASKET_ORDER_DETAILS_LOADED,
        orderId: order.id,
        orderDetails,
      })

      if (isOrderConfirmation) {
        dispatch(orderConfirmationUpdateOrderTracking())
      }

      const orderTotal = orderDetails.getIn(['prices', 'total'])
      const grossTotal = orderDetails.getIn(['prices', 'grossTotal'])

      dispatch(tempActions.temp('originalGrossTotal', grossTotal))
      dispatch(tempActions.temp('originalNetTotal', orderTotal))
      dispatch(statusActions.pending(actionTypes.BASKET_CHECKOUT, false))
    } catch (err) {
      dispatch(statusActions.pending(actionTypes.BASKET_CHECKOUT, false))
      dispatch(statusActions.error(actionTypes.BASKET_CHECKOUT, err.message))
      logger.error(err)
      throw err
    }
  }
)
