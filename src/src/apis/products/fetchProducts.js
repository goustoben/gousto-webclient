import { reqData } from "apis/products/reqData"
import fetch from "utils/fetch"
import endpoint from "config/endpoint"
import { productsRoute } from "config/routes/products/productsRoute"

export function fetchProducts(accessToken, cutoffDate, productsData, userId, menuId) {
    const data = {
        ...reqData,
        ...productsData,
        userId,
        menuId,
    }

    if (cutoffDate) {
        data.date = cutoffDate
    }

    return fetch(accessToken, `${endpoint('products', 2)}${productsRoute}`, data, 'GET')
}
