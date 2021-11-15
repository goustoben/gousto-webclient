import { SSR_URL_LOCAL } from "apis/getHelp/configuration"
import endpoint from "config/endpoint"
import fetch from "utils/fetch"

const fetchOrderIssues = (accessToken) => {
    const url = (__ENV__ === 'local')
        ? `${SSR_URL_LOCAL}/ssr/categories`
        : `${endpoint('ssr')}/ssr/categories`

    return fetch(accessToken, url, null, 'GET')
}
export { fetchOrderIssues }
