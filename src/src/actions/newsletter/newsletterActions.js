import { newsletterSignupPending } from "actions/newsletter/newsletterSignupPending"
import { newsletterSignedup } from "actions/newsletter/newsletterSignedup"
import { newsletterSignupError } from "actions/newsletter/newsletterSignupError"
import newsletterSignup from "apis/newsletter/newsletterSignup"

const newsletterActions = {
    newsletterSignup: (email) => (
        async (dispatch, getState) => {
            const accessToken = getState().auth.get('accessToken')
            dispatch(newsletterSignupPending())

            try {
                await newsletterSignup(accessToken, email)
                dispatch(newsletterSignedup())
            } catch (err) {
                let error = err
                if (typeof err !== 'string') {
                    error = 'Something\'s gone wrong signing you up, please try again or contact our customer care team.'
                }
                dispatch(newsletterSignupError(error))
            }
        }
    ),
}
export default newsletterActions
