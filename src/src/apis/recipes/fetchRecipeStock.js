import fetch from "utils/fetch"
import endpoint from "config/endpoint"

export function fetchRecipeStock(accessToken, deliveryDayId) {
    return fetch(accessToken, `${endpoint('core')}/delivery_day/${deliveryDayId}/stock`, {}, 'GET')
}
