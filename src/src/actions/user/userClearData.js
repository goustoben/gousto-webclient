import { actionTypes } from "actions/actionTypes"
import { basketAddressChange } from "actions/basket/basketAddressChange"
import { basketChosenAddressChange } from "actions/basket/basketChosenAddressChange"
import { basketPostcodeChangePure } from "actions/basket/basketPostcodeChangePure"

export function userClearData() {
  return dispatch => {
    dispatch({
      type: actionTypes.USER_CLEAR_DATA
    })
    dispatch(basketAddressChange(null))
    dispatch(basketChosenAddressChange(null))
    dispatch(basketPostcodeChangePure(''))
  }
}
