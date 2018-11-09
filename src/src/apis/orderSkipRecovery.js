import fetch from 'utils/fetch'
import endpoint from 'config/endpoint'

export function fetchOrderSkipContent(accessToken, orderId, orderDate) {
  const reqData = orderId ? {
    order_date: orderDate,
    order_id: orderId
  }
    :
    {
      order_date: orderDate,
    }

  return fetch(accessToken, `${endpoint('orderskiprecovery', 'v1')}/orderskiprecovery`, reqData, 'GET')
}
