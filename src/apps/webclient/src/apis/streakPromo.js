import endpoint from 'config/endpoint'
import { fetch } from 'utils/fetch'

export function getFrequencyIncProgress(accessToken) {
  return fetch(accessToken, `${endpoint('streakPromo')}/frequency-incentivisation`, {}, 'GET')
}
