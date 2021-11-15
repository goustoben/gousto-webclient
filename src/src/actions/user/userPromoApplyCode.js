import { userVerifyAge } from "actions/user/userVerifyAge"
import { error } from "actions/status/error"
import { actionTypes } from "actions/actionTypes"
import { applyPromo } from "apis/users/applyPromo"

export function userPromoApplyCode(promoCode) {
  return async (dispatch, getState) => {
    const accessToken = getState().auth.get('accessToken')
    const state = getState()
    if (state.promoAgeVerified && !state.user.get('ageVerified')) {
      await dispatch(userVerifyAge(state.promoAgeVerified, true))
    }
    try {
      await applyPromo(accessToken, promoCode)
    } catch (err) {
      dispatch(error(actionTypes.PROMO_APPLY, err.message))
    }
  }
}
