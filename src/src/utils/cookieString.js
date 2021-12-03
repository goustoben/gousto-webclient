import globals from 'config/globals'

export function cookieString(reqCookies) {
  let cookies
  if (!globals.window) {
    return ''
  }

  if (globals.server && reqCookies.request && reqCookies.request.headers && reqCookies.request.headers.cookie) {
    cookies = reqCookies.request.headers.cookie.split(';')
  }
  if (globals.client) {
    cookies = document.cookie.split(';')
  }

  return cookies
}
