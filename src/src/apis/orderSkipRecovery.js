import fetch from 'utils/fetch'
import endpoint from 'config/endpoint'

export function fetchOrderSkipContent(accessToken, orderId, orderDate) {

	return fetch(accessToken, `${endpoint('orderskiprecovery', 'v1')}/orderskiprecovery`, {
    order_date: orderDate,
    order_id: orderId
  }, 'GET')
}
