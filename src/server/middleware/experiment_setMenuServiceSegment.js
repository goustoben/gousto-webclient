const COOKIE_NAME = 'gousto_useNewMenuService'

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000
const THREE_DAYS_IN_MS = 3 * ONE_DAY_IN_MS

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const experiment_setMenuServiceSegment = async (ctx, next) => {
  if (!ctx.cookies) {
    await next()

    return
  }

  if (ctx.cookies.get(COOKIE_NAME) !== undefined) {
    await next()
    
    return
  }

  const shouldUseNewMenuService = getRandomInt(0, 100) > 95
  ctx.cookies.set(
    COOKIE_NAME,
    shouldUseNewMenuService ? 1 : 0,
    { maxAge: THREE_DAYS_IN_MS }
  )

  await next()
}

export { experiment_setMenuServiceSegment }
