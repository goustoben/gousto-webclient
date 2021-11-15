import fetch from "utils/fetch"
import endpoint from "config/endpoint"

export function fetchPauseReasons(accessToken, userId = null) {
    const args = {
        includes: ['steps'],
    }

    return fetch(
        accessToken,
        `${endpoint('customers')}/customers/${userId}/subscription/pause-reasons`,
        args,
        'GET'
    )
}
