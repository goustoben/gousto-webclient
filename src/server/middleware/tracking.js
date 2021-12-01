const { v4: uuid } = require('uuid')
const { secure } = require('config/globals')

const cookieOptions = {
  secure,
  httpOnly: false,
}

export const sessionMiddleware = (sessionCookieName = 'gousto_session_id') => async (ctx, next) => {
  // Allow for setting of secure cookies
  ctx.cookies.secure = true

  if (!ctx.cookies.get(sessionCookieName)) {
    const res = uuid()
    ctx.cookies.set(sessionCookieName, res, cookieOptions)
  }

  await next()
}
