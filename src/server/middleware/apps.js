/* eslint-disable no-param-reassign */
const { appStoreLink, playStoreLink } = require('config/apps')

const converseUtmSource = (querystring) => querystring ? querystring.replace('utm_source', 'referrer') : querystring

const addQueryString = (url, querystring) => querystring ? `${url}?${querystring}` : url

const appsRedirect = async (ctx, next) => {
  if (ctx.request.url.startsWith('/apps') || ctx.request.url.startsWith('/apps?')) {
    const userAgent = ctx.request.header['user-agent']

    if (/android/i.test(userAgent)) {
      ctx.redirect(addQueryString(playStoreLink, converseUtmSource(ctx.request.querystring)))
    } else if (/iPad|iPhone|iPod/.test(userAgent)) {
      ctx.redirect(addQueryString(appStoreLink, ctx.request.querystring))
    } else {
      ctx.redirect('/')
    }
  } else {
    await next()
  }
}

module.exports = { appsRedirect }
