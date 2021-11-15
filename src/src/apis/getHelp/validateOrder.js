import { SSR_URL_LOCAL } from "apis/getHelp/configuration"
import endpoint from "config/endpoint"
import fetch from "utils/fetch"

const validateOrder = (accessToken, body) => {
    const url = (__ENV__ === 'local')
        ? `${SSR_URL_LOCAL}/ssr/validate`
        : `${endpoint('ssr')}/ssr/validate`

    return fetch(accessToken, url, body, 'POST', 'default', {
        'Content-Type': 'application/json'
    }, null, false)
}
export { validateOrder }
