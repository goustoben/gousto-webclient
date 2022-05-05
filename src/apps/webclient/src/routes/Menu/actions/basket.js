import statusActions from 'actions/status'
import { actionTypes } from 'actions/actionTypes'
import * as trackingKeys from 'actions/trackingKeys'
import Immutable from 'immutable'
import * as orderV2 from '../apis/orderV2'
import { orderConfirmationUpdateOrderTracking } from 'actions/orderConfirmation'
import tempActions from 'actions/temp'
import logger from 'utils/logger'
import { getBasketOrderId } from 'selectors/basket'

export const basketUpdateProducts =
  (isOrderConfirmation = false) =>
  async (dispatch, getState) => {
    dispatch(statusActions.pending(actionTypes.BASKET_CHECKOUT, true))
    const state = getState()
    const orderId = getBasketOrderId(state)

    try {
      const { data: order } = await orderV2.updateOrder(dispatch, getState, orderId)
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
