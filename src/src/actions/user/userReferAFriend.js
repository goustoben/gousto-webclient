import logger from "utils/logger"
import { serverReferAFriend } from "apis/users/serverReferAFriend"

export const userReferAFriend = (email, recaptchaToken = null) => async () => {
  try {
    await serverReferAFriend(email, recaptchaToken)
  } catch (err) {
    logger.error({message: 'Failed to call refer a friend', errors: [err]})
  }
}
