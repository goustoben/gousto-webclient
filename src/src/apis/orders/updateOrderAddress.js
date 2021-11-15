import fetch from "utils/fetch"
import endpoint from "config/endpoint"

export function updateOrderAddress(accessToken, orderId, addressId) {
    return fetch(accessToken, `${endpoint('core')}/order/${orderId}/change-address/`, {address_id: addressId}, 'PUT', undefined, {
        'Content-Type': 'application/json',
    })
}
