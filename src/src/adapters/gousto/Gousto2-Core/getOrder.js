import fetch from 'utils/fetch'

export function createAdapter(coreBaseUrl, getAccessToken) {
  return async (orderId, {includeShippingAddress} = {includeShippingAddress: false}) => {
    const data = includeShippingAddress ? {'includes[]': 'shipping_address'} : {}
    const {data: order} = await fetch(getAccessToken(), `${coreBaseUrl}/order/${orderId}`, data, 'GET', undefined, {'Content-Type': 'application/json'})

    return order
  }
}
