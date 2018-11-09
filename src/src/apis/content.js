import fetch from 'utils/fetch'
import endpoint from 'config/endpoint'
import routes from 'config/routes'

export function fetchContentBySlug(accessToken, pageSlug, addData = {}) {
  return fetch(null, `${endpoint('content', routes.version.content)}/pages/slug/${pageSlug}`, addData, 'GET', 'default', {}, 150)
}
