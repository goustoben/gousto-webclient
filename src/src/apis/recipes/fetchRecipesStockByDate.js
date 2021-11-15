import fetch from "utils/fetch"
import endpoint from "config/endpoint"
import { recipesStockRoute } from "config/routes/orders/recipesStockRoute"

export function fetchRecipesStockByDate(reqData) {
    return fetch(null, `${endpoint('orders')}${recipesStockRoute}`, reqData, 'GET')
}
