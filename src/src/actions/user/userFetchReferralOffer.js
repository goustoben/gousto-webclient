import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"
import { fetchReferralOffer } from "apis/users/fetchReferralOffer"

export function userFetchReferralOffer() {
  return async (dispatch, getState) => {
    dispatch(pending(actionTypes.USER_LOAD_REFERRAL_OFFER, true))
    const accessToken = getState().auth.get('accessToken')
    if (accessToken) {
      const {data: referralOffer} = await fetchReferralOffer(accessToken)
      dispatch({type: actionTypes.USER_LOAD_REFERRAL_OFFER, referralOffer})
      dispatch(pending(actionTypes.USER_LOAD_REFERRAL_OFFER, false))
    }
  }
}
