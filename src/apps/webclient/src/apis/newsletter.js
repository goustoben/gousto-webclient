import { fetch } from 'utils/fetch'
import endpoint from 'config/endpoint'
import routes from 'config/routes'

export function requestNewsletterSignup(accessToken, email) {
  return fetch(accessToken, `${endpoint('core')}${routes.core.newsletter}`, { email }, 'POST')
}
