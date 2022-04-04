import { getProtocol } from '../../src/utils/isomorphicEnvironment'
import { PROTOCOL_PREFIX } from '../../src/config/service-environment/service-environment.types'
const { v4: uuid } = require('uuid')

const cookieOptions = () => ({
  secure: (getProtocol() === PROTOCOL_PREFIX.HTTPS),
  httpOnly: false,
})

export const sessionMiddleware = (sessionCookieName = 'gousto_session_id') => async (ctx, next) => {
  // Allow for setting of secure cookies
  ctx.cookies.secure = true

  if (!ctx.cookies.get(sessionCookieName)) {
    const res = uuid()
    ctx.cookies.set(sessionCookieName, res, cookieOptions())
  }

  await next()
}
