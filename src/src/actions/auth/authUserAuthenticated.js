/* action creators */
import { actionTypes } from "actions/actionTypes"

export const authUserAuthenticated = (accessToken, refreshToken, expiresAt) => ({
  type: actionTypes.USER_AUTHENTICATED,
  accessToken,
  refreshToken,
  expiresAt,
})
