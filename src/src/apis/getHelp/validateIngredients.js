import endpoint from "config/endpoint"
import fetch from "utils/fetch"

const validateIngredients = (accessToken, body) => {
    const url = `${endpoint('ssr', 2)}/validate-ingredients`

    return fetch(accessToken, url, body, 'POST', 'default', {
        'Content-Type': 'application/json'
    }, null, false)
}
export { validateIngredients }
