import { fetch } from "utils/fetch"
import { HEADERS, PAYMENTS_API } from "apis/payments/configuration"

function checkPayment(sessionId) {
    return fetch(null, `${PAYMENTS_API}/payments/${sessionId}`, null, 'GET', undefined, HEADERS)
}

export { checkPayment }
