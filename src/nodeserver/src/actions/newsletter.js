import actionTypes from './actionTypes'
import newsletterSignup from 'apis/newsletter'

const newsletterSignupPending = () => ({
	type: actionTypes.NEWSLETTER_SIGNUP_PENDING,
})

const newsletterSignedup = () => ({
	type: actionTypes.NEWSLETTER_SIGNUP_SUCCESS,
})

const newsletterSignupError = (message) => ({
	type: actionTypes.NEWSLETTER_SIGNUP_ERROR,
	message,
})

export default {
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
