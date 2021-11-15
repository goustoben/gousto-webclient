import { reqData } from "apis/products/reqData"
import fetch from "utils/fetch"
import endpoint from "config/endpoint"

export function fetchProduct(accessToken, productId, userId, menuId) {
    const data = {
        ...reqData,
        userId,
        menuId,
    }

    return fetch(accessToken, `${endpoint('products', 2)}/products/${productId}`, data, 'GET')
}
