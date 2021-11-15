import config from 'config/routes'
import { push } from 'react-router-redux'
import { orderCheckPossibleDuplicate } from "actions/order/orderCheckPossibleDuplicate"

export const orderConfirmationRedirect = (orderId, orderAction) => (
  (dispatch) => {
    const confirmationUrl = config.client.orderConfirmation.replace(':orderId', orderId)
    dispatch(orderCheckPossibleDuplicate(orderId))
    dispatch(push((orderAction) ? `${confirmationUrl}?order_action=${orderAction}` : confirmationUrl))
  }
)
