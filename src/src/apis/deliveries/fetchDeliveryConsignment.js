import endpoint from "config/endpoint"
import fetch from "utils/fetch"
import { consignmentsRoute } from "config/routes/deliveries/consignmentsRoute"

export function fetchDeliveryConsignment(accessToken, orderId) {
    const reqData = {
        'filters[order_id]': orderId,
    }

    const url = `${endpoint('deliveries')}${consignmentsRoute}`

    return fetch(accessToken, url, reqData, 'GET')
}
