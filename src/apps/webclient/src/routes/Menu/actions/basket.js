import Immutable from 'immutable'

import { actionTypes } from 'actions/actionTypes'
import { orderConfirmationUpdateOrderTracking } from 'actions/orderConfirmation'
import statusActions from 'actions/status'
import tempActions from 'actions/temp'
import * as trackingKeys from 'actions/trackingKeys'
import { getBasketOrderId } from 'selectors/basket'
import logger from 'utils/logger'

import * as orderV2 from '../apis/orderV2'

export const basketUpdateProducts =
  (isOrderConfirmation = false) =>
  async (dispatch, getState) => {
    dispatch(statusActions.pending(actionTypes.BASKET_CHECKOUT, true))
    dispatch(statusActions.error(actionTypes.BASKET_CHECKOUT, false))
    const state = getState()
    const orderId = getBasketOrderId(state)

    try {
      const marketPlaceUpdate = true
      const { data: order } = await orderV2.updateOrder(
        dispatch,
        getState,
        orderId,
        null,
        marketPlaceUpdate,
      )
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
      logger.error({ message: 'Error saving order', errors: [err] })
      dispatch(statusActions.error(actionTypes.BASKET_CHECKOUT, true))
      dispatch(statusActions.pending(actionTypes.BASKET_CHECKOUT, false))
    }
  }
