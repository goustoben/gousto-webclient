import { push } from 'react-router-redux'
import config from 'config/routes'

export const orderAddOnRedirect = (orderId, orderAction) => (
  (dispatch) => {
    const url = config.client.orderAddOns.replace(':orderId', orderId)
    dispatch(push(`${url}?order_action=${orderAction}`))
  }
)
