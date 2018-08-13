import actionTypes from 'actions/actionTypes'
import Immutable from 'immutable' /* eslint-disable new-cap */
import { isAdmin } from 'utils/auth'

const initialState = () => Immutable.fromJS({
	accessToken: '',
	refreshToken: '',
	isAuthenticated: false,
	isAdmin: false,
	rememberMe: false,
	email: '',
	id: '',
	name: '',
	roles: [],
	expiresAt: '',
})

const auth = {
	auth: (state, action) => {
		if (!state) {
			return initialState()
		}

		switch (action.type) {
			case actionTypes.USER_IDENTIFIED: {
				const user = action.user
				let newState = state.set('id', user.id)
				newState = newState.set('email', user.email)
				newState = newState.set('name', user.name)
				newState = newState.set('roles', Immutable.List(user.roles))
				newState = newState.set('isAdmin', isAdmin(user.roles))

				return newState
			}

			case actionTypes.USER_AUTHENTICATED: {
				let newState = state.set('accessToken', action.accessToken).set('expiresAt', action.expiresAt)
				if (action.refreshToken) {
					newState = newState.set('refreshToken', action.refreshToken)
				}

				return newState
			}

			case actionTypes.USER_REMEMBER_ME: {
				return state.set('rememberMe', action.rememberMe)
			}

			case actionTypes.USER_LOGGED_IN: {
				return state.set('isAuthenticated', true)
			}

			case actionTypes.USER_LOGGED_OUT: {
				return initialState()
			}

			default:
				return state
		}
	},
}

export default auth
