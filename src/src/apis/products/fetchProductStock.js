import fetch from "utils/fetch"
import endpoint from "config/endpoint"
import { productStockRoute } from "config/routes/core/productStockRoute"

export function fetchProductStock(accessToken) {
    return fetch(accessToken, `${endpoint('core')}${productStockRoute}`, {}, 'GET')
}
