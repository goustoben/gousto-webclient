/* auth */
import moment from "moment"
import { authUserAuthenticated } from "actions/auth/authUserAuthenticated"
import config from "config/auth"
import { serverAuthenticate } from "apis/auth/serverAuthenticate"

export const authAuthenticate = (email, password, rememberMe, recaptchaToken) => (
  async (dispatch) => {
    try {
      const {data: authResponse} = await serverAuthenticate(email, password, rememberMe, recaptchaToken)
      const {
        accessToken,
        refreshToken,
        expiresIn,
      } = authResponse.data
      const expiresAt = moment().add(expiresIn, 'seconds').toISOString()
      dispatch(authUserAuthenticated(accessToken, refreshToken, expiresAt))
    } catch (err) {
      if (err.status === 401) {
        err.message = config.FAILED_LOGIN_TEXT
      } else if (err.status >= 500) {
        err.message = config.DEFAULT_ERROR
      } else {
        err.message = config.DEFAULT_ERROR
      }

      throw err
    }
  }
)
