const COOKIE_NAME = 'gousto_useNewMenuService'

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000
const THREE_DAYS_IN_MS = 3 * ONE_DAY_IN_MS

//const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const shouldUseNewMenuService = (ctx) => {
  if (ctx.query.useNewMenuService !== undefined) {
    return true
  }

  // uncomment when no longer limiting to Gousto employees
  //return getRandomInt(0, 100) > 95

  return false
}

const experiment_setMenuServiceSegment = async (ctx, next) => {
  if (!ctx.cookies) {
    await next()

    return
  }

  if (ctx.cookies.get(COOKIE_NAME) !== undefined) {
    await next()
    
    return
  }

  ctx.cookies.set(
    COOKIE_NAME,
    shouldUseNewMenuService(ctx) ? 1 : 0,
    { maxAge: THREE_DAYS_IN_MS }
  )

  await next()
}

export { experiment_setMenuServiceSegment }
