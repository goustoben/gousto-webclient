import endpoint from "config/endpoint"
import fetch from "utils/fetch"

const fetchRefundAmount = (accessToken, body) => {
    const url = `${endpoint('ssr', 2)}/value`

    return fetch(accessToken, url, body, 'POST', 'default', {
        'Content-Type': 'application/json'
    }, null, false)
}
export { fetchRefundAmount }
