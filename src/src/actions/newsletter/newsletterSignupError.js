import { actionTypes } from "actions/actionTypes"

export const newsletterSignupError = (message) => ({
    type: actionTypes.NEWSLETTER_SIGNUP_ERROR,
    message,
})
