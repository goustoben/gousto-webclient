import authActions from 'actions/auth'
import persistAuth from 'utils/persistAuth'

export async function authorise(store, cookies) {
	try {
		const accessToken = store.getState().auth.get('accessToken')
		const refreshToken = store.getState().auth.get('refreshToken')
		const expiresAt = store.getState().auth.get('expiresAt')

		if (accessToken || refreshToken) {
			await store.dispatch(authActions.authValidate(accessToken, refreshToken, expiresAt))
		}
	} catch (err) {
		store.dispatch(authActions.userAuthenticated('', '', ''))
	}

	persistAuth(store.getState(), cookies)
}
