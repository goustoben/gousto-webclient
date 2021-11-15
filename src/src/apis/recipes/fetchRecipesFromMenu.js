import endpoint from "config/endpoint"
import qs from "qs"
import fetch from "utils/fetch"

export function fetchRecipesFromMenu(accessToken, reqData) {
    const path = `${endpoint('menu')}/recipes`
    const uri = reqData
        ? `${path}?${qs.stringify(reqData, {encode: false})}`
        : path

    return fetch(accessToken, uri, {}, 'GET', 'default', {}, null, false, true)
}
