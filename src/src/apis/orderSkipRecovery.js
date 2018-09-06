import fetch from 'utils/fetch'
import endpoint from 'config/endpoint'

export function fetchOrderSkipContent(accessToken, orderId, reqData = {}) {
  // TO DO: update the endpoint
	return fetch(accessToken, `${endpoint('core')}/order/${orderId}`, reqData, 'GET')
}
