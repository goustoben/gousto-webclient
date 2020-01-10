const COOKIE_NAME = 'gousto_useNewMenuService'
const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000
const TWELVE_HOURS_IN_MS = ONE_DAY_IN_MS / 2

const shouldUseNewMenuService = (ctx) => {
  if (ctx.query.useNewMenuService === 'true') {
    return true
  }

  if (ctx.query.useNewMenuService === 'false') {
    return false
  }

  return true
}

const experiment_setMenuServiceSegment = async (ctx, next) => {
  if (!ctx.cookies) {
    await next()

    return
  }

  const isValidQueryStringValue = ctx.query.useNewMenuService === 'true' || ctx.query.useNewMenuService === 'false'
  if (ctx.cookies.get(COOKIE_NAME) === undefined || ctx.cookies.get(COOKIE_NAME) === '' || isValidQueryStringValue) {
    ctx.cookies.set(
      COOKIE_NAME,
      JSON.stringify(shouldUseNewMenuService(ctx)),
      {
        maxAge: TWELVE_HOURS_IN_MS,
        httpOnly: false,
      }
    )
  }

  await next()
}

export { experiment_setMenuServiceSegment, shouldUseNewMenuService }
