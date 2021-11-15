import { actionTypes } from "actions/actionTypes"

export const userLoadReferralDetails = referralDetails => ({
  type: actionTypes.USER_LOAD_REFERRAL_DETAILS,
  referralDetails
})
