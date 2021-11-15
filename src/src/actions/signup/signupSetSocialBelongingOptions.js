import { actionTypes } from "actions/actionTypes"

export const signupSetSocialBelongingOptions = (socialBelongingOptions) => ({
  type: actionTypes.SIGNUP_SET_SOCIAL_BELONGING_OPTIONS,
  ...socialBelongingOptions,
})
