import fetch from "utils/fetch"
import endpoint from "config/endpoint"

export function storeProspect(reqData) {
    return fetch(null, `${endpoint('core')}/prospect`, reqData, 'POST')
}
