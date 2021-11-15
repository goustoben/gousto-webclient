import { fetch } from "utils/fetch"
import { HEADERS, PAYMENTS_API } from "apis/payments/configuration"

function fetchPayPalToken() {
    const params = {provider: 'paypal'}

    return fetch(null, `${PAYMENTS_API}/token`, params, 'GET', undefined, HEADERS)
}

export { fetchPayPalToken }
