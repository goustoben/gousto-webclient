import fetch from "utils/fetch"
import endpoint from "config/endpoint"
import config from "config/products"
import { categoriesRoute } from "config/routes/products/categoriesRoute"

export function fetchProductCategories(accessToken) {
    return fetch(accessToken, `${endpoint('products', 2)}${categoriesRoute}`, {includes: config.categoryFetchIncludes}, 'GET')
}
