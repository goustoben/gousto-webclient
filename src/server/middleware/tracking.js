const { v4: uuid } = require('uuid')

const cookieOptions = {
  secure: true,
  httpOnly: false,
}

export const sessionMiddleware = (sessionCookieName = 'session') => async (ctx, next) => {
  // Allow for setting of secure cookies
  ctx.cookies.secure = true

  if (!ctx.cookies.get(sessionCookieName)) {
    ctx.cookies.set(sessionCookieName, uuid(), cookieOptions)
  }

  await next()
}
