import { actionTypes } from "actions/actionTypes"

export const userReset3dsCompliantToken = () => (dispatch) => {
  dispatch({
    type: actionTypes.USER_GET_3DS_COMPLIANT_TOKEN,
    isCardTokenNotCompliantFor3ds: false,
  })
}
