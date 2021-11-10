import { fetch } from 'utils/fetch'
import config from '../config/apis'

export function addressLookup(postcode) {
  return fetch(null, config.craftyClicks.url, {
    key: config.craftyClicks.key,
    postcode,
    response: 'data_formatted',
    sort: 'asc',
  })
}
