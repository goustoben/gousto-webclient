import globals from 'config/globals'
import { canUseWindow } from './browserEnvironment'

export function cookieString(reqCookies) {
  let cookies
  if (globals.server && reqCookies.request && reqCookies.request.headers && reqCookies.request.headers.cookie) {
    cookies = reqCookies.request.headers.cookie.split(';')
  }
  if (canUseWindow()) {
    cookies = document.cookie.split(';')
  }

  return cookies
}
