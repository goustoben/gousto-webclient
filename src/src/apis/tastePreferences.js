import fetch from 'utils/fetch'
import endpoint from 'config/endpoint'
import routes from 'config/routes'

export function updateTastePreferences(accessToken, sessionId) {
  const headers = {
    'x-gousto-device-id': sessionId,
    'Content-Type': 'application/json',
  }

  return fetch(accessToken, `${endpoint('tastepreferences', routes.version.tastePreferences)}${routes.tastePreferences.profile}`, {}, 'POST', 'default', headers)
}
