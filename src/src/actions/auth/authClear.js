import { serverLogout } from "apis/auth/serverLogout"
import { serverForget } from "apis/auth/serverForget"

export const authClear = () => (
  async (dispatch, getState) => {
    const accessToken = getState().auth.get('accessToken')

    await serverLogout()
    await serverForget(accessToken)
  }
)
