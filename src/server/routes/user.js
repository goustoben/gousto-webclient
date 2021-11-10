import { fetchFeatures } from 'apis/fetchS3'
import { logger } from 'utils/logger'
import { validateRecaptchaUserToken } from 'apis/auth'
import { referAFriend as sendReferalToCore } from 'apis/user'
import routes from 'config/routes'
import { env } from 'utils/env'
import { routeMatches, getCookieValue } from './utils'

/**
 * Refer a friend Route
 * @param {*} ctx
 */
export async function referAFriend(ctx) {
  /* eslint-disable no-param-reassign */
  /* eslint-disable no-underscore-dangle */
  try {
    const { email, recaptchaToken } = ctx.request.body
    const { data } = await fetchFeatures()
    const { isRecaptchaEnabled } = data
    const accessToken = getCookieValue(ctx, 'oauth_token', 'access_token')

    if (accessToken) {
      if (isRecaptchaEnabled) {
        const validateRecaptchaResponse = await validateRecaptchaUserToken(
          recaptchaToken,
          env.recaptchaReferralPrivateKey
        )
        if (!validateRecaptchaResponse.success) {
          throw validateRecaptchaResponse
        }
      }
      const coreResponse = await sendReferalToCore(accessToken, email)
      ctx.response.status = 200
      ctx.response.body = coreResponse
    } else {
      throw new Error('Access token not present')
    }
  } catch (error) {
    logger.error({ message: `user/referAFriend catch ${JSON.stringify(error)}` })

    ctx.response.status = 500
    ctx.response.body = {
      error: error.message,
    }
  }
}

/* eslint-disable consistent-return */
export const userController = async (ctx, next) => {
  if (routeMatches(ctx, routes.user.referAFriend, 'POST')) {
    await referAFriend(ctx)
  } else {
    return next()
  }
}

const user = (app) => {
  app.use(userController)
}

export { user }
