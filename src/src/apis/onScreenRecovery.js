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

export function fetchSubscriptionPauseContent(accessToken) {
  // TODO replace the 1 with subscription id when a) we have access to it, and b) the back end uses it
  return fetch(accessToken, `${endpoint('subpauseosr', 'v1')}/subscriptionpauserecovery/1`, null, 'GET')
}
