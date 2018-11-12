import moment from 'moment'

import { get, set } from 'utils/cookieHelper2'

export function routeMatches(ctx, path, method) {
  return ctx.path === path && ctx.method.toLowerCase() === method.toLowerCase()
}

export function addSessionCookies(ctx, response, rememberMe) {
  const { expiresIn, accessToken, refreshToken } = response.data
  const expiresAt = moment().add(expiresIn, 'seconds').toISOString()

  set(ctx.cookies, 'oauth_token', { access_token: accessToken }, rememberMe ? (10 / 24) : null, true, true, true)
  set(ctx.cookies, 'oauth_expiry', { expires_at: expiresAt }, rememberMe ? (10 / 24) : null)
  set(ctx.cookies, 'oauth_refresh', { refresh_token: refreshToken }, rememberMe ? 90 : null, true, true, true)
  set(ctx.cookies, 'oauth_remember', { remember_me: rememberMe }, rememberMe ? 90 : null)
}

export function removeSessionCookies(ctx) {
  set(ctx.cookies, 'oauth_token', { access_token: '' }, null, true, true, true)
  set(ctx.cookies, 'oauth_expiry', { expires_at: '' })
  set(ctx.cookies, 'oauth_refresh', { refresh_token: '' }, null, true, true, true)
  set(ctx.cookies, 'oauth_remember', { remember_me: false })
}

export function getCookieValue(ctx, key, property) {
  let value
  const cookie = get(ctx.cookies, key)
  if (cookie) {
    value = cookie[property]
  }

  return value
}
