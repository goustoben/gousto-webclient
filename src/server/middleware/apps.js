import { appStoreLink, playStoreLink } from 'config/apps'

const convertQueryKeys = (querystring) => (querystring ? querystring.replace('utm_source', 'referrer') : querystring)

const isContainingQuery = (url) => url.indexOf('?') !== -1

const withQuery = (url, querystring) => {
  if (!querystring) {
    return url
  }

  return isContainingQuery(url) ? `${url}&${querystring}` : `${url}?${querystring}`
}

export const appsRedirect = async (ctx, next) => {
  if ((ctx.request.url === '/apps') || ctx.request.url.startsWith('/apps?')) {
    const userAgent = ctx.request.header['user-agent']

    if (/android/i.test(userAgent)) {
      ctx.redirect(withQuery(playStoreLink, convertQueryKeys(ctx.request.querystring)))
    } else if (/iPad|iPhone|iPod/.test(userAgent)) {
      ctx.redirect(withQuery(appStoreLink, ctx.request.querystring))
    } else {
      ctx.redirect(withQuery('/', ctx.request.querystring))
    }
  } else {
    await next()
  }
}
