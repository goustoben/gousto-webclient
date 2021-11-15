import { fetch } from "utils/fetch"
import endpoint from "config/endpoint"
import { userAddressRoute } from "config/routes/core/userAddressRoute"

export function fetchShippingAddresses(accessToken) {
    return fetch(accessToken, `${endpoint('core')}${userAddressRoute}`, {type: 'shipping'}, 'GET')
}
