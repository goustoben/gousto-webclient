import { authUserIdentified } from "actions/auth/authUserIdentified"
import { isActive } from "utils/auth"
import { authUserLoggedIn } from "actions/auth/authUserLoggedIn"
import { trackUserLogin } from "actions/loggingmanager/trackUserLogin"
import { identifyUserUsingOAuth } from "apis/auth/identifyUserUsingOAuth"
import { identifyUserViaServer } from "apis/auth/identifyUserViaServer"

export const authIdentify = (accessToken) => (
  async (dispatch) => {
    let data = {}

    if (__SERVER__) {
      data = await identifyUserUsingOAuth(accessToken)
    } else {
      data = await identifyUserViaServer()
    }

    const user = data.data
    dispatch(authUserIdentified(user))

    if (isActive(user.roles)) {
      dispatch(trackUserLogin())
      dispatch(authUserLoggedIn())
    }
  }
)
