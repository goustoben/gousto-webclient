import fetch from "utils/fetch"
import endpoint from "config/endpoint"
import { productsRoute } from "config/routes/products/productsRoute"

export function fetchRandomProducts(accessToken, limit, imageSizes, userId, menuId) {
    const data = {
        sort: 'shuffle',
        limit,
        image_sizes: imageSizes,
        userId,
        menuId,
    }

    return fetch(accessToken, `${endpoint('products', 2)}${productsRoute}`, data, 'GET')
}
