import queryString from 'query-string'
import Immutable from 'immutable' /* eslint-disable new-cap */
import actionTypes from './actionTypes'
import authActions from './auth'
import statusActions from './status'
import orderActions from './order'
import userActions from './user'
import { loadRecommendations } from './recipes'
import Cookies from 'utils/GoustoCookies'
import config from 'config/routes'
import { isOneOfPage } from 'utils/routes'
import { isActive, isSuspended, needsReactivating, isAdmin, validateEmail } from 'utils/auth'
import URL from 'url'
import { push } from 'react-router-redux'
import windowUtils from 'utils/window'
import globals from 'config/globals'

const { pending, error } = statusActions
const { redirect, documentLocation } = windowUtils

const authorise = roles => {
	let err
	if (!isActive(roles)) {
		const msg = 'This account is does not exist. Please sign up or contact customer care.'
		err = new Error(msg)
	}
	if (isSuspended(roles)) {
		const msg = 'This account is suspended. Please contact customer care.'
		err = new Error(msg)
	}
	if (needsReactivating(roles)) {
		const msg = 'This account is deactivated. Please contact customer care to reactivate.'
		err = new Error(msg)
	}
	if (err) {
		throw err
	}

	return true
}

/* action creators */
const loginVisibilityChange = visibility => ({
	type: actionTypes.LOGIN_VISIBILITY_CHANGE,
	visibility,
})

/* post-action hooks */
export const loginRedirect = (location, userIsAdmin, features) => {
	let destination
	const { pathname, search } = location

	if (userIsAdmin) {
		destination = `${config.client.menu}?features[]=browse`
	} else if (search) {
		const { target } = queryString.parse(search)

		if (target && typeof target === 'string') {
			let url
			try {
				url = URL.parse(target)

				destination = `${url.pathname}${url.search ? url.search : ''}`
			} catch (err) {
				// do nothing
			}
		}
	}

	if (!destination && !isOneOfPage(pathname, ['menu', 'check-out'])) {
		const afterLoginPage = features ? features.getIn(['afterLogin', 'value']) : undefined

		destination = config.client[afterLoginPage] || config.client.myGousto
	}

	if (destination && destination !== config.client.myDeliveries2) {
		redirect(destination)
	}

	return destination
}

const logoutRedirect = () => {
	const pathName = documentLocation().pathname
	if (pathName.indexOf('/menu') === -1 && pathName !== '/') {
		redirect('/')
	}
}

const postLoginSteps = (userIsAdmin, orderId = '', features) => {
	const location = documentLocation()
	const onCheckout = location.pathname.includes('check-out')
	let destination = false
	if (!onCheckout) {
		destination = loginRedirect(location, userIsAdmin, features)
		if (destination && destination !== config.client.myDeliveries2) {
			redirect(destination)
		}

		if (Cookies.get('from_join')) {
			Cookies.expire('from_join')
		}
	}

	const windowObj = windowUtils.getWindow()
	if (globals.client && windowObj && typeof windowObj.__authRefresh__ === 'function' && windowObj.__store__) { // eslint-disable-line no-underscore-dangle
		windowObj.__authRefresh__(windowObj.__store__) // eslint-disable-line no-underscore-dangle
	}

	return async (dispatch, getState) => {
		if (onCheckout) {
			if (orderId) {
				dispatch(push(`${config.client.welcome}/${orderId}`))
			} else {
				dispatch(orderActions.orderAssignToUser(undefined, getState().basket.get('previewOrderId')))
			}
		} else {
			if (!userIsAdmin && getState().basket) {
				const promoCode = getState().basket.get('promoCode')
				if (promoCode) {
					await userActions.userPromoApplyCode(promoCode)(dispatch, getState)
				}
			}
			if (!getState().features.get('just-for-you')) {
				dispatch(loadRecommendations())
			}
			setTimeout(() => {
				dispatch(loginVisibilityChange(false))

				if (destination === config.client.myDeliveries2) {
					dispatch(push(config.client.myDeliveries2))
				}
			}, 1000)
		}
	}
}

const postLogoutSteps = () => (
	(dispatch) => {
		dispatch({ type: actionTypes.BASKET_RESET })
		dispatch({ type: actionTypes.USER_LOGGED_OUT }) // resets auth state
		if (globals.client) {
			logoutRedirect()
		}
	}
)

/* actions */
const login = (email, password, rememberMe, orderId = '') => (
	async (dispatch, getState) => {
		dispatch(pending(actionTypes.USER_LOGIN, true))
		dispatch(error(actionTypes.USER_LOGIN, false))
		dispatch({ type: actionTypes.LOGIN_ATTEMPT })
		try {
			if (rememberMe) {
				dispatch({ type: actionTypes.LOGIN_REMEMBER_ME })
			}
			await dispatch(authActions.authAuthenticate(email, password, rememberMe))
			await dispatch(authActions.authIdentify())

			const userRoles = getState().auth.get('roles', Immutable.List([]))
			if (userRoles.size > 0 && authorise(userRoles)) {
				dispatch(authActions.userRememberMe(rememberMe))

				await postLoginSteps(isAdmin(userRoles), orderId, getState().features)(dispatch, getState)
			}
		} catch (err) {
			const errMsg = err.message ? err.message : 'Sorry, we were unable to log you in. Please contact customer care.'
			dispatch(error(actionTypes.USER_LOGIN, errMsg))
			dispatch({ type: actionTypes.LOGIN_FAILED })
		}

		dispatch(pending(actionTypes.USER_LOGIN, false))
	}
)

const logout = () => (
	async dispatch => {
		await dispatch(authActions.authClear())
		dispatch(postLogoutSteps())
	}
)

const cannotLogin = ({ email, password }) => (
	async (dispatch) => {
		let err
		if (!email) {
			err = 'Please enter an email address.'
		} else if (!password) {
			err = 'Please enter a password.'
		} else if (!validateEmail(email)) {
			err = 'The email address you\'ve entered is formatted incorrectly.'
		}
		if (err) {
			dispatch(error(actionTypes.USER_LOGIN, err))
			dispatch({ type: actionTypes.LOGIN_FAILED })
		}
	}
)

export default {
	loginUser: login,
	logoutUser: logout,
	loginVisibilityChange,
	cannotLogin,
	loginRedirect,
}
