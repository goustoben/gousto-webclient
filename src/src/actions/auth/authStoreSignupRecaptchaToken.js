import { actionTypes } from "actions/actionTypes"

export const authStoreSignupRecaptchaToken = (token) => ({
  type: actionTypes.STORE_SIGNUP_RECAPTCHA_TOKEN,
  token,
})
