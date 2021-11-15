import { error } from "actions/status/error"
import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"
import { redirect } from "utils/window"
import configRoutes from "config/routes"
import logger from "utils/logger"
import { loginUser } from "actions/login/loginUser"
import { resetUserPassword } from "apis/auth/resetUserPassword"

export const authResetPassword = (password, passwordToken, recaptchaToken = '') => (
  async (dispatch) => {
    dispatch(pending(actionTypes.AUTH_PASSWORD_RESET, true))
    dispatch(error(actionTypes.AUTH_PASSWORD_RESET, null))

    try {
      const {data: {email}} = await resetUserPassword(password, passwordToken)
      await dispatch(loginUser({email, password, rememberMe: true, recaptchaToken}))
      redirect(configRoutes.client.myDeliveries)
    } catch (err) {
      dispatch(error(actionTypes.AUTH_PASSWORD_RESET, err.errors))
      logger.error(err)
    } finally {
      dispatch(pending(actionTypes.AUTH_PASSWORD_RESET, false))
    }
  }
)
