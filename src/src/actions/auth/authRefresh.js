import moment from "moment"
import { authUserAuthenticated } from "actions/auth/authUserAuthenticated"
import config from "config/auth"
import { serverRefresh } from "apis/auth/serverRefresh"

export const authRefresh = () => (
  async (dispatch, getState) => {
    const rememberMe = getState().auth.get('rememberMe', false)
    try {
      const {data: refreshResponse = {}} = await serverRefresh(rememberMe)
      const {
        accessToken,
        refreshToken,
        expiresIn,
      } = refreshResponse.data
      const expiresAt = moment().add(expiresIn, 'seconds').toISOString()
      dispatch(authUserAuthenticated(accessToken, refreshToken, expiresAt))
    } catch (err) {
      switch (err.status) {
        default:
          err.message = config.DEFAULT_ERROR
          break
      }
    }
  }
)
