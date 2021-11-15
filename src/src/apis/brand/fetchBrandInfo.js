import fetch from "utils/fetch"
import endpoint from "config/endpoint"

export function fetchBrandInfo(accessToken, sessionId, userId) {
    const reqData = {}

    const headers = {
        'x-gousto-device-id': sessionId,
        'x-gousto-user-id': userId,
    }

    return fetch(accessToken, `${endpoint('brand')}/theme`, reqData, 'GET', 'default', headers)
}
