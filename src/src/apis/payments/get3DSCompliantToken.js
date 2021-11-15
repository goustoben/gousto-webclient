import { fetch } from "utils/fetch"
import { HEADERS, PAYMENTS_API } from "apis/payments/configuration"

function get3DSCompliantToken(goustoRef) {
    return fetch(null, `${PAYMENTS_API}/3ds-compliant/${goustoRef}`, {}, 'GET', undefined, HEADERS)
}

export { get3DSCompliantToken }
