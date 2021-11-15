import fetch from "utils/fetch"
import endpoint from "config/endpoint"
import { boxPricesRoute } from "config/routes/core/boxPricesRoute"

export function fetchBoxPrices(accessToken, reqData) {
    return fetch(accessToken, `${endpoint('core')}${boxPricesRoute}`, reqData, 'GET')
}
