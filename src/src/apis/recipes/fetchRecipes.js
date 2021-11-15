import fetch from "utils/fetch"
import endpoint from "config/endpoint"

export function fetchRecipes(accessToken, path, reqData) {
    return fetch(accessToken, `${endpoint('recipes', 2)}/recipes/${path}`, reqData, 'GET')
}
