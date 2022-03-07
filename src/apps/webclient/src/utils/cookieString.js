import { canUseWindow } from './browserEnvironment'
import { isServer } from './serverEnvironment'

export function cookieString(reqCookies) {
  let cookies
  if (isServer() && reqCookies.request && reqCookies.request.headers && reqCookies.request.headers.cookie) {
    cookies = reqCookies.request.headers.cookie.split(';')
  }
  if (canUseWindow()) {
    cookies = document.cookie.split(';')
  }

  return cookies
}
