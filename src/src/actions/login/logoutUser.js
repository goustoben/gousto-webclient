import { authClear } from "actions/auth/authClear"
import { postLogoutSteps } from "actions/login/postLogoutSteps"

export const logoutUser = () => (
  async dispatch => {
    await dispatch(authClear())
    dispatch(postLogoutSteps())
  }
)
