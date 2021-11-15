import moment from "moment"
import { authIdentify } from "actions/auth/authIdentify"
import { authRefresh } from "actions/auth/authRefresh"

export const authValidate = (accessToken, refreshToken, expiresAt) => (
  async (dispatch, getState) => {
    try {
      if (expiresAt && moment(expiresAt).isBefore(moment())) {
        throw new Error('Token already expired')
      }
      await dispatch(authIdentify(accessToken))
    } catch (err) {
      if (refreshToken) {
        await dispatch(authRefresh(refreshToken))
        const newAccessToken = getState().auth.get('accessToken')
        await dispatch(authIdentify(newAccessToken))
      } else {
        throw err
      }
    }
  }
)
