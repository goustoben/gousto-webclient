import fetch from "utils/fetch"
import routes from "config/routes"

export function checkoutOrder(accessToken, reqData) {
    return fetch(accessToken, `${routes.client.checkout}`, reqData, 'POST')
}
