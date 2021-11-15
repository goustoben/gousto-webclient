import fetch from "utils/fetch"
import endpoint from "config/endpoint"

export function fetchCollections(accessToken, path, reqData) {
    return fetch(accessToken, `${endpoint('collections')}/collections/${path}`, reqData, 'GET', 'default', {}, null, false)
}
