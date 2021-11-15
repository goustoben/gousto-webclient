import { fetch } from "utils/fetch"
import endpoint from "config/endpoint"

export function fetchPromocodeFromCampaignUrl(accessToken, url) {
    const data = fetch(accessToken, `${endpoint('core')}/campaign/${url}/promocode`, {}, 'GET')

    return data
}
