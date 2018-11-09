/* eslint-disable no-param-reassign */
const { appStoreLink, playStoreLink } = require('config/apps')

const appsRedirect = async (ctx, next) => {
  if (ctx.request.url === '/apps') {
    const userAgent = ctx.request.header['user-agent']

    if (/android/i.test(userAgent)) {
      ctx.redirect(playStoreLink)
    } else if (/iPad|iPhone|iPod/.test(userAgent)) {
      ctx.redirect(appStoreLink)
    } else {
      ctx.redirect('/')
    }
  } else {
    await next()
  }
}

module.exports = { appsRedirect }
