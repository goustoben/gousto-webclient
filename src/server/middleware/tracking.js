const { v4: uuid } = require('uuid')

const cookieOptions = {
  secure: true,
  httpOnly: false,
}

export const sessionMiddleware = (sessionCookieName = 'session') => async (ctx, next) => {
  if (!ctx.cookies.get(sessionCookieName)) {
    ctx.cookies.set(sessionCookieName, uuid(), cookieOptions)
  }

  await next()
}
