import fetch from "utils/fetch"
import endpoint from "config/endpoint"

export function fetchContentBySlug(accessToken, pageSlug, addData = {}) {
    return fetch(null, `${endpoint('content')}/pages/slug/${pageSlug}`, addData, 'GET', 'default', {}, 150)
}
