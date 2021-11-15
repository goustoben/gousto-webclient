import endpoint from "config/endpoint"
import fetch from "utils/fetch"

const setComplaint = (accessToken, body) => {
    const url = `${endpoint('ssr', 2)}/refund`

    return fetch(accessToken, url, body, 'POST', 'default', {
        'Content-Type': 'application/json'
    }, null, false)
}
export { setComplaint }
