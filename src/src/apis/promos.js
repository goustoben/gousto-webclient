import fetch from 'utils/fetch'
import endpoint from 'config/endpoint'

export function fetchPromo(accessToken, promoCode) {
  const data = fetch(accessToken, `${endpoint('core')}/promocode/${promoCode}`, {}, 'GET', 'default', {}, null, false, false)

  return data
}

export function fetchPromocodeFromCampaignUrl(accessToken, url) {
  const data = fetch(accessToken, `${endpoint('core')}/campaign/${url}/promocode`, {}, 'GET')

  return data
}
